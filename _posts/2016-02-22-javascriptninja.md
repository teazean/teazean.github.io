---
layout: post
title: javascript、css阅读摘要
category: javascript css
tags: javascript css
---

###javascript忍者秘籍
1. 图形用户界面（GUI）的桌面编程：创建用户界面、进入轮询等待事件触发、调用事件处理程序，浏览器编程没有什么不同，唯一的不同就是，代码不负责事件轮询和事件派发，而是浏览器帮我们处理。
2. 如下代码，可以给内联函数命名，以提升威力。也可以使用`arguments.callee`属性来访问函数本身，但es5严格模式下禁止使用callee。

	
	var ninja = {
		chirp: function sigal(n) {
			return n > 1 ? signal(n-1) + "-chirp" : "chirp"; 
		}
	}

3. 在所有语句结束，使用分号是一个很好的做法，尤其是在变量赋值之后。匿名函数也不例外。压缩代码后，分号的妥善放置会为压缩技术提供更大的灵活。
4. 正则表达式，反向引用：举例来说：/^([dtn])a\1/可以任意一个以"d"、"t"或者"n"开头，且后面跟着一个字符，并且再后面跟着的是和第一个捕获相同字符的字符串。像匹配`<strong>whatever</strong>`这样的tag就使用反向引用。
5. 正则表达式，被动子表达式：反向引用中，被捕获的是`(*)`中间的，如果想让`(*)`不被捕获，可以在`(?:*)`的前面加`?:`，告诉正则表达式该括号不被捕获，被称为被动子表达式。
6. trim方法：Faster JavaScript Trim:<http://blog.stevenlevithan.com/archives/faster-trim-javascript>
7. 执行线程中的定时器执行(见javascript ninja8.1.2节)：
	1.javacript引擎是单线程执行，异步事件必须要排队等待才能执行；
	2.如果无法立即执行定时器，该定时器会被推迟到下一个可用的执行时间点上；
	3.如果一直被推迟，到最好Interval间隔定时器可能会无延迟执行，并且同一个interval处理程序的多个实例不能同时进行排队（即当一个interver的实例要排队时，如果已经有一个该interval的实例正在排序，则放弃这次的interval实例）。
8. eval的执行均是全局环境。
9. P9.3：js运行时求值的场景，如：
	1. JSON转换
	2. 在名空间内移动定义代码。如动态的引入命名空间的其他变量。
	3. javascript代码的最小化及混淆操作
	4. 动态代码重写和注入：利用toString()反编译现有的javascript函数，然后就可以提取内容，创建新的函数。
	5. 甚至去创建元语言processingjs、object-j、react
10. W3C模型是将两者进行中和，在W3C模型中，任何事件发生时，先从顶层开始进行事件捕获，直到事件触发到达了事件源元素。然后，再从事件源往上进行事件冒泡，直到到达document。
11. 在IE中的DOM元素上绑定的函数如果在某个元素节点上有闭包关联的话，离开页面时会导致内存回收失败。
12. 可以使用`document.evaluate`来利用XPATH查询dom元素，并且通过id或者简单的标签查找元素的速度永远比纯DOM快。但XPATH方式查询一般是主要供开发者使用。

###css揭秘
1. currentColor属性自动获取当前字体颜色的值。
2. 完美计算出来的设计有时候在视觉上并不一定就是完美的。如完美垂直居中的东西在视觉上会靠下；再如相同宽高的正方形、圆形，看起来圆形会小一些（这也是为什么字体设计中，圆形字体如0会比正方形自己稍微放大一些。）
3. 在css的一些简写属性如background，书写时可能会有一些歧义的值，可以见`/`作为分隔符。如`background: url(br.png) no-repeat top right / 2em 2em`.