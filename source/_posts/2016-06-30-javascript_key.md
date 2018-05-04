---
layout: post
title: java解密
category: javascript
---

## 本篇内容
本文主要讲解学习javascript实践中不断总结的keypoint。

### [ES6 Feature Complete](https://webkit.org/blog/6756/es6-feature-complete/)
1. 关于Symbol到底是何物
	- Symbol是独一无二的数据类型，和num、boolean类似，但Symbol创建出来的是独一无二的。
	- Symbol下面预设了很多方法，如System.match，System.itertor，System.species等，这些将是javascript之后语言设计实现的一个要点，这些方法都是内置的方法，被其他类型如String、RegExp、instaceOf(使用System.species)等使用，开发者可以通过Symbol这些hook去做一些特性的事，通过Symbol的这些hook提供给开发者修改默认行为的能力。

<!-- more -->
2. 关于javascript的对象的存储：javascript对象 = structs + Butterfly。structs是对象结构的描述，而Butterfly是真正数值存在内存的地方。这些和c语言的struct是一样的，有结构描述（structs descriptions）和内存数值存储（memory）结合。在javascript中，structs是可以复用的，已达到高效的目的。在javascript中，每对一个对象创建新的属性，v8会检测是否有已存在的struct符合新建属性之后的结构，如果有则复用，没有则新建struct，数值存储在每个对象固有的Butterfly中。（这样也会存在一个问题，多次新建属性会导致内存中的struct过多）；

![javascript对象](https://webkit.org/wp-content/uploads/Figure-6.png)

3. 关于新版v8内写的内部方法GetById/TryGetById，里面实现了一种Object Property Conditions和Adapter Watchpoints来对属性cache做定位，如Regexp的match等，这些方法做cache，可以快速获取这些方法，而不用走原型链的多次查询判断提高效率。

![属性cache的条件判断](https://webkit.org/wp-content/uploads/Figure-7-2.png)
