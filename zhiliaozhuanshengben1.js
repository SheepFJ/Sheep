/*************************************
项目名称：知了专升本
下载地址：http://985.so/k81ah
更新日期：2024-08-21
脚本作者：Sheep
电报频道：https://t.me/chxm1023
使用声明：⚠️仅供参考，🈲转载与售卖！

**************************************

[rewrite_local]
^https:\/\/wx\.douxuejiaoyu\.com\/(app\/iap\/goods_detail_v2|wxpub\/api\/video_show|wxpub\/api\/video_play_detail) url script-response-body https://raw.githubusercontent.com/SheepFJ/Sheep/main/zhiliaozhuanshengben1.js  
[mitm]
hostname = wx.douxuejiaoyu.com

*************************************/
const _0x1fd61c=_0x1d7a;(function(_0x5a61,_0x272144){const _0x326dcd=_0x1d7a,_0x22507f=_0x5a61();while(!![]){try{const _0xecd5af=-parseInt(_0x326dcd(0x120))/0x1*(parseInt(_0x326dcd(0x11b))/0x2)+-parseInt(_0x326dcd(0x11d))/0x3*(-parseInt(_0x326dcd(0x12f))/0x4)+-parseInt(_0x326dcd(0x13a))/0x5+-parseInt(_0x326dcd(0x138))/0x6*(parseInt(_0x326dcd(0x124))/0x7)+parseInt(_0x326dcd(0x119))/0x8*(parseInt(_0x326dcd(0x130))/0x9)+-parseInt(_0x326dcd(0x118))/0xa*(parseInt(_0x326dcd(0x132))/0xb)+parseInt(_0x326dcd(0x128))/0xc*(parseInt(_0x326dcd(0x133))/0xd);if(_0xecd5af===_0x272144)break;else _0x22507f['push'](_0x22507f['shift']());}catch(_0x3bfae1){_0x22507f['push'](_0x22507f['shift']());}}}(_0x4515,0x4e151));let body=$response['body'],obj=JSON[_0x1fd61c(0x12a)](body);function _0x4515(){const _0x31b456=['5010fQnCRD','149048xjXxAn','alivid','381112IIJrkV','stringify','42kBMhYQ','length','valueForKey','1tasoLi','/wxpub/api/video_show','split','push','661283CJGMVl','url','itemNameList','第一次进入黑屏重新点击一次','11723424gySsCw','course_section_id','parse','211','indexOf','is_free','操作成功','124240ZjKgZD','27YqGKmA','/app/iap/goods_detail_v2','1969cnDwMv','13IxIrva','alividList','join','setValueForKey','object','30KpTWod','/wxpub/api/video_play_detail','1976400itPuoc'];_0x4515=function(){return _0x31b456;};return _0x4515();}var url=$request[_0x1fd61c(0x125)];const vip0=_0x1fd61c(0x131);var url=$request[_0x1fd61c(0x125)];const vip1=_0x1fd61c(0x121);var url=$request[_0x1fd61c(0x125)];const vip2=_0x1fd61c(0x139);if(url[_0x1fd61c(0x12c)](vip0)!=-0x1){let alividList=[],itemNameList=[];function findKeys(_0x1bec17){const _0x22a1f2=_0x1fd61c;for(let _0x57caa7 in _0x1bec17){if(typeof _0x1bec17[_0x57caa7]===_0x22a1f2(0x137))findKeys(_0x1bec17[_0x57caa7]);else{if(_0x57caa7==='alivid')alividList[_0x22a1f2(0x123)](_0x1bec17[_0x57caa7]);else _0x57caa7==='item_id'&&itemNameList[_0x22a1f2(0x123)](_0x1bec17[_0x57caa7]);}}}findKeys(obj),$prefs[_0x1fd61c(0x136)](alividList['join'](','),_0x1fd61c(0x134)),$prefs['setValueForKey'](itemNameList[_0x1fd61c(0x135)](','),_0x1fd61c(0x126));}function _0x1d7a(_0xbfafbf,_0x5ad63f){const _0x45155c=_0x4515();return _0x1d7a=function(_0x1d7a80,_0x118197){_0x1d7a80=_0x1d7a80-0x118;let _0x282745=_0x45155c[_0x1d7a80];return _0x282745;},_0x1d7a(_0xbfafbf,_0x5ad63f);}if(url[_0x1fd61c(0x12c)](vip1)!=-0x1){let storedItemNameList=$prefs['valueForKey'](_0x1fd61c(0x126))[_0x1fd61c(0x122)](','),storedAlividList=$prefs[_0x1fd61c(0x11f)]('alividList')[_0x1fd61c(0x122)](','),itemAlividMap={};for(let i=0x0;i<storedItemNameList[_0x1fd61c(0x11e)];i++){itemAlividMap[storedItemNameList[i]]=storedAlividList[i];}function modifyAndAddProperties(_0x43dd8b){const _0x4bb2d3=_0x1fd61c;for(let _0x361b24 in _0x43dd8b){typeof _0x43dd8b[_0x361b24]==='object'&&_0x43dd8b[_0x361b24]!==null?modifyAndAddProperties(_0x43dd8b[_0x361b24]):(_0x361b24===_0x4bb2d3(0x12d)&&(_0x43dd8b[_0x361b24]=0x1),_0x361b24===_0x4bb2d3(0x129)&&itemAlividMap[_0x43dd8b[_0x361b24]]&&(_0x43dd8b[_0x4bb2d3(0x11a)]=itemAlividMap[_0x43dd8b[_0x361b24]]));}}modifyAndAddProperties(obj),body=JSON[_0x1fd61c(0x11c)](obj);}url[_0x1fd61c(0x12c)](vip2)!=-0x1&&(obj={'errcode':0x0,'errmsg':_0x1fd61c(0x12e),'data':{'section_name':'','video_name':'','alivid':'','course_section_id':'','video_id':'','is_free':'1','hls':'','title':_0x1fd61c(0x127),'hls_sign':0x1,'has_course_means':!![],'duration':'0','course_id':_0x1fd61c(0x12b),'has_share':'0'}},body=JSON[_0x1fd61c(0x11c)](obj));$done({'body':body});








