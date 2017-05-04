---
layout: post
title: var let const的区别
category: var const let
---

###1. 区别
- let/const都属于Let and Const Declarations，往execute context的LexicalEnvironment添加identifier，并赋值，它在声明之前是无法访问到的。
- var属于Variable Statement，往execute context的VariableEnvironment里面添加identifier，并赋值，它的声明是在execute context创建的时候，可以在var statement访问，但是undefined。

通常一个execute context的LexicalEnvironment 和 VariableEnvironment是same value，一次可以经常看到let a = 1; var a = 1;第二个var就会抛错。

###2. Scripts & Modules
1. scripts的Environment就是global Environment
2. Modules是Module Environment，它的outer Environment是global Environment。

###3. 疑问之global object
global object是global environment的一个特殊对象，可以用它来访问到global environment上的以下值：
- 直接在global上面创建的属性
- Function Declaration in global environment
- GeneratorDecloaration in global environment
- VariableDeclaration in global environment
- some built-ins

> Properties may be created directly on a global object. Hence, the object Environment Record component of a global Environment Record may contain both bindings created explicitly by FunctionDeclaration, GeneratorDeclaration, or VariableDeclaration declarations and bindings created implicitly as properties of the global object.  - 262 8.1.1.4

> 这也解释了为什么global environment中执行var statement，可以在global object上访问到，而let 却不可以访问到。

###4. 疑问之const let的效率
js的引擎实现可能还是按照老的var的设计，var的效率较高，可能并没有对let 或者const进行优化，效率可能有些地下。
