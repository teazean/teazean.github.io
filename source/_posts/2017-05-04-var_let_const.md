---
layout: post
title: var let const的区别
categories:
    - web
tags:
    - javascript
---
## 概述
最近因知乎的某个问题，再次想探索一下 JS 中关于 let/const var 在规范中的区别。

### 1. 区别

- let/const都属于Let and Const Declarations，往execute context的LexicalEnvironment添加identifier，并赋值，它在声明之前是无法访问到的。
- var属于Variable Statement，往execute context的VariableEnvironment里面添加identifier，并赋值，它的声明是在execute context创建的时候，可以在var statement访问，但是undefined。

通常一个execute context的LexicalEnvironment 和 VariableEnvironment是same value，一次可以经常看到let a = 1; var a = 1;第二个var就会抛错。

<!-- more -->

### 2. Scripts & Modules

1. scripts的Environment就是global Environment
2. Modules是Module Environment，它的outer Environment是global Environment。

### 3. 疑问之global object

global object是global environment的一个特殊对象，可以用它来访问到global environment上的以下值：
- 直接在global上面创建的属性
- Function Declaration in global environment
- GeneratorDecloaration in global environment
- VariableDeclaration in global environment
- some built-ins

> Properties may be created directly on a global object. Hence, the object Environment Record component of a global Environment Record may contain both bindings created explicitly by FunctionDeclaration, GeneratorDeclaration, or VariableDeclaration declarations and bindings created implicitly as properties of the global object.  - 262 8.1.1.4

> 这也解释了为什么global environment中执行var statement，可以在global object上访问到，而let 却不可以访问到。

### 4. 疑问之const let的效率

js的引擎实现可能还是按照老的var的设计，var的效率较高，可能并没有对let 或者const进行优化，效率可能有些地下。

### 5. const 是不是都要优于 let

首先从js标准定义上来讲，若一个primitive type的value或者object的引用之后都不修改，是符合const的条件的，eslint也有prefer-const的规则推荐。

这个问题的争议在于：js引擎中的const是表示值或者引用不可变，而人为理解的const是常量的意思指值、引用、引用指向的对象的值和属性都不可变，并且在代码规范中使用大写字母表示。从这一点上来分析的话，对于值类型的const声明，大家没有争议，争议点在于引用类型(object)的要不要使用const声明，也有人对于primitive type使用const，其他type使用let的。

我的建议是：prefer-const，人为理解不可变值或者对象的使用大写字符表示，因为js引擎中会对const变量有所优化：

    const a = require('a');
    const CONFIG_A = {
        b: 1,
        c: 2
    };
    const PI = 3.14;
    for (const item of [{}, {}]) {
        // xx
    }
    for (let i = 0; i < arr.length; i++ ) {
    }

像其他的语言：

- java： 阿里的java开发准则也是推荐任何地方使用final的。
- c#：const 和 readonly, const是编译时常量，c#只允许值类型的const，在编译的时候，直接拿const的值替换使用这些变量的地方；readonly是运行时常量
- c++： c++的情况和c#差不多，但const更复杂一些，可以编译时会对值类型的const type做值替换，但对于指针这些const不知道怎么处理的。

