<style type="text/scss" lang="scss" scoped>
  .tabs-container {
    overflow-x: auto;
    white-space: nowrap;
    margin-bottom: 15px;
    &::-webkit-scrollbar {
      display: none;
    }
  }
</style>

<template>
  <div class="tabs-container">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: 'rs-tabs',
    props: {
      value: null
    },
    data() {
      return {};
    }
  };
</script>
