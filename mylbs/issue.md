---
layout: post
title: 记录：奇妙的ISSUE
class: mylbs
---

##ISSUE记录

####在js中 "5" > "10" // true

####部分android下，系统使用大号字体，h5页面会错乱
1. 第一种解决方案：android创建webview的时候`mWebView.getSettings().setDefaultFontSize(16);`
2. 第二种解决方案：
		
	这部分字体放大字体的原理：当h5通过js、css设置`font-size: a1px;`字体大小时，原生的webview在创建`render tree`的时候，会根据字体放大的比例`scalescaleRatio`调整字体大小，将调整后的字体大小`a2`应用到`render tree`上的元素（调整后的大小可以通过`window.getComputedStyle`获取到）；这个时候我们就可以计算出`scaleRatio`:

		scaleRatio = a2/a1;

	然后我们就可以通过js设置`font-size`为`a1/scaleRatio`，再经过系统字体的大小调整，使得最终应用到`render tree`上的样式`font-size`为`a1`的值。达到我们想用的效果。

	demo： 

		<!DOCTYPE html>
		<html lang="en" style="font-size: 16px;">
		<head>
			<meta charset="UTF-8">
			<title></title>
			<meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no">
			<script type="text/javascript">
				(function() {
					var baseFontSize = 16;
					var scaleRatio = (function() {
						var realFontSize = parseFloat(window.getComputedStyle(document.documentElement)["font-size"]);
						return realFontSize/baseFontSize;
					})();
					function reset(){
				        document.documentElement.style.fontSize = document.documentElement.clientWidth / 320 * baseFontSize / scaleRatio + "px";

				        //show
				        if(document.body) {
				        	document.body.innerHTML = "scaleRatio: " + scaleRatio + "<br>" + "font-size: " + document.documentElement.style.fontSize;
				        }
				    }
				    reset();
				    document.addEventListener('DOMContentLoaded', reset);
				    window.addEventListener('pageshow', reset);
				    window.addEventListener('load', reset);
				    window.addEventListener('resize', function(){
				        setTimeout(reset,0);
				    });
				})();
			</script>
		</head>
		<body>
		</body>
		</html>
