---
layout: post
title: 学习：烂笔头
class: mylbs
styles: mylbs
---

##学习笔记

####js监听css animaiton、transition结束事件    
可以监听animationend、transitionend事件。但在移动端下测试，监听不到这两个事件.

####当请求是一个文件夹时http://127.0.0.1:8080/zt,这种请求方式会请求两次，发生重定向

####BFC:block formatting context          
1. 内部的Box会在垂直方向，一个接一个地放置。
2. Box垂直方向的距离由margin决定。属于同一个BFC的两个相邻Box的margin会发生重叠
3. 每个元素的margin box的左边， 与包含块border box的左边相接触(对于从左往右的格式化，否则相反)。即使存在浮动也是如此。
4. BFC的区域不会与float box重叠。
5. BFC就是页面上的一个隔离的独立容器，容器里面的子元素不会影响到外面的元素。反之也如此。(其他几条都在体现这个)
6. 计算BFC的高度时，浮动元素也参与计算

####Everything in UNIX is a file.     
1. 网络连接，如socket等
2. 输入输入，如设备
3. 管道
4. 终端
5. 实质文件
6. 、、、

####正则表达式三种匹配模式   
X?、X*、X+、X{m，n}     

1. 最大匹配（贪婪型，占有型）
2. 最小匹配
3. <http://mmqzlj.blog.51cto.com/2092359/788826>
4. X？、X*、X+、X{n}、X{n，}、X{n，m}这些为最大匹配
5. X？？、X*？、X+？、X{n}？、X{n，}？、X{n，m}？这些为最小匹配，多加一个？号

####Viewport  
<https://developer.apple.com/library/ios/documentation/AppleApplications/Reference/SafariWebContent/UsingtheViewport/UsingtheViewport.html>     

1. viewport是移动浏览器的页面的可视区域，如果不设置viewport，移动浏览器会默认以宽度980px加载页面，然后缩放适应屏幕。
2. 可以设置viewport的width为固定像素，但一般设置为device-width（特殊值）。

####document.DOMContentLoaded vs window.onload     
1. DOMContentLoaded实在dom树构建完成后就执行。
2. 而onload要等到页面所有的dom树、样式表、脚本、图片、flash等都加在完成才执行。

####visibility:hidden vs display:none     
1. visibility:hidden 占据空间位置；display:none不占据空间位置，显示时可能会发生repaint
2. visibility:hidden情况下，animation在隐藏状态下就已经触发，而display:none是不会触发animaation的，除非display:block;

####webkitAnimationEnd、webkitTransitionEnd    
在移动端下，动画、过渡效果结束要监测webkitAnimationEnd、webkitTransitionEnd事件，监测animationEnd、transitionEnd是无效的。

####script标签动态添加，哪一个先加载完先执行哪一个

####addEventListener 与 element.on*    
使用addEventListener和（element.onclick onload）等添加事件，两种方式之间是相互独立的。彼此之间并不会发生覆盖事件。但是在引入其他模块的情况下，尽量不要使用window.onload，防止覆盖其他模块的事件。

####浏览器缓存的一些说明    
1. <http://www.cnblogs.com/skynet/archive/2012/11/28/2792503.html> 
2. 当浏览器第一次访问一个文件的时候，服务端会返回一些头信息。有expires、cache-control、last-modified、etag等，用于做缓存的一些配置。etag是文件唯一标识符，last-modified文件修改时间，expires、cache-control是设置文件的缓存时长。
3. 当浏览器第二次访问该文件的时候，会先检查expires、cache-control，如果这两个属性标志的缓存没有过期，则直接使用缓存，不去请求（CDN服务器一般设置该属性1年甚至10年）；如果文件缓存已经失效，然后会去相继匹配etag、lasted-modified，并且去重新请求服务器，查看文件在这一段时间内有没有发生更新，若服务器返回304，表示没有更新，继续使用缓存，同时更新缓存的时间戳，如果服务器返回200，则用新的文件替换缓存。
4. Cache-Control是http1.1的实现，Pragma、Expires是http1.0的实现。如果设置Cache-Control:no-cache，要同事设置Pragma:no-cache，兼容http1.0；Cache-Control:max-age=*会覆盖Expires。
5. 对没有特殊设置缓存的服务器而言，一般会返回last-modified、etag属性。 
<img src="/collections/httpcache.png" alt="">       


