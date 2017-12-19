<style type="text/scss" lang="scss" scoped>

</style>

<template>
  <div>
    <mt-header fixed title="模板查看">
      <mt-button icon="back" slot="left"></mt-button>
    </mt-header>
    <div class="container">
      <TplBase :info="info" @changeVersion="getData"></TplBase>
      <mt-navbar v-model="selected" class="mt20">
        <mt-tab-item :id="1">模板信息</mt-tab-item>
      </mt-navbar>
      <mt-tab-container v-model="selected">
        <mt-tab-container-item :id="1">
          <TplContent :info="info"></TplContent>
        </mt-tab-container-item>
      </mt-tab-container>
    </div>
    <ActionSumit></ActionSumit>
  </div>
</template>

<script>
  import Api from '../../../api/support';
  import TplBase from './tplBase.vue';
  import TplContent from './tplContent.vue';
  import ActionSumit from '../components/actionSubmit.vue';

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
    created() {
      this.getInfo();
    },
    components: {
      TplBase,
      TplContent,
      ActionSumit
    }
  };
</script>
