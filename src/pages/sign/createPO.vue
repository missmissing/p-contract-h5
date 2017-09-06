<style type="text/scss" lang="scss" scoped>
  .form-container {

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
          <el-form label-width="100px">
            <el-row>
              <el-col :span="8">
                <el-form-item label="采购申请">
                  <el-input v-model.trim="prCode"></el-input>
                </el-form-item>
              </el-col>
              <el-button type="primary" class="ml20" @click="add">添 加</el-button>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="合同编号">
                  <el-autocomplete
                    class="wp100"
                    icon="search"
                    :fetch-suggestions="querySearch"
                    @select="search"
                    v-model="contractCode"
                    :trigger-on-focus="false">
                  </el-autocomplete>
                </el-form-item>
              </el-col>
              <el-button type="primary" @click="match" class="ml20">匹 配</el-button>
            </el-row>
          </el-form>
          <div v-if="prData.length!==0">
            <el-table
              :data="prData"
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
              √
              <el-table-column
                label="操作">
                <template scope="scope">
                  <el-button
                    @click.native.prevent="deleteRow(scope.$index, prData)"
                    type="text"
                    size="small">
                    移除
                  </el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
      </el-card>
      <el-card>
        <el-tabs>
          <el-tab-pane label="合同信息">
            <div class="contract-info">
              <el-form label-width="100px">
                <el-row>
                  <el-col :span="8">
                    <el-form-item label="合同编号">
                      <el-input disabled></el-input>
                    </el-form-item>
                  </el-col>
                  <el-button type="primary" class="ml20">详 情</el-button>
                </el-row>
                <el-row>
                  <el-col :span="8">
                    <el-form-item label="合同版本">
                      <el-input disabled></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="8">
                    <el-form-item label="合同模式">
                      <el-input disabled></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="合同类型">
                      <el-input disabled></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="所属项目">
                      <el-input disabled></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="8">
                    <el-form-item label="生效日期">
                      <el-input disabled></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="终止日期">
                      <el-input disabled></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-form>
            </div>
          </el-tab-pane>
          <el-tab-pane label="订单信息">
            <div class="order-info">
              <el-form label-width="100px">
                <el-row>
                  <el-col :span="7">
                    <el-form-item label="供应商">
                      <el-input disabled></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="7">
                    <el-form-item label="订单类型">
                      <el-input disabled></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="7">
                    <el-form-item label="公司编码">
                      <el-input disabled></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-form>
              <el-table
                :data="orderData"
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
                <el-table-column
                  label="操作">
                  <template scope="scope">
                    <el-button
                      @click.native.prevent="deleteRow(scope.$index, orderData)"
                      type="text"
                      size="small">
                      移除
                    </el-button>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </el-tab-pane>
          <el-tab-pane label="服务验收信息">
            <div class="server-info">
              <div class="mb20">
                <el-button type="primary" @click="addService">新 增</el-button>
              </div>
              <el-table
                :data="serverData"
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
                </el-table-column>
                <el-table-column
                  prop="acceptRequire"
                  label="验收要求">
                </el-table-column>
                <el-table-column
                  prop="remark"
                  label="备注">
                </el-table-column>
                <el-table-column
                  fixed="right"
                  label="操作"
                  width="100">
                  <template scope="scope">
                    <el-button
                      @click.native.prevent="deleteRow(scope.$index, serverData)"
                      type="text"
                      size="small">
                      移除
                    </el-button>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </el-tab-pane>
        </el-tabs>
      </el-card>
    </div>
    <div class="mt20 mb20 ml20">
      <!--<el-button>保 存</el-button>-->
      <el-button type="primary">提 交</el-button>
    </div>
    <el-dialog
      title="新增服务验收信息"
      :visible.sync="serverDialogVisible">
      <el-form
        ref="serverDialogForm"
        :model="serverDialogForm"
        :rules="serverRules"
        label-width="80px">
        <el-form-item label="服务名称" prop="serverName">
          <el-input v-model="serverDialogForm.serverName"></el-input>
        </el-form-item>
        <el-form-item label="验收要求" prop="acceptRequire">
          <el-input
            type="textarea"
            :autosize="{ minRows: 2 }"
            resize="none"
            v-model="serverDialogForm.acceptRequire"></el-input>
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input
            type="textarea"
            :autosize="{ minRows: 2 }"
            resize="none"
            v-model="serverDialogForm.remark"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="serverDialogVisible=false">取 消</el-button>
        <el-button type="primary" @click="addDialogOk">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog
      title="匹配界面"
      size="large"
      :visible.sync="dialogVisible">
      <div>
        <el-table
          :data="matchData"
          border
          max-height="450"
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
            <template scope="scope">
              <template v-if="!scope.row.materielName">
                <el-radio v-model="radio" :label="scope.$index">{{''}}</el-radio>
              </template>
              <template v-else>
                {{scope.row.materielName}}
              </template>
            </template>
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
        <el-button type="primary" @click="getInfo">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import signModel from '@/api/sign'

  export default {
    data() {
      return {
        prCode: '',
        contractCode: '',
        prMap: {},
        prData: [],
        contractData: [],
        matchData: [],
        radio: null,
        orderData: [],
        serverData: [],
        serverDialogVisible: false,
        serverDialogForm: {
          serverName: '',
          acceptRequire: '',
          remark: ''
        },
        serverRules: {
          serverName: [{
            required: true,
            message: '请输入服务名称',
            trigger: 'blur'
          }],
          acceptRequire: [{
            required: true,
            message: '请输入验收要求',
            trigger: 'blur'
          }, {
            max: 300,
            message: '长度不超过300个字符',
            trigger: 'change'
          }],
          remark: [{max: 300, message: '长度不超过300个字符', trigger: 'change'}]
        },
        dialogVisible: false
      }
    },
    methods: {
      add() {
        const prCode = this.prCode
        if (!prCode) {
          this.$message.warning('请输入采购申请号！')
          return
        }
        if (this.prMap[prCode]) {
          this.$message.warning('列表中已存在！')
          return
        }
        this.prMap[prCode] = true

        this.prData.push({
          prNum: '1',
          itemNum: 10,
          companyCode: '2',
          companyName: '红星美凯龙',
          initiator: 'tester',
          sponsDepart: 'hh',
          prCreateTime: '2017-09-08',
          prLink: 'baidu.com',
          prGoods: [{
            materielCode: 'abc',
            materielName: '笔记本'
          }]
        }, {
          prNum: '2',
          itemNum: 20,
          companyCode: '22',
          companyName: '红星美凯龙',
          initiator: 'tester',
          sponsDepart: 'hh',
          prCreateTime: '2017-09-08',
          prLink: 'baidu.com',
          prGoods: [{
            materielCode: 'abcd',
            materielName: '铅笔'
          }]
        })
      },
      search() {
        console.log(this.contractCode)
      },
      querySearch(queryString, cb) {
        if (!queryString) {
          return cb([])
        }
        signModel.getContract({
          contractCode: queryString
        }).then((res) => {
          const result = res.data.dataMap || []
          cb(this.createFilter(result))
        }, () => {
          cb([])
        })
      },
      match() {
        const contractCode = this.contractCode
        if (!contractCode) {
          this.$message.warning('请输入合同号！')
          return
        }

        this.dialogVisible = true

        const data = [{
          contractCode: 1234,
          supplier: 'ff',
          supplierName: 'gg',
          startDate: '2017-08-03',
          endDate: '2017-09-04',
          contractGoods: [{
            contractGoodCode: 'abc',
            taxPrice: '444',
            taxRate: '10%'
          }]
        }, {
          contractCode: 12345,
          supplier: 'ff',
          supplierName: 'gg',
          startDate: '2017-08-03',
          endDate: '2017-09-04',
          contractGoods: [{
            contractGoodCode: 'abc',
            taxPrice: '44',
            taxRate: '10%'
          }, {
            contractGoodCode: 'abcd',
            taxPrice: '444',
            taxRate: '10%'
          }]
        }]
        this.contractData = data

        this.matchData = this.getSource(data)
      },
      getSource(data) {
        const result = []
        const goodMaps = {}
        const contractData = data
        this.prData.forEach((pr) => {
          const {prNum, itemNum, prGoods = []} = pr
          prGoods.forEach((prGood) => {
            const {materielName, materielCode = []} = prGood
            contractData.forEach((contract) => {
              const {contractCode, supplier, supplierName, startDate, endDate, contractGoods = []} = contract
              contractGoods.forEach((contractGood) => {
                const {contractGoodCode, taxPrice, taxRate} = contractGood
                if (materielCode === contractGoodCode) {
                  const contractGoodData = {
                    contractCode,
                    contractGoodCode,
                    supplier,
                    supplierName,
                    startDate,
                    endDate,
                    taxPrice,
                    taxRate
                  }
                  if (goodMaps[materielCode]) {
                    goodMaps[materielCode]['data'].push({
                      ...contractGoodData
                    })
                  } else {
                    goodMaps[materielCode] = {
                      prNum,
                      itemNum,
                      materielCode,
                      materielName,
                      data: [{
                        ...contractGoodData
                      }]
                    }
                  }
                }
              })
            })
          })
        })

        Object.keys(goodMaps).forEach((key) => {
          const {prNum, itemNum, materielCode, materielName, data} = goodMaps[key]
          result.push({prNum, itemNum, materielCode, materielName})
          data.forEach((item) => {
            result.push(item)
          })
        })
        console.log(result)
        return result
      },
      getInfo() {
        if (!this.radio) {
          this.$message.warning('请选择一项！')
          return
        }
        this.dialogVisible = false
        const {contractCode} = this.matchData[this.radio]
        console.log(contractCode, this.prData)
      },
      addService() {
        this.serverDialogVisible = true
      },
      handleServiceItem(index, row) {
        console.log(row)
      },
      deleteRow(index, rows) {
        rows.splice(index, 1)
      },
      addDialogOk() {
        this.$refs['serverDialogForm'].validate((valid) => {
          if (valid) {
            this.serverData.push({...this.serverDialogForm})
            this.serverDialogVisible = false
          } else {
            console.log('error submit!!')
            return false
          }
        })
      }
    }
  }
</script>
