---
layout: post
title: 阅读：雁过拔毛
class: mylbs
---

##阅读

###2015-08-03

**别再用MongoDB了！**    
[http://www.infoq.com/cn/news/2015/07/never-ever-mongodb]() 
>1. 文中讲述了MongoDB的一些缺陷，安全性的漏洞、数据丢失等。
>2. （他所列举的内容）部分（也许全部）确有其事。事实上，现在，就假设他所写的都是正确的。我这里不是要说作者是错的。更确切地说，我这里想指出的是，这种博文只能让我了解很少有关MongoDB的知识，但却让我感受到了写这篇博文的人的许多情感。

**互联网时代的降维打击**  
[http://www.woshipm.com/pmd/111767.html]()  
>打败百度的不会是另外一个百度（例如360），打败淘宝的不会是另外一个淘宝（例如拍拍），打败微信的不会是另外一个微信（例如来往）。因为在同样的世界中，先来者有自己的优势，加上现在每个能创出一番事业的人，都不会比别人笨，一旦格局形成，想要改变最好的模式就是降维打击。

**所有放弃讨论“是不是”而直接讨论“为什么是”的问题都是耍流氓。**

**Autoplay is still bad for all users**     
[http://www.punkchip.com/autoplay-is-still-bad-for-all-users/]() 
>1. Apple认为自动播放对用户来说是不友好的，所有的IOS设备均禁掉了preload、autoplay。只有当`用户真正发生交互`的时候才回去下载音频、视频资源。
>2. Android也开始认为自动播放对用户来说是不友好的。导致一部分android移动可以自动播放，另外一部分不可以。
>3. trigger('click')、setTimeout均无效。甚至我也对documentElement、body监听最开始的touchstart事件，在android会触发资源的下载、播放，但在ios下失效。

**何实现跨浏览器的SVG Sprites**     
[http://www.w3cplus.com/html5/how-to-implement-cross-browser-svg-sprites.html]()
>讲述了svg sprites技术

**Events and timing in-depth**  
[http://javascript.info/tutorial/events-and-timing-depth]()
>When an asynchronous event occurs, it gets into the Event queue.
>onpropertychange、onfocus、alert等不参与Event queue.
>setTimeout(func,0),把func加在最近的事件循环tick上的queue中，要等待队列中前部分执行完才会执行func。可以用来监听onkeypress，来获取文本内容。

**Understanding timers: setTimeout and setInterval**    
[http://javascript.info/tutorial/settimeout-setinterval]()
>1. setInterval(func, delay) tries to execute the func every delay ms.
>2. If the execution is impossible, it is queued.

**Safari HTML5 Audio and Video Guide#iOS-Specific Considerations**      
[https://developer.apple.com/library/safari/documentation/AudioVideo/Conceptual/Using_HTML5_Audio_Video/Device-SpecificConsiderations/Device-SpecificConsiderations.html]()
>1. audio、video的autoplay与proload失效。即使通过js也不行,除非用户交互。
>2. 在所有的ios设备上，同事只能有一个audio流或者video流。可以通过改变src来切换audio
>3. ios5.0以上的safari支持loop循环播放，但ios5之前的版本，只能通过监听audio的`ended`事件，再次play()来模拟loop。

###2015-08-10
**我们是否应该把后端构建为API**     
[http://www.infoq.com/cn/news/2015/07/api-or-not?utm_source=infoq&utm_medium=popular_widget&utm_campaign=popular_content_list&utm_content=homepage]()   
>1. 为了应用多种场景，desktop app, mobile app 等等。无法避免使用api，但api设计不当，会增加系统的复杂度。
>2. Knowing this, the real question isn't whether to build an API, but how to build it.
>3. 比较好的方式是遵循关注分离的设计原则，将业务逻辑与对应用例的应用逻辑进行隔离，将业务逻辑放在一个具有高度内聚性的领域层(api)中，而展示层（即网站、桌面或移动应用）通过应用层间接地调用相应的业务逻辑。

**Java9新功能之HTTP2和REPL**     
[http://www.infoq.com/cn/articles/Java9-New-HTTP-2-and-REPL?utm_source=infoq&utm_medium=popular_widget&utm_campaign=popular_content_list&utm_content=homepage]()    
>1. Java9将添加对HTTP2的支持，HTTP2协议是基于SPDY开发的，google将于2016年放弃支持SPDY。
>2. Java9另外一个重要的功能是对REPL的支持（JShell），即命令行式的交互。

**在地图战场延伸到室内前，腾讯先投了家公司做准备**     
[http://36kr.com/p/5036364.html]()
>1. 讲解了目前室内定位的技术，包括近领法定位、wifi指纹定位、三角测量定位、惯性测量定位、地磁信息定位。
>2. 腾讯收购了sensewhere主要利用wifi、蓝牙进行定位。而百度投资的indoorAtlas是基于地磁信息定位。

###2015-08-17  
**移动时代的前端加密**     
[http://div.io/topic/1220#]()   
>1. 文中讲了许多前段加密算法，第一个技术方案的核心思想就是增加阅读、解密的难度，降低代码可读性。
>2. 其他技术包括：执行字符串代码，将js放入其他位置如png、css（content中）,防止开发者工具，混合加密等。

**Facebook移动端照片预览背后的技术**        
[http://www.infoq.com/cn/news/2015/08/facebook-photo-preview?utm_source=infoq&utm_medium=popular_widget&utm_campaign=popular_content_list&utm_content=homepage]()   
>1. 在2g(32k/s)网络下,在请求封面的时候会有两个请求：GraphQL获取图片URL和通过URL从CDN获取图片。这一过程会异常缓慢
>2. facebook设计在GraphQL请求的时候，返回200B大小的缩略图，采用JPEG压缩，并且将JPEG固定的头信息放到App里面，获取图片内容后，在通过App组装成JPEG图片。并且为JPEG中因图而异的Huffman表，增加版本号，以便对Huffman添加版本控制。


