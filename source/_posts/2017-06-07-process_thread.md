---
layout: post
title: 进程与线程
categories:
    - node
tags:
    - process
    - thread
---

## 1. 进程与线程的本质区别：
见<http://lkml.iu.edu/hypermail/linux/kernel/9608/0191.html>

> Both threads and processes are really just one thing: a "context of
execution". Trying to artificially distinguish different cases is just
self-limiting.
A "context of execution", hereby called COE, is just the conglomerate of
all the state of that COE. That state includes things like CPU state
(registers etc), MMU state (page mappings), permission state (uid, gid)
and various "communication states" (open files, signal handlers etc).
Traditionally, the difference between a "thread" and a "process" has been
mainly that a threads has CPU state (+ possibly some other minimal state),
while all the other context comes from the process.

其实进程和线程在操作系统上都是一个东西，叫做`context of execution`，进程与线程的区别就是：
1. 进程：
    - CPU state: registers etc
    - MMU state: page mappings，记录当前进程的虚拟内存地址到物理内存地址的映射的信息。
    - permission state: uid, gid
    - various "communication states": open files, signal handlers etc
2. 线程：
    - CPU state: registers
    - + possibly some other minial state
    - all others: shared from process

可以看到，进程和线程都是COE，但进程包含所有的信息，包括CPU、内存、分页信息(MMU)等；而线程是包含自己的CPU信息（可以抽象理解为栈信息），内存信息以及地址分页信息等都是共享进程的。

<!-- more -->

## 2. 概念：MMU

MMU: 通常是一个CPU附带一个MMU的硬件，应该管理虚拟内存地址到物理内存地址的映射。MMU上面的信息也是当前正在执行的进程的信息一致。

进程：一个程序至少一个进程，在程序初始化的会分配内存空间，包括用户空间里面的代码库、数据块（全局变量、堆内存空间等）、调用栈空间，PCB(process control block)
线程：一个进程至少一个线程，包含调用栈空间、TCB(thread control block)，threads exist as subsets of a process

## 3. 单CPU

线程切换：往往只需要保存老线程的CPU中各个寄存器的值和一些相当少的信息，然后在加载新线程的一些信息到CPU的寄存器中。这些寄存器有：ip、cs、ss、bp、sp等，代表指令地址、调用栈地址等。切换代价较小

进程切换：有很多东西要保存，比如CPU寄存器状态、保存上下文、引起中断等，更重要的是会引起MMU的切页来建立新进程的地址映射，这个代价比价高。

## 4. 多CPU

多CPU架构中MMU的处理：见<https://stackoverflow.com/questions/9929755/do-multi-core-cpus-share-the-mmu-and-page-tables#answer-12347672>；可以看到每个CPU中各带有一个MMU，单MMU其实底层是多级TLB来处理的，最终多CPU的MMUs会共同通过`DDR3 memory controller`来映射内存。

多CPU同一进程多个线程：多线程是共享同一进程的内容的，这种并发上理解并无问题。

多CPU多进程：所有进程的信息事都是保存在内存中的，并且每个CPU上的MMU的也不会重叠，随着每个CPU对应进程的执行，该CPU的MMU映射的地址也多少是该进程的。多CPU的多进程在执行的时候也不会在内存中产生冲突。

## 5. 其他

linux:
    - fork、spawn: 新建进程
    - pthread_create: 新建线程

node:
    - child_process: 该模块是新建进程的，是用来管理多进程通信的。node单进程就是单线程架构。

