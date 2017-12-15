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
      const {name} = this.$route;
      const {
        procInstId, serialNumber, procCode, sn
      } = this.$route.query;
      const query = {
        procInstId,
        serialNumber: serialNumber || '',
        sn,
        procCode,
        routeName: name
      };
      new Jump(this.$router).init(query);
    }
  };
</script>
