<style type="text/scss" lang="scss" scoped>

</style>

<template>
  <div>
    <mt-cell title="用章次数" :value="info.sealNumber"></mt-cell>
    <mt-cell title="打印份数" :value="info.printNumber"></mt-cell>
    <mt-cell title="留存份数" :value="info.remainNumber"></mt-cell>
    <mt-cell title="选择用章" :value="info.sealUsedInfo | printChapter"></mt-cell>
    <SealTable
      v-if="files.length"
      :items="files"
      :show-header="true"
      class="mb20">
    </SealTable>
  </div>
</template>

<script>
  import printChapter from '../../../../filters/printChapter';
  import attachmentType from '../../../../filters/attachmentType';
  import SealTable from '../../components/sealTable.vue';

  export default {
    props: {
      info: {
        type: Object,
        default() {
          return {};
        }
      }
    },
    data() {
      return {
        files: []
      };
    },
    watch: {
      info(val) {
        if (val.attaches && val.attaches.length) {
          this.files = val.attaches;
        }
      }
    },
    filters: {
      attachmentType,
      printChapter
    },
    components: {
      SealTable
    }
  };
</script>
