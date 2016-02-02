---
layout: post
title: 阅读：雁过拔毛
class: mylbs
styles: mylbs
---

##阅读

###2015-08-03

####别再用MongoDB了！    
1. <http://www.infoq.com/cn/news/2015/07/never-ever-mongodb>   
2. 文中讲述了MongoDB的一些缺陷，安全性的漏洞、数据丢失等。
3. （他所列举的内容）部分（也许全部）确有其事。事实上，现在，就假设他所写的都是正确的。我这里不是要说作者是错的。更确切地说，我这里想指出的是，这种博文只能让我了解很少有关MongoDB的知识，但却让我感受到了写这篇博文的人的许多情感。

####互联网时代的降维打击  
1. <http://www.woshipm.com/pmd/111767.html>
2. 打败百度的不会是另外一个百度（例如360），打败淘宝的不会是另外一个淘宝（例如拍拍），打败微信的不会是另外一个微信（例如来往）。因为在同样的世界中，先来者有自己的优势，加上现在每个能创出一番事业的人，都不会比别人笨，一旦格局形成，想要改变最好的模式就是降维打击。

####所有放弃讨论“是不是”而直接讨论“为什么是”的问题都是耍流氓。     

####Autoplay is still bad for all users     
1. <http://www.punkchip.com/autoplay-is-still-bad-for-all-users/>  
2. Apple认为自动播放对用户来说是不友好的，所有的IOS设备均禁掉了preload、autoplay。只有当`用户真正发生交互`的时候才回去下载音频、视频资源。
3. Android也开始认为自动播放对用户来说是不友好的。导致一部分android移动可以自动播放，另外一部分不可以。
4. trigger('click')、setTimeout均无效。
5. 经测试可以对document、body监听最开始的touchstart事件，在android、ios下均会触发资源的下载、播放。

####何实现跨浏览器的SVG Sprites     
1. <http://www.w3cplus.com/html5/how-to-implement-cross-browser-svg-sprites.html>
>   
2. 讲述了svg sprites技术

####Events and timing in-depth  
1. <http://javascript.info/tutorial/events-and-timing-depth>   
2. When an asynchronous event occurs, it gets into the Event queue.
3. onpropertychange、onfocus、alert等不参与Event queue.
4. setTimeout(func,0),把func加在最近的事件循环tick上的queue中，要等待队列中前部分执行完才会执行func。可以用来监听onkeypress，来获取文本内容。

####Understanding timers: setTimeout and setInterval    
1. <http://javascript.info/tutorial/settimeout-setinterval>
2. setInterval(func, delay) tries to execute the func every delay ms.
3. If the execution is impossible, it is queued.

####Safari HTML5 Audio and Video Guide#iOS-Specific Considerations      
1. <https://developer.apple.com/library/safari/documentation/AudioVideo/Conceptual/Using_HTML5_Audio_Video/Device-SpecificConsiderations/Device-SpecificConsiderations.html>
1. audio、video的autoplay与proload失效。即使通过js也不行,除非用户交互。
2. 在所有的ios设备上，同事只能有一个audio流或者video流。可以通过改变src来切换audio
3. ios5.0以上的safari支持loop循环播放，但ios5之前的版本，只能通过监听audio的`ended`事件，再次play()来模拟loop。

###2015-08-10
####我们是否应该把后端构建为API     
1. <http://www.infoq.com/cn/news/2015/07/api-or-not?utm_source=infoq&utm_medium=popular_widget&utm_campaign=popular_content_list&utm_content=homepage>   
1. 为了应用多种场景，desktop app, mobile app 等等。无法避免使用api，但api设计不当，会增加系统的复杂度。
2. Knowing this, the real question isn't whether to build an API, but how to build it.
3. 比较好的方式是遵循关注分离的设计原则，将业务逻辑与对应用例的应用逻辑进行隔离，将业务逻辑放在一个具有高度内聚性的领域层(api)中，而展示层（即网站、桌面或移动应用）通过应用层间接地调用相应的业务逻辑。

####Java9新功能之HTTP2和REPL     
1. <http://www.infoq.com/cn/articles/Java9-New-HTTP-2-and-REPL?utm_source=infoq&utm_medium=popular_widget&utm_campaign=popular_content_list&utm_content=homepage>    
1. Java9将添加对HTTP2的支持，HTTP2协议是基于SPDY开发的，google将于2016年放弃支持SPDY。
2. Java9另外一个重要的功能是对REPL的支持（JShell），即命令行式的交互。