####querySelectorAll性能    
通常来说querySelector的性能优能，但在通过Class名选择元素的这一项是不如getElementByClassName的。

####关于移动浏览器下的ele.style      
1. ele.style只能获取标签上的style属性的值。
2. 在部分移动浏览器下，style.transform等一些属性是无法设置，也无法获取的。可以通过cssText设置，获取。
3. style.cssText是值标签上style的值，设置新的cssText会使之前的标签style上的属性失效(完全覆盖)。

####z-index与stacking context      
1. z-index只对position为非static有效
2. z-index只决定该box在当前stacking context中的位置.
3. stacking context对内：Within a stacking context, child elements are stacked according to the same rules previously explained. Importantly, the z-index values of its child stacking contexts only have meaning in this parent. 
4. stacking context对外：Stacking contexts are treated atomically as a single unit in the parent stacking context.
5. <https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Positioning/Understanding_z_index/The_stacking_context>，创建stacking context的元素见上链接，主要的有transform ,opactity , position && z-index.

####CSS Image Values and Replaced Content Module Level 3  
<http://www.w3.org/TR/css3-images/>     
文章中定义了css3关于image、object类型的定义以及sizing、position，统一称为object

1. object sizing算法：明确的width、height > 保持高宽比 > contain约束 > 标签默认大小。(contain约束包括:object-fit、background-size)
2. 适用于object sizing的属性：`background-image`、`list-style-image`、`border-image`、`cursor`、`content`。
3. object-fit(fill、cover、contain)、object-position是定义object类型的计算布局尺寸、定位的属性。

####HTTP keep-alive   
1. 普通模式(非keep-alive)的http请求，在请求结束后会断开连接。而keep-alive是持久连接，使客户端(如浏览器)到服务器的连接持续有效，当出现对服务器的后续请求时，keep-alive功能避免了建立或者重新建立连接。
2. http1.0中默认关闭keep-alive。http1.1默认打开keep-alive
3. keep-alive是客户端与服务器的交互方式，需要双方的支持。

####服务器缓存ehcache、memcached、redis     
1. 缓存就是在内存中临时存在一些高访问的数据，以提高查询效率。对于单服务器模式而言，缓存比较简略，以下均为集群模式下的缓存说明。分布式集群下一般都有独立的缓存服务器集群统一提供缓存服务。（当然也是可以在分布式集群中各个应用服务器提供自己的缓存。）
2. memcached在内存中以key-value形式存储，memcached本身不支持分布式，需要程序客户端（应用服务器）通过像一致性哈希这样的分布式算法来实现memcached的分布式存储（这种情况下缓存服务器添加、删除的代价是很高的）。
3. redis是在memcached写出来，本身支持多种数据结构和数据持久化，并且redis本身也支持集群分布式存储，redis集群各个服务器之间通过异步复制来保证数据一致性，但无法保证强一致性。
4. ehcache是java下的缓存框架。ehcache本身是支持分布式存储的：
    + 缓存与应用服务器一起：支持的通过RMI、JGroups(组播、广播)或JMS（消息队列）进行的异步或同步的缓存复制
    + 独立的缓存服务器：ehcache server

####http、websocket、socket      
1. socket严格来说并不是一个协议，而是对传输层TCP协议的封装，是一个facade。基本上现在的编程语言所支持的socket都是遵循`Berkeley sockets`这套API。
2. http、websocket是应用层协议，websocket就是应对于http的不足、web上的实时通信的需求产生的新协议，目前编程语言也在添加支持，java7已添加支持。

####js继承  
js继承链上，可以临时创建一个过度函数，避免构造函数需要参数而无法提供。这种方法继承只继承原型脸上的方法。
        
    Function.prototype.methodSingleton = function () {
        if (this._msingleton) {
            return this._msingleton;
        }
        //use a tmp constructor , it results only method object
        //avoiding this.prototype.constructor needs param to init it;
        function tmpCtr () {
        }
        tmpCtr.prototype = this.prototype;
        this._msingleton = new tmpCtr();
        return this._msingleton;
    }

####json、xml、protocol buffer
1. json、xml、pb都是网络数据传说协议，都需要发送方和接收方约定好。
2. json、xml传输的是一种语义化的格式数据，而pb传说的是二进制的数据格式，相对来说比较安全，更轻量。
3. json、xml在各语言编译器或者库中都有实现编码解析。而pb则使用双方约定好的`*.proto`定义数据格式，编码、解析的代码相对就会少一些。

