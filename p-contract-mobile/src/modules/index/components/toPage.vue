<style type="text/scss" lang="scss" scoped>

</style>

<template>
  <div class="tc mt20">请稍等。。。</div>
</template>

<script>
  import Jump from '../util/jump';

  export default {
    data() {
      return {};
    },
    methods: {},
    created() {
      new Jump(this).init();
    }
  };
</script>
