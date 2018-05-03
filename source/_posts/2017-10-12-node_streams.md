---
layout: post
title: node streams探索
category: node stream
tags: node stream
keywords: node stream
---

# 继承结构

![](/collections/node-stream-inherit.png)

<!-- more -->

## Readable

### 接口

- _read(n): 产出数据，调用push(chunk or null)产出数据，Readable自带一套buffer的管理。
- read(n): 当外部调用这个接口时，这个接口优先从buffer里取数据，如果buffer够下一次的read，则直接返回；如果buffer不够，则调用`_read(n)`要求产生下一段数据chunk

### 两种模式

Readable其实是有两种模式：`flowing` 和 `paused`

- flowing: 数据自动从数据源读取，当数据准备好之后，自动的通过`EventEmitter`接口像外抛出去。
- paused: stream.read必须显示调用才能吐出数据

一开始是`paused`模式，可以通过一些方法触发两个模式的切换。

1. `paused`切换到`flowing`:

    1. 添加`data` event handler.
    2. 调用stream.resume()
    3. 调用stream.pipe()到一个Wriable

2.  `flowing`切换到`paused`:

    1. 没有pipe destinations情况下，调用stream.pause()
    2. 如果有pipe destinations情况下，删除所有`data`事件并且通过`unpipe`移除所有的pipe destinations
    3. 因为要向后兼容：删除所有的`data` event hanlders并不会自动切换到`paused`状态

Note: 只要stream失去了对一个`chunk`的控制权，就会触发`data`事件，无论是什么mode下，通过什么方法。


## Writable

**千万不要陷入误区：Writable只是用于写入，并没有将写入的数据再读出的功能（Transform）**A

### 接口

- _write: 用来消耗chunk的.(比如打印、写入文件里面等)
- write: 外部调用接口
    - 当内部所有chunk.length < HWM时，返回true，表示可以继续write
    - 当内部所有chunk.length > HWM是，返回false，表示不能继续write，需要等待`drain`事件触发之后才能write

## Duplex

Duplex仅仅是简单的继承或者实现 Readable & Writable，里面的input数据和ouput数据是否有关系，Duplex本省是不关心的。(input和output有没有关系，需要子类实现`_write`和`_read`来决定)

## Transform

Transform是Duplex的子类，实现了`_write`和`_read`,ouput的数据是和input的数据有关联的。
>the output is computed in some way from the input.

Transform本身不保留数据，只是作为一个过场。

### 接口

- _transform: 在`_transform`里面对chunk进行处理，然后使用readable.push来产出数据

## PassThrough

`PassThrough`是`Transform`的子类，简单的将input的数据ouput出去。
