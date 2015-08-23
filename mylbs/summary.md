---
layout: post
title: 项目总结
---

##LBS项目总结

###破风骑行

####问题   
3秒加载完成的只有79%，推送日页面未打开高达11%

####分析   
1. 用chrome抓图，regular 2g网络下，第一个jszepto_default.min.js(9.7kb),从950ms开始下载，到2850ms才下载完成。基本上其他js都下载完成包括最后的index.js都下载完成，都在等待。
2. 页面在2g下要等待3s左右 domready，5-6load结束

####总结   
1. 优先显示界面，image可以先占据空间，后加载。尽量减少图片的大小。
2. 尝试使用require.js技术，延迟加载js。对页面的js逻辑进行分层次，分为:    
    + header区域js
    + domcontentloaded js
    + window.load js
   
###实时公交活动页




