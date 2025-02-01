/*************************************
项目名称：蛋波
更新日期：2025-02-01
脚本作者：Sheep
使用声明：⚠️仅供参考，🈲转载与售卖！
脚本说明：解锁vip功能

**************************************

[rewrite_local]
^https://api-sub\.meitu\.com/v2/user/vip_info_by_group url script-response-body https://raw.githubusercontent.com/SheepFJ/Sheep/main/danbo/danbovip.js
^https://ai\.xiuxiu\.meitu\.com/v1/tool/mtlab/ai_graffiti_permission url script-response-body https://raw.githubusercontent.com/SheepFJ/Sheep/main/danbo/danboai.js
 
[mitm]
hostname = ai.xiuxiu.meitu.com,api-sub.meitu.com

*************************************/
