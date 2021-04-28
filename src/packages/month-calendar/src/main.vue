<template>
  <div>
    month
  </div>
</template>

<script>
export default {
  name: 'month-calendar',
  props: {
    swipe: {
      type: Boolean,
      default: true,
    },
    expand: {
      type: Boolean,
      default: false,
    },
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

    };
  },
  methods: {
    constructArr(firstDay) {
      const l = firstDay.getDay() === 0 ? 6 : (firstDay.getDay() - 1);
      const firstTd = new Date(firstDay.getTime() - l * 24 * 3600 * 1000);
      const darArr = [[], [], [], [], [], []];
      for (let i = 0; i < 42; i++) {
        darArr[Math.ceil(((i + 1) / 7)) - 1].push(new Date(firstTd.getTime() + i * 24 * 3600 * 1000));
      }
      return darArr;
    },
  },
};
</script>

<style scoped>

</style>
