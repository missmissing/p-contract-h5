<style type="text/scss" lang="scss" scoped>

</style>

<template>
  <div>
    <SealTable
      v-if="contract.length"
      :items="contract"
      :show-header="true"
      class="mb20">
    </SealTable>
    <template v-if="others.length"
              v-for="(item,index) in others">
      <SealTable :items="item" :show-header="index===0" v-if="item&&item.length"></SealTable>
    </template>
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
  import attachmentType from '../../../../filters/attachmentType';
  import SealTable from '../../components/sealTable.vue';

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
      return {
        contract: [],
        others: [],
        agreenments: []
      };
    },
    watch: {
      info(val) {
        if (val.sealAttachments) {
          let contract = [];
          const others = [];
          const agreenments = [];
          val.sealAttachments.forEach((item) => {
            const attachType = item[0].attachType;
            if (attachType === 3) {
              contract = item;
            } else if (attachType === 1) {
              others.push(item);
            } else if (attachType === 2) {
              agreenments.push(item[0]);
            }
          });
          this.contract = contract;
          this.others = others;
          this.agreenments = agreenments;
        }
      }
    },
    filters: {
      attachmentType
    },
    components: {
      SealTable
    }
  };
</script>
