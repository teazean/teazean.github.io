---
layout: post
title: React虚拟dom
category: fe
tags: mvvm react
keywords: mvvm, react
---

## MVVM-React虚拟DOM
在angular中，通过dirty-check（脏监测）来进行视图的更新，要求对所有作用域对象进行diff，通知刷新函数进行视图更新。

不同于angular的脏监测，react采用虚拟dom来实现视图刷新。Virtual DOM的核心是差异监测（diff）。

<!-- more -->

#### Why is React's concept of Virtual DOM said to be more performant than dirty model checking?
1. <http://stackoverflow.com/questions/21109361/why-is-reacts-concept-of-virtual-dom-said-to-be-more-performant-than-dirty-mode>
2. React解决两个问题：`When do I re-render? `和`How do I re-render efficiently? `
3. `When do I re-render? `：Answer: When I observe that the data is dirty.
4. `How do I re-render efficiently? `：Answer: Using a virtual DOM to generate a real DOM patch

#### React高效的原因：
1. 进行diff之后，批处理所有dom读写操作。
2. Efficient update of sub-tree only.（？？？）

#### React’s diff algorithm
1. <http://calendar.perfplanet.com/2013/diff/>
2. React-Component的所有操作通过`setState`，当每次调用`setState`的时候，React将标志这个component为dirty，因此React避免了脏数据监测过程。在一个事件循环结束后，React监测所有的Dirty-Components，一起re-render它们。
3. 当一个Component的`setState`被调用时，该Component将会重新构建它的Virtual Dom，当对root dom调用`setState`，真个React app的virtual dom将会被构建,所以尽可能在低等级的Component上调用setState。

### setState 与 diff （待定）
当使用setState的时候，Component被标志为dirty component，当一个循环结束，遍历所有的dirtyComponents，进行diff比较，获取最小更新集，更新视图。
