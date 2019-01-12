import {Api} from '../../utils/api.js';
var api = new Api();
const app = getApp();


Page({

  data: {
    isFirstLoadAllStandard:['getMainData']
  },
  //事件处理函数
 
  onLoad(options) {
    const self = this;
    api.commonInit(self);
    if(options.id){
      self.data.id = options.id
    }else{
      api.showToast('数据传递有误','error',2000,function(){
        setTimeout(function(){
          wx.navigateBack({
            delta:1
          })
        },2000)
      })
    }
    self.getMainData();
  },



  getMainData(){
    const self= this;
    const postData = {};
    postData.searchItem ={
      thirdapp_id:getApp().globalData.thirdapp_id,
      id:self.data.id
    };
    const callback = (res)=>{
      self.data.mainData = {};
      if(res.info.data.length>0){
        self.data.mainData = res.info.data[0];
      };
      console.log(self.data.mainData);

      api.checkLoadAll(self.data.isFirstLoadAllStandard,'getMainData',self);
      self.setData({
        web_mainData:self.data.mainData,
      });  
    };
    api.articleGet(postData,callback);
  },


})

  