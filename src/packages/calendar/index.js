import Calendar from './src/main.vue';

Calendar.install = function (Vue) {
  Vue.component(Calendar.name, Calendar);
};

export default Calendar;
