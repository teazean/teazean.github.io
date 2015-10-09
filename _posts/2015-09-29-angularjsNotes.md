---
layout: post
title: angularjs使用笔记
category: fe
tags: angularjs mvvc 
keywords: angularjs, angular, 使用笔记, mvvc
---

##angularjs使用笔记

###后端MVC到前段MVVC的转变

1. 后端MVC，一般由服务器去渲染view（包括注入数据、处理页面模块引入等），返回给客户端。转换到前段MVVC后，注入数据也在前端注入，页面引入其他模块由前端处理。

> 最进看一个大型项目，采用angularjs+requirejs来构建项目，把项目按功能切分成许多模块，并且模块部署在不同的服务器上。
 
<img src="/images/angular/icode.png">