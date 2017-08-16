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
        <div class="mb20">
          <el-form ref="form" :model="form" label-width="100px">
            <el-row>
              <el-col :span="8">
                <el-form-item label="合同编号">
                  <el-input v-model="form.contractCode"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="16">
                <el-form-item label="合同名称">
                  <el-input v-model="form.contractName"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="合同模式">
                  <el-select
                    v-model="form.contractPattern"
                    placeholder="请选择"
                    class="wp100">
                    <el-option label="合同模板" value="1"></el-option>
                    <el-option label="合同文本" value="2"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="合同类型">
                  <el-select
                    v-model="form.contractType"
                    placeholder="请选择"
                    class="wp100">
                    <el-option label="合同模板" value="1"></el-option>
                    <el-option label="合同文本" value="2"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="采购订单">
                  <el-input v-model="form.pr"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="发起人">
                  <el-input v-model="form.initiator"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="业务经办人">
                  <el-input v-model="form.busiController"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="业务部门">
                  <el-input v-model="form.busiApartment"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="创建时间">
                  <el-date-picker
                    style="width:100%;"
                    v-model="form.daterange"
                    type="daterange"
                    placeholder="选择日期范围"
                    @change="formatDateRange"
                    :picker-options="pickerOptions">
                  </el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="有效文本">
                  <el-switch
                    v-model="form.valid"
                    on-text=""
                    off-text="">
                  </el-switch>
                  <el-button type="primary" @click="search" style="margin-left:30px;">搜 索</el-button>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
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
        form: {
          contractCode: '',
          contractName: '',
          contractPattern: '',
          contractType: '',
          pr: '',
          initiator: '',
          busiController: '',
          daterange: [],
          valid: false
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
