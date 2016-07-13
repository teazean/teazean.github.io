---
layout: post
title: sourcemap
category: sourcemap
---

##目录
1. vlq和Base64 vlq
2. sourcemap
3. `//# sourceMappingURL`和`//# sourceUrl`
4. sourcemap in webpack

<!--break-->
###before
webkit-sourcemap初步介绍：<http://www.html5rocks.com/en/tutorials/developertools/sourcemaps/#toc-sourceurl>，介绍了sourcemap的基本实现，包括sourcemap的格式、编码以及sourceMapURL、sourceURL、和profiles里面的displayName（最新版chrome好像已经不支持了。）


###1. vlq与base64 vlq：variable length quantity
1. <https://en.wikipedia.org/wiki/Variable-length_quantity>
2. <https://blogs.msdn.microsoft.com/davidni/2016/03/14/source-maps-under-the-hood-vlq-base64-and-yoda/>
3. <http://blog.allenm.me/2012/12/base64-vlq-encoding/>
4. 在线base64vlq：<http://murzwin.com/base64vlq.html>

上面几篇文章讲的比较详细，总结一下：
1. vlq是用8位字节码来表示一个数字的。base64vlq是使用base64原有的6bit来表示数字。
2. 以base64vlq为例，每一位字节的二进制第一位表示是否continue，如果1表示下一位字节和当前字节是表示一个数字，如果是0表示该一个字节就可表示一个数字；表示一个数字的一组字节中第一个字节的二进制最后一位表示正负，1表示在负，0表示正；

以456为例展示一下从数字转换为base64vlq的过程：

1. 456的二进制为：111001000
2. 正数在最后一个补0，变为1110010000
3. 5位分组，分为11100 10000
4. 从低位到高位转换：1表示继续，0表示结束：结果为110000 111100
5. 分别对应base64为W和C
6. 结果就是WC

###2. sourcemap使用base64vql进行位置定位
在sourcemap文件里：

		{
			version : 3, // soucemap的版本
			file: "out.js", // 对应的输出文件
			sourceRoot : "",
			sources: ["foo.js", "bar.js"], // 对应的源文件
			names: ["src", "maps", "are", "fun"], // 原来的变量标识
			mappings: "AAgBC,SAAQ,CAAEA" // 位置对应表
		}

其中mappings用`;`表示分行，用`,`表示一个位置，一个位置的格式分5个:

	　　- 第一位，表示这个位置在（转换后的代码的）的第几列。
	　　- 第二位，表示这个位置属于sources属性中的哪一个文件。
	　　- 第三位，表示这个位置属于转换前代码的第几行。
	　　- 第四位，表示这个位置属于转换前代码的第几列。
	　　- 第五位，表示这个位置属于names属性中的哪一个变量。（非必须）



###3. `//# sourceMappingURL`和`//# sourceUrl`
1. `//# sourceMappingURL=/path/to/file.js.map`或者`//# sourceMappingURL=dataURL:base64`使用在文件的最后-行，指定map文件，可以使url，也可以是dataURL；
2. `//# sourceUrl=webpack:///./components/common-header.vue`是用在eval语句中的最后，当代码是在eval里执行的时候，可以在最后加上sourceURL，对eval里面的代码命名，然后我们就可以在dev-tools直接对命名后的eval进行调试。如[demo](https://www.thecssninja.com/demo/source_mapping/compile.html)

###4. sourcemap in webpack

在webpack sourcemap里面有很多种配置，具体可以看文档。这里介绍一下用过的几种：

1. eval：loader转译之后代码都在eval里面执行，在eval后面添加sourceURL命名eval，并且调试对应的代码都是loader编译之后的代码。
2. sourc-map:loader转译之后代码都在__webpack_require__闭包里面执行，非eval，在最后添加sourceMapURL，对应的是源文件（里面的mapping应该是webpack和loader的结合）。demo中使用的是webpack server，没在本地库见到生成的commons.js和commons.js.map，应该都在webpack server代理的内存里。(通过webpack命令跑出来的是有commons.js和commons.js.map)。
3. eval-source-map:loader转译之后的代码都在eval里面执行，在eval代码里最后面使用sourceMappingURL=dataURL:base64，对应的是源文件。