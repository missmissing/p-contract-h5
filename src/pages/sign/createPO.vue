<style type="text/scss" lang="scss" scoped>
  .form-container {
    .ml20 {
      margin-left: 20px;
    }
    .mb20 {
      margin-bottom: 20px;
    }
  }
</style>

<template>
  <div class="form-container">
    <div>
      <el-card>
        <div slot="header">
          <span class="common-title">基本信息</span>
        </div>
        <div class="basic-info">
          <el-form label-width="80px">
            <el-form-item label="采购申请">
              <el-col :span="6">
                <el-input></el-input>
              </el-col>
              <el-button type="primary" class="ml20">添 加</el-button>
            </el-form-item>
            <el-form-item label="合同编号">
              <el-col :span="6">
                <el-input></el-input>
              </el-col>
              <el-button type="primary" class="ml20">查 询</el-button>
              <el-button type="success" @click="match">匹 配</el-button>
            </el-form-item>
          </el-form>
          <div v-if="form.matchData.length!==0">
            <el-table
              :data="form.orderData"
              border
              style="width: 100%">
              <el-table-column
                prop="prNum"
                label="采购申请号">
              </el-table-column>
              <el-table-column
                prop="companyCode"
                label="公司编码">
              </el-table-column>
              <el-table-column
                prop="companyName"
                label="公司名称">
              </el-table-column>
              <el-table-column
                prop="initiator"
                label="发起人">
              </el-table-column>
              <el-table-column
                prop="sponsDepart"
                label="发起部门">
              </el-table-column>
              <el-table-column
                prop="prCreateTime"
                label="PR创建时间">
              </el-table-column>
              <el-table-column
                prop="prLink"
                label="PR申请链接">
              </el-table-column>
            </el-table>
          </div>
        </div>
      </el-card>
      <el-card>
        <div slot="header">
          <span class="common-title">合同信息</span>
        </div>
        <div class="contract-info">
          <el-form label-width="80px">
            <el-form-item label="合同编号">
              <el-col :span="6">
                <el-input disabled></el-input>
              </el-col>
              <el-button type="primary" class="ml20">明 细</el-button>
            </el-form-item>
            <el-form-item label="合同版本">
              <el-col :span="6">
                <el-input disabled></el-input>
              </el-col>
            </el-form-item>
            <el-row>
              <el-col :span="7">
                <el-form-item label="合同模式">
                  <el-input disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="7" :offset="1">
                <el-form-item label="合同类型">
                  <el-input disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="7" :offset="1">
                <el-form-item label="所属项目">
                  <el-input disabled></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="7">
                <el-form-item label="生效日期">
                  <el-input disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="7" :offset="1">
                <el-form-item label="终止日期">
                  <el-input disabled></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </el-card>
      <el-card>
        <div slot="header">
          <span class="common-title">订单信息</span>
        </div>
        <div class="order-info">
          <el-form label-width="80px">
            <el-row>
              <el-col :span="7">
                <el-form-item label="供应商">
                  <el-input disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="7" :offset="1">
                <el-form-item label="订单类型">
                  <el-input disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="7" :offset="1">
                <el-form-item label="公司编码">
                  <el-input disabled></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
          <el-table
            :data="form.orderData"
            border
            style="width: 100%">
            <el-table-column
              type="index"
              label="序号"
              width="80">
            </el-table-column>
            <el-table-column
              prop="type"
              label="类型"
              width="100">
            </el-table-column>
            <el-table-column
              prop="materielCode"
              label="物料编码"
              width="100">
            </el-table-column>
            <el-table-column
              prop="materielName"
              label="物料名称">
            </el-table-column>
            <el-table-column
              prop="materielCode"
              label="数量"
              width="80">
            </el-table-column>
            <el-table-column
              prop="taxPrice"
              label="含税价"
              width="80">
            </el-table-column>
            <el-table-column
              prop="taxRate"
              label="税率"
              width="80">
            </el-table-column>
            <el-table-column
              prop="deliveryDate"
              label="交货日期"
              width="100">
            </el-table-column>
            <el-table-column
              prop="purchseRequest"
              label="采购申请"
              width="100">
            </el-table-column>
            <el-table-column
              prop="itemNum"
              label="行项目号"
              width="100">
            </el-table-column>
          </el-table>
        </div>
      </el-card>
      <el-card>
        <div slot="header">
          <span class="common-title">服务验收信息</span>
        </div>
        <div class="server-info">
          <div class="mb20">
            <el-button type="primary" @click="addService">新 增</el-button>
          </div>
          <el-table
            :data="form.serverData"
            border
            style="width: 100%">
            <el-table-column
              type="index"
              label="序号"
              width="80">
            </el-table-column>
            <el-table-column
              prop="serviceName"
              label="服务名称">
              <template scope="scope">
                <el-input v-model="scope.row.serviceName"></el-input>
              </template>
            </el-table-column>
            <el-table-column
              prop="acceptRequire"
              label="验收要求">
              <template scope="scope">
                <el-input v-model="scope.row.acceptRequire"></el-input>
              </template>
            </el-table-column>
            <el-table-column
              prop="remark"
              label="备注">
              <template scope="scope">
                <el-input v-model="scope.row.remark"></el-input>
              </template>
            </el-table-column>
            <el-table-column
              fixed="right"
              label="操作"
              width="100">
              <template scope="scope">
                <el-button
                  @click.native.prevent="deleteRow(scope.$index, form.serverData)"
                  type="text"
                  size="small">
                  移除
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-card>
    </div>
    <el-row style="margin-top:20px;">
      <el-button style="margin-left:10px;">保 存</el-button>
      <el-button type="primary">提 交</el-button>
    </el-row>
    <el-dialog
      title="匹配界面"
      size="large"
      :visible.sync="dialogVisible">
      <div>
        <el-table
          :data="matchSource"
          border
          max-height="250"
          style="width: 100%">
          <el-table-column
            prop="prNum"
            label="PR号"
            width="100">
          </el-table-column>
          <el-table-column
            prop="itemNum"
            label="行项目"
            width="100">
          </el-table-column>
          <el-table-column
            prop="materielCode"
            label="物料编码"
            width="100">
          </el-table-column>
          <el-table-column
            prop="materielName"
            label="物料名称">
          </el-table-column>
          <el-table-column
            prop="contractCode"
            label="合同号"
            width="80">
          </el-table-column>
          <el-table-column
            prop="supplier"
            label="供应商"
            width="100">
          </el-table-column>
          <el-table-column
            prop="supplierName"
            label="供应商名称">
          </el-table-column>
          <el-table-column
            prop="startDate"
            label="开始时间"
            width="100">
          </el-table-column>
          <el-table-column
            prop="endDate"
            label="截止时间"
            width="100">
          </el-table-column>
          <el-table-column
            prop="taxPrice"
            label="价格"
            width="80">
          </el-table-column>
          <el-table-column
            prop="taxRate"
            label="税率"
            width="80">
          </el-table-column>
        </el-table>
      </div>
      <div slot="footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>

  export default {
    data() {
      return {
        form: {
          matchData: [],
          orderData: [],
          serverData: []
        },
        matchSource: [],
        dialogVisible: false
      };
    },
    methods: {
      match() {
        this.dialogVisible = true;
      },
      addService() {
        this.form.serverData = [...this.form.serverData, {
          serviceName: '',
          acceptRequire: '',
          remark: ''
        }];
      },
      handleServiceItem(index, row) {
        console.log(row);
      },
      deleteRow(index, rows) {
        rows.splice(index, 1);
      }
    }
  };
</script>
