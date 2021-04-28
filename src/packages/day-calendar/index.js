import DayCalendar from './src/main.vue';

DayCalendar.install = function (Vue) {
  Vue.component(DayCalendar.name, DayCalendar);
};

export default DayCalendar;
