---
layout: post
title: 阅读：雁过拔毛
class: mylbs
---

##阅读

###2015-08-03

**别再用MongoDB了！**    
<http://www.infoq.com/cn/news/2015/07/never-ever-mongodb> 
>1. 文中讲述了MongoDB的一些缺陷，安全性的漏洞、数据丢失等。
>2. （他所列举的内容）部分（也许全部）确有其事。事实上，现在，就假设他所写的都是正确的。我这里不是要说作者是错的。更确切地说，我这里想指出的是，这种博文只能让我了解很少有关MongoDB的知识，但却让我感受到了写这篇博文的人的许多情感。

**互联网时代的降维打击**  
<http://www.woshipm.com/pmd/111767.html> 
>打败百度的不会是另外一个百度（例如360），打败淘宝的不会是另外一个淘宝（例如拍拍），打败微信的不会是另外一个微信（例如来往）。因为在同样的世界中，先来者有自己的优势，加上现在每个能创出一番事业的人，都不会比别人笨，一旦格局形成，想要改变最好的模式就是降维打击。

**所有放弃讨论“是不是”而直接讨论“为什么是”的问题都是耍流氓。**

**Autoplay is still bad for all users**     
<http://www.punkchip.com/autoplay-is-still-bad-for-all-users/> 
>1. Apple认为自动播放对用户来说是不友好的，所有的IOS设备均禁掉了preload、autoplay。只有当`用户真正发生交互`的时候才回去下载音频、视频资源。
>2. Android也开始认为自动播放对用户来说是不友好的。导致一部分android移动可以自动播放，另外一部分不可以。
>3. trigger('click')、setTimeout均无效。
>4. 经测试可以对document、body监听最开始的touchstart事件，在android、ios下均会触发资源的下载、播放。

**何实现跨浏览器的SVG Sprites**     
<http://www.w3cplus.com/html5/how-to-implement-cross-browser-svg-sprites.html>
>讲述了svg sprites技术

**Events and timing in-depth**  
<http://javascript.info/tutorial/events-and-timing-depth>
>When an asynchronous event occurs, it gets into the Event queue.
>onpropertychange、onfocus、alert等不参与Event queue.
>setTimeout(func,0),把func加在最近的事件循环tick上的queue中，要等待队列中前部分执行完才会执行func。可以用来监听onkeypress，来获取文本内容。

**Understanding timers: setTimeout and setInterval**    
<http://javascript.info/tutorial/settimeout-setinterval>
>1. setInterval(func, delay) tries to execute the func every delay ms.
>2. If the execution is impossible, it is queued.

**Safari HTML5 Audio and Video Guide#iOS-Specific Considerations**      
<https://developer.apple.com/library/safari/documentation/AudioVideo/Conceptual/Using_HTML5_Audio_Video/Device-SpecificConsiderations/Device-SpecificConsiderations.html>
>1. audio、video的autoplay与proload失效。即使通过js也不行,除非用户交互。
>2. 在所有的ios设备上，同事只能有一个audio流或者video流。可以通过改变src来切换audio
>3. ios5.0以上的safari支持loop循环播放，但ios5之前的版本，只能通过监听audio的`ended`事件，再次play()来模拟loop。

###2015-08-10
**我们是否应该把后端构建为API**     
<http://www.infoq.com/cn/news/2015/07/api-or-not?utm_source=infoq&utm_medium=popular_widget&utm_campaign=popular_content_list&utm_content=homepage>   
>1. 为了应用多种场景，desktop app, mobile app 等等。无法避免使用api，但api设计不当，会增加系统的复杂度。
>2. Knowing this, the real question isn't whether to build an API, but how to build it.
>3. 比较好的方式是遵循关注分离的设计原则，将业务逻辑与对应用例的应用逻辑进行隔离，将业务逻辑放在一个具有高度内聚性的领域层(api)中，而展示层（即网站、桌面或移动应用）通过应用层间接地调用相应的业务逻辑。

