<style type="text/scss" lang="scss" scoped>

</style>

<template>
  <div>跳转中。。。</div>
</template>

<script>
  import Jump from '../../assets/js/jump';

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
        routeName: name,
        from: 'out'
      };
      new Jump(this.$router).init(query);
    }
  };
</script>
