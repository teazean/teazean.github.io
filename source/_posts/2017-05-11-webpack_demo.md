---
layout: post
title: 记录一次webpack以html为入口打包h5的实践
category: web
tags: webpack
---

### 1. 背景
背景就是写一个h5，大概的结构就是:

    --index.html
        -- main.js(一堆js，以main.js做入口)
        -- main.less(一堆less，以main.less做入口)
        -- assets/xxx.jpg|png

要求是：

1. 将所有的styles打包到一个`bundle.css`,并计算文件的md5生成[hash].css，自动更新index.html的样式引用
2. 将所有的js打包到一个`bundle.js`，并计算文件的md5生成[hash].js，自动更新到index.html的js引用
3. 将其他所有引用的图片资源等,assets目录下的，计算资源的md5，更新到index.html、main.css的引用中。

    > 其实也有对更新main.js中assets路径的资源字符串的引用更新的需求，此需求请自写loader，处理这个
4. 将更新后的index.html也输出

<!-- more -->

### 2. 尝试js为entry
以`main.js`为entry，把`index.html`和`main.css`作为一个引入项加入到`main.js`中，再使用`ExtractTextPlugin`去提取`index.html`和`main.css`，遇到的问题是：
> 使用`ExtractTextPlugin`去提取`index.html`，会无法满足要求1和要求2，更新`index.html`中的文件的md5路径。原因是这种设计和需求，引出了一个`index.html`和`main.js`循环依赖的问题，本身程序就无法处理

### 3. 实现
先看配置项：

    {
        entry: [
            './index.html'
        ],
        output: {
            filename: '[name].xxxjs',
            path: path.resolve(__dirname, 'dist'),
            publicPath: ENV_CONFIG.publicPath
        },
        module: {
            rules: [
                {
                    test: /index\.html$/,
                    use: [
                        {
                            loader: 'file-loader',
                            query: {
                                name: '[name].[ext]'
                            }
                        },
                        'extract-loader',
                        {
                            loader: 'html-loader',
                            query: {
                                attrs: [
                                    'img:data-src',
                                    'link:href',
                                    'script:src'
                                ],
                                minimize: true
                            }
                        },
                    ]
                },
                {
                    test: /assets/,
                    loader: 'file-loader',
                    query: {
                        name: '[hash].[ext]'
                    }
                },
                {
                    test: /\.less$/,
                    use: [
                        {
                            loader: 'file-loader',
                            query: {
                                name: '[hash].css'
                            }
                        },
                        'extract-loader',
                        'css-loader',
                        'less-loader'
                    ]
                },
                {
                    test: /\.js$/,
                    use: [
                        {
                            loader: 'file-loader',
                            options: {
                                name: '[hash].[ext]'
                            }
                        },
                        'uglify-loader',
                        {
                            loader: 'rollup-loader',
                            options: {
                                format: 'iife',
                                external: [],
                                plugins: [
                                    RollupPluginNodeResovle(),
                                    RollupPluginCommonjs({
                                        include: 'node_modules/**'
                                    }),
                                    RollupPluginBabel({
                                        exclude: 'node_modules/**',
                                        presets: 'es2015-rollup'
                                    })
                                ]
                            }
                        }
                    ]
                }
            ]
        },
        resolveLoader: {
            modules: ['lib', 'node_modules']
        }
    }

思路：

1. 如果以`index.html`为入口，那么就要使用`html-loader`去解析html，同时配合`extract-loader`解析`index.html`的`main.less`、`assets/*`去触发webpack对`less`、`assets/*`的配置module.loader，这样就会完成对less、assets的md5、引用更新的处理。(这是官方推荐）
2. 但是以相同的思路去处理`index.html[script:src]`（main.js）的时候，就会出错，无论如何也进不了`config#module.rule#/.js`的匹配项，这个就要通过看源码进行思考，见[`extract-loader/src/extractLoader#46`](https://github.com/peerigon/extract-loader/blob/master/src/extractLoader.js):

        // If the required file is a JS-file, we just evaluate it with node's require
        // This is necessary because of the css-loader which uses a helper module (css-base.js) to export stuff
        if (/\.js$/i.test(resourcePath)) {
            return require(absPath);
        }

    原来`extract-loader`在遇到js后缀的时候，会直接通过'node#require'进行执行，不走和`less`、`assets`同样的逻辑，为什么要这么做，解释里面有，上一步的`css-loader`会把:

        <link ref="stylesheet" href="main.less">

    转换成下面的结果，

        '<link ref="stylesheet" href="' + require('css-loader!main.less') + '">'

    可以看到`extract-loader`要保证`css-loader`可以正常执行，因此有了这个上面对js的限制。但是`css-loader`一般只会出现在`node_module`下，因此可以对`extract-loader`进行改造，把配置js的正则表达式改成如下，来保证我们自己项目里面的js走`config#module#rule`的匹配项见[pr](https://github.com/peerigon/extract-loader/pull/7)：

        if (/node_modules.*?\.js$/i.test(resourcePath)) {
            return require(absPath);
        }

    请自行改动extract-loader，放到自己项目根目录下lib下，（也可以是其他目录，通过config#resolveLoader来解决，优先使用本地的）;

3. 这样就解决了js不经过`config#moudle#rule#/.js`的匹配项，但是下面又发现，通过`extract-loader`引起`config#module#rule#/.js`的配置去解析js，如果只是单纯是使用webpack的默认行为，只使用`babel-loader`去解析js，就会得到最终输出的`bundle.js`仅仅只有`main.js`的内容，猜测可能和webpack处理了js的机制有关，毕竟webpack主要是处理js的。如果解决这种问题的，如果webpack自己的行为无法解决，那么我可以使用其他build-tools的loader来输出一个`js bundle`，越过webpack处理js的其他过程。比如我这里使用的`rollup-loader`，也幸亏有这样一个loader。

4. 整体的流程就这样走通了，每一个rule下面都使用`file-loader`来处理文件的输出和md5的计算。最终可以使用上面的这些配置来以html为入口，来打包js、less、assets、更改html对文件的引用。


### 4. 总结
就不做总结了。
