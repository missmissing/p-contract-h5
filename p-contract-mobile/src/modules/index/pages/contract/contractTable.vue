<template>
  <div>
    <el-table
      :data="[info]"
      class="wp100">
      <el-table-column
        min-width="100"
        prop="contractNo"
        label="合同号">
      </el-table-column>
      <el-table-column
        prop="creator"
        label="发起人"
        min-width="100">
      </el-table-column>
      <el-table-column
        v-if="info.creatorDept"
        prop="creatorDept"
        label="发起部门"
        min-width="150">
      </el-table-column>
      <el-table-column
        prop="submitTime"
        label="发起时间"
        min-width="120">
        <template scope="scope">
          {{scope.row.submitTime | formatDate}}
        </template>
      </el-table-column>
      <el-table-column
        prop="sealTime"
        label="盖章时间"
        min-width="120">
        <template scope="scope">
          {{scope.row.sealTime | formatDate}}
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  import {formatDate} from '../../../../filters/moment';

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
        tableData: []
      };
    },
    filters: {
      formatDate
    }
  };
</script>
