<template>
  <div>
    <DayCalendar></DayCalendar>
    <WeekCalendar></WeekCalendar>
    <MonthCalendar></MonthCalendar>
  </div>
</template>

<script>
import DayCalendar from '../../day-calendar/src/main.vue';
import WeekCalendar from '../../week-calendar/src/main.vue';
import MonthCalendar from '../../month-calendar/src/main.vue';

export default {
  name: 'calendar',
  components: {
    DayCalendar,
    WeekCalendar,
    MonthCalendar,
  },
};
</script>

<style scoped>

</style>