####在地图战场延伸到室内前，腾讯先投了家公司做准备     
1. <http://36kr.com/p/5036364.html>
1. 讲解了目前室内定位的技术，包括近领法定位、wifi指纹定位、三角测量定位、惯性测量定位、地磁信息定位。
2. 腾讯收购了sensewhere主要利用wifi、蓝牙进行定位。而百度投资的indoorAtlas是基于地磁信息定位。

###2015-08-17  
####移动时代的前端加密     
1. <http://div.io/topic/1220#>   
1. 文中讲了许多前段加密算法，第一个技术方案的核心思想就是增加阅读、解密的难度，降低代码可读性。
2. 其他技术包括：执行字符串代码，将js放入其他位置如png、css（content中）,防止开发者工具，混合加密等。

####Facebook移动端照片预览背后的技术        
1. <http://www.infoq.com/cn/news/2015/08/facebook-photo-preview?utm_source=infoq&utm_medium=popular_widget&utm_campaign=popular_content_list&utm_content=homepage>   
1. 在2g(32k/s)网络下,在请求封面的时候会有两个请求：GraphQL获取图片URL和通过URL从CDN获取图片。这一过程会异常缓慢
2. facebook设计在GraphQL请求的时候，返回200B大小的缩略图，采用JPEG压缩，并且将JPEG固定的头信息放到App里面，获取图片内容后，在通过App组装成JPEG图片。并且为JPEG中因图而异的Huffman表，增加版本号，以便对Huffman添加版本控制。

###2015-08-24   
####Web 研发模式演变  
1. <https://github.com/lifesinger/lifesinger.github.com/issues/184>                
1. web1.0 ，页面由java、php在服务器生成，浏览器只负责展示。
2. 后端为主的MVC时代，在第一种模式的基础上，以后端为出发点，对Web Server分层架构，比如Structs、Spring MVC。
3. Ajax带来的SPA时代：Ajax的兴起、以及CDN托管html、css、js等静态资源，前后端的关键协作点转为Ajax接口。但这种模式只是将服务端的代码复杂度挪到了前段。
4. 前段为主的MV*时代，对前端架构进行分层。如Backbone、AngularJS。
5. Node带来的全站时代：第三、四中模式，依旧是把繁重的JS代码放在Browser中，通过Node带来前后端分离，Browser进行展示页面，Node处理路由、模板、`应用逻辑`，而后端专注于处理`业务逻辑`。

####module-loader-webpack-vs-requirejs-vs-browserify    
1. <http://hackhat.com/p/110/module-loader-webpack-vs-requirejs-vs-browserify/>
1. 这篇文章做了requirejs、webpack、browserify的比较，总得来说:      
1. requirejs是属于纯browser js，只要在页面中引入js即可；而webpack、browerify属于在部署前预编译本地js文件，对本地js文件打包，browserify直接引入打包后的js文件。
2. 基于第一条的特性，webpack、browserify支持nodejs modules，以及nodejs modules的书写格式。

####Google V8的垃圾回收引擎    
1. <http://www.infoq.com/cn/news/2015/08/Google-V8>    
1. V8采用的是分代(Generational)垃圾回收器，将内存分为新生代和老生代。
2. 新生代采用scavenge算法，即移动-复制的策略。若果一个对象经多次移动，仍存在，对象将移动只老生代。
3. 老生代采用mark-sweep、mark-compat的结合。主要采用mark-sweep，当内存不足以分配给从新生代晋升的对象的时候，采用mark-compact(移动内存，效率最低)。
4. 对堆栈执行大回收时，时间跨度可能超过100ms，这种全停顿会使页面卡着，因此V8使用增量标记的算法，把完整的标记分成许多部分，每执行一部分停下来，让javascript线程执行一会。

###2015-08-31   
####Why Moving Elements With Translate() Is Better Than Pos:abs Top/left    
1. <http://www.paulirish.com/2012/why-moving-elements-with-translate-is-better-than-posabs-topleft/>   
1. 当left发生变化的时候，浏览器中的变化从Recalculate Style -> layout -> update Layer Tree -> Paint ->Composite Layers.
2. 通过translate平移，浏览器中的变化从Recalculate Style -> Composite Layers。中间比left的方案少了更新dom tree的过程，所以效率会更高。