####非刷新上传文件的实现
1. form target属性指定隐藏的iframe。监听iframe的onload事件获取上传是否成功。并且可以以轮询的方式请求上传的进度，但需要后端的配合。
2. XMLHttpRequest2.0支持发送文件，有两种方法：1.直接send(file) 2. formdata

####V8引擎在第一次扫描的时候就确定某些闭包里该存在哪些变量，如果有闭包的函数中没有使用某个变量，那么闭包中是不存在这个变量的。在调试的时候，动态访问函数体外围中的、但又不被函数体使用的变量，会报错。

####document.referrer属性返回载入当前文档的文档的URL，如果当前文档不是通过超链接访问的，怎为null。这个属性是访问Http header得到的。

####单页应用案例：网易云音乐http://music.163.com/#/artist?id=7828
1. 当点击底部音乐barnner上的歌曲与作者时，页面会动态改变，但音乐不会停止。
2. 点击歌曲与作者，改变的是URL上的#后面的hash值，并不会引起页面刷新，因此音乐不会停止。
3. 页面真正的内容区域是通过一个全局的iframe标签加载出来的。iframe监听的是hash值的变化，动态加载来改变内容。

####关于浏览器下载图片：需要服务器设置`Content-Disposition=attachement;filename=xxxx`；如果只有`Content-Disposition=attachement`按原文件名下载。

####location.href
1. <http://www.cnblogs.com/yeer/archive/2013/01/21/2869827.html>
2. http请求不包括hash，只包括href+search
3. 改变hash并不会引起网页重载
4. 改变hash会改变浏览器的访问历史
5. html5中有一个新增的事件 onhashchange事件.

####jQuery的attr与prop
1. <http://www.cnblogs.com/dolphinX/p/3348582.html>
2. jQuery的attr内部使用setAttribute和removeAttribute，对attribute属性更改都会落实到html上。
3. jQuery的prop方法，用的是对应dom对象的属性字段property。对property的更改，影响的dom对象的属性。
4. attribute、property共享一些数据，任何一个更改都会影响双方，如type、id等。
5. 但并不是所有的attribute和property名字都一样，如class（attribute）和className（property）
6. 对于true/false的property，如checked等，attribute取得的是HTML文档的字面量，proptery取得的是计算结果，property的改变并不影响attribute字面量，但attribute改变一定会影响property的计算。
7. 对于一些路径相关的属性，如href，property和attribute的值也不想同，attribute取得的是字面量，而property是完整路径。

####css3 box-shadow
1. <http://www.cnblogs.com/gaoxue/articles/2287311.html>
2. inset可以设置成内阴影
3. inset阴影对于img元素是无效的，我们可以用一个div标签包裹img标签，把box-shadow应用到div标签上；或者在img的父标签上应用:after,:before上。
4. :hover:after是可以共用的。

####:hover :after
1. <http://stackoverflow.com/questions/5777210/how-to-write-hover-condition-for-abefore-and-aafter>
2. 在css的标准中:
  >  One pseudo-element may be appended to the last sequence of simple selectors in a selector.
  所有的伪元素必须在一系列选择器的最后。
3. :after、:before这些是伪元素；:hover、:visited等这些是伪类，也是selector的一种。
4. 因此合并使用:hover :after的时候，可以先定义div:after通用样式，然后在定义div:hover:after，div:hover下的特定样式。
5. 这样也说明伪元素只是纯粹的内容元素，并不能和正常元素一样有hover等效果。  

eg:scss语法:

    &::after{
        content: url(images/RelativeProjectsArr.png);
        margin-left:30px;
    }
    &:hover{
        &::after{
            content: url(images/RelativeProjectsArrHover.png);
        }
    }

####input[type=color] 
js调起调色板，关键在于该input不能为hidden，可以使用绝对布局飞出页面，使用`js trigger click`

####html style、currentStyle、getComputedStyle
1. style只能获取html标签上style属性设置的值。
2. currentStyle(ie)、getComputedStyle(ff)这些是可以获取runtimeStyle即标签的实时style。

####history
1. history.pushstate、history.replacestate可以在不刷新页面的情况下改变location.href.

