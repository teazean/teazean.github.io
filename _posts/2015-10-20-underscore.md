---
layout: post
title: underscore学习笔记
category: fe
tags: underscore 
keywords: underscore, underscore学习笔记, underscore template
---

##underscore学习笔记

这里主要记录一些underscore.js-1.8.3源码阅读的时候，感觉比较好的地方。

<!--break-->  

###1. restArgs

代码：
	
	//生成一个能接受不定参数的函数，并将不定参数转换成一个数组。
	var restArgs = function(func, startIndex) {
		startIndex = startIndex == null ? func.length - 1 : +startIndex;
		return function() {
			var length = Math.max(arguments.length - startIndex, 0);
			var rest = Array(length);
			for (var index = 0; index < length; index++) {
				rest[index] = arguments[index + startIndex];
			}
			switch (startIndex) {
				case 0:
					return func.call(this, rest);
				case 1:
					return func.call(this, arguments[0], rest);
				case 2:
					return func.call(this, arguments[0], arguments[1], rest);
			}
			var args = Array(startIndex + 1);
			for (index = 0; index < startIndex; index++) {
				args[index] = arguments[index];
			}
			args[startIndex] = rest;
			return func.apply(this, args);
		};
	};

	//使用
	_.delay = restArgs(function(func, wait, args) {
		return setTimeout(function() {
			return func.apply(null, args);
		}, wait);
	});

分析：
>利用func.length获取函数的形参数量，由此判断arguments的后面的哪几位是被设为不定参数。

###2. baseCreate

代码：

	var Ctor = function(){};
	// An internal function for creating a new object that inherits from another.
	var baseCreate = function(prototype) {
		if (!_.isObject(prototype)) return {};
		if (nativeCreate) return nativeCreate(prototype);
		Ctor.prototype = prototype;
		var result = new Ctor;
		Ctor.prototype = null;
		return result;
	};

分析：
>1. 这个方法里面如果存在nativeCreate即Obejct.create，则使用Obeject.create。
>2. 创建一个临时的函数，设置这个临时函数的prototype为被继承的prototype.(包含constructor);
>3. 这种方式只能继承prototype的方法和变量。

###3 NaN

NaN是js里特殊的一个特殊值，它有一个特性：NaN与任何值总是不相等，包括它自己。也有全局的方法isNaN()来判断一个值是否是NaN。

	NaN !== NaN //true 可以用这个特性来判断是否是NaN

###4 +b可以将b转化为数值类型.

	+"1" + 1; // 2
	1 + "1" //"11"

###5 判断是否是Array

	var a = [];
	a instanceof Array; //true
	Object.prototype.toString.call(a) === [object Array]; //true

>利用Object.prototype.toString不仅仅可以判断一个对象是否是Array，String、Number、Date等均可。可以用作偏函数生成器。

###6 html转义

	// List of HTML entities for escaping.
	var escapeMap = {
		'&': '&amp;',
		'<': '&lt;',
		'>': '&gt;',
		'"': '&quot;',
		"'": '&#x27;',
		'`': '&#x60;'
	};
	var unescapeMap = _.invert(escapeMap);

	// Functions for escaping and unescaping strings to/from HTML interpolation.
	var createEscaper = function(map) {
		var escaper = function(match) {
			return map[match];
		};
		// Regexes for identifying a key that needs to be escaped
		var source = '(?:' + _.keys(map).join('|') + ')';
		var testRegexp = RegExp(source);
		var replaceRegexp = RegExp(source, 'g');
		return function(string) {
			string = string == null ? '' : '' + string;
			return testRegexp.test(string) ? string.replace(replaceRegexp, escaper) : string;
		};
	};
	_.escape = createEscaper(escapeMap);
	_.unescape = createEscaper(unescapeMap);


