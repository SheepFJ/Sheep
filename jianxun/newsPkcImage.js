/*************************************
项目名称：每日新闻60s图片PKC接口
更新日期：2025-02-12
脚本作者：Sheep
使用声明：⚠️仅供参考，🈲转载与售卖！
脚本说明：PKC微信API接口

**************************************

[rewrite_local]
^https:\/\/movies\.disney\.com\/sheep\/news\/image\/? url script-response-body https://raw.githubusercontent.com/SheepFJ/Sheep/refs/heads/main/jianxun/newsPkcImage.js
[mitm]
hostname = movies.disney.com

*************************************/