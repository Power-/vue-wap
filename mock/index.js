const Mock = require('mockjs'); //mockjs 导入依赖模块
const util = require('./util'); //自定义工具模块

//返回一个函数
module.exports = function (app) {
  //get方式
  app.get("/common/index", function (rep, res) {
    var json = {
      "_csrf": "5v4aXjgsx_updPcz1riQV8uJeFQZSHhrM_XLgbJLGFiklWgafhmz1t0rmVualeAThPo_ZXd_FhN2hZPH3SRiKQ",
      "isLoggedIn": true
    };
    res.json(Mock.mock(json));
  });
  // post方式
  app.post('/auth/check', function (rep, res) {
    var json = util.getJsonFile('./json/user/auth.check.json');
    res.json(Mock.mock(json));
  });

};
