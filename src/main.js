/*
 * @Author: yinzhegang
 * @Date: 2021-04-27 16:20:25
 * @LastEditTime: 2021-05-06 10:59:51
 * @LastEditors: yinzhegang
 * @Description:
 * @FilePath: /yzg-calendar/src/main.js
 * 可以输入预定的版权声明、个性签名、空行等
 */
// eslint-disable-next-line import/no-extraneous-dependencies
import Vue from 'vue';
// eslint-disable-next-line import/no-extraneous-dependencies
import ElementUI from 'element-ui';
import App from './App.vue';
import router from './router';
import { Calendar } from './index';
// eslint-disable-next-line import/no-extraneous-dependencies
import 'element-ui/lib/theme-chalk/index.css';

Vue.config.productionTip = false;

Vue.use(Calendar);
Vue.use(ElementUI);

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');
