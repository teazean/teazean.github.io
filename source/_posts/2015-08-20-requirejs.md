---
layout: post
title: requirejs 源码与架构分析
category: web
tags: requirejs amd
---

## requirejs 源码与架构分析

requirejs是目前前端模块管理应用最广泛的架构，它的思想是前段模块化编程不可缺失的。

通常来说搞懂一个项目的数据结构，基本上就把这个项目的基本逻辑搞清楚了。这里先介绍数据结构，然后再做分析。

1. 综述
2. 数据结构
3. require.js的关键函数
4. require.js加载执行与入口函数流程：define、require
5. 使用

### 1. 综述

requirejs总是通过script标签来加载执行js。也就是说：所有的js均在全局模式下执行，对于支持requirejs的模块，变量通过`define`函数导出。不支持requirejs的模块，总是会输出undefined，但可以通过全局变量来使用，如：jQuery,nativeAppAdapter等，这些也是可以通过requirejs的shim配置来管理。

<!-- more -->

requirejs嵌套比较深，这篇文章主要讲述主干的流程。

> name与ModuleName的区别。requirejs中name是指的是define(name,deps)中明确确定的name，而ModuleName是指当js文件的文件模块名，当引入的js`没有define模块`或者`define(deps)匿名模块`，requirejs会默认name=moduleName。ModuleName只和文件名相关，如果引入`js/jquery-1.11.3.js`和`js/22/jquery-1.11.3.js`两个文件，最终只会有一个`jquery-1.11.3.js`的js文件被加载，且该模块的`name=moduleName=jquery-1.11.3`。(只和文件名有关，文件名！文件名！文件名！)

> 在所有的amd的实现中，包括requirejs，都支持package的配置，即一个package里面的文件相对url的使用，将相对url转化成实际可被require的路径地址。在requirejs中，每一个Mudule被依赖的话，在创建该ModuleMap的时候，会传入依赖该Module的ParentModuleMap，以方便做相对路径转化。

>在标准的amd规范中没有定义factory的执行时机，在requirejs中factory在module的所有依赖被加载完成之后立刻执行factory，将生成的对象赋值给module.exports，以后就复用这个对象。而esl中factory是延后执行的，esl被依赖的时候，factory才会执行生成对象，并被以后的复用。

### 2. 数据结构

>这里讨论的所有数据结构均是requirejs封装在自己内部的，比如：require全局变量是指require模块内部的全局变量
>requirejs数据结构主要分为三种：requirejs全局变量、context上下文、Module模块

#### requirejs全局变量

>requirejs全局变量主要放置一些全局配置、临时数据等。主要有以下三种：

* contexts：存放requirejs管理依赖、模块变量真正的地方，即context上下文，默认放至于contexts["_"]下。
* cfg：require.config({})配置对象传入的配置对象
* globalDefQueue：存储模块的临时队列

    > 只有一个地方用到globalDefQueue,那就是在调用define(name, deps, callback)的时候，把[name, deps, callback]push到globalDefQueue中。在script加载完成之后，调用`completeload`函数，清空globalDefQueue，详情查看`completeload`函数的介绍。

#### Module模块

这里有一些说明：

* Module的状态：这些状态并不是互斥的。没种状态只表示一种设置完成。
<img src="/images/requirejs/module.png">
    + inited：表明Module是否已经初始化，设置依赖、回调等。设置inited=true之后是不会在执行fetch()的。
    + enabled：enabled状态，这种状态表示Module是被激活状态。
    + fetched：标志Module的js是否被加载，在check()函数中检查，如果没有加载，将执行module.fetch()函数。
    + defined：Module已经被定义完成，进入defined队列，`defined[mod.map.id] = mod.exports`

* 创建Module的三种途径

    + 匿名Module:执行一次require()，便创建一次匿名Module，`enabled: true`,在调用mod.init()的时候直接调用enable().

    >require -> context.require -> context.localRequire(deps, callback, errback)

        context.nextTick(function () {
            //Some defines could have been added since the
            //require call, collect them.
            intakeDefines();

            requireMod = getModule(makeModuleMap(null, relMap));//创建匿名Module

            //Store if map config should be applied to this require
            //call for dependencies.
            requireMod.skipMap = options.skipMap;

            requireMod.init(deps, callback, errback, {
                enabled: true
            });

            checkLoaded();
        });

    + define(name,deps,callback),如果在defined队列中不存在，则从registry取出或者在registry中创建一个新的Module,此时是知道它所有的依赖deps以及callback，可以并且调用init()方法。

    + 当一个Module调用enable()方法的时候，它的所有依赖deps也将被enable()，对于该依赖depMod

        1. 若果defined队列中存在depMod，直接获取结果；
        2. 如果defined队列中不存在，但在registry队列存在，这种模式就是通过`define(name,deps,callback)`,定义出来的，inited = true;
        3. 如果defined队列不存在，并且registry队列也不存在，在registry中新建depModule，并且直接调用enable()方法。

            >- deps Module,这里的deps有两种来源：`define(name,deps,callback)`和`require(deps,callback)`。如果没有特殊配置paths，默认的deps均是相对于baseUrl需找js文件。这里将为每一个dependency创建一个`name=dependecy`的Module,如`deps=['../jquery-1.12.1']`,将创建一个`name="jquery-1.12.1"`的Module。变量ModuleName=deps[i];
            >- 第三种模式创建的deps Module，因为deps[i].js这个文件还没加载，无法得知它的依赖，以及callback，所以第一次尝试调用enable()->check()，在check()中，监测到`inited = undefined`, 执行fetch()加载js文件,文件加载成功之后，在completeLoad()中，就可以知晓该Module的deps和callback，调用init()(设置`inited = true`)->check()。在在最终check()方法里面，会将Module的factory执行，产出最终的结果放到mod.exports里面。

