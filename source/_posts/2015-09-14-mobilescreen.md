---
layout: post
title: 移动浏览器屏幕适配小结
category: mobile
tags: meta
keywords: 移动屏幕, 适配, requestFullscreen, 横竖屏切换, window.orientation
---

## 移动浏览器屏幕适配小结

移动浏览器市场混乱，存在各种各样的浏览器，并且实现都不一样，本文的内容将对移动浏览器屏幕适配进行小结

1. 各浏览器的meta
2. 部分浏览器如UC、QQ等隐藏地址栏
3. requestFullscreen
4. 横竖屏切换
5. 移动浏览器下的meta

<!-- more -->

### 各浏览器的meta

    <!-- 设置移动浏览器显示区域，minimal-ui是ios7.1-safari中新加的，让页面在加载时就隐藏地址栏和导航栏-->
    <meta name="viewport" content="width=device-width,initial-scale=1.0,user-scalable=0,minimal-ui">
    <!-- wap页面通常第一次加载都会缓存，然后每次刷新使用缓存而不是去重新向服务器发送请求。如果不希望使用缓存可以设置如下。-->
    <meta http-equiv="Cache-Control" content="no-cache"/>
    <!-- 隐藏苹果默认的工具栏和菜单栏 -->
    <meta name="apple-mobile-web-app-capable" content="yes" />
    <!-- 设置苹果工具栏颜色 -->
    <meta name="apple-mobile-web-app-status-bar-style" content="black" />
    <!-- 忽略页面中的数字识别为电话，忽略email识别 -->
    <meta name="format-detection" content="telphone=no, email=no" />
    <!-- 启用360浏览器的极速模式(webkit) -->
    <meta name="renderer" content="webkit">
    <!-- 针对手持设备优化，主要是针对一些老的不识别viewport的浏览器，比如黑莓 -->
    <meta name="HandheldFriendly" content="true">
    <!-- 微软的老式浏览器 -->
    <meta name="MobileOptimized" content="320">
    <!-- uc强制竖屏 -->
    <meta name="screen-orientation" content="portrait"><!-- landscape-->
    <!-- UC强制全屏 -->
    <meta name="full-screen" content="yes">
    <!-- UC应用模式 -->
    <meta name="browsermode" content="application">
    <!-- UC强制显示图片-->
    <meta name="imagemode" content="force"/>
    <!-- UC强制标准浏览器模式显示页面-->
    <meta name="layoutmode" content="standard" /><!-- fitscreen-->
    <!-- QQ强制竖屏 -->
    <meta name="x5-orientation" content="portrait"><!-- landscape-->
    <!-- QQ强制全屏 -->
    <meta name="x5-fullscreen" content="true">
    <!-- QQ应用模式 -->
    <meta name="x5-page-mode" content="app">
    <!-- windows phone 点击无高光 -->
    <meta name="msapplication-tap-highlight" content="no">

>uc强制竖屏在ios下失效。
>实际中根据自己的应用进行一些选择性的设置。
>更多的其他方面的uc、qq私有meta移步至<http://devework.com/uc-qq-brower-meta.html>

### 部分浏览器如UC、QQ等隐藏地址栏

代码：来源<https://remysharp.com/2010/08/05/doing-it-right-skipping-the-iphone-url-bar>

>核心是scrollTo(0,1)，在页面开始加载的时候scrollTo(0,0)也能达到同样的效果。但是在横竖屏切换时，scrollTo(0,0)地址栏会显示出来，并且遮盖页面，而scrollTo(0,1)则能达到预想的效果。

    /mobile/i.test(navigator.userAgent) && !location.hash && setTimeout(function() {
      window.scrollTo(0, 1);
    }, 100);​//具体时间根据项目来定。


### requestFullscreen()

全屏api，形如按F11，可惜移动端并不支持<http://caniuse.com/#feat=fullscreen>

### 横竖屏切换：screen orientation

>汗，标准在不断进化之中，最新版的移步至：<http://www.w3.org/TR/screen-orientation/>

目前我们使用：window.orientation判断屏幕的方向，以及orientationchange事件来捕获屏幕转屏事件（同时也触发onresize事件）。

1. portrait：竖屏`window.orientation===0 || window.orientation===180`
2. landscape：横屏`window.orientation===90 || window.orientation===-90`

### 移动浏览器下的meta

1. format-detection：可以控制页面里的电话、邮件、地址等自动识别。ios浏览器下如果自动识别会用`a`包裹识别的字串，会影响样式。

        <meta name="format-detection" content="telephone=no"/>
        <meta name="format-detection" content="email=no"/>
        <meta name="format-detection" content="adress=no"/>
        <meta name="format-detection" content="telephone=no,email=no,adress=no"/>

2. ios对web app的支持：

        <!--启动对webapp的支持-->
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <!--改变web app下顶部状态栏的颜色-->
        <meta name="apple-mobile-web-app-status-bar-style" content="black" />
        <!--设置webApp的icon。有规格大小设定-->
        <link rel="apple-touch-icon-precomposed" href="iphone_logo.png" />
        <!--设置webApp的启动图片，有规格大事设定。-->
        <link rel="apple-touch-startup-image" href="logo_startup.png" />
