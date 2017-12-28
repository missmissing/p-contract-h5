<style type="text/scss" lang="scss" scoped>

</style>

<template>
  <div>
    <Header title="模板查看"></Header>
    <div class="container">
      <TplBase :info="info"></TplBase>
      <mt-navbar v-model="selected" class="mt20">
        <mt-tab-item :id="1">审批意见</mt-tab-item>
        <mt-tab-item :id="2">模板信息</mt-tab-item>
      </mt-navbar>
      <mt-tab-container v-model="selected">
        <mt-tab-container-item :id="1">
          <Comments></Comments>
        </mt-tab-container-item>
        <mt-tab-container-item :id="2">
          <TplContent :info="info"></TplContent>
        </mt-tab-container-item>
      </mt-tab-container>
    </div>
    <ActionSumit></ActionSumit>
  </div>
</template>

<script>
  import Api from '../../../../api/support/index';
  import Header from '../../components/header.vue';
  import TplBase from './tplBase.vue';
  import TplContent from './tplContent.vue';
  import Comments from '../../components/comments.vue';
  import ActionSumit from '../../components/actionSubmit.vue';

  export default {
    data() {
      return {
        selected: 1,
        info: {}
      }
    },
    methods: {
      getInfo() {
        const id = this.$store.state.id;
        Api.getTplData({
          templateId: id
        }).then((res) => {
          this.info = res.data.dataMap;
          //console.log(this.info);
        });
      }
    },
    watch: {
      created() {
        this.getInfo();
      }
    },
    components: {
      Header,
      TplBase,
      TplContent,
      Comments,
      ActionSumit
    }
  };
</script>
