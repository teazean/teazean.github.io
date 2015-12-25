---
layout: post
title: http、socket、tcp再议
category: server
tags: http socket tcp server
keywords: http, socket, tcp
---

##http、socket、tcp再议
http是应用层协议，而tcp是网络层协议，客户端通过http请求与服务端交互就是通过操作系统提供的socket接口，来创建tcp连接；创建tcp连接，以及释放tcp连接都是比较耗时的操作（三次握手），因此就有了http的长连接，就是在一次http请求完成之后不断开tcp连接，下次http请求继续复用这个tcp连接。

<!--break--> 

###http、socket、tcp的关系
1. http是应用层协议，tcp是网络层协议。http是基于tcp通信的。
2. socket是操作系统提供的操作tcp连接的接口之一，和编程语言无关；（突然有点顿悟，一切的一切都是操作系统，什么编程语言都是操作系统上的玩家。）
3. 客户端（浏览器）与服务器是如何通过tcp-socket通信的。（见《HTTP权威指南F4.1.4 用TCP套接字编程》）
	1. 服务器建立socket监听80端口(listen)，等待连接(accept)
	2. 客户端获取IP地址和端口号，创建socket连接到服务器IP:port上（connect）
	3. 服务器通知应用程序有连接到来，开始读取请求（read）
	4. 客户端发送HTTP请求（write），等待HTTP响应（read）
	5. 服务器处理HTTP请求，响应HTTP（write），关闭连接(close)
	6. 客户端处理HTTP响应，关闭连接(close)

###socket
1. 上面所说的都是针对http协议，http协议使用tcp通信；
2. 如下面一张图，socket是操作系统对tcp连接、udp连接的接口工具之一。像应用层协议http都要通过操作系统提供的socket接口去操作tcp、udp连接；
3. 我们在编程语言中可以直接操作socket接口，socket是语言无关的。
<img src="/collections/socket.gif">

###socket与web server
1. 通过socket可以处理一切格式的数据，只要按照格式解析正确的消息，如http格式，或者纯数据，预定义的数据格式等。
2. web server是处理http请求的，理论上是可以通过socket监听，自己去实现一个简单的web server服务器的。

