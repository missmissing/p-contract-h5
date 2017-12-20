<template>
  <div>
    <el-table
      :data="tableData"
      class="wp100">
      <el-table-column
        prop="folio"
        label="比价单编码"
        min-width="110">
      </el-table-column>
      <el-table-column
        prop="originatorName"
        label="发起人"
        min-width="100">
      </el-table-column>
      <el-table-column
        prop="originatorDepartmentName"
        label="发起部门"
        min-width="150">
      </el-table-column>
      <el-table-column
        prop="startTime"
        label="发起时间"
        min-width="120">
        <template scope="scope">
          {{scope.row.startTime | formatDate}}
        </template>
      </el-table-column>
      <el-table-column
        prop="finishTime"
        label="结束时间"
        min-width="120">
        <template scope="scope">
          {{scope.row.finishTime | formatDate}}
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  import Api from '../../../../api/manageContract/index';
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
    },
    methods: {
      getData() {
        Api.getQrDetail({folio: this.info.prNo}).then((res) => {
          const data = res.data.dataMap;
          this.tableData = [data];
        });
      }
    },
    created() {
      this.getData();
    }
  };
</script>