####XSS cross-domain site scripting
1. 反射型XSS，非持久性XSS，比如我们有一个搜索接口，`http://www.xxx.com/search?name=xyz`，这里我们把xyz替换成`<script>alert("xss")<script>`，在接口的返回页面，`<script>alert("xss")<script>`会被当做结果插入到页面之中，就相当于一个script标签，就构成了一次XSS。
2. 存储型XSS，比如某一个论坛网站，某个用户发帖里面有`<script>alert("xss")<script>`，当其他用户去访问该用户的这个帖子时，如果不做处理，相当于页面插入了script标签，构成了一次XSS，在这里用户的cookie等信息都不在安全。

####SQL注入，sql注入可以获取用户的信息，严重的sql注入会形成脱库的严重情况。
1. 比如一个登录页面，有username和password两个字段，如果不做处理，一般会执行`select * from table where username = 'mary' and password = '***'`，但如果一个黑客在登录页username中输入`mary --`，这样sql查询就变成了`select * from table where username = 'mary';`，就可以跳过登录验证，获取mary用户的信息。（`--`是sql的单行注释符，后面的sql语句都不会执行。）
2. 更为严重的情况，比如一个用户查询接口，`http://www.xxx.com/search?username=xyz`，执行的sql是`select * from where username='xyz'`，但是如果黑客访问`http://www.xxx.com/search?username=xyz' or '1'='1`，执行的sql就是`select * from where usename='xyz' or '1'='1'`达到脱库的现象。

####URI的保留字符`reserved = ";" | "/" | "?" | ":" | "@" | "&" | "=" | "+" | "$" | ","`

####在页面静态存在的iframe，如果改变iframe的src或者location，那么iframe的改变记录会被当做浏览器的历史记录，点浏览器的后退键，iframe中加载的页面会改变；但动态创建的iframe并不算做浏览器的历史纪录（firefox）。

####`npm install -g`一般用于安装CLI程序，这种安装的模块无法require是正确的，如果要使用require，建议使用`npm link **`;或者修改NODE_PATH。

####图像优化
1. <http://wf.uisdc.com/cn/performance/optimizing-content-efficiency/image-optimization.html>
2. 矢量图vs位图：svg是矢量图，用简单的点、线、多边形展示一个图像；png、jpg都是位图，一个个像素的保存。
3. 有损压缩vs无损压缩：gifsicle（创建和优化GIF图像）、jpegtran（优化JPEG图片）、optipng（无损png优化）、pngquant(有损png优化)
4. 位深（bit-depth）：RGB通道的总共位数。如8位-256色等。
5. PNG8：只能使用 256色,可以设置透明关系。但有两种方式分别为：索引色透明和Alpha透明。索引色透明只可以简单的指定一个像素点是不是透明（是或者不是）。而Alpha透明则可指定该像素点的透明的程度（透明度）,如30%的透明度。
6. PNG24：特别需要注意的是 PNG24是不支持透明度设定的,但其可用颜色比 PNG8 丰富的多。注：Photoshop里导出的PNG24支持透明，其实Ps导出的是PNG32
7. PNG32：PNG32不仅可以使用更多的颜色，而且还支持透明度设定。属于PNG系列中较常用的一种格式。

####cookie
1. cookie与storage一样也分为：session cookie与local cookie。
2. session cookie是那些没有指定expire时间的cookie，这类cookie在浏览器关闭的时候就会清空。

####form跨域：form表单是可以跨域的，完全可以在form的action中执行和本页面完全不同的域的请求。

####window.postMessage可以跨域、跨窗口传递消息

####DOM元素的滚动srollIntoView、scrollIntoViewIfNeeded、scrollByLines、scrollByPages
1. <http://www.cnblogs.com/meteoric_cry/archive/2011/10/01/2197172.html>
2. `HTMLElement`上面的方法，`scrollIntoView`、`scrollIntoViewIfNeeded`将元素滚动到页面可视区域；`scrollByLines`、`scrollByPages`滚动页面元素的内容。

####html5新的api
1. application cache:离线应用缓存，通过manifest来来指定缓存列表。window.applicationCache
2. localStorage、sessionStorage
3. web SQL & indexed database：openDatabase、transaction、executeSql这三个api。
4. cache api：浏览器Request/Response的缓存管理工具。window.caches
5. serviceWorker：放在前端的HTTP拦截器。navigator.serviceWorker
6. fetch api：用于简洁的捕捉从网络上检索一个资源的意图。和XMLHttpRequst对象类似，但能更好的支持promise模式。window.fetch
