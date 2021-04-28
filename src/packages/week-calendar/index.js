import WeekCalendar from './src/main.vue';

WeekCalendar.install = function (Vue) {
  Vue.component(WeekCalendar.name, WeekCalendar);
};

export default WeekCalendar;
