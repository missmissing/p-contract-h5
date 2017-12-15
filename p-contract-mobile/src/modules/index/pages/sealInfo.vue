<style type="text/scss" lang="scss" scoped>

</style>

<template>
  <div>
    <SealTable
      v-if="info.contract&&info.contract.length"
      :items="info.contract"
      :show-header="true"
      class="mb20">
    </SealTable>
    <template v-if="info.others&&info.others.length"
              v-for="(item,index) in info.others">
      <SealTable :items="item" :show-header="index===0" v-if="item&&item.length"></SealTable>
    </template>
    <el-table v-if="info.agreenments&&info.agreenments.length" :data="info.agreenments" class="mt20">
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
  import attachmentType from '../../../filters/attachmentType';
  import SealTable from './sealTable.vue';

  export default {
    props: {
      info: {
        type: Object,
        default() {
          return {};
        }
      },
      moreData: {
        type: Object,
        default() {
          return {};
        }
      }
    },
    data() {
      return {};
    },
    filters: {
      attachmentType
    },
    components: {
      SealTable
    }
  };
</script>
