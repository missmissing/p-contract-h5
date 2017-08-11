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

        </div>
        <el-table
          :data="tableData"
          border
          highlight-current-row
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
              <el-button type="text" size="small" @click="edit(scope.$index, scope.row)">编辑</el-button>
              <el-button type="text" size="small" @click="stop(scope.$index, scope.row)">废除</el-button>
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
        <el-form ref="form" label-width="80px">
          <el-form-item label="废除时间">
            <el-col>
              <el-date-picker
                class="wp100"
                v-model="stopData.endDate"
                type="date"
                @change="formatDate"
                placeholder="选择日期"
                :picker-options="stopData.pickerOptions"
                :editable="false">
              </el-date-picker>
            </el-col>
          </el-form-item>
          <el-form-item label="废除理由" style="margin-bottom:0;">
            <el-col>
              <el-input
                class="wp100"
                v-model="stopData.reason"
                type="textarea"
                :rows="8"
                :maxlength="300"
                resize="none"
              ></el-input>
            </el-col>
          </el-form-item>
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="stopSure">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import supportModel from '@/api/support';

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
      getList() {
        supportModel.getList({}).then((res) => {
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
