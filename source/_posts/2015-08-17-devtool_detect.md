---
layout: post
title: 监测Developer Tool是否打开
categories:
    - web
tags:
    - chrome
---

### 监测Developer Tool是否打开

#### 综述

对开发者工具是否打开的判断，大部分是分为两种，一是利用开发者工具对window的修改，或者本身的特性；二是对开发者工具对窗口的影响。

一些通常的做法是：

+ window.outerHeight 与 window.innerHeight，window.outerWidth 与 window.innerWidth进行比较，利用开发者工具在页面内占有一定高度和宽度，这种只能判断开发者工具在页面内。
+ 利用console在开发者工具打开或关闭两种状态下执行的时间差。

<!-- more -->

代码1：

    var date = new Date().getTime();
    for(var i =0 ;i<100;i++){
        console.log(1);
        console.clear();
    }
    var date2 = new Date().getTime();
    document.querySelector("#log").innerHTML = date2 - date;

代码1中的代码在开发者工具打开的情况下要比不打开的情况下多耗费时间，经测试在mac chrome下，未打开developer tool，结果为6；打开developer tool，结果为27。


#### firefox firebug

firebug在firefox中的判断经历了许多，如window.console.firebug 、window.Firebug等。这些版本的firebug均会修改window对象。但最新版的firebug不在修改window对象。具体的监测方案也在探索。

#### chrome developer tool

在chrome下有一个特性，When printing “Element” Chrome developer tools will get its id。

>参照：[Find out whether Chrome console is open?](http://stackoverflow.com/questions/7798748/find-out-whether-chrome-console-is-open/30638226#30638226)

代码2：

    var checkStatus;
    var element = new Image();
    // var element = document.createElement('any');
    element.__defineGetter__('id', function() {
        checkStatus = 'on';
    });

    setInterval(function() {
        checkStatus = 'off';
        console.log(element);
        console.clear();
        document.querySelector('#devtool-status').innerHTML = checkStatus;
    }, 1000)

这里利用了`getter` 和 `setter` , 当developer tools打印element的时候，会获取其`id`属性 ，这样就走到我们写的getter中，将状态设置为`on`，即可监测chrome developer tools是否打开。


