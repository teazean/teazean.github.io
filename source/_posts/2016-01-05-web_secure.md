---
layout: post
title: Web 安全-《白帽子web安全阅读笔记》
categories:
    - web
tags:
    - web
    - secure
---

## 白帽子讲Web安全

目录结构：

1. 世界观安全
2. 客户端脚本安全
3. 服务端安全

### 1. 世界观安全
#### 名词
- 黑客精神：Open、Free、Share，一去不复返！
- 黑客 vs 脚本小子：往往造成威胁最大的，非挖掘漏洞的黑客，而是那些使用漏洞的低水平的脚本小子。
- 白帽子：安全领域专家
- 黑帽子：利用黑客技术造成破坏的犯罪群体

<!-- more -->

#### 一句话
- `如果用户能够分辨什么样的行为是安全的，那么还要安全软件做什么？`
- 微软在产品的安全中做的越来越好，其所推崇的安全开发流程，将安全贯穿于整个软件的生命周期中，经过实践检验，证明者是一条可行的道路。
- 安全是一个持续的过程，没有银弹。

#### 如何实施安全评估
1. 资产等级划分：比如服务器资源、数据资源等，对其安全性等级划分。
2. 威胁分析：把所有的威胁找出来，微软的[STRIDE模型](https://msdn.microsoft.com/zh-cn/library/ff648641.aspx#EQAA)。
3. 风险分析：`Risk = Probability * Damage Potential`，如何衡量风险：微软的[DREAD模型](https://msdn.microsoft.com/zh-cn/library/ff648644.aspx#EEAA)
4. 设计安全方案：能够有效解决问题、用户体验好、高性能、低耦合、易于扩展和升级。

#### 白帽子兵法
1. Secure By Default：黑名单、白名单；最小权限原则。
	>如果更多的使用白名单，那么系统就会变得更安全。
2. Defense in Depth：在各个不同层次、不同方面实施安全方案，避免出现漏洞，相互配合，够成一个整体；在解决根本问题的地方实施针对性的安全方案。
3. 数据与代码分离：良好的设计也是安全方案的一种，这一原则广泛适用于"注入"问题。
4. 不可预测原则：能有效对抗基于篡改、伪造的攻击。如id随机等。

#### notes：
1. 2003年冲击波蠕虫：Window系统RPC漏洞，很短时间内席卷全球，百万台机器被感染。
2. PHP0字节截断：c语言的字符串以`%00`结尾，造成`php:include`方法执行错误的文件。<http://www.joychou.org/index.php/web/truncated.html>
3. 缓冲区溢出：指计算机向缓冲区写入数据时超过了缓冲区的限制，多余的数据覆盖了合法数据。导致覆盖的数据被当做代码执行，形成缓冲区溢出攻击.
4. 内存溢出：out of memory，指向系统申请的内存大于系统能分配的，发生内存溢出，程序无法进行，强行终止。
5. 内存泄露：指程序申请内存使用后(new)，最后却不释放内存(delete)，就会导致那部分内存无法访问到，系统也无法再分配，形成一次内存泄露；多次发生内存泄露，系统可用内存就会减少，性能降低，最后形成内存溢出。


### 2. 客户端脚本安全
#### 浏览器安全
- 同源策略：浏览器最核心、最基本的安全功能。同源是指：host、子域名、端口、协议。
- 向script、img、iframe等src属性以及link的href属性都有跨域的能力；而XMLHttpRequest一般不具有跨域能力，但可以通过服务器设置`Access-Control-Allow-Origin`这个属性设置哪些`源`可以访问该接口。
- 浏览器扩展和插件极大丰富了浏览器的功能，但安全问题随之而来，扩展和插件的权限都高于页面JavaScript的权限，比如可以进行一些跨域的问题.
- 浏览器的多进程架构，将浏览器的各个功能模块分开，各个浏览器实例分开，当一个进程崩溃时，也不会影响到其他的进程。另一方面多进程的实现，也将渲染引擎、浏览器内核引擎分割开，极大提高了浏览器的安全性。
- Sandbox沙箱：让不可信任代码运行在一定的隔离环境中，限制其访问隔离区之外的资源。

#### 恶意网站拦截
1. 挂马：在网页中插入一段恶意代码，利用浏览器漏洞执行任意代码的攻击方式。
2. 恶意网站分类：挂马网站，这些网站包含恶意的脚本如JavaScript、Flash等，利用浏览器的漏洞执行shellcode，在用户电脑中植入木马；钓鱼网站，通过模仿知名网站的相似页面来欺骗用户。
3. 恶意网站拦截：一般都是浏览器周期性的从服务器获取一份最新的恶意网站黑名单，当访问黑名单之中的页面时，浏览器弹出警告。如[PhishTank](http://www.phishtank.com/)、[Google SafeBrowsingApi](https://developers.google.com/safe-browsing/)

tips：
1. ie8 css跨域漏洞：利用ie8解析fontFamily属性的漏洞，可以跨域读取html文档的内容。<http://www.2cto.com/Article/201009/73051.html>

#### 跨站脚本攻击(XSS)
1. 类型：反射型XSS：根据用户输入的内容或者一个恶意链接，来发射给浏览器，达到攻击目的；存储型XSS：恶意脚本存储到服务器上，每次访问都能攻击，常见于博客论坛上。
2. 永远不能信任用户能控制的变量
3. XSS的防御：httpOnly(禁止js访问该cookie)；输入检查；输出检查；处理富文本，使用白名单的方式；

#### 跨站点请求伪造（CSRF）
1. CSRF是利用用户身份（cookie）来进行攻击操作的行为；
2. 防御CSRF：所有的写操作都用post；对refer进行判断；在原来的请求中注入token。

#### 点击劫持（ClickJacking）
1. 点击劫持：是一种视觉上的欺骗，攻击者使用一个透明的iframe覆盖在一个网页上，诱使用户进行操作，实际上用户将在不知情的情况下早做了iframe页面。如flash点击劫持、拖拽劫持等。
2. 防御：frame-busting：利用js location判断是否是iframe嵌套；http头-X-Frame-Options：控制当前页面是否能加载iframe。

### 3. 服务端安全
#### 注入攻击
1. 注入攻击的条件：用户能够控制输入；原本要执行的代码，拼接了用户输入的数据。
2. 代码如注入、命令注入往往都是由一些不安全的函数或方法引起。
3. sql注入：预防可以使用预编译语句
4. CRLF注入：cr（\r）lf（\n），在http协议中，http头以`\r\n`作为两个头信息的分隔符，以`两次\r\n`作为http-headers的结束。

#### 文件上传漏洞
1. 文件上传漏洞：文件上传后所在的目录是web容器所覆盖到的路径；用户能从web上访问到这个文件；用户上传的文件漏过了安全检查。
2. 文件上传漏洞解决方案：文件上传的目录设置为不可执行；白名单判断文件类型；使用随机数改写文件名和文件路径；单独设置文件服务器的域名。

#### 对密码加密时，增加一个`salt`，增加密码明文的复杂度。

#### notes：
1. md5这些算法一般都会对原来的串填充，以达到所需要的长度。
2. 在密码学里有个基本的原则：密码系统的安全性应该依赖于密钥的复杂性，而不是依赖于算法的保密性。
3. 将密钥保存在配置文件或者数据库中，而非在代码中硬编码。

#### DDOS：分布式拒绝服务
1. SYN flood：利用tcp的三次握手的时长，进行网络层DDOS
2. 应用层DDOS的防御：代码做好性能优化；在网络架构上做好优化，如负载均衡；限制每个IP的请求频率。
3. ReDOS：一个正则表达式引起的血案，如下的匹配，将会使正则表达式匹配的路径指数级增长，效率极其低下。

		var r = /^(a+)+$/g;
		var text = "aaaaaaaaaaaaaaaX";
