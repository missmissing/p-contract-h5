<style type="text/scss" lang="scss" scoped>

</style>

<template>
  <div>
    <mt-cell title="用章次数" :value="info.sealNumber"></mt-cell>
    <mt-cell title="打印份数" :value="info.printNumber"></mt-cell>
    <mt-cell title="留存份数" :value="info.remainNumber"></mt-cell>
    <mt-cell title="选择用章" :value="info.sealUsedInfo | printChapter"></mt-cell>
    <SealTable
      v-if="contract.length"
      :items="contract"
      class="mb20">
    </SealTable>
    <el-table v-if="agreenments.length" :data="agreenments" class="mt20">
      <el-table-column prop="attachType" label="附件类型" min-width="130px">
        <template scope="scope">
          {{scope.row.attachType | attachmentType}}
        </template>
      </el-table-column>
      <el-table-column prop="fileName" label="从协议编号" min-width="130px"></el-table-column>
    </el-table>
  </div>
</template>

<script>
  import printChapter from '../../../../filters/printChapter'
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
        contract: [],
        agreenments: []
      };
    },
    watch: {
      info(val) {
        if (val.attaches) {
          const contract = [];
          const agreenments = [];
          val.attaches.forEach((item) => {
            const attachType = item.attachType;
            if (attachType === 2) {
              agreenments.push(item);
            } else {
              contract.push(item)
            }
          });
          this.contract = contract;
          this.agreenments = agreenments;
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