####微信ANDROID客户端-会话速度提升70%的背后       
1. <http://mp.weixin.qq.com/s?mid=207548094&idx=1&sn=1a277620bc28349368b68ed98fbefebe&__biz=MzAwNDY1ODY2OQ==>  
> 提升Android会话打开速度优化
1. 使用Fragment代替Activity，实现会话窗口的重用。
2. 优化sqllite索引结构，采用数字代替字符串作索引，降低关键字段的大小。

####Javascript高性能动画与页面渲染        
1. <http://www.infoq.com/cn/articles/javascript-high-performance-animation-and-page-rendering>             
1. 页面显示是一帧一桢的，使用setTimeout、setInterval并不能保证在理想的桢显示之前触发，会有延迟。并且使用Timer会有丢帧的可能，以及setInterval的性能问题。
2. 建议使用新接口[requestAnimationFrame](https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame):在渲染下一桢之前所要做的函数。如果回调函数过于耗时，requestAnimationFrame会降低帧数，保证帧数的稳定性，动画的连串性。
3. html在浏览器中会被转化为DOM树，DOM树的每一个节点都会转化为RenderObject, 多个RenderObject可能又会对应一个或多个RenderLayer。浏览器渲染的流程如下：
    1. 获取 DOM 并将其分割为多个层(RenderLayer)
    2. 将每个层栅格化，并独立的绘制进位图中
    3. 将这些位图作为纹理上传至 GPU
    4. 复合多个层来生成最终的屏幕图像(终极layer)。
