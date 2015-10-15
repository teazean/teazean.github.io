---
layout: post
title: 记录：奇妙的ISSUE
class: mylbs
---

##ISSUE记录

####nodejs 安装png模块等部分C++模块   
1. error：calling a protected constructor of class 'v8::HandleScope'       
2. 解决方案：降级nodejs到v0.10.35.

####iphone上关于动态添加animation，redering index混乱
1. 描述：在验证码遮罩层显示出来以后，动态为遮罩层之下的一个元素添加animation，动画会显示到遮罩层之上。
2. 解决方案：未解决

####在js中 "5" > "10" // true

####在移动端浏览器上，inline元素的animation会无效。