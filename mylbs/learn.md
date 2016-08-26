---
layout: post
title: 学习：烂笔头
class: mylbs
styles: mylbs
---

##学习笔记

####js监听css animaiton、transition结束事件    
可以监听animationend、transitionend事件。但在移动端下测试，需要增加webkit前缀.

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
2. 当浏览器第一次访问一个文件的时候，服务端会返回一些头信息。有expires、cache-control、last-modified、etag等，用于做缓存的一些配置。etag是文件唯一标识符，last-modified文件修改时间，expires、cache-control是设置文件的缓存时长。(etag在多服务器上的同步并不好用，因此又有了last-modified)
3. 当浏览器第二次访问该文件的时候，会先检查expires、cache-control，如果这两个属性标志的缓存没有过期，则直接使用缓存，不去请求（CDN服务器一般设置该属性1年甚至10年）；如果文件缓存已经失效，然后会去相继匹配etag、lasted-modified，并且去重新请求服务器，查看文件在这一段时间内有没有发生更新，若服务器返回304，表示没有更新，继续使用缓存，同时更新缓存的时间戳，如果服务器返回200，则用新的文件替换缓存。
4. Cache-Control是http1.1的实现，Pragma、Expires是http1.0的实现。如果设置Cache-Control:no-cache，要同事设置Pragma:no-cache，兼容http1.0；Cache-Control:max-age=*会覆盖Expires。
5. 对没有特殊设置缓存的服务器而言，一般会返回last-modified、etag属性。
<img src="/collections/httpcache.png" alt="">
6. 关于浏览器刷新对缓存的控制：刷新页面会使浏览器进入协商缓存，f5/cmd+r会是header带上`cache-control:max-age=0`和`if-modified-since`，而cmd+shift+r会使浏览器带上`cache-control:no-cache`和`pragma:no-cache`。


        // http://stackoverflow.com/questions/385367/what-requests-do-browsers-f5-and-ctrl-f5-refreshes-generate
        // http://weizhifeng.net/difference-between-f5-and-ctrl-f5.html
        F5 and CTRL-F5
        ┌────────────┬─────────────────────────────────────────────────────────────┐
        │  UPDATED   │                 Firefox 3.x 4.x                             │
        │2011-04-24  │  ┌──────────────────────────────────────────────────────────┤
        │            │  │              MSIE 7 8                                    │
        │            │  │  ┌───────────────────────────────────────────────────────┤
        │            │  │  │           MSIE 9                                      │
        │            │  │  │  ┌────────────────────────────────────────────────────┤
        │            │  │  │  │        Chrome 10                                   │
        │            │  │  │  │  ┌─────────────────────────────────────────────────┤
        │            │  │  │  │  │     Opera 11                                    │
        │            │  │  │  │  │  ┌──────────────────────────────────────────────┤
        │            │  │  │  │  │  │ I = "If─Modified─Since"                      │
        ├────────────┼──┼──┼──┼──┼──┤ P = "Pragma: No─cache"                       │
        │          F5│IM│IM│I │IM│I │ C = "Cache─Control: no─cache"                │
        │     CTRL─F5│CP│C │C │CP│- │ M = "Cache─Control: max─age=0"               │
        │  Click Icon│IM│I │I │IM│I │ Click Icon= "a mouse click on refresh icon"  │
        └────────────┴──┴──┴──┴──┴──┴──-───────────────────────────────────────────┘     



####querySelectorAll性能    
通常来说querySelector的性能优能，但在通过Class名选择元素的这一项是不如getElementByClassName的。

####关于移动浏览器下的ele.style      
1. ele.style只能获取标签上的style属性的值。
2. 在部分浏览器下，style.transform等一些属性是无法设置，也无法获取的。可以通过cssText设置，获取。
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
1. application cache:离线应用缓存，通过manifest来来指定缓存列表。window.applicationCache。新版建议使用serviceWorker
2. localStorage、sessionStorage
3. web SQL & indexed database：openDatabase、transaction、executeSql这三个api。
4. serviceWorker：放在前端的HTTP拦截器。navigator.serviceWorker
5. cache api：浏览器Request/Response的缓存管理工具。window.caches。 目前仅仅支持serviceWorker。
6. fetch api：用于简洁的捕捉从网络上检索一个资源的意图。和XMLHttpRequst对象类似，但能更好的支持promise模式。window.fetch。目前仅仅支持serviceWorker。

