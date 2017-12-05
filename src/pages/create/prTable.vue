<template>
  <div>
    <el-table
      :data="tableData"
      border
      class="wp100">
      <el-table-column
        prop="companyCode"
        label="公司编码">
      </el-table-column>
      <el-table-column
        prop="companyName"
        label="公司名称">
      </el-table-column>
      <el-table-column
        prop="prNum"
        label="采购申请号">
      </el-table-column>
      <el-table-column
        prop="creator"
        label="发起人"
        width="150">
      </el-table-column>
      <el-table-column
        prop="createDepart"
        label="发起部门">
      </el-table-column>
      <el-table-column
        prop="createTime"
        label="发起时间"
        width="120">
        <template scope="scope">
          {{scope.row.createTime|formatDate}}
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      class="mt20 mb20 fr"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[10, 20, 50, 100]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
  </div>
</template>

<script>
  import Api from '../../api/manageContract/index';
  import { formatDate } from '../../filters/moment';
  import comLoading from '../../mixins/comLoading';

  export default {
    mixins: [comLoading],
    data() {
      return {
        currentPage: 1,
        pageSize: 10,
        total: 0,
        tableData: []
      };
    },
    filters: {
      formatDate
    },
    methods: {
      getData() {
        this.comLoading();
        Api.getPrTableData({}).then((res) => {
          const { list, total, pageSize } = res.data.dataMap;
          this.tableData = list;
          this.total = total;
          this.pageSize = pageSize;
          this.comLoading(false);
        }, () => {
          this.comLoading(false);
        });
      },
      handleSizeChange(val) {
        this.pageSize = val;
      },
      handleCurrentChange(val) {
        this.currentPage = val;
      }
    }
  };
</script>
