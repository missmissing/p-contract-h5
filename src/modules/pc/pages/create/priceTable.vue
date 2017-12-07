<template>
  <div>
    <el-table
      :data="tableData"
      border
      class="wp100">
      <el-table-column
        prop="folio"
        label="比价单编码">
      </el-table-column>
      <el-table-column
        prop="originatorName"
        label="发起人"
        width="150">
      </el-table-column>
      <el-table-column
        prop="originatorDepartmentName"
        label="发起部门">
      </el-table-column>
      <el-table-column
        prop="startTime"
        label="发起时间"
        width="120">
        <template scope="scope">
          {{scope.row.startTime|formatDate}}
        </template>
      </el-table-column>
      <el-table-column
        prop="finishTime"
        label="结束时间"
        width="120">
        <template scope="scope">
          {{scope.row.finishTime|formatDate}}
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  import Api from '../../../../api/manageContract/index';
  import { formatDate } from '../../../../filters/moment';
  import comLoading from '../../mixins/comLoading';

  export default {
    mixins: [comLoading],
    props: {
      prNo: String
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
        this.comLoading();
        Api.getQrDetail({ folio: this.prNo }).then((data) => {
          if (data.data.dataMap) {
            this.tableData = [data.data.dataMap];
          }
          this.comLoading(false);
        }, () => {
          this.comLoading(false);
        });
      }
    },
    created() {
      this.getData();
    }
  };
</script>
