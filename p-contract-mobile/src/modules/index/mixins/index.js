export default {
  mounted() {
    if (this.$store.state.processData.type === '1') {
      if (this.pcApprove) {
        document.querySelector('.container').style.height = 'calc(100vh - 51px)';
      } else {
        document.querySelector('.container').style.height = 'calc(100vh - 101px)';
      }
    }
  },
  computed: {
    pcApprove() {
      return ['印章保管人', '采购合同上传'].indexOf(this.$store.state.processData.roleName) > -1;
    }
  },
  watch: {
    selected() {
      document.querySelector('.container').style.webkitOverflowScrolling = 'auto';
      setTimeout(() => {
        document.querySelector('.container').style.webkitOverflowScrolling = 'touch';
      }, 0);
    }
  }
};