4. 一般使用3d属性(perspective、tranlate3d等)、css动画、css滤镜、以及3d canvas均可以创建一个独立的layer，layer的样式改变，影响的只是自己，并不会引起repaint。这也是css动画、变换性能比较高的原理。
5. Too much of a good thing is often a bad thing。太多layer的时候，会引起页面动画的抖动。[Apple首页动画分析](http://wesleyhales.com/blog/2013/10/26/Jank-Busting-Apples-Home-Page/)
6. 关于使用tranlate3d代替tanslate2d，会启用GPU来渲染动画，在大多数浏览器中会更流畅。<http://jsperf.com/translate3d-vs-xy/28>

####How (not) to trigger a layout in WebKit     
1. <http://gent.ilcore.com/2011/03/how-not-to-trigger-layout-in-webkit.html>   
1. <http://webcache.googleusercontent.com/search?q=cache:DUblmOr9XskJ:gent.ilcore.com/2011/03/how-not-to-trigger-layout-in-webkit.html+&cd=1&hl=en&ct=clnk&gl=hk>  
1. Parts of the render tree (or the whole tree) will need to be revalidated and the node dimensions recalculated. This is called a reflow, or layout, or layouting.
2. what triggers layout? 文中列举了一些能引发回流一些属性和方法。如获取属性clientHeight、client*、scroll*、offset*等，这些获取属性的操作均是比较耗时的。

###2015-09-07   
####尾调用     
1. <https://zh.wikipedia.org/wiki/%E5%B0%BE%E8%B0%83%E7%94%A8>     
1. 尾调用定义：指一个函数里的最后一个动作是一个函数调用。
2. 特性：尾调用的重要性在于它可以不在调用栈上面添加一个新的堆栈帧——而是更新它。不会增加堆栈的深度。
3. 语言标准一般都要求编译器或者虚拟机去实现尾调用优化，即在尾调用的情况下，尾部函数的堆栈去更新调用函数的堆栈，而非新建堆栈。
4. 可以利用尾调用去优化一些函数或者递归：

>原函数实现：

    function factorial(n) {
        if (n === 1) return 1;
        return n * factorial(n - 1);
    }

>函数优化

    function factorial(n, total) {
        if (n === 1) return total;
        return factorial(n - 1, n * total);
    }

###2015-09-14   
####Configuring Web Applications    
1. <https://developer.apple.com/library/ios/documentation/AppleApplications/Reference/SafariWebContent/ConfiguringWebApplications/ConfiguringWebApplications.html>     
2. 在iphone上，我们可以使用apple-touch-icon以及apple-mobile-web-app-capable一起结合去为一个html5页面创建一个本地app快捷方式。

####Safari开始支持WebRTC    
1. <http://www.infoq.com/cn/news/2015/09/webkit-webrtc-safari>     
1. WebRTC是基于浏览器端对端的实时通信接口，只要支持通过浏览器进行点对点视频、音频。
2. PC端firefox、webkit基本上都支持，移动短android4.4也开始全面支持，这次safari添加支持，是对移动浏览器视频、音频上迈进的一大步。

####Node.js Web应用代码热更新的另类思路     
1. <http://div.io/topic/1024>  
1. 热部署的原理是监听模块即文件变化，用新模块覆盖老模块。更细化的粒度是将当前请求应用于`老模块1`，同时建立`新模块1`，当新的请求来临时，应用于`新模块1`，当下一次热更新时，杀死老模块，`新模块1`变成了`老模块`。
2. nodejs模块加载位于require.cache数组里。这篇文章讲述了`如何关于更新模块代码`、`如何使用新模块处理请求`、`如何释放老模块的资源等关键问题`。

####浏览器允许的并发请求资源数是什么意思？
1. <http://www.zhihu.com/question/20474326>    
1. 浏览器并发下载资源的请求数一般不会超过8个。浏览器限制并发数是在于自我保护：基于端口数量和线程切换开销的考虑、keep-alive使得复用连接比新建连接更好、将所有请求一起发给服务器，肯能会引发服务器的并发阈值控制而被ban(一个网页100+个资源请求都正常)。
1. domain hash：将页面资源放置于多个域名下，增加并发数，提高加载速度(domain hash)，一般控制在2-4个，过多会增加域名解析的代价;
2. cookie free：并且将静态资源放至于不同于主站的域名下（cookie free），这样可以使得请求静态资源并不附加主站的cookie，减少请求数据；
3. css-spirit、js/css combine、max expires time、loading images on demand

###2015-09-21

####There are only two hard things in Computer Science: cache invalidation(缓存失效) and naming things(命名). -- Phil Karlton####

####在使用缓存时应该注意哪些问题？   
1. <http://www.infoq.com/cn/news/2015/09/cache-problems>
1. 缓存数据难以推断
2. 缓存数据可能导致"视觉"bug
3. 涉及缓存的行为难以重现
4. 访问模式变化可以损害性能
5. 进程内缓存可能会增加GC压力
6. 缓存失败恢复困难

####Mcrouter 介绍 —— 来自 Facebook 的 memcached 协议路由器      
1. <http://www.oschina.net/translate/introducing-mcrouter-a-memcached-protocol-router-for-scaling-memcached-deployments>   
1. Mcrouter是memcached的一层proxy，充当路由的角色，对外提供的协议和memcached一致，对内充当memcached的一个客户端，管理memcached。
2. 他有很多特性：支持标砖开源的memcached ASCII编码、连接池、多种灵活的散列方法、`前缀路由`、热加载、Destination心跳监测和自动故障转移等等。

###2015-10-12
####在网页布局中合理使用inline formating context（IFC）
1. <http://blog.ohweb.cn/archives/category/fe>
2. 利用IFC，纵向撑开容器标签，其余标签`vertical-align:center`以达到垂直居中的效果。

####HTML5 File API
1. <http://www.w3.org/TR/FileAPI/>
2. HTML5 FileApi 包括5个方向的内容：
3. FileList: file的array在`<input type="file">`，对象上。
4. File对象，包括一个文件的只读属性，如name、lastModified、type、size等。一个File也是一个Blob对象。
5. Blob对象，代表一个二进制数据块序列，只有三个属性size、type、isClosed。
6. URL schema对象：代表一个Url schema类型的文件。如blob:550e8400-e29b-41d4-a716-446655440000#aboutABBA;对象。
7. FileReader: 提供对一个文件的读取的接口、读取过程的各个时期的回调。readAsArrayBuffer、readAsText、readAsDataUrl

###2015-10-19
####如何安全的存储密码
1. <https://www.textarea.com/zhicheng/ruhe-anquan-di-cunchu-mima-5/>
2. <http://wooyun.org/bugs/wooyun-2015-0147763>
3. 这次爆料的网易邮箱密码泄露造成了巨大的损失，导致与网易邮箱相关的Apple id被泄露，许多iphone变板砖。
4. 网易邮箱密码被脱裤，并且其中的密码存储为MD5存储，极不安全。
5. 对于密码设置，建议开启二次认证。

###2015-11-01
####Java重写方法与初始化的隐患
1. <http://www.jianshu.com/p/cdc5adb40bb7>
2. 这篇文章主要探索了java继承上，创建子类时，编译器执行过程。
3. new 的执行过程：父类static成员 -> 子类static成员 -> 父类普通成员初始化和初始化块 -> 父类构造方法 -> 子类普通成员初始化和初始化块 -> 子类构造方法；

####腾讯防刷负责人：基于用户画像大数据的电商防刷架构
1. <https://mp.weixin.qq.com/s?__biz=MzAwMDU1MTE1OQ==&mid=400931866&idx=1&sn=b96873fc9f726e5705b2653968f1d992&scene=1&srcid=1029bMwQzFXIWKas14S0Cyor&uin=OTczMTMzNTU%3D&key=04dce534b3b035ef61bf9200a04e26cedb8e765505d5dd6553e2c0ab7c53a2edb16aa4c5b9ed187ca83769718e3f8b3d&devicetype=android-19&version=26030531&lang=zh_CN&nettype=WIFI&pass_ticket=Nv1oVMXGQwC47iakTG6UYbJI8Eim5As86lnVY57SNh8%3D>
2. 采用多纬度进行分析，如手机、帐号、ip等。每种纬度根据平台、业务设置不同的权重；各个纬度根据不同的用户的属性设置不同的标签（画像）作为判断依据，如IP画像：代理IP、国外IP、肉鸡IP等等，设计标签采用网络爬虫、业务建模的结合方式。
3. 设置多纬度结合的黑白名单方式，减少对正常用户的误伤。
4. 防御系统与业务分类。

####百度统计js被劫持用来DDOS Github
1. <http://drops.wooyun.org/papers/5398>
2. <http://www.netresec.com/?page=Blog&month=2015-03&post=China%27s-Man-on-the-Side-Attack-on-GitHub>
3. 国外IP访问<http://hm.baidu.com/h.js>会获取到恶意的js代码，形成DDoS攻击。
4. 估计是GFW被拦截。显示了GFW被动防御之外的全民DDoS功能。

###2015-11-08
####如何让IE支持HTML5新元素
1. <http://varhi.com/%E5%A6%82%E4%BD%95%E8%AE%A9ie%E6%94%AF%E6%8C%81html5%E6%96%B0%E5%85%83%E7%B4%A0/>
2. <http://programmers.stackexchange.com/questions/172918/custom-html-tags-are-there-any-specifications-stating-a-standard-way-to-handle>
3. html在遇到不认的标签时，在w3c标准中，定了一个HTMLUnknownElement接口定义这类标签。通常解析行为：忽视这种未知标签（什么行为也没有），继续解析未知标签的子标签。在dom树中，结构层次按照原来的结构层次。
4. 在IE6-8中，未知标签的开始标签、结束标签分别解析成一个标签，并且和未知标签的子标签并列。
5. document.createElement可以创建未知元素。

###2015-11-16
####1号店11.11：秒杀排队系统设计理念
1. <http://www.infoq.com/cn/articles/yhd-11-11-queuing-system-design?utm_source=infoq&utm_medium=popular_widget&utm_campaign=popular_content_list&utm_content=homepage>
2. 一号店应对秒杀场景，突然提高的服务访问，有一个秒杀排队系统，设计理念如下:
    1. 限流：只有少数消费者能抢购到秒杀商品，意味着大部分用户流量传入后台都是无效的，这样对系统的压力就小许多。
    2. 削峰：瞬时高峰流量对系统的冲击力很大，一个设计思路是将瞬时高峰流量拉平，使得系统可以在自己处理能力范围内处理请求。
    3. 异步处理：有了第二条削峰的理念，所有的请求是都是异步处理，在前端提示用户"抢购成功，订单正在处理"。
    4. 用户体验：无论是哪一种情景，都要对用户有提示，让用户得到充分的信息。


###2015-11-23
####WebKit私有属性
1. <http://www.smashingmagazine.com/2011/05/the-future-of-css-experimental-css-properties/>
2. <http://www.css88.com/webkit/-webkit-line-clamp/>
2. <http://blog.csdn.net/hursing/article/details/9186199>
3. -webkit-*有许多私有属性，我们比较常见的有:
    + `-webkit-appearance:none`:改变控件的样式
    + `-webkit-tap-highlight-color:rgba(0,0,0,0);`:控制点击连接、文本框对象、图片时的高亮样式。
    + `-webkit-touch-callout:none`:在safari下，长按页面的链接、图片，会出现系统默认的菜单项，使用none可以禁用。
    + `-webkit-text-size-adjust:none`:在屏幕旋转时，有些屏幕字体大小会自己调整，使用此选项可以禁用文字自动调整大小。此属性不继承、一般加在body上即可。
    + `-webkit-user-select: none`:禁止页面文字选择。此属性不继承、一般加在body上即可。
    + `-webkit-overflow-scrolling:touch`:iphone safari下支持的属性，页面的弹性滑动，使用该属性会创建一个新的stacking context,里面的元素超出会弹性滚动。在safari中实现，是为该属性创建一个原生UIScrollView，所以滚动起来更顺畅、流利。这个属性也是为了解决有时候部分移动浏览器块元素的滑动是页面在滑动。

###2015-12-07

####浏览器中有哪些事件会冒泡？
1. <http://segmentfault.com/q/1010000000687977/a-1020000000688757>
2. 并不是每一个dom event事件都可以冒泡，`event.bubbles`事件用来标识它是否可以冒泡。
3. abort、blur、error、focus、load、mouseeneter、mouseleave、resize、unload这些事件不可以冒泡。

####主流HTML5游戏框架的分析和对比（Construct2、ImpactJS、CreateJS、Cocos2d-html5)
1. <http://blog.csdn.net/lw61186938/article/details/12165131>
2. 开源引擎中，three.js是最火的，但是仅限于开发3D游戏。其次是CreateJS，由Adobe官方赞助且采用Flash类似的API以及模块化开发，是Flash开发者以及将Flash游戏转换成html5不可多得的选择。Turbulenz虽然开源时间比较晚，但颇有后来者居上的趋势，由于其对2D和3D的同时支持，是同时开发2D和3D游戏的最佳选择。LimeJS与Crafty相比的优势在于有一个公司进行维护，相比个人要更稳定，但是需要依赖于Google Closure，也使之成为一个重量级的框架。Crafty体积小、轻量级，更适合于小游戏的开发。Cocos2d-html5作为国产框架的一个优势在于中文文档和教程多，且得到了Google的支持，但相比ImpactJS、CreateJS仍不够成熟。melonJS、Quintus、lycheeJS的开发者和使用者都较少，相关文档和教程也相对少，还有待观察。

###2015-12-14
####界面之下：还原真实的MV*模式
1. <https://github.com/livoras/blog/issues/11>
2. MVC最早是用于PC客户端的，view通知controller，contoller判断调用model接口，model处理业务逻辑(service)，而View通过observer监听Model，当model变化的时候，view会更新。
3. 当MVC应用到Web上的时候，已经不是严格的MVC，当服务器收到来之View的请求，controller进行处理，对Model对处理，Model执行完业务逻辑之后，controller用数据渲染渲染新的View，返回给客户端。
4. MVP（Model-View—Presenter）：这里把controller替换为presenter，所有的交互都通过presenter，view调用presenter，presenter修改model；model通知Presenter发生改变，Presenter通知View去更新视图。
5. MVVM(Model-View-(View-Model)): 和MVP相同，这里把Presenter替换成View-Model，但在view-Model中存在一个Binder，用于Model和View的自动化绑定。以前由Present处理的View和Model的数据同步交由Binder处理。只要显示声明View的内容和Model的哪一个数据绑定即可。

###2015-12-21
####占领微博微信们的信息垃圾，Facebook 是怎么处理的？
1. <http://36kr.com/p/5040803.html>
2. Facebook使用一个sigma的系统来处理用户所做的任何事情，机器学习是整个sigma的核心。比如，如果一个用户的10的好友请求，9个被拒绝，那么第10个就会被系统拒绝。
3. 新闻流排序：一个用户每天3000多条新鲜消息，系统会排序只显示40多条，对于每一个内容，根据用户的点赞、分享、评论等各方面行为打分，按照得分顺训对新闻排序。
4. A/B测试：如何评价一个算法的优劣，使用A/B测试，选择两组数量相同的用户，使用不同的算法，根据结果进行比较。

###2016-01-04
####前端性能优化 - 资源预加载
1. <http://bubkoo.com/2015/11/19/prefetching-preloading-prebrowsing/>
2. 我们可以使用一些`link`标签，告诉浏览器做一些预加载是事情，如`<link rel="dns-prefetch" href="//example.com">`可以告诉浏览器提前解析dns.
3. 还有一些如`subresource`、`prefetch`、`preconnect`、`prerender`。

####iOS 9对前端做了什么？
1. <http://mp.weixin.qq.com/s?__biz=MTEwNTM0ODI0MQ==&mid=401732243&idx=1&sn=b4774767c1909565d674ad992d703fd4>
2. 对于html而言，多了`force touch`的一些事件
3. css supports在css中做一些特性监测。
4. 新css属性,`backdrop-filter`(背景滤镜效果)、`CSS Scroll Snapping`(滚动过渡效果)、css4的伪类支持。

###2016-01-11
####[ISUX译]我为css变量狂
1. <http://isux.tencent.com/why-im-excited-about-native-css-variables.html>
2. 最新版chrome中已经添加了对css内置变量的支持。
3. 不同于想sass、less这些预编译器的变量，css的变量可以说是动态的，可以真正的和其他属性如@media query等协同。

###2016-01-18
####Node.js背后的V8引擎优化技术
1. <https://mp.weixin.qq.com/s?__biz=MjM5MjAwODM4MA==&mid=402199727&idx=1&sn=a15c727229692a89770cab0cd5679d5e&scene=0&key=710a5d99946419d97b87d22cbefa1f2560ee24b8ccfb826db902cfa221e67120a70011e5792c271acdadcd00ec5e6ce9&ascene=0&uin=ODA4NDU3MDIw&devicetype=iMac+MacBookPro11%2C3+OSX+OSX+10.11.3+build(15D21)&version=11020201&pass_ticket=YfiIp2%2FwJd3Hpz0YdaIEuPrd2M%2BzpizjYT4z2PWUHAX1eGmDoHplLb71r2MQw1uz>
2. V8引擎的隐藏类：每个对象只是一个数据内存块，相同结构的对象都会使用一个相同的隐藏类来解析这个对象。
    >隐藏类的教训：1. 永远在构造函数中初始化所有对象的成员；2. 总是以相同的顺序初始化类的成员；3. 从不用delete删除莫个对象的属性。（避免产生过多的隐藏类）
3. Optimized和Deoptimized：js原本是解释型的实现，但现在基本都是运行时编译的实现。V8有两种不同的运行时编译器，为`unoptimized`（完全编译器，编译代码速度超快，使得初次执行代码速度很快）和`optimized`（优化编译器，当v8引擎发现某块代码执行很热的时候，会把代码优化，生成Optimized代码，执行速度超快）。但编译器有可能执行Optimized代码失败，形成`Deoptimized`，退回到`unoptimized状态`，更极端的情况是v8引擎有可能会不断的被optimized,然后失败，被Deoptimized，会极大的浪费性能。
    >目前v8无法优化forin 和trycatch，有可能会存在一直optimized和deoptimized。
4. 闭包、timer都是很容易会引起内存泄露。要注意！！！
    >如在外部有引向闭包的大对象，导致对象无法释放；在一个object的timer中不断的调用自己，导致该object无法释放。

###2016-01-25
####22个CSS黑魔法
1. <http://www.ido321.com/1665.html>
2. 渐变边框的实现：利用伪类较低的z-index+渐变背景
3. 黑技术实现复选框和单选按钮：`input[type=checkbox] {display: none;}input[type=checkbox] + label:before{}input[type=checkbox]:checked + label:before{}`
4. `position:sticky`，类似于fixed，但sticky相对于`相对父元素`.
5. 新的尺寸`vh:viewport height`和`vw:viewport width`，1vw表示浏览器窗口宽度的1%；1vh表示浏览器窗口高度的1%；最重要的是所有浏览器都支持。
