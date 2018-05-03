---
layout: post
title: 关于block、inline终极解密
category: fe
tags: inline
keywords: inline, vertical-align, 垂直居中
---

## 关于block、inline终极解密

1. 一个`display:inline-block`上下无法对齐的原因
2. 关于vertical-align：
3. block box, inline box
4. BFC
5. IFC
6. 使用IFC实现垂直居中

<!-- more -->

### 一个`display:inline-block`上下无法对齐的原因
1. 对于相邻inline-block元素之间有3px间距的问题，可以通过父标签`font-size:0`来解决。
2. 下面说一个inline-block元素之间上下无法对齐的问题

<img src="/images/inline-block/inline-block-bug.jpg">
**问题：** 图中，每一个框框都是通过"display:inline-block;"来实现，但是达不到上下对其的效果。

**原因：** <http://www.w3.org/TR/CSS21/visudet.html#propdef-vertical-align>

1. The baseline of an 'inline-block' is the baseline of its last line box in the normal flow, unless it has either no in-flow line boxes or if its 'overflow' property has a computed value other than 'visible', in which case the baseline is the bottom margin edge.
>inline-block元素默认的baseline是它内部inline元素最后一行的baseline。除非inline-block元素没有内部元素或者它的overflow非visible（BFC），此时它的baseline是它的margin底部边缘（外围）。

2. vertical-align默认是baseline对齐，所以会出现上线对不起的问题。

**解决方案**

1. 为每一个框框设置vertical-align为`非baseline`
2. 或者为每一个框框设置overflow为`非visiable`如hidden。

<img src="/images/inline-block/inline-block-solved.jpg">

### 关于vertical-align：
<http://www.w3.org/TR/CSS21/visudet.html#propdef-vertical-align>

vertical-align应用于`内联（inline）元素`和`table-cell元素`。

1. baseline：默认，将元素的baseline与父标签的baseline对齐。如果元素没有baseline，则将它的底部边缘与父元素的baseline对其。
2. middle：将元素的midpoint与父标签的baseline+x字母高的1/2对齐。
3. sub：降低元素的baseline，将baseline与父标签的下标对齐。
4. super：升高元素的baseline，将baseline与父标签的上标对齐。
5. text-top：将元素的top与父标签content area的top对齐。
6. text-bottom：将元素的bottom与父标签content area的bottom对齐。
7. top：将对齐的元素的top与line box的bottom对齐。
8. bootom：将对齐的元素的bottom与line box的bottom对齐。
9. length：通过距离升高（正值）或降低（负值）元素。'0cm'等同于'baseline'
10. percent：通过距离（相对于line-height值的百分大小）升高（正值）或降低（负值）元素。'0%'等同于'baseline'


### block box, inline box

<http://www.w3.org/TR/CSS2/visuren.html>

1. html标签分为block element（block-level box）和inline element（inline-level box），但并不是所有的块级元素都应用BFC，所有的内联元素都应用IFC.
2. container box指应用BFC或者IFC的盒子。
3. block box指应用BFC的块级元素。
4. inline box指应用IFC的块级元素。

### BFC （block formatting context）

if a block container box (such as that generated for the DIV above) has a block-level box inside it (such as the P above), then we force it to have only block-level boxes inside it.
> 如果一个块级盒子内部有一个块级元素，那么我们强制这个块级盒子里只有块级元素。

	<div>
		Some text
		<p>Other text</p>
		More text
	</div>

	在上面，如果我们设置div块为一个block box（BFC），那么div中将有3个块级元素`匿名跨级元素`、`p元素`、`匿名跨级元素`；


Floats, absolutely positioned elements, block containers (such as inline-blocks, table-cells, and table-captions) that are not block boxes, and block boxes with 'overflow' other than 'visible' (except when that value has been propagated to the viewport) establish new block formatting contexts for their contents.
>根元素、float属性不为none、osition为absolute或fixed、display为`inline-block`, `table-cell`, `table-caption`, `flex`, `inline-flex`、overflow不为visible会创建自己的BFC容器。

	1. 内部的Box会在垂直方向，一个接一个地放置。
	2. Box垂直方向的距离由margin决定。属于同一个BFC的两个相邻Box的margin会发生重叠
	3. 每个元素的margin box的左边， 与包含块border box的左边相接触(对于从左往右的格式化，否则相反)。即使存在浮动也是如此。
	4. BFC的区域不会与float box重叠。
	5. BFC就是页面上的一个隔离的独立容器，容器里面的子元素不会影响到外面的元素。反之也如此。(其他几条都在体现这个)
	6. 计算BFC的高度时，浮动元素也参与计算。（可以使用overflow:hidden来清除浮动，此时浮动元素也全部显示）

### IFC（inline formatting context）

<http://blog.ohweb.cn/archives/category/fe>

Any text that is directly contained inside a block container element (not inside an inline element) must be treated as an anonymous inline element.
>任何直接包含在块级元素中间的文本（非内联元素的文本）必须被当成是一个匿名内联元素。

	<p>Some <em>emphasized</em> text</p>
	p是一个块状元素，它内部创建了一个line box，这里面有三个内联元素，"匿名内联元素"、"em元素"、"匿名内联元素"

In an inline formatting context, boxes are laid out horizontally, one after the other, beginning at the top of a containing block. **Horizontal margins, borders, and padding are respected between these boxes.** The boxes may be aligned vertically in different ways: their bottoms or tops may be aligned, or the baselines of text within them may be aligned. **The rectangular area that contains the boxes that form a line is called a line box.**
>1. 在一个IFC容器里，里面的元素一个接一个的水平放置。水平方向的margin、borders、padding都是好用的。IFC中的每一个元素可能按照顶部、底部或者baseline对齐。**包含这些内联元素，并组成一行的方块区域被称为line box**；
>2. 其实这句话解释了为什么内联元素是不能设置垂直方向的padding,margin等，因为即使设置了，也不会影响line box的高度,可能会在每个浏览器的表现各异，但大多数不会达到预期的效果。

