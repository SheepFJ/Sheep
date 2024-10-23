/*************************************
项目名称：SiriAI
更新日期：2024-10-02
脚本作者：Sheep
使用声明：⚠️仅供参考，🈲转载与售卖！
脚本说明；利用Siri与圈x的httpbackend功能去调用gpt接口实现问答

**************************************

[rewrite_local]
  ^https:\/\/securetoken\.googleapis\.com\/v1\/token url script-response-body https://raw.githubusercontent.com/SheepFJ/Sheep/main/SiriAIT.js  

  ^https:\/\/genie-production-yfvxbm4e6q-uc\.a\.run\.app\/chats\/local\/completions url script-request-header https://raw.githubusercontent.com/SheepFJ/Sheep/main/SiriAIT.js  
^https:\/\/genie-production-yfvxbm4e6q-uc\.a\.run\.app\/chats\/local\/completions url script-response-body https://raw.githubusercontent.com/SheepFJ/Sheep/main/SiriAIT.js

[mitm]
hostname = securetoken.googleapis.com,genie-production-yfvxbm4e6q-uc.a.run.app

*************************************/