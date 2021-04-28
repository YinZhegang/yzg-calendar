import MonthCalendar from './src/main.vue';

MonthCalendar.install = function (Vue) {
  Vue.component(MonthCalendar.name, MonthCalendar);
};

export default MonthCalendar;
