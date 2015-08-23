---
layout: post
title: 学习笔记
class: mylbs
---

##学习笔记

+ **js监听css animaiton、transition结束事件**    
>可以监听animationend、transitionend事件。但在移动端下测试，监听不到这两个事件.

+ **当请求是一个文件夹时http://127.0.0.1:8080/zt,这种请求方式会请求两次，发生重定向**

+ **BFC:block formatting context**          
>1. 内部的Box会在垂直方向，一个接一个地放置。
>2. Box垂直方向的距离由margin决定。属于同一个BFC的两个相邻Box的margin会发生重叠
>3. 每个元素的margin box的左边， 与包含块border box的左边相接触(对于从左往右的格式化，否则相反)。即使存在浮动也是如此。
>4. BFC的区域不会与float box重叠。
>5. BFC就是页面上的一个隔离的独立容器，容器里面的子元素不会影响到外面的元素。反之也如此。(其他几条都在体现这个)
>6. 计算BFC的高度时，浮动元素也参与计算

+ **Everything in UNIX is a file.**     
>1. 网络连接，如socket等
>2. 输入输入，如设备
>3. 管道
>4. 终端
>5. 实质文件
>6. 、、、

+ **正则表达式三种匹配模式**   
>X?、X*、X+、X{m，n}    

    >1. 最大匹配（贪婪型，占有型）
    >2. 最小匹配

+ **Viewport**  
[https://developer.apple.com/library/ios/documentation/AppleApplications/Reference/SafariWebContent/UsingtheViewport/UsingtheViewport.html]()   

    >1. viewport是移动浏览器的页面的可视区域，如果不设置viewport，移动浏览器会默认以宽度980px加载页面，然后缩放适应屏幕。
    >2. 可以设置viewport的width为固定像素，但一般设置为device-width（特殊值）。

+ **document.DOMContentLoaded vs window.onload**     
>1. DOMContentLoaded实在dom树构建完成后就执行。
>2. 而onload要等到页面所有的dom树、样式表、脚本、图片、flash等都加在完成才执行。

+ **visibility:hidden vs display:none**     
>1. visibility:hidden 占据空间位置；display:none不占据空间位置，显示时可能会发生repaint
>2. visibility:hidden情况下，animation在隐藏状态下就已经触发，而display:none是不会触发animaation的，除非display:block;

+ **webkitAnimationEnd、webkitTransitionEnd**    
>在移动端下，动画、过渡效果结束要监测webkitAnimationEnd、webkitTransitionEnd事件，监测animationEnd、transitionEnd是无效的。

+ **script load 与 error**    
>script load事件是指script`完全加载完成并执行完之后`(执行完之后)触发的事件，兼容放面有onreadystatechange事件。
>script error事件是指script执行错误的事件。

+ **img load 与 error**     
>img load事件也是指img完全加载完成、显示完之后触发的事件。
>img error事件是指加载img出错的事件。

+ **script标签动态添加，哪一个先加载完先执行哪一个**
