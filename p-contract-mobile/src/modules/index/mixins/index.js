export default {
  computed: {
    pcApprove() {
      return ['印章保管人', '采购合同上传'].indexOf(this.$store.state.processData.roleName) > -1;
    }
  }
};
