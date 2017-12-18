<style type="text/scss" lang="scss" scoped>
  .tab-bars {
    position: fixed;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: 1;
    display: flex;
    padding: 10px;
    background-image: linear-gradient(180deg, #d9d9d9, #d9d9d9 50%, transparent 0);
    background-size: 100% 1px;
    background-repeat: no-repeat;
    background-position: 0 0;
    background-color: #fafafa;
    .tab-item {
      flex: 1;
      font-size: 12px;
      margin: 0 10px;
      background-color: #FFF;
    }
  }
</style>

<template>
  <div class="tab-bars">
    <mt-button v-for="btn in btns" size="small" :key="btn" class="tab-item" @click="clickBtn(btn)">{{btn}}</mt-button>
  </div>
</template>

<script>
  export default {
    props: {
      value: {
        type: Object,
        default() {
          return '';
        }
      },
      btns: {
        type: Array,
        default() {
          return [];
        }
      }
    },
    data() {
      return {
        selected: null
      };
    },
    methods: {
      clickBtn(val) {
        this.selected = val;
        this.$emit('input', val);
        this.$emit('change', val);
      }
    }
  };
</script>