The width of a line box is determined by a containing block and the presence of floats. The height of a line box is determined by the rules given in the section on line height calculations.
>1. line box的宽度由包含容器和中间的浮动元素决定。**line box的高度是由它所有包含的元素的vertical-align方式以及高度决定**。
>2. <http://christopheraue.net/2014/03/05/vertical-align/>，可以见这篇文章，里面分析了一个line box的高度的确定。line box的高度随着它内部元素一个个放置，伴随着内部元素的高度、对齐方式将line box的高度撑高。

A line box is always tall enough for all of the boxes it contains. However, it may be taller than the tallest box it contains (if, for example, boxes are aligned so that baselines line up). When the height of a box B is less than the height of the line box containing it, the vertical alignment of B within the line box is determined by the 'vertical-align' property. When several inline-level boxes cannot fit horizontally within a single line box, they are distributed among two or more vertically-stacked line boxes. Thus, a paragraph is a vertical stack of line boxes. Line boxes are stacked with no vertical separation (except as specified elsewhere) and they never overlap.
>1. 一个line box足够高以至于能包含它所有的内部元素。当一个内部元素没有line box高时，它的位置将有它的vertical-align来决定。
>2. 当内部元素在一行放不下是，他们将拆分成多个line box。这么多个line box均为于一个IFC容器里。

In general, the left edge of a line box touches the left edge of its containing block and the right edge touches the right edge of its containing block. However, floating boxes may come between the containing block edge and the line box edge. Thus, although line boxes in the same inline formatting context generally have the same width (that of the containing block), they may vary in width if available horizontal space is reduced due to floats. Line boxes in the same inline formatting context generally vary in height (e.g., one line might contain a tall image while the others contain only text).
>1. 通常多行line box的宽度是一样的，但它会受浮动元素的影响。
>2. 多个line box的高度通常也是一样的，但也会受line box内部的元素的影响，如一行包含一个比较高的图片。

When the total width of the inline-level boxes on a line is less than the width of the line box containing them, their horizontal distribution within the line box is determined by the 'text-align' property. If that property has the value 'justify', the user agent may stretch spaces and words in inline boxes (but not inline-table and inline-block boxes) as well.
>如果所有的内联元素的宽度加起来比容器的要小，那么line box的位置由容器的`text-align`属性决定。若`text-align`的值是`justify`，那么浏览器就会对line box拉伸。

When an inline box exceeds the width of a line box, it is split into several boxes and these boxes are distributed across several line boxes. If an inline box cannot be split (e.g., if the inline box contains a single character, or language specific word breaking rules disallow a break within the inline box, or if the inline box is affected by a white-space value of nowrap or pre), then the inline box overflows the line box.
>1. 如果一个内联元素到达了line box的末端，他将被分割开，分不在多个line box上。
>2. 如果一个内联元素设置的不可拆行（如white-space:nowrap/pre）,那么这个内联元素将会从line box上溢出。

When an inline box is split, margins, borders, and padding have no visual effect where the split occurs (or at any split, when there are several).
>当一个内联元素被拆分的时候，margins、borders、paddings并没有任何的视觉效果。

Inline boxes may also be split into several boxes within the same line box due to bidirectional text processing.

Line boxes are created as needed to hold inline-level content within an inline formatting context. Line boxes that contain no text, no preserved white space, no inline elements with non-zero margins, padding, or borders, and no other in-flow content (such as images, inline blocks or inline tables), and do not end with a preserved newline must be treated as zero-height line boxes for the purposes of determining the positions of any elements inside of them, and must be treated as not existing for any other purpose.
>1. line box的生存条件是在一个IFC容器里，并且内部有内联元素。如果line box内部没有文本、空白、换行符、内联元素，将被设为0高度，被认为是没有意义的。

### 使用IFC实现垂直居中
原理：在IFC容器下，是line box的高度是包含块容器的高度，这样让line box内部元素使用`vertical-align:middle`，达到垂直居中的效果。

实现：在line box中，我们使用一个高度100%，并且`vertical-align:middle;`的inline-block元素撑开line box的高度为包含块的高度。
>1. 'height:100%'是为了撑开line-box的高度。
>2. `vertical-align:middle`，是为了调整包含块容器的line box的baseline的位置，因为这个元素的高度是最高的，那么它引起的调整后的baseline的位置就成为了整个line box的baseline的位置，相应的就成为了其他元素对齐的基线，其他元素的vertical-align:middle才有实际意义。详细见：<http://christopheraue.net/2014/03/05/vertical-align/>

概念图：

<img src="/images/inline-block/middle.png">

代码：

	<!DOCTYPE html>
	<html>
	<head>
	    <title>Z-order positioning</title>
	    <style>
	        #container{
	            background: #ccc;
	            height: 300px;
	            width: 500px;
	        }

	        #container:after{
	            content: "";
	            display: inline-block;
	            height: 100%;
	            width: 20px;
	            background: green;
	            vertical-align: middle;
	        }

	        #middle{
	            display: inline-block;
	            vertical-align: middle;
	            width: 200px;
	            height: 200px;
	            background: red;
	        }
	    </style>
	</head>
	<body>
	    <div id="container">
	        <div id="middle">
	        </div>
	    </div>
	</body>
	</html>

最终结果；
<img src="/images/inline-block/result.png" style="max-width:400px">


