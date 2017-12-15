<style type="text/scss" lang="scss" scoped>

</style>

<template>
  <div>
    <mt-header fixed title="模板查看">
      <mt-button icon="back" slot="left"></mt-button>
    </mt-header>
    <div class="mt40">
      <TplBase :info="info" @changeVersion="getData"></TplBase>
      <mt-navbar v-model="selected">
        <mt-tab-item :id="1">基本信息</mt-tab-item>
        <mt-tab-item :id="2">模板信息</mt-tab-item>
      </mt-navbar>
      <mt-tab-container v-model="selected">
        <mt-tab-container-item :id="1">
          <TplContent :info="info"></TplContent>
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
  import TplBase from './tplBase.vue';
  import TplContent from './tplContent.vue';
  import ActionSumit from '../components/actionSubmit.vue';

  export default {
    data() {
      return {
        selected: 1,
        info: {},
        processData: {
          procTitle: '',
          procInstId: ''
        }
      }
    },
    methods: {
      getInfo() {
        const id = this.$store.state.id;
        supportModel.getTplData({
          templateId: id
        }).then((res) => {
          this.tplInfo = res.data.dataMap;
        });
      }
    },
    created() {
      const processData = this.$store.state.processData;
      if (!Object.keys(processData).length) {
        return;
      }
      this.getInfo();
    },
    components: {
      TplBase,
      TplContent,
      ActionSumit
    }
  };
</script>
