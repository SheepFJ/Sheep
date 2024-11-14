/*************************************
项目名称：简讯
更新日期：2024-10-28
脚本作者：Sheep
使用声明：⚠️仅供参考，🈲转载与售卖！
脚本说明：解锁VIP，去除广告

**************************************

[rewrite_local]
^https://api\.tipsoon\.com/api/v1/user/info url script-response-body https://raw.githubusercontent.com/SheepFJ/Sheep/refs/heads/main/jianxun/vip.js
[mitm]
hostname = api.tipsoon.com

*************************************/