* Module主要方法与变量

    + depCount：deps的计数，每当一个deps[i]的defined触发，将结果存入到depExports中，并且depCount--;当depCount==0的时候触发本省的defined事件.
    + depExports  = []
    + map = {id:'jquery'...}：Module的一些属性，如id等
    + init(depMaps, factory, errback, options)：设置Module的依赖，以及回调（factory）
    + fetch()：创建script标签，加载js，注册completeLoad事件的封装

        >module.fetch()->module.load()->context.load()->req.load()，req.load()完成创建script标签，并注册`onload=context.completeLoad`.
    + enable()：当调用enable(),也就意味着我们需要去加载这个模块，包括加载它的依赖。
    + check()：检查当前Module的状态，1. 是否加载；2. 检查depCount值，若为0，返回exports，并触发自身的defined事件。
    + on(name,cb)：供其他Module监听自己的状态，常用的defined 和error
    + emit(name,evt)：触发某一个状态，触发observer的callback.

    > Module之间依赖关系是一种订阅/发布的模式。每一个Module监听它的所以依赖的defined事件以及error事件。


#### context上下文

这里主要介绍一下一些主要数据结构。

* registry = {}：存放的所有是Module对象，当Module对象被enable之后，会加入enalbedRegistry中。如果`checkloaded`执行成功，并且该Module进入到defined状态，该Module会将exports结果放到defined对象中，同时从registry、enalbedRegistry移除。
* enabledRegistry = {}：当一个Module被enable后，会加入enabledRegistry中。

    >`checkloaded`函数会不断的检查enabledRegistry队列，在上面说到`init = undefined`的Module均是正在加载中的。如果发生超时之后，init还未被设置为true（在completeLoad()中设置）, 则就可以throw err了。

* defQueue = []：只是起到一个中转globalDefQueue的中转站。
* defined = {}：存放所有的Module exports结果的对象，`defined[mod.map.id] = mod.exports`，这是一种key-vaule的形式。
* urlFetched = {}：存放所有已成功获取的url的对象。

    >- 在defined队列中只存在两种：`name=moduleName`的Module和`define(name,deps,callback)`定义出来的`name=name`的Module。(moduleName是指deps=["../jquery-1.12.3","zepto"]中deps[i]指定的模块名).
    >- 在registry队列比defined多了一种匿名Module。所有的Module都是从registry移到defined队列中的。

### 3. require.js关键函数

关键函数：completeLoad

    completeLoad: function (moduleName) {
        /***/
        takeGlobalQueue();

        while (defQueue.length) {
            args = defQueue.shift();
            /***/
            callGetModule(args);
        }
        context.defQueueMap = {};

        mod = getOwn(registry, moduleName);

        if (!found && !hasProp(defined, moduleName) && mod && !mod.inited) {
            /***/
            callGetModule([moduleName, (shim.deps || []), shim.exportsFn]);
        }
        checkLoaded();
    }

> completeLoad函数干了两件事：

> 1. 如果当前js文件调用了define(name,deps,callback)，在registry队列中取出或者新建`id=name`的Module，并调用init(deps,callback);
> 2. 如果在当前js文件中没有define(name=moduleName,deps,callback),那就模拟一次define(name=moduleName,deps,callback)。


关键函数：checkLoaded()

    function checkLoaded() {
        /***/
        //Figure out the state of all the modules.
        eachProp(enabledRegistry, function (mod) {
            var map = mod.map,
                modId = map.id;

            //Skip things that are not enabled or in error state.
            if (!mod.enabled) { return;}

            if (!map.isDefine) { reqCalls.push(mod);}

            if (!mod.error) {
                //If the module should be executed, and it has not
                //been inited and time is up, remember it.
                if (!mod.inited && expired) {
                    if (hasPathFallback(modId)) {
                        usingPathFallback = true;
                        stillLoading = true;
                    } else {
                        noLoads.push(modId);
                        removeScript(modId);
                    }
                }
                /***/
            }
        });

        if (expired && noLoads.length) {
            //If wait time expired, throw error of unloaded modules.
            err = makeError('timeout', 'Load timeout for modules: ' + noLoads, null, noLoads);
            err.contextName = context.contextName;
            return onError(err);
        }

        if ((!expired || usingPathFallback) && stillLoading) {
            //Something is still waiting to load. Wait for it, but only
            //if a timeout is not already in effect.
            if ((isBrowser || isWebWorker) && !checkLoadedTimeoutId) {
                checkLoadedTimeoutId = setTimeout(function () {
                    checkLoadedTimeoutId = 0;
                    checkLoaded();
                }, 50);
            }
        }
    }


