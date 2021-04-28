<template>
  <div>
    day
  </div>
</template>

<script>
export default {
  name: 'day-calendar',
  props: {
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
};
</script>

<style scoped>

</style>