**Java9新功能之HTTP2和REPL**     
<http://www.infoq.com/cn/articles/Java9-New-HTTP-2-and-REPL?utm_source=infoq&utm_medium=popular_widget&utm_campaign=popular_content_list&utm_content=homepage>    
>1. Java9将添加对HTTP2的支持，HTTP2协议是基于SPDY开发的，google将于2016年放弃支持SPDY。
>2. Java9另外一个重要的功能是对REPL的支持（JShell），即命令行式的交互。

**在地图战场延伸到室内前，腾讯先投了家公司做准备**     
<http://36kr.com/p/5036364.html>
>1. 讲解了目前室内定位的技术，包括近领法定位、wifi指纹定位、三角测量定位、惯性测量定位、地磁信息定位。
>2. 腾讯收购了sensewhere主要利用wifi、蓝牙进行定位。而百度投资的indoorAtlas是基于地磁信息定位。

###2015-08-17  
**移动时代的前端加密**     
<http://div.io/topic/1220#>   
>1. 文中讲了许多前段加密算法，第一个技术方案的核心思想就是增加阅读、解密的难度，降低代码可读性。
>2. 其他技术包括：执行字符串代码，将js放入其他位置如png、css（content中）,防止开发者工具，混合加密等。

**Facebook移动端照片预览背后的技术**        
<http://www.infoq.com/cn/news/2015/08/facebook-photo-preview?utm_source=infoq&utm_medium=popular_widget&utm_campaign=popular_content_list&utm_content=homepage>   
>1. 在2g(32k/s)网络下,在请求封面的时候会有两个请求：GraphQL获取图片URL和通过URL从CDN获取图片。这一过程会异常缓慢
>2. facebook设计在GraphQL请求的时候，返回200B大小的缩略图，采用JPEG压缩，并且将JPEG固定的头信息放到App里面，获取图片内容后，在通过App组装成JPEG图片。并且为JPEG中因图而异的Huffman表，增加版本号，以便对Huffman添加版本控制。

###2015-08-24   
**Web 研发模式演变**  
<https://github.com/lifesinger/lifesinger.github.com/issues/184>                
>1. web1.0 ，页面由java、php在服务器生成，浏览器只负责展示。
>2. 后端为主的MVC时代，在第一种模式的基础上，以后端为出发点，对Web Server分层架构，比如Structs、Spring MVC。
>3. Ajax带来的SPA时代：Ajax的兴起、以及CDN托管html、css、js等静态资源，前后端的关键协作点转为Ajax接口。但这种模式只是将服务端的代码复杂度挪到了前段。
>4. 前段为主的MV*时代，对前端架构进行分层。如Backbone、AngularJS。
>5. Node带来的全站时代：第三、四中模式，依旧是把繁重的JS代码放在Browser中，通过Node带来前后端分离，Browser进行展示页面，Node处理路由、模板、`应用逻辑`，而后端专注于处理`业务逻辑`。

**module-loader-webpack-vs-requirejs-vs-browserify**    
<http://hackhat.com/p/110/module-loader-webpack-vs-requirejs-vs-browserify/>
>这篇文章做了requirejs、webpack、browserify的比较，总得来说:     
> 
>1. requirejs是属于纯browser js，只要在页面中引入js即可；而webpack、browerify属于在部署前预编译本地js文件，对本地js文件打包，browserify直接引入打包后的js文件。
>2. 基于第一条的特性，webpack、browserify支持nodejs modules，以及nodejs modules的书写格式。

