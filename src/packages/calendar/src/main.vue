<template>
  <div>
      <el-input size="mini" v-model="addName" type="text" />
       <el-time-picker
       size="mini"
       v-model="addValue"
          is-range
          format="HH:mm"
          value-format="HH:mm"
         range-separator="至"
        start-placeholder="开始时间"
          end-placeholder="结束时间"
         placeholder="选择时间范围"
       />
    <el-button size="mini" @click="addVules">ADD</el-button>
    <DayCalendar :tasks="tasks" width="100%" height="800px"></DayCalendar>
    <WeekCalendar></WeekCalendar>
    <MonthCalendar v-model="now"></MonthCalendar>
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
  data() {
    return {
      now: new Date(),
      addName: '',
      addValue: [],
      tasks: [],
    };
  },
  methods: {
    addVules() {
      this.tasks.push({
        taskId: Math.random() * new Date(),
        name: this.addName,
        start: this.addValue[0],
        end: this.addValue[1],
      });
      console.log(this.tasks);
      // {
      //           taskId: tasks[i].taskId,
      //           name: tasks[i].taskTitle,
      //           start: tasks[i].startHour,
      //           end: tasks[i].endHour,
      //           top,
      //           height
      //         }
    },
  },
};
</script>

<style scoped>

</style>
