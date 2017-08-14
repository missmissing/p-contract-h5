<style type="text/scss" lang="scss" scoped>
  .list-container {
    .row {
      margin-bottom: 20px;
    }
    .wp100 {
      width: 100%;
    }
    .line {
      text-align: center;
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
          <el-form ref="form" :model="form" label-width="80px">
            <el-row>
              <el-col :span="16">
                <el-form-item label="查询条件">
                  <el-input
                    v-model="form.someText">
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6" :offset="1">
                <el-button type="primary" @click="search">搜 索</el-button>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="7">
                <el-form-item label="模板类型">
                  <el-select
                    v-model="form.type"
                    placeholder="请选择"
                    class="wp100">
                    <el-option label="合同模板" value="1"></el-option>
                    <el-option label="合同文本" value="2"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="7" :offset="1">
                <el-form-item label="文本编号">
                  <el-input></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="7">
                <el-form-item label="发起人">
                  <el-input v-model="form.initiator"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-form-item label="创建时间">
              <el-col :span="6">
                <el-date-picker
                  v-model="form.daterange"
                  type="daterange"
                  placeholder="选择日期范围"
                  @change="formatDateRange"
                  :picker-options="pickerOptions"
                  class="wp100">
                </el-date-picker>
              </el-col>
            </el-form-item>
            <el-form-item label="有效文本">
              <el-checkbox v-model="form.valid"></el-checkbox>
            </el-form-item>
          </el-form>
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
  import moment from 'moment';
  import supportModel from '@/api/support';

  export default {
    data() {
      return {
        form: {
          someText: '',
          type: '',
          daterange: [],
          initiator: '',
          valid: false
        },
        pickerOptions: {
          disabledDate(time) {
            return time.getTime() > Date.now();
          }
        },
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
      search() {
        console.log('搜索');
        console.log(JSON.stringify(this.form));
      },
      getList() {
        supportModel.getList({}).then((res) => {
          this.tableData = res.data.dataMap;
        })
      },
      formatDate(value) {
        this.stopData.endDate = value;
      },
      formatDateRange(value) {
        const daterange = value.split(' ');
        this.form.daterange = [daterange[0], daterange[2]];
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
