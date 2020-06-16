import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import "./assets/css/base.less";
// rem h5 适配
// import "amfe-flexible/index.js";
import filters from "./utils/filters";

Vue.config.productionTip = false;

//全局注册过滤器
Object.keys(filters).forEach(k => Vue.filter(k, filters[k]));

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