**Google V8的垃圾回收引擎**    
<http://www.infoq.com/cn/news/2015/08/Google-V8>    
>1. V8采用的是分代(Generational)垃圾回收器，将内存分为新生代和老生代。
>2. 新生代采用scavenge算法，即移动-复制的策略。若果一个对象经多次移动，仍存在，对象将移动只老生代。
>3. 老生代采用mark-sweep、mark-compat的结合。主要采用mark-sweep，当内存不足以分配给从新生代晋升的对象的时候，采用mark-compact(移动内存，效率最低)。
>4. 对堆栈执行大回收时，时间跨度可能超过100ms，这种全停顿会使页面卡着，因此V8使用增量标记的算法，把完整的标记分成许多部分，每执行一部分停下来，让javascript线程执行一会。

###2015-08-31   
**Why Moving Elements With Translate() Is Better Than Pos:abs Top/left**    
<http://www.paulirish.com/2012/why-moving-elements-with-translate-is-better-than-posabs-topleft/>   
>1. 当left发生变化的时候，浏览器中的变化从Recalculate Style -> layout -> update Layer Tree -> Paint ->Composite Layers.
>2. 通过translate平移，浏览器中的变化从Recalculate Style -> Composite Layers。中间比left的方案少了更新dom tree的过程，所以效率会更高。

**微信ANDROID客户端-会话速度提升70%的背后**       
<http://mp.weixin.qq.com/s?mid=207548094&idx=1&sn=1a277620bc28349368b68ed98fbefebe&__biz=MzAwNDY1ODY2OQ==>  
>提升Android会话打开速度优化
>
>1. 使用Fragment代替Activity，实现会话窗口的重用。
>2. 优化sqllite索引结构，采用数字代替字符串作索引，降低关键字段的大小。

**Javascript高性能动画与页面渲染**        
<http://www.infoq.com/cn/articles/javascript-high-performance-animation-and-page-rendering>             
>1. 页面显示是一帧一桢的，使用setTimeout、setInterval并不能保证在理想的桢显示之前触发，会有延迟。并且使用Timer会有丢帧的可能，以及setInterval的性能问题。
>2. 建议使用新接口[requestAnimationFrame](https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame):在渲染下一桢之前所要做的函数。如果回调函数过于耗时，requestAnimationFrame会降低帧数，保证帧数的稳定性，动画的连串性。
>3. html在浏览器中会被转化为DOM树，DOM树的每一个节点都会转化为RenderObject, 多个RenderObject可能又会对应一个或多个RenderLayer。浏览器渲染的流程如下：
>
>    1. 获取 DOM 并将其分割为多个层(RenderLayer)
>    2. 将每个层栅格化，并独立的绘制进位图中
>    3. 将这些位图作为纹理上传至 GPU
>    4. 复合多个层来生成最终的屏幕图像(终极layer)。
>4. 一般使用3d属性(perspective、tranlate3d等)、css动画、css滤镜、以及3d canvas均可以创建一个独立的layer，layer的样式改变，影响的只是自己，并不会引起repaint。这也是css动画、变换性能比较高的原理。
>5. Too much of a good thing is often a bad thing。太多layer的时候，会引起页面动画的抖动。[Apple首页动画分析](http://wesleyhales.com/blog/2013/10/26/Jank-Busting-Apples-Home-Page/)
>6. 关于使用tranlate3d代替tanslate2d，会启用GPU来渲染动画，在大多数浏览器中会更流畅。<http://jsperf.com/translate3d-vs-xy/28>

**How (not) to trigger a layout in WebKit**     
<http://gent.ilcore.com/2011/03/how-not-to-trigger-layout-in-webkit.html>   
<http://webcache.googleusercontent.com/search?q=cache:DUblmOr9XskJ:gent.ilcore.com/2011/03/how-not-to-trigger-layout-in-webkit.html+&cd=1&hl=en&ct=clnk&gl=hk>  
>1. Parts of the render tree (or the whole tree) will need to be revalidated and the node dimensions recalculated. This is called a reflow, or layout, or layouting.
>2. what triggers layout? 文中列举了一些能引发回流一些属性和方法。如获取属性clientHeight、client*、scroll*、offset*等，这些获取属性的操作均是比较耗时的。

###2015-09-07   