###7 template模板

	//underscore支持三种模板
	_.templateSettings = {
		evaluate: /<%([\s\S]+?)%>/g, //运行js代码
		interpolate: /<%=([\s\S]+?)%>/g, //插入数值
		escape: /<%-([\s\S]+?)%>/g  //转义
	};
	
	var noMatch = /(.)^/;

	// Certain characters need to be escaped so that they can be put into a
	// string literal.
	var escapes = {
		"'": "'",
		'\\': '\\',
		'\r': 'r', //换行符
		'\n': 'n', //换行符
		'\u2028': 'u2028', //行分隔符
		'\u2029': 'u2029' //行结束符
	};
	
	var escapeRegExp = /\\|'|\r|\n|\u2028|\u2029/g;

	var escapeChar = function(match) {
		return '\\' + escapes[match];
	};

	_.template = function(text, settings, oldSettings) {
		if (!settings && oldSettings) settings = oldSettings;
		settings = _.defaults({}, settings, _.templateSettings);
		
		//模板匹配正则表达式
		var matcher = RegExp([
			(settings.escape || noMatch).source, (settings.interpolate || noMatch).source, (settings.evaluate || noMatch).source
		].join('|') + '|$', 'g');
		//matcher = /<%-([\s\S]+?)%>|<%=([\s\S]+?)%>|<%([\s\S]+?)%>|$/g;

		var index = 0;
		var source = "__p+='"; //__p是最终的要返回页面文本
		//match：整个匹配字符串
		//escape、interpolate、evaluate：子串
		//offset：匹配字符串的开始相对于整个字符串的偏移
		text.replace(matcher, function(match, escape, interpolate, evaluate, offset) {
			//非匹配串之外的文本，转换成一行，以免构造函数体时出错。
			source += text.slice(index, offset).replace(escapeRegExp, escapeChar);
			index = offset + match.length; //调整非匹配文本的位置。
			
			if (escape) {
				//把需要转义的字符串赋值给__t
				source += "'+\n((__t=(" + escape + "))==null?'':_.escape(__t))+\n'";
			} else if (interpolate) {
				//把需要插入的值赋值给__t
				source += "'+\n((__t=(" + interpolate + "))==null?'':__t)+\n'";
			} else if (evaluate) {
				//直接将匹配的js代码插入source之中
				source += "';\n" + evaluate + "\n__p+='";
			}

			// Adobe VMs need the match returned to produce the correct offset.
			return match;
		});
		source += "';\n";

		// If a variable is not specified, place data values in local scope.
		// 这里有两种方式，指定`setting.variable: 'data'`，在渲染模板中使用`data.prop`；
		// 另外一种方式，默认使用with(obj)，在渲染模板中直接使用obj的属性名来调用变量。
		if (!settings.variable) source = 'with(obj||{}){\n' + source + '}\n';

		//添加render函数的变量声明、返回值。
		source = "var __t,__p='',__j=Array.prototype.join," +
			"print=function(){__p+=__j.call(arguments,'');};\n" +
			source + 'return __p;\n';

		var render;
		try {
			render = new Function(settings.variable || 'obj', '_', source);
		} catch (e) {
			e.source = source;
			throw e;
		}
		
		//构建模板函数的返回值，是render函数。
		var template = function(data) {
			return render.call(this, data, _);
		};

		// Provide the compiled source as a convenience for precompilation.
		var argument = settings.variable || 'obj';
		template.source = 'function(' + argument + '){\n' + source + '}';

		return template;
	};

>1. 在evalute匹配串中，其实就是js代码，可以使用任何js语句，只要控制好结构就好。
>2. 非匹配串之外的文本串，要讲其中的换行符转义，转换成一行，以免`new Function('obj', source)`出错。

以下是一个模板的和它中间产生的render函数:
	
	//模板
	<%_.each(datas, function(item){ %>
		<p>index: <%=item.index%></p>
	<%});%>
	
	//render函数
	function(obj, _ /**/ ) {
		var __t,
			__p = '',
			__j = Array.prototype.join,
			print = function() {
				__p += __j.call(arguments, '');
			};
		with(obj || {}) {
			__p += '\n		';
			_.each(datas, function(item) {
				__p += '\n			<p>index: ' +
					((__t = (item.index)) == null ? '' : __t) +
					'</p>\n		';
			});
			__p += '\n	';
		}
		return __p;
	}