> checkLoaded函数不断检查enabledRegistry队列，在上面提到，enabledRegistry队列中，`inited=undefined`的Module是正在被加载的js模块，如果超时后，依然有`inited=undefined`的Module，将其加入到noLoads对象中，并且报错throw err；


### 4. require.js加载执行与入口函数流程：define、require

#### require.js加载执行

require.js执行过程中调用了两次：

1. req({}):创建contexts["_"]执行上下文
2. req(cfg):在执行这行代码之前，之前已将data-main指定的入口函数添加到cfg.deps中，会执行一次`localRequire(cfg.deps,callback)`;具体执行见下面流程图。

### require.js入口函数：require

先贴一张图：
<img src="/images/requirejs/require.png">


### require.js入口函数：define

对于define(name,deps,callback);

1. globalDefQueue.push([name,deps,callback]);
2. 等待js加载完成调用completeLoad()(详情见上);

### 5. 使用

#### 定义模块

>AMD推崇：依赖前置，提前执行依赖。CMD推崇：依赖就近，哪里用到在哪里执行。

定义模块的AMD写法：

    define("c", ["a","b"], function() {
        return c;
    });

> define(name,deps,callback);对应参数为模块名、依赖、exports函数（必须有返回值）。有意思的是当`typeof callback === "object"`的时候，该模块的输出就直接是该Object。这样是可以解释requirejs jsonp的调用。

定义模块的CMD写法：

    define(function(require, exports, module){
        var a = require('a');
        //a.dosomething();
        var b = require('b');
        //b.dosomething();
        module.exports = {myModule: 1};
    })

> CMD写法，在`define(callback)`,如果只有callback，define函数会使用`Function.prototype.toString()`先遍历一遍`callback`,获取其中的`require()`,把依赖push到deps中。实质上还是一种依赖前置。<http://requirejs.org/docs/whyamd.html#sugar>
> 在define中，如果监测到 `isArray(deps)===fasle`，且callback为函数，则为deps赋值为['require','exports','module'];name没定义即设置为moduleName

> 如果define(deps,callback)，采用匿名，那么默认会定义为`name=moduleName`，并且一般这种js都是作为依赖被加载，那么callback会立即执行，返回模块的结果。很多项目中一种使用这种方式，这样可以做到定义和文件名相关的模块的同时callback代码执行。


#### 引入模块

    require(["jquery"], function($) {
        //do something with $
    });


#### 配置

requirejs的配置项有很多，这里介绍几种常用的。细节可以看：<http://requirejs.org/docs/api.html#config>和<https://segmentfault.com/a/1190000002401665>,<https://github.com/amdjs/amdjs-api/wiki/Common-Config>

注意：paths的配置可以执向一个文件也可以是一个路径的简写

    require.config({
        //设置查找一个模块的基础路径，默认是data-main指定的。
        baseUrl: "/another/path",
        //设置模块对应路径
        paths: {
            "some": "some/v1.0"
        },
        //requirejs对不支持AMD规范的模块的管理配置
        shim: {
            'backbone': {
                //These script dependencies should be loaded before loading
                //backbone.js
                deps: ['underscore', 'jquery'],
                //Once loaded, use the global 'Backbone' as the
                //module value.
                exports: 'Backbone'
            },
            'underscore': {
                exports: '_'
            },
            'foo': {
                deps: ['bar'],
                exports: 'Foo',
                init: function (bar) {
                    return this.Foo.noConflict();
                }
            }
        }
    });

>require.config(cfg) => require(cfg)，内容的实现就是调用一次require函数。

### 插件

requirejs有很多插件，如domready、text、jsonp等，见<https://github.com/jrburke/requirejs/wiki/Plugins>

下面是text.js插件的使用:

    require(["some/module", "text!some/module.html", "text!some/module.css"],
        function(module, html, css) {

        }
    );

>对于"text!some/module.html",requirejs会判断moduleName中否包含"!",如果包含，"!"之前的就是插件，会去请求text.js插件加载'some/modudle.html'。(在fetch()中有实现；text.js放至于baseUrl下。)


### requirejs jsonp

    require(["http://map.baidu.com/event/interfaces/pf/info?callback=define"], function(data){
        console.log(data);
    });

    //结果:
    {
        "errno": 0,
        "errmsg": "Success",
        "data": {}
    }

>解释：只有当jsonp返回的data是对象的时候，才能有requirejs的调用。
>这种实现逻辑是:URL返回的结果是define(data),（经过层层逻辑），会创建一个key为URL，exports为data的Module。这样该URL模块的输出为data，作为参数传入到require(deps,callback)中。















