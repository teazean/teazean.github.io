---
layout: post
title: javascript解密
category: javascript
---

## javascript 揭秘
本篇主要记录学习、实践javascript过程中的知识

### [ES6 Feature Complete](https://zhuanlan.zhihu.com/p/21543787)
1. 关于Symbol到底是什么
	1. Symbol是javascript新增的数据类型，和num、boolean等一样，代表独一无二
	2. Sysbol上面挂载了很多默认属性和方法，如Symbol.species、Symbol.match、Symbol.iterator等，这些都是现在并且以后javascript内置的一些方法要使用的的方法。如RegExp默认使用Symbol.match、instanceof使用Symbol.species做判断做匹配，这些钩子也提供给开发者一种修改默认行为的能力。

<!-- more -->
2. 关于javascript对象在内存的存储：对象描述struct + 数值存储bufferfly，和c语言的struct是一样的。对象描述struct是可以复用的，每个对象有自己的bufferfly来存储数据。javascript的对象在赋值之前没有的属性时，会先查找内存里有没有和新建属性之后一样结构的struct，如果有则复用，没有就新建struct。这样struct的复用可以达到高效的目的，但也有可能产生struct过多的问题。
![javascript对象存储](https://webkit.org/wp-content/uploads/Figure-3.png)

3. 在新版v8里新增GetById、TryGetById方法，结合Object Property Conditions（数据变更条件判断）和Adaptive Watchpoints（属性变更监测）两个特性，来对常使用并且不常修改的属性进行cache，如RegExp的match、Object.toString等，虽然这些判断会带来一些cost，但这些可以均可以提高v8的效率。
![对象属性cache](https://webkit.org/wp-content/uploads/Figure-7-2.png)
