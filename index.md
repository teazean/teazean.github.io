---
layout: page
title: Teazean' Hive
---
{% include JB/setup %}

{% for post in site.posts limit:3 %}
<div class = "card">
		<div  class = "date_label">
			<div class="day_month">
    			{{ post.date | date:"%m/%d" }}
    		</div>
			<div class="year">
			   {{ post.date | date:"%Y" }}
			</div>
    </div> 
    {{ post.content  | | split:'<!--break-->' | first }}
		
  	<div class = "read_more">
  		<a class="fa fa-link" href="{{ BASE_PATH }}{{ post.url }}">  查看全文&hellip;</a>
  	</div>
</div>
{% endfor %}

<div class = "card">
    <a class="fa fa-link" href="i1_archive.html">  查看更多&hellip;</a>
</div>

