<style type="text/scss" lang="scss" scoped>
  .list-container {
    .row {
      margin-bottom: 20px;
    }
    .wp100 {
      width: 100%;
    }
  }
</style>

<template>
  <div class="list-container">
    <el-card>
      <div slot="header">
        <span class="common-title">合同列表</span>
      </div>
      <div>
        <div class="row">
          <el-button type="success" @click="add">签订新合同</el-button>
        </div>
        <el-table
          :data="tableData"
          border
          highlight-current-row
          class="wp100">
          <el-table-column
            type="index"
            width="50">
          </el-table-column>
          <el-table-column
            prop="createDate"
            label="日期"
            width="120">
          </el-table-column>
          <el-table-column
            prop="owner"
            label="创建人"
            width="120">
          </el-table-column>
          <el-table-column
            prop="conCode"
            label="合同编号"
            width="150">
          </el-table-column>
          <el-table-column
            prop="pr"
            label="PR"
            width="120">
          </el-table-column>
          <el-table-column
            prop="materialCode"
            label="物料编码"
            width="120">
          </el-table-column>
          <el-table-column
            prop="price"
            label="单价"
            width="120"
          >
          </el-table-column>
          <el-table-column
            prop="counts"
            label="数量"
            width="120">
          </el-table-column>
          <el-table-column
            fixed="right"
            label="操作"
            width="280">
            <template scope="scope">
              <el-button type="text" size="small" @click="edit(scope.$index, scope.row)">履约</el-button>
              <el-button type="text" size="small" @click="stop(scope.$index, scope.row)">验收不合格</el-button>
              <el-button type="text" size="small" @click="edit(scope.$index, scope.row)">变更</el-button>
              <el-button type="text" size="small" @click="stop(scope.$index, scope.row)">终止</el-button>
              <el-button type="text" size="small" @click="rej(scope.$index, scope.row)">违约处理</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-card>
  </div>
</template>

<script>
  import performanceModel from '@/api/performance';

  export default {
    data() {
      return {
        tableData: [],
        dialogVisible: false,
        stopData: {
          id: '',
          endDate: '',
          reason: '',
          pickerOptions: {
            disabledDate(time) {
              return time.getTime() < Date.now() - 8.64e7;
            }
          }
        }
      }
    },
    watch: {
      dialogVisible() {
        if (!this.dialogVisible) {
          this.stopData.endDate = '';
          this.stopData.reason = '';
        }
      }
    },
    methods: {
      add() {
        this.$router.push('/ConCreate/Create');
      },
      getList() {
        performanceModel.getConList({}).then((res) => {
          this.tableData = res.data.dataMap;
        })
      },
      formatDate(value) {
        this.stopData.endDate = value;
      },
      edit(index, row) {
        const {id} = row;
        this.$router.push('/contemplate/create/' + id);
      },
      stop(index, row) {
        this.stopData.id = row.id;
        this.dialogVisible = true;
      },
      stopSure() {
        const {endDate, reason, id} = this.stopData;
        console.log(JSON.stringify({endDate, reason, id}));
        this.dialogVisible = false;
        this.getList();
      }
    },
    created() {
      this.getList();
    }
  };
</script>
