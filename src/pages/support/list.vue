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
        <span class="common-title">合同模板列表</span>
      </div>
      <div>
        <div class="row">
          <el-button type="success" @click="add">新 增</el-button>
        </div>
        <el-table
          :data="tableData"
          border
          class="wp100">
          <el-table-column
            fixed
            prop="name"
            label="姓名"
            width="120">
          </el-table-column>
          <el-table-column
            prop="date"
            label="日期"
            width="150">
          </el-table-column>
          <el-table-column
            prop="province"
            label="省份"
            width="120">
          </el-table-column>
          <el-table-column
            prop="city"
            label="市区"
            width="120">
          </el-table-column>
          <el-table-column
            prop="address"
            label="地址"
          >
          </el-table-column>
          <el-table-column
            prop="zip"
            label="邮编"
            width="120">
          </el-table-column>
          <el-table-column
            fixed="right"
            label="操作"
            width="100">
            <template scope="scope">
              <el-button type="text" size="small">编辑</el-button>
              <el-button type="text" size="small">废除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-card>
    <el-dialog
      title="废除模板"
      :visible.sync="dialogVisible"
      size="tiny"
    >
      <div>

      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="stop">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import supportModel from '@/api/support';

  export default {
    data() {
      return {
        tableData: [],
        dialogVisible: false
      }
    },
    methods: {
      add() {
        this.$router.push('/contemplate/create');
      },
      getList() {
        supportModel.getList({}).then((res) => {
          this.tableData = res.data.dataMap;
        })
      },
      stop() {
        this.dialogVisible = false;
      }
    },
    mounted() {
      this.getList();
    }
  };
</script>
