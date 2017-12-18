<style type="text/scss" lang="scss" scoped>

</style>

<template>
  <div>
    <Actions v-model="actionName" @change="actionChange" :btns="btns"></Actions>
    <Submit v-model="popupVisible" :actionName.sync="actionName" :btns="allBtns"></Submit>
  </div>
</template>

<script>
  import Actions from '../components/actions.vue';
  import Submit from '../components/submit.vue';

  export default {
    data() {
      return {
        actionName: '',
        btns: [],
        allBtns: [],
        commonBtns: ['加签', '转签'],
        sign: 0,
        popupVisible: false
      };
    },
    methods: {
      actionChange(val) {
        this.popupVisible = true;
      }
    },
    created() {
      const processData = this.$store.state.processData;
      if (!Object.keys(processData).length) {
        return;
      }
      const {actions, sign} = processData;
      if (sign === 1) {
        this.commonBtns = [];
      }
      this.allBtns = [...actions, ...this.commonBtns];
      if (this.allBtns.length > 4) {
        this.btns = this.allBtns.slice(0, 2).push('其它');
      } else {
        this.btns = this.allBtns;
      }
    },
    components: {
      Actions,
      Submit
    }
  };
</script>
