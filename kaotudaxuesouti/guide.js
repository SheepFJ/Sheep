/*************************************
项目名称：考途大学搜题
更新日期：2024-10-28
脚本作者：Sheep
使用声明：⚠️仅供参考，🈲转载与售卖！
脚本说明：去除广告，解锁VIP资料视频

**************************************

[rewrite_local]
^https://api-service\.tutusouti\.com/appServiceApi/vip/newUserPayVipData url script-response-body https://raw.githubusercontent.com/SheepFJ/Sheep/refs/heads/main/kaotudaxuesouti/vip.js
^https://api-service\.tutusouti\.com/appServiceApi/video/videoDetail url script-response-body https://raw.githubusercontent.com/SheepFJ/Sheep/refs/heads/main/kaotudaxuesouti/video.js  
[mitm]
hostname = api-service.tutusouti.com

*************************************/