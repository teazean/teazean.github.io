---
layout: post
title: Chrome Extension Development-LastingMemory
category: fe
tags: toast chrome
keywords: chrome插件开发
---
## chrome插件-LastingMemory

最近一段时间一直有一个idea，就是开发一个chrome插件以帮助自己时常记忆一下零碎的知识点。主要实现的界面如下：

<img src="/images/lastingmemory/jt.png" class="full">

功能介绍：因为平时上网使用浏览器比较多，就是想开发一个应用，能够在自己上网娱乐的时候能够弹出一个框，提示一下自己某些知识点，但又不影响娱乐活动，于是就想到了Android上的`Toast`提示框，并且做了一些改进，鼠标点击`Toast`弹框会隐藏掉。

<!-- more -->

### manifest.json

```json
{
  "name": "Lasting Memory",
  "description": "Lasting Memory",
  "version": "1.0",
  "icons":{
    "16":"icon_16.png",
    "32":"icon_32.png",
    "48":"icon_48.png",
    "64":"icon_64.png",
    "128":"icon_128.png"
  },
  "manifest_version": 2,
  "permissions": ["tabs","*://*/*","storage"],
  "background": {
    "scripts": ["jquery.js","background.js"],
    "persistent": true
  },
  "browser_action": {
    "Lasting Memory" : "icon.png",
    "default_title": "Lasting Memory"
  }
}
```

1. backgound:{}会在浏览器启动时执行。
2. `persistent:true`表示是background pages,`persistent:false`表示是event pages.
3. manifest.json的配置见：[manifest.json][https://developer.chrome.com/extensions/manifest]

### background.js

```javascript
var content=[];
$.get('http://blog.csdn.net/adimn123/article/details/36022679', function(html) {
	contentText=$(html).find('#article_content').html();
	content=contentText.split("<p>----</p>");
	console.log(content);
});
setInterval(function() {
	var len=content.length;
	if(len==0)
		return;
	chrome.tabs.query({
		active: true,
		currentWindow: true
	}, function(tabs) {
		var id=tabs[0].id;
		var random=Math.floor(Math.random()*len);
		//每过120s向当前活动tab执行learn.js
		chrome.tabs.executeScript(id, {file: "learn.js"}, function() {
			chrome.tabs.sendMessage(id,content[random].trim("\n"));
		});
	});
}, 120000);
```

### learn.js

```javascript
//先定义Toast
var Toast=function(){
	//....
}
//接受后台传过来的数据，在当前页面添加Toast
chrome.runtime.onMessage.addListener(function(msg){
	new Toast({message:msg}).show();
});
```

### 执行过程

1. 在background.js中一开始从我的CSDN博客中获取需要提醒的知识点，组成数组content[]
2. 每过120s向当前活动页面执行learn.js，并向执行learn.js的页面发送content[random]
3. 在当前活动tab中执行的learn.js，接收后台传过来的message，并在前台创建一个Toast以显示内容
4. Toast显示成功，默认持续20s，点击可以隐藏。(Toast见另外一篇Blog（Html模仿Android Toast))

## 发布与运行

以开发者模式加载自己开发的插件。
