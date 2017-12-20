<style type="text/scss" lang="scss" scoped>

</style>

<template>
  <div>
    <el-table :data="contractList" border>
      <el-table-column type="index" label="序号" width="60"></el-table-column>
      <el-table-column prop="contractNo" label="合同号" min-width="120"></el-table-column>
      <el-table-column prop="contractType" label="类型" min-width="100">
        <template scope="scope">
          {{scope.row.contractType | contractType}}
        </template>
      </el-table-column>
      <el-table-column prop="contractStatusName" label="状态" min-width="100"></el-table-column>
      <el-table-column prop="startTime" label="开始时间" min-width="110">
        <template scope="scope">
          {{scope.row.startTime | formatDate}}
        </template>
      </el-table-column>
      <el-table-column prop="endTime" label="终止时间" min-width="110">
        <template scope="scope">
          {{scope.row.endTime | formatDate}}
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  import Api from '../../../../api/manageContract';
  import {formatDate} from '../../../../filters/moment';
  import contractType from '../../../../filters/contractType';

  export default {
    data() {
      return {
        contractList: [],
        pageNo: 1,
        pageSize: 100
      };
    },
    created() {
      this.getInfo();
    },
    methods: {
      getInfo() {
        Api.getConList({
          pageNo: this.pageNo,
          pageSize: this.pageSize
        }).then((res) => {
          const data = res.data.dataMap;
          this.contractList = data.data;
        });
      }
    },
    filters: {
      formatDate,
      contractType
    }
  };
</script>
