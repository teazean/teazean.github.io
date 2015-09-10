---
layout: post
title: html异步加载文本以及onload、onerror的触发
category: fe
tags: onload onerror 
---

##html异步加载文本以及onload、onerror的触发

最近项目开发中，需要一些异步加载文件的操作，简单的可以通过XMLHttpRequest对象来获取，但其中还涉及一些跨域的文件访问，因此设想使用`src`属性的跨域能力来加载文件，这里做一下对onload、onerror的统计总结。

###1. traceur、requirejs!text对异步加载文件的实现

+ 两者源码中都是通过XMLHttpRequest对象获取
+ 在traceur中，如果使用`<script type="module" src="***a.js">`这样的方式,则在traceur源码中，会创建一个`xhr`，再次请求这个`url:***a.js`，只不过这次的内容直接从缓存中获取。

问题所在：通过xhr来请求url，是不能跨域请求的，当***a.js在另外一个域名之下，通过xhr，请求会失败。

<!--break-->     

###2. 解决策略

我们只能通过，`src`属性来实现跨域请求，并且监听onload，onerror事件来判断加载进度、处理回调。
    
+ css：通过动态创建link标签，监听onload、onerror。
+ js：通过动态创建script标签，监听onload、onerror。
+ html/plain：通过动态创建iframe标签，监听onload、onerror，同时解决子域跨域问题。
    >做过尝试，动态创建 `type="text/template"`的script标签，可惜这种是无法触发onload、onerror事件的。

###3. onload、onerror触发的时机

>这里的加载仅仅指下载文档。

在一个页面中，凡事拥有`src`属性，均有onload、onerror事件，大致分为以下4类标签或变量中。

1. window全局标量、body标签
2. link标签
3. embedded element标签：img、iframe、embed、object、param、video、audio、track等
4. script标签

**window全局标量、body标签**

+ `window.onload`是指页面所有文档加载完成后触发的事件。  
+ `window.onerror`是指页面上js执行错误触发的事件。

>1. body标签上的onload、onerror、onblur、onfocus、onresize、onscroll均是对window对象上的暴露，其实还是window的方法。<http://www.w3.org/TR/html5/sections.html#the-body-element>
>2. 页面的普通标签，如div等是没有onload、onerror这种事件的。

**link标签**

+ 加载成功：onload。
+ 加载未成功：onerror。

**embedded elment**:一下测试只针对img标签

+ src为空：onerror
+ src不为空：
    + 加载不成功：onerror
    + 加载成功：
        + 格式不正确，解析失败：onerror
        + 解析成功：onload

实践+内容获取：<http://www.w3.org/TR/html5/embedded-content-0.html#the-track-element>

**script标签**

+ type为非script类型：结束，啥东西也没有。
+ type是script类型：
    + src为空：onerror
    + src不为空：
        + 加载不成功：onerror
        + 加载成功：
            + 格式不正确，解析失败：window.onerror -> onload
            + 解析成功：onload  

>对于script标签，即使'src="***a.html"',只要加载成功，然后把`***a.html`解析，先触发window.onerror，然后触发自身的onload。

实践+内容获取：<http://www.w3.org/TR/html5/scripting-1.html#the-script-element>

