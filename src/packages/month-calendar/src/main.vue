<!--
 * @Author: yinzhegang
 * @Date: 2021-04-27 11:03:10
 * @LastEditTime: 2021-05-06 10:40:49
 * @LastEditors: yinzhegang
 * @Description:
 * @FilePath: /yzg-calendar/src/packages/month-calendar/src/main.vue
 * 可以输入预定的版权声明、个性签名、空行等
-->
<template>
  <div class="table">
  <table>
      <thead>
        <tr>
            <th v-for="item in [1,2,3,4,5,6,0]" :key="item">
                <slot name="week" :week="item">
                   <div class="th-week">{{getWeek(item)}}</div>
                </slot>
            </th>
        </tr>
      </thead>
      <tbody>
        <tr :key="'yzg-tr'+ wl"
        :class="{[isAweek(darArr[wl],choose)?'visible':'hidden']:!expand}"
         v-for="(tr,wl) in [0,1,2,3,4,5]">
            <td @click="clickDay(td,wl,dl)" :key="td.getTime()" v-for="(td,dl) in darArr[tr]">
                <slot name="day" :day="td">
                     <div :class="{'td-day':true,'out-day': td.getMonth()!=choose.getMonth()}">
                         <div
                          :class="{'td-day-cont':true,'td-day-choose':
                          td.getMonth()==choose.getMonth()&&td.getDate()==choose.getDate()}">
                            {{td.getDate()}}
                         </div>
                    </div>
                </slot>
            </td>
        </tr>
      </tbody>
  </table>
  <slot name="foot" :expand="expand">
    <div @click="expand = !expand" class="divider">
       <p>{{expand?'关闭':'展开'}}</p>
    </div>
  </slot>

  </div>
</template>

<script>
export default {
  name: 'month-calendar',
  model: {
    prop: 'choose',
    event: 'click',
  },
  props: {
    choose: {
      type: Date,
      default: new Date(),
    },
    swipe: {
      type: Boolean,
      default: true,
    },
    // expand: {
    //   type: Boolean,
    //   default: false,
    // },
    firstDayOfWeek: {
      type: Number,
      default: 1,
    },
    background: {
      type: Object,
      default: () => ({ }),
    },
  },
  data() {
    return {
      expand: true,
      className: 'hidden',
      chooseDay: null,
      darArr: [],
    };
  },
  watch: {
    choose(n) {
      this.renderCalendar(n);
    },
    expand(n) {
      this.$emit('expand-change', n);
    },
  },
  created() {
    this.chooseDay = this.choose || new Date();
    this.renderCalendar(this.chooseDay);
  },
  methods: {
    getToggle() {
      return this.expand;
    },
    togger(s) {
      if (s !== undefined) {
        this.expand = Boolean(s);
      } else {
        this.expand = !this.expand;
      }
    },
    isAweek(n, c) {
      return n.some((i) => i.getMonth() === c.getMonth() && i.getDate() === c.getDate());
    },
    clickDay(day, wl, dl) {
      this.$emit('click', day);
      this.$emit('day-click', day, wl, dl);
      this.renderCalendar(day);
    },
    getWeek(n) {
      switch (n) {
        case 1:
          return '一';
        case 2:
          return '二';
        case 3:
          return '三';
        case 4:
          return '四';
        case 5:
          return '五';
        case 6:
          return '六';
        case 0:
          return '日';
        default:
          return '';
      }
    },
    renderCalendar(choose = this.choose) {
      const firstDay = new Date(choose.getFullYear(), choose.getMonth(), 1);
      this.darArr = this.constructArr(firstDay);
    },
    constructArr(firstDay) {
      const l = firstDay.getDay() === 0 ? 6 : (firstDay.getDay() - 1);
      const firstTd = new Date(firstDay.getTime() - l * 24 * 3600 * 1000);
      const darArr = [[], [], [], [], [], []];
      // eslint-disable-next-line no-plusplus
      for (let i = 0; i < 42; i++) {
        darArr[Math.ceil(((i + 1) / 7)) - 1]
          .push(new Date(firstTd.getTime() + i * 24 * 3600 * 1000));
      }
      return darArr;
    },
  },
};
</script>

<style scoped>
 tr,td,th,thead,tbody,tfoot{
        margin: 0;
        padding: 0;
     }
     .divider{
       width:calc(100% - 20px);
       margin:0 10px;
       border-bottom: 1px solid #DCDFE6;
       text-align: center;
       position: relative;
       top:-10px
     }
     .divider p{
       position: relative;
       width: 50px;
       margin: 0 auto;
       top:10px;
       background-color: #fff;
       cursor: pointer;
       color:#909399;
     }
     tfoot{
      width: 100%;
    }
    .table{
        width: 300px;
        background: #fff;
        margin: 0;
        padding: 0;
    }
    .table table{
        width:100%;
        border-collapse:collapse;
        margin: 0;
        padding: 0;
    }
    .td-day{
        height: 40px;
        width: 40px;
        text-align: center;
        line-height: 40px;
        cursor: pointer;
        margin: 0 auto;
        font-size: 14px;
    }
    .td-day-cont{
        height: 33px;
        width: 33px;
        text-align: center;
        line-height: 33px;
        margin: 0 auto;
    }
    .td-day-cont:hover{
        border-radius: 33px;
        background-color: #409EFF;
        color: #fff;
    }
    .td-day-choose{
        border-radius: 30px;
        background-color: #409EFF;
        color: #fff;
    }
    .th-week{
        height: 50px;
        text-align: center;
        line-height: 50px;
    }
    .out-day{
        color: #C0C4CC;
    }
    .hidden{
      display: none;
    }

</style>