####CSS样式优先级与!important
1. <https://www.w3.org/TR/2011/REC-CSS2-20110607/cascade.html#cascade>
2. 样式选择器权重值有四种a,b,c,d，内联样式对应a，id对应b，类与伪类对应c，元素标签与伪元素对应d。
3. 样式选择器权重比较只能是同一个水平level下的比较，一般为`author normal declarations`;!important是属于垂直level的比较，垂直方向上越往下优先级越高，如下：
    1. user agent declarations：浏览器定义的样式
    2. user normal declarations：用户自定的样式
    3. author normal declarations：网页的样式，内联、外链等
    4. author important declarations：网站的!importang样式
    5。 user important declarations：用户自定义的!important样式

####http get post
1. <http://stackoverflow.com/questions/14551194/how-are-parameters-sent-in-an-http-post-request>
1. <http://blog.csdn.net/gideal_wang/article/details/4316691>
2. http头信息首行一般是`POST /path/script.cgi HTTP/1.0`(方法，url，协议版本。如果方法是get)，如果方法是get，则会把数据紧跟url；而如果方法是post，数据在请求body里面，在请求头信息之后。
3. POST数据大小上限在协议中没有限制，tomcat默认是2M；GET方法、URL的长度在协议中也没有限制大小，但浏览器有限制URL的大小：最小的是ie（2083B--2k+53），因此URL最好不超过这么长。
4. 对于get、post而言，都是http协议，http协议的格式是：对于get请求，会把参数放到request-lint/url上；对于post请求，会把参数放到request-body中。在浏览器的表现上get的url会在地址栏展现，post不在地址栏展现（但发送的收据都是http协议的数据，从http的安全角度都是一样的）。

        <request line>(method url http版本)
        <header>(headers)
        <blank line>
        <request body>(content)

5. 使用get请求容易造成`Cross-site request forgery`攻击.        

####移动开发那些坑之——safari mobile click事件的冒泡bug
1. <http://www.tuicool.com/articles/jI3eQzr>
2. jquery、zepto在ios-safari下用body、document代理click事件，会点击无效；处理方法：添加样式body{cursor:pointer}

####关于display:none与img、背景图片加载的问题
1. 正常来说img、背景图片无论怎样都是要加载的，与`display:none`无关，但目前浏览器越来越聪明，如果判断出某张图片不需要加载，那么就放弃加载该图片；
2. 经测试：img元素无论是否`隐藏(display:none、visiable:hidden等)`均加载图片；
3. 经测试：关于背景图片：`隐藏（display:none）元素`的背景图片会加载，但被`隐藏元素`包裹的元素的背景图片不会加载。

    <div class="loading" id="loading" style="display: none;background:url(test/2.png)"> <!--背景图片加载-->
        <div class="loading-p" style="background:url(test/1.png)">  <!--背景图片不加载-->
            <img src="images/loading.gif"/> <!--图片加载-->
            <p>loading</p>
        </div>
    </div>

####XMLHttpRequest可以通过setRequestHeader()、getResponseHeader()两个方法来操作header；setRequestHeader可以覆盖一些默认的HttpRequestHeader（如accept、cache-control等等）,也可以设置一定自定义的Header（如my-header），总之浏览器是可以控制request header的。

####comet技术
1. <http://hcnode.github.io/2012/10/31/comet/>
2. long-polling实现

        特点：
            1. 服务端会阻塞请求直到有数据传递或者超时才返回。
            2. 客户端javascript响应处理函数会在处理完服务器返回的信息后，再次发出请求，重新建立连接。
            3. 当客户端处理接收的数据、重新建立连接时，服务器端可能有新的数据到达；这些信息会被服务器保存直到客户端重新建立连接，客户端才会把当前服务端所有的信息取回。
        可用载体：
            1. xmlhttprequest
            2. jsonp（以html的script标签的方式请求）
            3. flash xhr(随便跨域，无视浏览器兼容)
            4. iframe (iframe页面方式请求)

3. streaming方式实现

        特点：
            使用这种方式，每次数据传送不会关闭连接，连接只会在通信出现错误时，或者是连接重建时关闭（一些防火墙常被设置为丢弃过长的连接，服务器端可以设置一个超时事件，超时后通知客户端重新建立连接，并关闭原来的连接）。
        可用载体：    
            1. xmlhttprequest
            2. Flash xhr
            3. iframe

