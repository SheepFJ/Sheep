/*************************************
项目名称：知了，RSS聚合阅读
更新日期：2024-11-14
脚本作者：Sheep
使用声明：⚠️仅供参考，🈲转载与售卖！
脚本说明：解锁订阅内容

**************************************

[rewrite_local]
^https://api\.ivrfun\.com/pingx/v1/user/getInfo url script-response-body https://raw.githubusercontent.com/SheepFJ/Sheep/refs/heads/main/zhiliaotuisong/vip.js
[mitm]
hostname = api.ivrfun.com

*************************************/