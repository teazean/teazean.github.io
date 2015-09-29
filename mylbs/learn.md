---
layout: post
title: 学习：烂笔头
class: mylbs
---

##学习笔记

+ **js监听css animaiton、transition结束事件**    
>可以监听animationend、transitionend事件。但在移动端下测试，监听不到这两个事件.

+ **当请求是一个文件夹时http://127.0.0.1:8080/zt,这种请求方式会请求两次，发生重定向**

+ **BFC:block formatting context**          
>1. 内部的Box会在垂直方向，一个接一个地放置。
>2. Box垂直方向的距离由margin决定。属于同一个BFC的两个相邻Box的margin会发生重叠
>3. 每个元素的margin box的左边， 与包含块border box的左边相接触(对于从左往右的格式化，否则相反)。即使存在浮动也是如此。
>4. BFC的区域不会与float box重叠。
>5. BFC就是页面上的一个隔离的独立容器，容器里面的子元素不会影响到外面的元素。反之也如此。(其他几条都在体现这个)
>6. 计算BFC的高度时，浮动元素也参与计算

+ **Everything in UNIX is a file.**     
>1. 网络连接，如socket等
>2. 输入输入，如设备
>3. 管道
>4. 终端
>5. 实质文件
>6. 、、、

+ **正则表达式三种匹配模式**   
>X?、X*、X+、X{m，n}    

    >1. 最大匹配（贪婪型，占有型）
    >2. 最小匹配

+ **Viewport**  
<https://developer.apple.com/library/ios/documentation/AppleApplications/Reference/SafariWebContent/UsingtheViewport/UsingtheViewport.html>  

    >1. viewport是移动浏览器的页面的可视区域，如果不设置viewport，移动浏览器会默认以宽度980px加载页面，然后缩放适应屏幕。
    >2. 可以设置viewport的width为固定像素，但一般设置为device-width（特殊值）。

+ **document.DOMContentLoaded vs window.onload**     
>1. DOMContentLoaded实在dom树构建完成后就执行。
>2. 而onload要等到页面所有的dom树、样式表、脚本、图片、flash等都加在完成才执行。

+ **visibility:hidden vs display:none**     
>1. visibility:hidden 占据空间位置；display:none不占据空间位置，显示时可能会发生repaint
>2. visibility:hidden情况下，animation在隐藏状态下就已经触发，而display:none是不会触发animaation的，除非display:block;

+ **webkitAnimationEnd、webkitTransitionEnd**    
>在移动端下，动画、过渡效果结束要监测webkitAnimationEnd、webkitTransitionEnd事件，监测animationEnd、transitionEnd是无效的。

+ **script标签动态添加，哪一个先加载完先执行哪一个**

+ **addEventListener 与 element.on* **   
>使用addEventListener和（element.onclick onload）等添加事件，两种方式之间是相互独立的。彼此之间并不会发生覆盖事件。
>但是在引入其他模块的情况下，尽量不要使用window.onload，防止覆盖其他模块的事件。

+ **浏览器缓存的一些说明**    
>当浏览器发送请求给图片时候，将会发生两件事情：        
> 
>1. 因为浏览器从来没有打开过这张图片，所以没有额外的头信息，服务器将返回一个状态码：200 Success 接着返回图片数据给浏览器，之后浏览器会缓存文件的HTTP头信息当中的Last-Modified(文件最后修改时间)和ETag(被请求变量的实体值)
>2. 浏览器检查if-none-match或者if-modified-since头信息，会与返回的头信息Last-Moidified进行比较，如果没做修改，将会不加载图片数据，直接返回Status:304 Not Modified(没有更新)。同时我们把Last-Moidified头信息用$header['if-modified-since']替换掉$now()，所以每次返回的内容都将是一样的。
>
>Cache-Control是http1.1的实现，Pragma、Expires是http1.0的实现。如果设置Cache-Control:no-cache，要同事设置Pragma:no-cache，兼容http1.0；Cache-Control:max-age=*会覆盖Expires。

+ **querySelectorAll性能**    
>通常来说querySelector的性能优能，但在通过Class名选择元素的这一项是不如getElementByClassName的。

+ **关于移动浏览器下的ele.style**      
>1. ele.style只能获取标签上的style属性的值。
>2. 在部分移动浏览器下，style.transform等一些属性是无法设置，也无法获取的。可以通过cssText设置，获取。
>3. style.cssText是值标签上style的值，设置新的cssText会使之前的标签style上的属性失效(完全覆盖)。

+ **z-index与stacking context**      
>1. z-index只对position为非static有效
>2. z-index只决定该box在当前stacking context中的位置.
>3. stacking context对内：Within a stacking context, child elements are stacked according to the same rules previously explained. Importantly, the z-index values of its child stacking contexts only have meaning in this parent. 
>4. stacking context对外：Stacking contexts are treated atomically as a single unit in the parent stacking context.
>5. <https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Positioning/Understanding_z_index/The_stacking_context>，创建stacking context的元素见上链接，主要的有transform ,opactity , position && z-index.

+ **CSS Image Values and Replaced Content Module Level 3**  
<http://www.w3.org/TR/css3-images/>     
>文章中定义了css3关于image、object类型的定义以及sizing、position，统一称为object
>
>1. object sizing算法：明确的width、height > 保持高宽比 > contain约束 > 标签默认大小。(contain约束包括:object-fit、background-size)
>2. 适用于object sizing的属性：`background-image`、`list-style-image`、`border-image`、`cursor`、`content`。
>3. object-fit(fill、cover、contain)、object-position是定义object类型的计算布局尺寸、定位的属性。

+ **HTTP keep-alive**   
>1. 普通模式(非keep-alive)的http请求，在请求结束后会断开连接。而keep-alive是持久连接，使客户端(如浏览器)到服务器的连接持续有效，当出现对服务器的后续请求时，keep-alive功能避免了建立或者重新建立连接。
>2. http1.0中默认关闭keep-alive。http1.1默认打开keep-alive
>3. keep-alive是客户端与服务器的交互方式，需要双方的支持。

+ **服务器缓存ehcache、memcached、redis**     
>1. 缓存就是在内存中临时存在一些高访问的数据，以提高查询效率。对于单服务器模式而言，缓存比较简略，以下均为集群模式下的缓存说明。分布式集群下一般都有独立的缓存服务器集群统一提供缓存服务。（当然也是可以在分布式集群中各个应用服务器提供自己的缓存。）
>2. memcached在内存中以key-value形式存储，memcached本身不支持分布式，需要程序客户端（应用服务器）通过像一致性哈希这样的分布式算法来实现memcached的分布式存储（这种情况下缓存服务器添加、删除的代价是很高的）。
>3. redis是在memcached写出来，本身支持多种数据结构和数据持久化，并且redis本身也支持集群分布式存储，redis集群各个服务器之间通过异步复制来保证数据一致性，但无法保证强一致性。
>4. ehcache是java下的缓存框架。ehcache本身是支持分布式存储的：
>       + 缓存与应用服务器一起：支持的通过RMI、JGroups(组播、广播)或JMS（消息队列）进行的异步或同步的缓存复制
>       + 独立的缓存服务器：ehcache server

+ **http、websocket、socket**      
>1. socket严格来说并不是一个协议，而是对传输层TCP协议的封装，是一个facade。基本上现在的编程语言所支持的socket都是遵循`Berkeley sockets`这套API。
>2. http、websocket是应用层协议，websocket就是应对于http的不足、web上的实时通信的需求产生的新协议，目前编程语言也在添加支持，java7已添加支持。

