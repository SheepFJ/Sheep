/*************************************
项目名称：Dlabel云标签
下载地址：http://985.so/kukps
更新日期：2024-08-23
脚本作者：Sheep
使用声明：⚠️仅供参考，🈲转载与售卖！
脚本说明：登录账号后在我的界面点右上角礼盒进入领取奖励（可反复领取,累加天数)

**************************************

[rewrite_local]
^https://dlabel\.ctaiot\.com/api/welfare/list url script-response-body https://raw.githubusercontent.com/SheepFJ/Sheep/main/yunbiaoqian3.js  
[mitm]
hostname = dlabel.ctaiot.com

*************************************/

var _0x4f4704=_0x7c6c;function _0x5b23(){var _0x38cf59=['15615rqCfcu','1894071fqkZfq','parse','31755bkSdaa','150WDTvAj','437247QutvGp','body','40gSntFK','612152QVPloq','stringify','2198924nDRFRv','732WScFJZ','594083pWumrt'];_0x5b23=function(){return _0x38cf59;};return _0x5b23();}function _0x7c6c(_0x1b9d7f,_0xc5c7eb){var _0x5b23c4=_0x5b23();return _0x7c6c=function(_0x7c6ce4,_0x1ffbcc){_0x7c6ce4=_0x7c6ce4-0x1a8;var _0x140272=_0x5b23c4[_0x7c6ce4];return _0x140272;},_0x7c6c(_0x1b9d7f,_0xc5c7eb);}(function(_0x5c5e13,_0x2a878d){var _0xd1b490=_0x7c6c,_0x53695a=_0x5c5e13();while(!![]){try{var _0x5ee310=parseInt(_0xd1b490(0x1b2))/0x1+-parseInt(_0xd1b490(0x1aa))/0x2+parseInt(_0xd1b490(0x1b0))/0x3+-parseInt(_0xd1b490(0x1ac))/0x4+-parseInt(_0xd1b490(0x1af))/0x5*(-parseInt(_0xd1b490(0x1ad))/0x6)+-parseInt(_0xd1b490(0x1ae))/0x7*(parseInt(_0xd1b490(0x1a9))/0x8)+-parseInt(_0xd1b490(0x1b4))/0x9*(-parseInt(_0xd1b490(0x1b3))/0xa);if(_0x5ee310===_0x2a878d)break;else _0x53695a['push'](_0x53695a['shift']());}catch(_0xc25a71){_0x53695a['push'](_0x53695a['shift']());}}}(_0x5b23,0x784a7));var body=$response[_0x4f4704(0x1a8)],obj=JSON[_0x4f4704(0x1b1)](body);obj['data'][0x1]={'id':0x1,'vipDay':0xe,'receive':0x1,'sharePath':'','name':'分享'},body=JSON[_0x4f4704(0x1ab)](obj),$done({'body':body});