####浅谈浏览器端JavaScript跨域解决方法
1. <https://github.com/rccoder/blog/issues/5>
2. jsonp
3. Access-Control-Allow-Origin
4. window.name：在同一个tab标签页，window.name是共享，利用这点可以传输一些数据。
5. document.domain：子域跨域问题
6. location.hash：和window.name差不多，跳转到新页面的时候把数据加到hash中。
7. window.postMessage

####使用`ln -s source dist`不要使用相对路径，要使用绝对路径。

####在linux下，非root用户不能监听`<1024`的端口，除非有root权限。

####node require加载module的过程
1. <http://stackoverflow.com/questions/18974436/change-node-modules-location>
2. 如果不是核心模块或者不是以"/"、"./"等的模块名开始的，node按照下面的过程加载模块：
3. 在当前目录查找node_module目录，如果找到查找node_module中的莫个模块，如果找到，加载模块，没有下一步；
4. 在当前目录的上一级目录查找node_module目录，如果找到，查找项目模块，如果找到，加载模块，否则继续往上一次目录查找node_module目录，直到/根目录下；

        require("bar");
        /home/ry/projects/node_modules/bar.js
        /home/ry/node_modules/bar.js
        /home/node_modules/bar.js
        /node_modules/bar.js

5. 如果第4步没有找到相应模块，则在全局环境变量NODE_PATH下查找对应模块，有则加载，无则报错。

####MutationObserver
1. <https://developer.mozilla.org/zh-CN/docs/Web/API/MutationObserver>
2. <http://www.cnblogs.com/jscode/p/3600060.html>
3. html5里新增MutabionObserver api来异步监听dom树的变化，来替换之前的MutationEvent。
4. Mutation是异步的，会在所有dom操作结束后，以Records的形式传给回调函数。

####Npm Scripts的执行环境
1. <https://docs.npmjs.com/cli/run-script>
2. 在npm scripts可以执行的脚本有：1. PATH; 2. node_module/.bin中定义的; 3. locally-installed dependency(devDependency)这一类的也可以直接使用。
3. `npm run test -- --grep="pattern"`，这一类的npm run会直接将-- 之后的`--grep="pattern"`追加在npm run test的对应的脚本之后。

####ssh公钥、私钥、数字签名
1. <http://blog.csdn.net/21aspnet/article/details/7249401>
2. 传统的网络服务程序，如ftp、telnet、pop等，都是在网络上明文传输指令、数据，很容易被黑客劫持、篡改数据，造成破外。而ssh就是对传输数据进行加密的解决方案。
3. ssh分为公钥和私钥：公钥和私钥是对称的，他们互相**解密**；公钥加密，私钥解密；私钥加密，公钥解密（私钥数字签名，公钥验证）。点对点的加密。
4. 私钥只有自己握有，公钥可以放到服务器上。
5. 使用公钥加密的数据在网络上传播，因为只有自己才有私钥才能解密，所以数据是网络上是安全的。
6. 自己使用私钥对数据进行数字签名（加密），在其他地方公钥能解密，因公钥能解密的数据只能是私钥加密过的数据，即使别人拦截也无法对数据进行有效的篡改，最终达到身份校验的目的。
7. 我们在使用ssh对git操作的时候，就是在本地生成公钥(rsa.pub)和私钥(rsa)，并且把公钥放到服务器上，达到加密的目的。

####ssl + https
1. https就是在tcp/ip和http加了一层ssl层（数据加密）；从过程上来说，多了一步客户端、服务端双方认证的握手阶段，以及数据的加密、解密阶段。
2. 其中涉及了一个CA证书，有发布CA资格的机构对申请者的信息校验，验证通过后，将申请者信息与对齐发布的公钥的信息绑定一起，并用私钥签名，生成证书，将证书发给申请者。
3. https在握手阶段是属于非对称加密，数据传输阶段数据对称加密，在握手阶段交换双方信息、加密算法等，以后的传输数据使用相同的加密/解密算法。
4. 对https的7个误解之处：<http://www.ruanyifeng.com/blog/2011/02/seven_myths_about_https.html>

####div、label等元素标签，如果没有内容即`<div></div><label></div>`设置`width`属性将会失效。至少需要插入一个Non-breaking space(不换行)。

