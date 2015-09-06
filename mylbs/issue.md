---
layout: post
title: 奇妙的ISSUE记录
class: mylbs
---

##ISSUE记录

+ **nodejs 安装png模块等部分C++模块**   
>error：calling a protected constructor of class 'v8::HandleScope' 
>解决方案：降级nodejs到v0.10.35.

+ **iphone上关于动态添加animation，redering index混乱**    
>描述：在验证码遮罩层显示出来以后，动态为遮罩层之下的一个元素添加animation，动画会显示到遮罩层之上。
>解决方案：未解决
