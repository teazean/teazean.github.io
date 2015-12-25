---
layout: post
title: 新人：lbs-yy-常识
class: mylbs
styles: mylbs
---

##LBS运营 新手一枚

notes：一下内容默认移动端开发。

####分享内容           
1. 图片：微信(120*120) , 微博：没要求（尽量25k以下）。
2. 分享标题 : 一般<=6个字
3. 分享内容:一般<=26个字
4. 微信朋友分享：有标题、有内容；而朋友圈、微博分享只有内容，因此此内容要定制。
5. 如果在端内调用分享组件成功，但点击微信、朋友圈失败，考虑：图片是不是过大，ios端内有验证。

####分享按钮       
微信／微博内不准出现分享，微信内的分享应该初始化微信的接口

####与Apple Inc.  
1. 当活动中的物品与apple.inc相关，应提示：'本活动与Apple Inc.无关'

####页面全屏不滚动      
1. 取消body的`touchmove`事件，`e.preventDefault()`.    
    有些浏览器touchmove会调整页面的高度，使页面高度变形。比如ios uc向上滑动会隐藏地址栏，页面会有问题出现。
2. 在html、body上设置:`overflow:hidden` 
    即使内容和viewport的高度一样高，但有些浏览器也会出现滚动条。（组内留下的经验，未检验）

####语音自动播放        
目前是无法实现语音在页面加载自动播放的，也不建议这样做。自动播放对用户不友好。

####geolocation在部分国内手机无法定位    
最后确定出是部分三星、摩托的部分国行Android手机“阉割”了谷歌GMS服务包，导致HTML5的geolocation无法使用wifi和基站定位服务导致。

####关于微信下分享的说明      
[朋友圈规则大起底](http://mp.weixin.qq.com/s?__biz=MjM5NjM4MDAxMg==&mid=209206514&idx=1&sn=29ad2bda65c238442d6d1c15c1c6911a&scene=0&key=0acd51d81cb052bcd05365f4642be4b507800fb2cd835700c63d849879c3f2a7beb720bea6350f74af55e1f20b6f93a6&ascene=1&uin=MTkzMDA2NjU%3D&devicetype=Windows+7&version=61020019&pass_ticket=gN1VvcvYHglGx8tve0615%2BXEvi4n%2FgyaYjYYBM7Eea8%3D)     
[诱导行为->诱导分享](https://mp.weixin.qq.com/cgi-bin/readtemplate?token=790407390&t=business/faq_operation_tmpl&type=info#3dot3_3)    
[哪种行为或内容不应在朋友圈出现？](http://kf.qq.com/faq/131117ne2MV7141117JzI32q.html)

####微信里面不可以有红包字眼和小游戏类型游戏，有相关需求的，建议都有一个静态页面，倒流到客户端内     

####微信内是不允许location跳转到其他非同域名网站。    
location.href = "place.html"是可以的。但location.href = "http://api.map.baidu.com/direction?"是不允许的，但可以用a.trigger("click")来模拟。

####`display:inline`元素上的动画在移动浏览器有肯能会失效，可以改成`display:inline-block;`

####绝对布局居中大部分情况下要比line-height居中靠谱。

####使用zepto的swipe*事件，尤其是swipeDown、swipeUp，要使用e.preventDefault()。阻止浏览器的默认行为，如滚动、等。

####IOS端内获取UA，不定期获取不到，无法判断是否端内。

####移动端最小字体，一般默认为12px，chrome浏览器只支持最小12px的字体，但也有部分浏览器支持最小为9px的字体，但在iphone6+等高分辨率下，会显得特别小。

####引web地图api的时候，可在实例化map的第二个参数加入属性useWebGl为false，避免页面退出后引起地图客户端crash，因为在web地图js中会尝试创建一个webgl.