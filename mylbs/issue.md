---
layout: post
title: 奇妙的ISSUE记录
class: mylbs
---

##ISSUE记录

+ **nodejs 安装png模块等部分C++模块**   
>error: calling a protected constructor of class 'v8::HandleScope' 
>解决方案：降级nodejs到v0.10.35.

+ **iphone上关于绝对定位元素进行z轴相关的变换，z-index失效**    
><http://stackoverflow.com/questions/5472802/css-z-index-lost-after-webkit-transform-translate3d>
>解决方案:-webkit-transform: translate3d(0,0,0);

