/*
 * @Author: yinzhegang
 * @Date: 2021-04-27 16:20:25
 * @LastEditTime: 2021-04-28 17:23:27
 * @LastEditors: yinzhegang
 * @Description:
 * @FilePath: /yzg-calendar/src/main.js
 * 可以输入预定的版权声明、个性签名、空行等
 */
// eslint-disable-next-line import/no-extraneous-dependencies
import Vue from 'vue';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Calendar } from 'yzg-calendar';
import App from './App.vue';
import router from './router';

Vue.config.productionTip = false;
Vue.use(Calendar);
new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');
