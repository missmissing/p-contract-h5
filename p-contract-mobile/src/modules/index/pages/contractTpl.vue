<style type="text/scss" lang="scss" scoped>

</style>

<template>
  <div>
    <mt-navbar v-model="selected" fixed>
      <mt-tab-item :id="1">基本信息</mt-tab-item>
      <mt-tab-item :id="2">模板信息</mt-tab-item>
    </mt-navbar>
    <mt-tab-container v-model="selected" class="mt49">
      <mt-tab-container-item :id="1">
        <TplBase :info="info" @changeVersion="getData"></TplBase>
      </mt-tab-container-item>
      <mt-tab-container-item :id="2">
        <TplContent :info="info"></TplContent>
      </mt-tab-container-item>
    </mt-tab-container>
    <Process></Process>
  </div>
</template>

<script>
  import Process from '../components/process.vue';
  import TplBase from './tplBase.vue';
  import TplContent from './tplContent.vue';

  export default {
    data() {
      return {
        selected: 1,
        procTitle: '',
        procInstId: '',
        info: {}
      }
    },
    methods: {
      getData(id) {
        supportModel.getTplData({
          templateId: id
        }).then((res) => {
          this.tplInfo = res.data.dataMap;
        });
      }
    },
    created() {
      const {id, processData} = this.$route.query;
      //this.getData(id);
      if (processData) {
        const {procInstId, procTitle} = JSON.parse(processData);
        this.procInstId = procInstId;
        this.procTitle = procTitle;
      }
    },
    components: {
      TplBase,
      TplContent,
      Process
    }
  };
</script>
