---
layout: post
title: reflow、repaint深入理解
category: fe
tags: reflow repaint
keywords: reflow, repaint, render tree, cssom
---

## 深入理解reflow、repaint
1. 相关文章
2. 浏览器渲染页面的过程
3. 浏览器维护Render Tree：回流(reflow、relayout)与重绘(repaint)
4. 聪明的浏览器
5. 访问某些属性也会引起回流

### 1. 相关文章：
1. 一篇很好的文章：<http://www.css88.com/archives/4996>
2. Google Develops上一篇layout、paint的文章：<https://developers.google.com/web/fundamentals/performance/critical-rendering-path/render-tree-construction>
3. webkit的实现：<http://www.webkit.org/projects/layout/>

### 2. 浏览器渲染页面的过程
<img src="/images/reflowrepaint/render-tree-construction.png">

1. 第一步：加载页面，构建dom树；同时加载css style，构建CSSOM:css样式结构模型
2. 第二步：合并dom、cssom，构建Render tree（呈现树），Render tree中只包含dom中可见元素，非可见元素包含`display:none`，`header`，`template`等。render tree中的每一个节点都是一个box model。Render Tree包含dom树上每一个可见的节点以及每一个节点的css样式。
3. 第三步：layout：当render tree构建完成，浏览器会计算每一个render tree节点的大小和布局（定位）。
4. 第四步：paint: 最后一步，将layout之后最终的render tree渲染到屏幕上。

<!-- more -->

### 3. 浏览器维护Render Tree：回流(reflow、relayout)与重绘(repaint)
+ repaint：render tree的一些元素需要更新属性时，这些属性是外观、风格，并不会影响布局，如color，被称为重绘。
+ reflow：render的一些元素因为大小、布局、隐藏等，需要重新构建`全部或部分render tree`，重新计算`全部或部分render tree`的大小、布局，这个过程被称为回流。完成回流后，页面会重新渲染被影响的`全部或部分render tree`到屏幕上，即重绘。
+ 页面元素属性变化引起的回流必定引起重绘、但重绘不一定引起回流。
	>注意在最后一节会讲到：访问元素的一些属性如clientHeight也会引起页面的layout。
+ 回流是要比重绘更耗时的。

下面一段代码展示回流与重绘：

    var s = document.body.style;
    s.padding = "2px"; // 回流+重绘
    s.border = "1px solid red"; // 再一次 回流+重绘
    s.color = "blue"; // 再一次重绘
    s.backgroundColor = "#ccc"; // 再一次 重绘
    s.fontSize = "14px"; // 再一次 回流+重绘
    document.body.appendChild(document.createTextNode('abc!'));// 添加node，再一次 回流+重绘

### 4. 聪明的浏览器
浏览器会维护一个队列，把所有引起回流、重绘的操作堆起来，当达到一定数量、时间，浏览器会flush整个队列，进行一次批处理，这样多次回流、重绘就会变成一次回流、重绘。

### 5. 访问某些属性也会引起回流
<http://webcache.googleusercontent.com/search?q=cache:DUblmOr9XskJ:gent.ilcore.com/2011/03/how-not-to-trigger-layout-in-webkit.html+&cd=1&hl=en&ct=clnk&gl=hk>

当我们访问一个element的clientHeight时，浏览器会先去从render tree中计算出clientHeight的值，然后返回。

以下属性或者方法的访问会引起layout。
##### Element
clientHeight, clientLeft, clientTop, clientWidth, focus(), getBoundingClientRect(), getClientRects(), innerText, offsetHeight, offsetLeft, offsetParent, offsetTop, offsetWidth, outerText, scrollByLines(), scrollByPages(), scrollHeight, scrollIntoView(), scrollIntoViewIfNeeded(), scrollLeft, scrollTop, scrollWidth
#### Frame, Image
height, width
#### Range
getBoundingClientRect(), getClientRects()
#### SVGLocatable
computeCTM(), getBBox()
#### SVGTextContent
getCharNumAtPosition(), getComputedTextLength(), getEndPositionOfChar(), getExtentOfChar(), getNumberOfChars(), getRotationOfChar(), getStartPositionOfChar(), getSubStringLength(), selectSubString()
#### SVGUse
instanceRoot
#### window
getComputedStyle(), scrollBy(), scrollTo(), scrollX, scrollY, webkitConvertPointFromNodeToPage(), webkitConvertPointFromPageToNode()
