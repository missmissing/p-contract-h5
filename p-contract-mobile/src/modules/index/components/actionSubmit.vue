<style type="text/scss" lang="scss" scoped>

</style>

<template>
  <div>
    <Actions v-model="actionName" @change="actionChange"></Actions>
    <Submit v-model="popupVisible" :actionName="actionName"></Submit>
  </div>
</template>

<script>
  import Actions from '../components/actions.vue';
  import Submit from '../components/submit.vue';

  export default {
    data() {
      return {
        actionName: '',
        popupVisible: false
      };
    },
    methods: {
      actionChange(val) {
        this.popupVisible = true;
      }
    },
    created() {

    },
    components: {
      Actions,
      Submit
    }
  };
</script>
