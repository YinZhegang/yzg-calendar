<!--
 * @Author: yinzhegang
 * @Date: 2021-04-27 13:55:20
 * @LastEditTime: 2021-05-06 17:32:08
 * @LastEditors: yinzhegang
 * @Description:
 * @FilePath: /yzg-calendar/src/packages/day-calendar/src/main.vue
 * 可以输入预定的版权声明、个性签名、空行等
-->
<template>
 <div style="padding-top: 20px;">
    <div :style="{width:`${$attrs.width}`}" class="outer">
      <div style="position: relative" class="divide-content">
        <div v-for="i in 24" :key="'divide-'+i" class="divide" :style="{height:everyDotHeight}">
          <p>{{ (i-1>9?i-1:'0'+ (i-1))+':'+'00' }}</p>
          <div class="dot" />
        </div>
      </div>

      <div :style="{width:`calc(${$attrs.width} - 50px)`}" class="content">
        <div v-for="(level,lindex) in dataArr" :key="'calendar-daily'+lindex">
          <div v-for="(item,iidx) in level" :key="'calendar-daily-item'+iidx" class="item"
           :style="{width:everyWidth,
           height:item.height,top: item.top,left: countLength('*',everyWidth,lindex) }">
            <slot name="day-item">
              <div class="every-item" style="cursor:pointer" @click="$emit('task-detail',item)">
                <div class="every-item-left" />
                <el-tooltip class="item" effect="dark" :content="item.name" placement="top">
                  <div class="every-item-cont"> {{ item.name }}</div>
                </el-tooltip>
              </div>
            </slot>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import { dayConstructor, divideLength, countLength } from '../../../utils';

export default {
  name: 'day-calendar',
  props: {
    tasks: {
      type: Array,
      default: () => [],
    },
    titleKey: {
      type: String,
      default: 'title',
    },
    option: {
      type: Object,
      default: () => ({
        grid: {
          show: true,
          color: '#00',
          width: '1px',
        },
        axis: {
          x: {
            show: true,
            color: '#00',
            width: '1px',
          },
          y: {
            show: true,
            color: '#00',
            width: '1px',
          },
        },
        background: {},
      }),
    },
  },
  data() {
    return {
      addName: '',
      addValue: '',
      dataArr: [],
      arr: [],
      divideLength,
      countLength,
      everyWidth: '20px',
      everyHeight: divideLength(this.$attrs.height, 60 * 24),
      everyDotHeight: divideLength(this.$attrs.height, 24),
    };
  },
  watch: {
    tasks(n) {
      if (n) {
        this.arr = [];
        this.parseTasks(n);
        const dataArr = dayConstructor(this.arr);
        this.everyWidth = divideLength('100%', dataArr.length);
        this.dataArr = dataArr;
      }
    },
  },
  created() {
  },
  methods: {
    parseTasks(tasks) {
      // eslint-disable-next-line no-plusplus
      for (let i = 0; i < tasks.length; i++) {
        const h = Number(tasks[i].start.split(':')[0] * 60) + Number(tasks[i].start.split(':')[1]);
        const top = countLength('*', this.everyHeight, h);
        const height = countLength('*', this.everyHeight, (Number(tasks[i].end.split(':')[0] * 60) + Number(tasks[i].end.split(':')[1]) - Number(tasks[i].start.split(':')[0] * 60) - Number(tasks[i].start.split(':')[1])));
        this.arr.push({
          taskId: tasks[i].taskId,
          name: tasks[i].name,
          start: tasks[i].start,
          end: tasks[i].end,
          top,
          height,
        });
      }
    },
    addVules() {
      if (this.addValue) {
        const h = Number(this.addValue[0].split(':')[0] * 60) + Number(this.addValue[0].split(':')[1]);
        const top = countLength('*', this.everyHeight, h);
        const height = countLength('*', this.everyHeight, (Number(this.addValue[1].split(':')[0] * 60) + Number(this.addValue[1].split(':')[1]) - Number(this.addValue[0].split(':')[0] * 60) - Number(this.addValue[0].split(':')[1])));
        this.arr.push({
          name: this.addName,
          start: this.addValue[0],
          end: this.addValue[1],
          top,
          height,
        });
        const dataArr = dayConstructor(this.arr);
        this.everyWidth = divideLength('100%', dataArr.length);
        this.dataArr = dayConstructor(this.arr);
      }
    },
  },
};
</script>

<style scoped>
.outer{
  position: relative;
}
.content{
  position: absolute;
  left: 50px;
  top: 0;
}
.item{
  position: absolute;
}
.every-item{
  background-color: #fff;
  /* border: 1px solid #000; */
  border-radius: 5px;
  width: calc(100% - 7px);
  height: 100%;
  margin-left: 6px;
  margin-right: 1px;
  padding: 0;
  overflow: hidden;
  text-align: center;
  display: flex;
  align-items: center;
}
.every-item-left{
  width: 3px;
  height: 100%;
  background-color: #409EFF;
  float: left;
}
.every-item-cont{
  flex: 1;
  text-align: center;
  width: 100%;
  word-wrap:break-word;
  padding: 0 5px;
  font-size:14px
}
.divide-content{
  margin-left: 50px;
}
.divide{
  border-top:1px solid #bcbcbc;
  border-left:1px solid #bcbcbc;
  position: relative;
  font-size: 14px;
}
.divide > .dot{
  width: 8px;
  height: 8px;
  background-color: #000;
  border-radius: 4px;
  position: absolute;
  top: -5px;
  left: -5px;
}
.divide > p{
  position: absolute;
  left: -40px;
  top: 0px;
  margin: 0;
  padding: 0;
  font-size: 12px;
  color: #bcbcbc;
  transform: translateY(-50%)
}
</style>
