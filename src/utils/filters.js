export default {
  // 金额输入框，过滤器 ;
  moneyFilter: function(numStr) {
    numStr = numStr.replace(/[^\d|.]/g, "");
    numStr = numStr.replace(/^\./g, "0.");
    numStr = numStr.replace(/\.{2,}/g, ".");
    numStr = numStr
      .replace(".", "$#$")
      .replace(/\./g, "")
      .replace("$#$", ".");
    // eslint-disable-next-line
    numStr = numStr.replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3');
    return numStr;
  },

  //百分数格式化
  rateFormate: function(rate) {
    let num = Number(rate);
    if (num === 0) {
      return "0.0";
    }
    return parseFloat((num * 100).toPrecision(12));
  },

  /**
   * 银行限额 单位格式化
   * 50000 => 5万
   * 5000 => 5,000
   * @param {string|number} num 金额
   */
  formateMoneyUnit: function(num) {
    try {
      let ret = Number(num);
      if (ret / 10000 >= 1) {
        ret = ret / 10000;
        return `${ret.toLocaleString()}万元`;
      }
      return `${ret.toLocaleString()}元`;
    } catch (error) {
      console.log("TCL: error", error);
    }
  },

  //金额数字格式化  千分位并保留两位小数 小数点后面多余的0去掉 eg:1000.00=>1,000
  formateMoneyUS(value) {
    if (!value) {
      return "";
    }

    let num = Number(value) / 100;
    return num.toLocaleString("en-US");
    // return num.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
  },

  //金额数字格式化 123456789 => 1,234,567,890
  formateMoney(value) {
    if (!value) {
      return "";
    }

    let num = Number(value) / 100;
    num = Math.floor(num * 100) / 100;
    return num;
  }
};
