/*
项目名称：SiriAI
更新日期：2024-11-20
脚本作者：@Sheepfj
使用声明：⚠️仅供参考，🈲转载与售卖！
脚本说明：pkc+圈x/Loon实现上下文自动回复
使用方法：

================= Quantumult X =================
[rewrite_local]
^https:\/\/movies\.disney\.com\/sheep\/video\/gpt\/([^\/]+)\/([^\/]+)\/? url script-response-body https://raw.githubusercontent.com/SheepFJ/Sheep/main/sheepWeChatPKC/sheepwechatpkc.js

[mitm]
hostname = movies.disney.com
*/

const _0x51728b=_0x440b;(function(_0x5be1b1,_0x129e87){const _0x5a614e=_0x440b,_0x28a755=_0x5be1b1();while(!![]){try{const _0x53e0b3=parseInt(_0x5a614e(0x20c))/0x1+-parseInt(_0x5a614e(0x20a))/0x2+-parseInt(_0x5a614e(0x1f1))/0x3*(-parseInt(_0x5a614e(0x208))/0x4)+parseInt(_0x5a614e(0x1dd))/0x5+parseInt(_0x5a614e(0x204))/0x6*(-parseInt(_0x5a614e(0x1fa))/0x7)+parseInt(_0x5a614e(0x1da))/0x8*(parseInt(_0x5a614e(0x1e7))/0x9)+parseInt(_0x5a614e(0x1ed))/0xa*(-parseInt(_0x5a614e(0x1e5))/0xb);if(_0x53e0b3===_0x129e87)break;else _0x28a755['push'](_0x28a755['shift']());}catch(_0x297878){_0x28a755['push'](_0x28a755['shift']());}}}(_0x35f9,0x5cee0));const url=$request[_0x51728b(0x1f2)],pattern=/^https:\/\/movies\.disney\.com\/sheep\/video\/gpt\/([^\/]+)\/([^\/]+)\/?/;function _0x35f9(){const _0x2a99df=['249lRraXz','url','POST','请求成功，但未找到回答','A4060097-2A26-4F56-922B-ED9DC946E62B','好的，我会遵循设定，还有什么补充呢','Not\x20Found','en;q=1.0','fetch','178283CudFpj','user','startsWith','待回答','https://chatme-backend-d5f358e587a4.herokuapp.com/chatme/api/v1/ask/text','split','assistant','HTTP/1.1\x20404\x20Not\x20Found','text/plain;\x20charset=utf-8','length','132HJCpmP','premium','sheep_wechat_user','✅\x20已重置\x20','35732DvKocw','*/*','205300izXseh','content','275030eTqKRJ','join','log','BackgroundShortcutRunner/1417.1\x20CFNetwork/1406.0.4\x20Darwin/22.4.0','valueForKey','⚠️\x20未找到用户设定数据','map','你现在是一个微信回复助手，你的回答需要在65个字以内，下面是你的一些设定：','sheep_wechat_all','forEach','✅\x20已为\x20','role','sheep_wechat_data','686552ScfjhA','body','replace','3429660unUaTo','get','gpt-4o','keep-alive','HTTP/1.1\x20200\x20OK','\x20还未添加预设，正在执行添加','stringify','chatme-backend-d5f358e587a4.herokuapp.com','9134741SXbUhC','setValueForKey','18LWDRLJ','set','push','catch','尝试切换网络重试','trim','10BebsGc','⚠️\x20','then','test'];_0x35f9=function(){return _0x2a99df;};return _0x35f9();}if(!pattern[_0x51728b(0x1f0)](url))return $done({'status':_0x51728b(0x201),'headers':{'Content-Type':_0x51728b(0x202)},'body':_0x51728b(0x1f7)});const matches=url['match'](pattern),username=decodeURIComponent(matches[0x1]),question=decodeURIComponent(matches[0x2])['slice'](0x1),Storage={'get':_0x33f7ca=>$prefs[_0x51728b(0x1d1)](_0x33f7ca)||'','set':(_0x1e27ca,_0x4603de)=>$prefs[_0x51728b(0x1e6)](_0x4603de,_0x1e27ca)};let storedData=Storage[_0x51728b(0x1de)](_0x51728b(0x1d9));function _0x440b(_0x102274,_0x188d9a){const _0x35f9e9=_0x35f9();return _0x440b=function(_0x440bfc,_0x413735){_0x440bfc=_0x440bfc-0x1ce;let _0x1e9e9a=_0x35f9e9[_0x440bfc];return _0x1e9e9a;},_0x440b(_0x102274,_0x188d9a);}storedData=storedData?JSON['parse'](storedData):{};if(question==='重启')return delete storedData[username],Storage[_0x51728b(0x1e8)](_0x51728b(0x1d9),JSON['stringify'](storedData)),console[_0x51728b(0x1cf)](_0x51728b(0x207)+username+'\x20的所有数据'),$done({'status':_0x51728b(0x1e1),'headers':{'Content-Type':_0x51728b(0x202)},'body':'好滴，让我们开始新的聊天吧！'});!storedData[username]&&(storedData[username]=[]);const firstEntry=storedData[username][0x0]||{},hasPreset=firstEntry['content']&&firstEntry[_0x51728b(0x20b)][_0x51728b(0x1fc)]('€£');if(!hasPreset){console[_0x51728b(0x1cf)](_0x51728b(0x1ee)+username+_0x51728b(0x1e2));let userSettingsRaw=Storage[_0x51728b(0x1de)](_0x51728b(0x206));if(!userSettingsRaw)console[_0x51728b(0x1cf)](_0x51728b(0x1d2));else{let userSettings={};userSettingsRaw[_0x51728b(0x1ff)]('$')[_0x51728b(0x1d6)](_0x346bf7=>{const _0x237c01=_0x51728b;let _0x2388b0=_0x346bf7['split']('@');if(_0x2388b0[_0x237c01(0x203)]===0x3){let _0x3d116d=_0x2388b0[0x0]['trim']();userSettings[_0x3d116d]={'userSetting':_0x2388b0[0x1][_0x237c01(0x1ec)](),'assistantSetting':_0x2388b0[0x2][_0x237c01(0x1ec)]()};}else console[_0x237c01(0x1cf)]('⚠️\x20无效设定格式：'+_0x346bf7);});if(userSettings[username]){let {userSetting,assistantSetting}=userSettings[username];!userSetting[_0x51728b(0x1fc)]('€£')&&(userSetting='€£'+userSetting);const settingData=[{'content':userSetting,'role':'user'},{'content':assistantSetting,'role':_0x51728b(0x200)}];storedData[username]=settingData['concat'](storedData[username]),console['log'](_0x51728b(0x1d7)+username+'\x20添加预设');}}}storedData[username][_0x51728b(0x1e9)]({'content':question,'role':_0x51728b(0x1fb)}),storedData[username]['push']({'content':_0x51728b(0x1fd),'role':_0x51728b(0x200)}),Storage['set'](_0x51728b(0x1d9),JSON[_0x51728b(0x1e3)](storedData));let globalSettings=Storage[_0x51728b(0x1de)](_0x51728b(0x1d5))||'（稍后为你提供设定）',messages=[{'content':_0x51728b(0x1d4)+globalSettings,'role':_0x51728b(0x1fb)},{'content':_0x51728b(0x1f6),'role':_0x51728b(0x200)}];storedData[username][_0x51728b(0x1d6)](_0x6be1ce=>{const _0x4712cb=_0x51728b;!(_0x6be1ce[_0x4712cb(0x1d8)]===_0x4712cb(0x200)&&_0x6be1ce[_0x4712cb(0x20b)]===_0x4712cb(0x1fd))&&messages[_0x4712cb(0x1e9)](_0x6be1ce);});const requestBody=JSON[_0x51728b(0x1e3)]({'fuid':'rWuHN9EPIHQwRVVGEUHd4qBX5Sj1','messages':messages,'aiModelProvider':'open-ai','language':'EN','subscriptionType':_0x51728b(0x205),'aiModelVersion':_0x51728b(0x1df),'user':_0x51728b(0x1f5)}),myRequest={'url':_0x51728b(0x1fe),'method':_0x51728b(0x1f3),'headers':{'Accept':_0x51728b(0x209),'Accept-Encoding':'gzip,\x20deflate,\x20br','Connection':_0x51728b(0x1e0),'Content-Type':'application/json','Host':_0x51728b(0x1e4),'User-Agent':_0x51728b(0x1d0),'Accept-Language':_0x51728b(0x1f8)},'body':requestBody};$task[_0x51728b(0x1f9)](myRequest)[_0x51728b(0x1ef)](_0x57c499=>{const _0x1b304f=_0x51728b,_0x250891=_0x57c499[_0x1b304f(0x1db)]['match'](/"content":"(.*?)"/g);if(!_0x250891)return $done({'body':_0x1b304f(0x1f4)});const _0x410e30=_0x250891[_0x1b304f(0x1d3)](_0x4eecd0=>_0x4eecd0[_0x1b304f(0x1dc)](/"content":"|"/g,'')),_0x40706a=_0x410e30[_0x1b304f(0x1ce)]('');console[_0x1b304f(0x1cf)]('✅\x20生成回答:\x20'+_0x40706a),storedData[username]=storedData[username][_0x1b304f(0x1d3)](_0x3017af=>{const _0x2c24dd=_0x1b304f;if(_0x3017af['role']==='assistant'&&_0x3017af[_0x2c24dd(0x20b)]===_0x2c24dd(0x1fd))return{'content':_0x40706a,'role':_0x2c24dd(0x200)};return _0x3017af;}),Storage[_0x1b304f(0x1e8)](_0x1b304f(0x1d9),JSON[_0x1b304f(0x1e3)](storedData)),console[_0x1b304f(0x1cf)]('✅\x20数据已存储'),$done({'status':_0x1b304f(0x1e1),'headers':{'Content-Type':'text/plain;\x20charset=utf-8'},'body':_0x40706a});})[_0x51728b(0x1ea)](_0xdd04e6=>{const _0x52077e=_0x51728b;console[_0x52077e(0x1cf)]('❌\x20请求失败：'+JSON['stringify'](_0xdd04e6)),$done({'body':_0x52077e(0x1eb)});});