####js字符串多行的写法，除了模板字符串，也可以：

    var foo = "Bob\
    is\
    cool."

这种写法完全可以，但`\`仅仅是书写的多行的切割符，最终生成的是没有`\n`换行符的。

####css是case-insensitive；特别有意思的是div.style.webKitTransform 和 div.style.WebkitTransform是等效的。

####如下，child是absolute布局，脱离了normal-flow，因此parent的overflow是对child是无效的。normal-flow的元素要么是block布局，要么是inline布局，而overflow是block-container的属性。再说：absolute的元素的展示应该相对于他的offset-parent。

        <body>
            <style>
                .parent{
                    width: 100px;
                    height: 100px;
                    overflow: hidden;
                    background: red;
                }
                .child{
                    position: absolute;
                    width: 50px;
                    height: 50px;
                    background: black;
                    right: 50px;
                }
            </style>
            <div class="parent">
                <div class="child"></div>
            </div>
        </body>

####javascript函数
1. <https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions#Block-level_functions>
2. 都是用strict模式，non-strict下实现迥异。
2. ES5的严格模式规定，函数只能在顶层作用域和函数内声明，其他情况（比如if代码块、循环代码块）的声明都会报错。因为在ES5中，存在函数提升，无论在不在if块内，函数都会声明。

        // ES5
        'use strict';
        if (true) {
          function f() {} // 报错
        }

3. 而在es6中，因为引入了块级作用域。es6规定，块中申明的函数本身的作用域，在其所在的块级作用域之内，在下例中，快作用域中的函数是不会影响块作用域的外部。在es6模式下，只有快作用域是可以被执行的时候，快作用域里面的函数才能被定义。

        // ES6
        if (true) {
          function f() {}
        }
        f(); //error

4. 在es6中，只有全局声明的var、function才会绑定到全局的属性上。而let、const声明的变量全都不绑在全局属性上。从ES6开始，全局变量将逐步与全局对象的属性脱钩。

####在mac、linux下`/var/log/*.log`有各种日志，如system.log[系统各种应用调用的日志]、weekly.log[系统定时清理的日志]

####String.prototype.split
If separator is a regular expression that contains capturing parentheses, then each time separator is matched, the results (including any undefined results) of the capturing parentheses are spliced into the output array. However, not all browsers support this capability.

> 当separator是一个正在表达式的时候，如果正则表达式中有一个子串，那么每一次匹配separator，子串的值也会插入到output-array中。但不一定所有的浏览器都支持这个特性。

####127.0.0.1 localhost ::1 0.0.0.0
1. ::1是ipv6的hoopback地址。（有时候会遇到localhost:8080->err,但127.0.0.1:8080成功，就是因为`::1 localhost`的原因）
2. 电脑除了以太网接口、无线网接口，还有回路(hoopback)网络接口。127.0.0.0/8表示的就是hoopback接口的所有地址。
3. localhost便是对hoopback地址的重命名。（在window上localhost、127.0.0.1都是tcp/ip连接; 在unix上localhost走unix-socket,127.0.0.1走tcp/ip连接）
4. 0.0.0.0是特本机的所有ip地址。（127.0.0.0/8, 局域网ip，外网ip）
5. localhost/127.0.0.1定义的接口只有本机才能访问（不能通过局域网ip进行访问）。而0.0.0.0定义的接口其他主机也能访问（能通过局域网ip进行访问）。一般开发使用localhost/127.0.0.1，发布使用0.0.0.0

####document.write
1. 如果在document被打开的情况下，`<script>/* ... */ document.write('aaa')</script>`只会返回`aaa`这串文本，比如在正常的document.body插入内联的`script>document.write`。
2. 如果是document已经被关闭的情况下，执行document.write会自动调用document.open，document.open会清空document。这种情况下还要调用document.close。
3. api：document.open、document.close、document.write。

####关于DOMContentLoaded
1. DOMContentLoaded是一个可冒泡的事件，`document.addEventListener("DOMContentLoaded")`会先于`window.addEventListener("DOMContentLoaded")`触发.
2. jquery.ready是一个`document.DOMContentLoaded`的回调函数
3. DOMContentLoaded事件是指initial HTML Document被loaded和parsed，不关心stylesheets、images、subframes的loading。更重要的是script动态插入一个script标签对DOMContentLoaded事件并无影响。DOMContentLoaded事件只关系最开始的HTML文档。

####chrome develop tools
1. 在debugger模式下，通过修改js如`var a = 1`和`var b = {a:1}`修改a是不成功的，但可以修改b.a。
2. 临时修改的js文件要保证没有执行过才会生效。

####关于伪元素与伪类，伪元素如after，可以使用`::`或者`:`，而伪类只能使用一个`:`

####对于script的加载事件
1. 在chrome、firefox中，onload事件是指加载完成并执行；并且有document.currentScript表示当前正在被处理的script。
2. 但在ie8以下并不支持onload，有onreadystatechange事件

        此时 readyState 的值  可能为 以下几个 :

        “uninitialized” – 原始状态
        “loading” – 下载数据中..
        “loaded” – 下载完成
        “interactive” – 还未执行完毕.
        “complete” – 脚本执行完毕.

3. 在onload事件中有event参数可以获取当前script的信息。并且在浏览器中同时只能处理一个script。requrejs就是利用这个特性关联name与script脚本的。

####String.prototype.replace(sub|reg, replacer)
1. 注意在replacer中，`\`表示转义，`$`表示引用，有特殊的含义。
2. `param.html.replace(/\\/g, '\\\\').replace(/\${/g, '\\$${').replace(/\n/g, '\\n')`

####html5新增了picture标签，可以设置许多source options，浏览器根据支持类型、屏幕大小等方式来判断加载哪个source。类似的也有一个css:image-set和img:srcset的属性

        ​<picture>
            <source srcset="mdn-logo.svg" type="image/svg+xml">
            <img src="mdn-logo.png" alt="MDN">
        </picture>

####关于forever与pm2
1. forever是使用spawn另起一个node进程
2. pm2正常情况下也会使用spawn另起一个node进程，但当pm2找不到传入的app参数时，会执行一次shelljs.which，查找真正的脚本所在地，如pm2 start "sinopia"
3. 有意思的是很多shell脚本其实使用node写的，如

        #!/usr/bin/env node
        require('../lib/cli')

####http auth
1. 使用HTTP AUTH需要在server端配置http auth信息（一般是webserver启动的时候从配置文件里面读取相关信息）。我用中文简述一下http auth的过程：
2. 客户端发送http请求
3. 服务器发现配置了http auth，于是检查request里面有没有"Authorization"的http header
4. 如果有，则判断Authorization里面的内容是否在用户列表里面，Authorization header的典型数据为"Authorization: Basic jdhaHY0="，其中Basic表示基础认证， jdhaHY0=是base64编码的"user:passwd"字符串。
5. 如果没有，或者用户密码不对，则返回http code 401页面给客户端
6. 标准的http浏览器在收到401页面之后，应该弹出一个对话框让用户输入帐号密码；并在用户点确认的时候再次发出请求，这次请求里面将带上Authorization header

####可编程逻辑器件
1. 简单地说，可编程逻辑器件是在硬件结构的基础上直接进行运算，优点在于运算速度快，比如加减法都有逻辑门电路直接运算
2. 单片机采用的是寄存器或ram存储变量 然后对他们在ram中进行数据处理，速度没有PLC快 对于一些高速算法 或者运算量较大 用PLC或者FPGA的优势明显
3. 比如说运行在FPGA上的sql查询可以提升10倍

####关于编码
1. `&#000；`这种是html的编码
2. `\000`: 这种是八进制转码，常见于utf-8
3. `%E8%AE%B8`这种是`许`的三字节编码，可以转成`\u8bb8`这边unicode编码(utf-8采用可变长字节编码，以三字节编码为例，固定格式1110xxxx 10xxxxxx 10xxxxxx，可以转成三字节码，同时也可以对其中的变化部分xxx进行编码，四个一组成为`\u8bb8`这种16进制的编码)；
4. iso-8859-1这种事Latin字符集，包括了所有西方欧洲语言不可缺少的附加字符；gb2312这种是标准中文字符集；utf-8是unicode的一种编程字符编码，可以解决多种语言文本的显示问题。
5. 关于git下中文输出八进制的转码`\xxx`，git默认配置`core.quotepath`为true，会对中文文件名、中文路径转义成`\xxx\xxx`这种编码。可以通过设置下面来更改。

        git config --global core.quotepath false
