const moduleFn = {
  //获取URL里的参数
  getParameter: function(name) {
    let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    let r = window.location.search.substr(1).match(reg);
    if (r != null) {
      return unescape(r[2]);
    }
    return null;
  },

  //判断是不是app
  isApp: function() {
    let ua = navigator.userAgent;
    if (
      ua.toLowerCase().indexOf("apple") > -1 ||
      ua.toLowerCase().indexOf("android") > -1
    ) {
      return true;
    } else {
      return false;
    }
  },
  //判断系统 安卓 or iOS
  isAndroid: function() {
    if (navigator.userAgent.toLowerCase().indexOf("android") > -1) {
      return true;
    } else {
      return false;
    }
  },
  isIos: function() {
    if (navigator.userAgent.toLowerCase().indexOf("apple") > -1) {
      return true;
    } else {
      return false;
    }
  },

  /**
   * 返回需要提示的 msg
   * @param {object} data 接口返回的错误数据
   */
  getDataErrorMsg(data) {
    let msg = "";
    if (data && data.details) {
      for (let key in data.details) {
        if (data.details[key] && data.details[key].length > 0) {
          msg = data.details[key][0];
          break;
        }
      }
    }
    if (!msg && data && data.message) {
      msg = data.message;
    }
    return msg;
  }
};

export default moduleFn;
