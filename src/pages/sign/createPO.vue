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

            <el-row v-show="prData.length">
              <el-col :span="8">
                <el-form-item label="合同编号">
                  <el-input v-model.trim="contractCode"></el-input>
                </el-form-item>
              </el-col>
              <el-button type="primary" @click="match" class="ml20" :disabled="!prData.length">匹 配</el-button>
            </el-row>
          </el-form>
          <div v-if="prData.length">
            <el-table
              :data="prData"
              border
              class="wp100">
              <el-table-column
                prop="pr"
                label="采购申请号"
                width="150">
              </el-table-column>
              <el-table-column
                prop="companyCode"
                label="公司编码"
                width="100">
              </el-table-column>
              <el-table-column
                prop="companyName"
                label="公司名称">
              </el-table-column>
              <el-table-column
                prop="originatorName"
                label="发起人"
                width="100">
              </el-table-column>
              <el-table-column
                prop="originatorDepartmentName"
                label="发起部门">
              </el-table-column>
              <el-table-column
                prop="createTime"
                label="创建时间"
                width="150">
                <template scope="scope">
                  {{scope.row.createTime | formatDate}}
                </template>
              </el-table-column>
              <!--<el-table-column-->
              <!--prop="processViewUrl"-->
              <!--label="PR申请链接">-->
              <!--</el-table-column>-->
              <el-table-column
                label="操作"
                width="80">
                <template scope="scope">
                  <el-button
                    @click.native.prevent="deleteRow(scope.$index, prData)"
                    type="danger"
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
          <el-tab-pane label="订单信息">
            <div class="order-info">
              <el-form label-width="100px">
                <el-row>
                  <el-col :span="7">
                    <el-form-item label="供应商">
                      <el-input :value="orderForm.supplierName" disabled></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="7">
                    <el-form-item label="订单类型">
                      <el-input :value="orderForm.type" disabled></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="7">
                    <el-form-item label="公司编码">
                      <el-input :value="orderForm.companyCode" disabled></el-input>
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
                  prop="category"
                  label="类型"
                  width="100"
                  :formatter="formatType">
                </el-table-column>
                <el-table-column
                  prop="materialCode"
                  label="物料编码"
                  width="130">
                  <template scope="scope">
                    {{scope.row.materialCode | cutZero}}
                  </template>
                </el-table-column>
                <el-table-column
                  prop="materialName"
                  min-width="300"
                  label="物料名称">
                </el-table-column>
                <el-table-column
                  prop="availableTotal"
                  label="可下单数量"
                  width="120">
                </el-table-column>
                <el-table-column
                  prop="total"
                  label="数量"
                  width="120">
                  <template scope="scope">
                    <el-input v-model.trim="scope.row.total"></el-input>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="price"
                  label="含税价"
                  width="120">
                </el-table-column>
                <el-table-column
                  prop="taxRate"
                  label="税率"
                  width="130">
                  <template scope="scope">
                    {{scope.row.taxRate ? `${scope.row.taxRate}%` : ''}}
                  </template>
                </el-table-column>
                <el-table-column
                  prop="deliveryTime"
                  label="交货日期"
                  width="186">
                  <template scope="scope">
                    <div>
                      <el-date-picker
                        v-model="scope.row.deliveryTime"
                        type="date"
                        style="width:150px"
                        :editable="false"
                        placeholder="选择日期"
                        @change="formatDate(scope.row,scope.row.deliveryTime)">
                      </el-date-picker>
                    </div>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="pr"
                  label="采购申请"
                  width="130">
                </el-table-column>
                <el-table-column
                  prop="prItemNo"
                  label="行项目"
                  width="100">
                </el-table-column>
                <el-table-column
                  label="操作"
                  fixed="right"
                  width="80">
                  <template scope="scope">
                    <el-button
                      @click.native.prevent="deleteRow(scope.$index, orderData)"
                      type="danger"
                      size="small">
                      移除
                    </el-button>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </el-tab-pane>
          <el-tab-pane label="合同信息">
            <div class="contract-info">
              <el-form label-width="100px">
                <el-row>
                  <el-col :span="8">
                    <el-form-item label="合同编号">
                      <el-input :value="contractForm.contractNo" disabled></el-input>
                    </el-form-item>
                  </el-col>
                  <el-button type="primary" class="ml20" v-show="toDetail.query.contractId">
                    <router-link class="router-link-default" :to="toDetail" target="_blank">详 情</router-link>
                  </el-button>
                </el-row>
                <el-row>
                  <el-col :span="8">
                    <el-form-item label="合同模式">
                      <el-input :value="contractForm.contractType" disabled></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="合同类型">
                      <el-input :value="contractForm.contractBusinessTypeThirdName" disabled></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="所属项目">
                      <el-input :value="contractForm.belongProject" disabled></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="生效日期">
                      <el-input :value="contractForm.startTime | formatDate" disabled></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="终止日期">
                      <el-input :value="contractForm.endTime | formatDate" disabled></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-form>
            </div>
          </el-tab-pane>
        </el-tabs>
      </el-card>
      <div class="mt20 mb20 ml20">
        <!--<el-button>保 存</el-button>-->
        <el-button type="primary" @click="submit">提 交</el-button>
      </div>
    </div>
    <el-dialog
      title="匹配界面"
      size="large"
      :visible.sync="dialogVisible">
      <div>
        <el-table
          :data="matchData"
          border
          max-height="450"
          class="wp100"
          style="visibility: visible;">
          <el-table-column
            prop="pr"
            label="PR号"
            width="130">
          </el-table-column>
          <el-table-column
            prop="prItemNo"
            label="行项目"
            width="80">
          </el-table-column>
          <el-table-column
            prop="materialCode"
            label="物料编码"
            width="180">
            <template scope="scope">
              {{scope.row.materialCode | cutZero}}
            </template>
          </el-table-column>
          <el-table-column
            prop="materialName"
            label="物料名称"
            min-width="200">
            <template scope="scope">
              <template v-if="!scope.row.pr">
                <el-radio
                  v-model="scope.row.checked"
                  :diabled="scope.row.disabled"
                  @change.native="srChange(scope.row)"
                  label=""></el-radio>
              </template>
              <template v-else>
                {{scope.row.materialName}}
              </template>
            </template>
          </el-table-column>
          <el-table-column
            prop="contractNo"
            width="120"
            label="合同号">
          </el-table-column>
          <el-table-column
            prop="supplierCode"
            label="供应商"
            width="100">
          </el-table-column>
          <el-table-column
            prop="supplierName"
            label="供应商名称"
            min-width="230">
          </el-table-column>
          <el-table-column
            prop="startTime"
            label="开始时间"
            width="120">
            <template scope="scope">
              {{scope.row.startTime | formatDate}}
            </template>
          </el-table-column>
          <el-table-column
            prop="endTime"
            label="截止时间"
            width="120">
            <template scope="scope">
              {{scope.row.endTime | formatDate}}
            </template>
          </el-table-column>
          <el-table-column
            prop="price"
            label="价格"
            width="80">
          </el-table-column>
          <el-table-column
            prop="taxRate"
            label="税率"
            width="80">
            <template scope="scope">{{scope.row.taxRate ? `${scope.row.taxRate}%` : ''}}</template>
          </el-table-column>
        </el-table>
      </div>
      <div slot="footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="matchOk">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import signModel from '../../api/sign';
  import {routerNames, prTypeMap, contractPatternMap} from '../../core/consts';
  import {formatTime, formatDate} from '../../filters/moment';
  import fillZero from '../../util/fillZero';
  import cutZero from '../../util/cutZero';
  import {greaterZero} from '../../util/reg';
  import comLoading from '../../mixins/comLoading';

  export default {
    mixins: [comLoading],
    data() {
      return {
        prCode: '',
        contractCode: '',
        prData: [],
        materialsMatchData: [],
        matchData: [],
        orderData: [],
        dialogVisible: false,
        contractForm: {},
        orderForm: {},
        showService: false,
        taxRates: [
          {
            code: 'J0',
            value: '0',
            desc: '0%进税项'
          },
          {
            code: 'J1',
            value: '3',
            desc: '3%进税项'
          },
          {
            code: 'J2',
            value: '6',
            desc: '6%进税项'
          },
          {
            code: 'J3',
            value: '11',
            desc: '11%进税项'
          },
          {
            code: 'J4',
            value: '17',
            desc: '17%进税项'
          },
          {
            code: 'J5',
            value: '13',
            desc: '13%进税项'
          },
          {
            code: 'J6',
            value: '5',
            desc: '5%进税项'
          }
        ],
        toDetail: {name: routerNames.con_Check, query: {contractId: ''}}
      };
    },
    methods: {
      add() {
        const prCode = this.prCode;
        const prData = this.prData;
        const exist = prData.some((item) => item.pr === fillZero(prCode, 10));
        if (exist) {
          this.$message.warning('列表中已存在！');
          return;
        }

        this.comLoading();
        signModel.getPr({
          pr: prCode
        }).then((res) => {
          this.comLoading(false);
          const data = res.data.dataMap;
          if (this.prData.length) {
            if (this.prData[0].companyCode !== data.companyCode) {
              this.$message.warning('采购申请号所属公司编码不同!');
              return;
            }
            if (this.prData[0].category !== data.category) {
              this.$message.warning('采购申请号类型不同!');
              return;
            }
          }
          this.prData.push(data);
        }, () => {
          this.comLoading(false);
        });
      },
      match() {
        const prData = this.prData;
        if (!prData.length) {
          this.$message.warning('请输入采购申请号！');
          return;
        }

        if (this.prData[0].category === 2 && !this.contractCode) {
          this.$message.warning('服务类必须输入合同编号！');
          return;
        }

        const pr = prData.map((item) => item.pr);

        this.comLoading();
        signModel.getMatch({
          pr,
          contractNo: this.contractCode
        }).then((res) => {
          this.comLoading(false);
          const data = res.data.dataMap;
          const {materialsMatchVoList} = data;
          this.materialsMatchData = materialsMatchVoList;
          this.matchData = this.getSource(materialsMatchVoList);
          this.dialogVisible = true;
        }, () => {
          this.comLoading(false);
        });
      },
      getSource(data) {
        const result = [];
        const prList = data || [];
        prList.forEach((item) => {
          const {
            pr,
            prItemNo,
            materialName,
            materialCode,
            contVos
          } = item;
          if (contVos && contVos.length) {
            result.push({
              pr,
              prItemNo,
              materialCode,
              materialName
            });
            contVos.forEach((cont) => {
              const newCont = {
                ...cont,
                checked: false,
                disabled: false,
                mapKey: prItemNo
              };
              result.push(newCont);
            });
          }
        });
        return result;
      },
      matchOk() {
        const exist = this.matchData.some(item => item.checked === '');
        if (!exist) {
          this.$message.warning('请选择匹配项');
          return;
        }

        this.dialogVisible = false;

        this.setContractData();
        this.setOrderData();
        this.setOrderForm();
      },
      setContractData() {
        console.log(this.matchData);
        this.matchData.some((item) => {
          if (item.checked === '') {
            this.contractForm = item;
            return true;
          }
          return false;
        });
        this.contractForm.contractType = contractPatternMap[this.contractForm.contractType];
        this.toDetail.query.contractId = this.contractForm.id;
      },
      setOrderForm() {
        const {companyCode} = this.prData[0];
        const {supplierName} = this.contractForm;
        let type = '';
        if (this.orderData.length) {
          if ([1, 3].indexOf(this.orderData[0].category) > -1) {
            type = prTypeMap[1];
          } else {
            type = prTypeMap[2];
          }
        }
        this.orderForm = {
          companyCode,
          type,
          supplierName
        };
      },
      setOrderData() {
        const orderData = this.prData[0].category !== 2 ? this.getMaterialsOrderData() : this.getServerOrderData();
        this.orderData = orderData.filter(item => item.availableTotal !== 0);
      },
      getMaterialsOrderData() {
        const {id} = this.contractForm;
        const orderData = [];
        this.materialsMatchData.forEach((item) => {
          const {
            pr,
            prItemNo,
            materialName,
            total,
            availableTotal,
            materialCode,
            contVos,
            category
          } = item;
          if (contVos && contVos.length) {
            contVos.forEach((cont) => {
              const {itemNo} = cont;
              if (cont.id === id) {
                orderData.push({
                  pr,
                  category,
                  itemNo,
                  prItemNo,
                  materialName,
                  materialCode,
                  price: cont.price,
                  total,
                  availableTotal,
                  taxRate: cont.taxRate,
                  deliveryTime: ''
                });
              }
            });
          }
        });
        return orderData;
      },
      getServerOrderData() {
        const orderData = [];
        this.matchData.forEach((row) => {
          if (row.checked === '') {
            this.materialsMatchData.forEach((item) => {
              const {
                pr,
                prItemNo,
                materialName,
                total,
                availableTotal,
                materialCode,
                contVos,
                category
              } = item;
              if (prItemNo === row.mapKey) {
                if (contVos && contVos.length) {
                  contVos.forEach((cont) => {
                    const {itemNo} = cont;
                    if (itemNo === row.itemNo) {
                      orderData.push({
                        pr,
                        category,
                        itemNo,
                        prItemNo,
                        materialName,
                        materialCode,
                        price: cont.price,
                        total,
                        availableTotal,
                        taxRate: cont.taxRate,
                        deliveryTime: ''
                      });
                    }
                  });
                }
              }
            });
          }
        });
        console.log(orderData);
        return orderData;
      },
      formatType(row, column, cellValue) {
        return prTypeMap[cellValue];
      },
      formatDate(row, value) {
        row.deliveryTime = formatDate(value);
      },
      selectTaxRate(row) {
        this.taxRates.some((item) => {
          if (item.value === row.taxRate) {
            row.taxCode = item.code;
            return true;
          }
          return false;
        });
      },
      srChange(row) {
        if (this.prData[0].category !== 2) {
          this.matchData.forEach((item) => {
            item.checked = item === row ? '' : false;
          });
        } else {
          this.matchData.forEach((item) => {
            if (item.mapKey === row.mapKey) {
              item.checked = item === row ? '' : false;
            } else {
              item.disabled = item.itemNo === row.itemNo;
            }
          });
        }
      },
      deleteRow(index, rows) {
        rows.splice(index, 1);
      },
      check(result) {
        const {purOrderMaterials} = result;
        if (!purOrderMaterials.length) {
          this.$message.warning('订单信息不能为空！');
          return false;
        }
        const exist = purOrderMaterials.some((item) => {
          if (!item.total) {
            this.$message.warning('请输入订单数量！');
            return true;
          } else if (!greaterZero(item.total)) {
            this.$message.warning('数量格式错误，格式为数字且大于0！');
            return true;
          } else if (item.total > item.availableTotal) {
            this.$message.warning('订单数量不能大于可下单数量！');
            return true;
          } else if (!item.deliveryTime) {
            this.$message.warning('请选择订单交货日期！');
            return true;
          }
          return false;
        });

        return !exist;
      },
      getResult() {
        const {id, contractNo} = this.contractForm;

        return {
          contractId: id,
          contractNo,
          purOrderMaterials: this.orderData
        };
      },
      submit() {
        const result = this.getResult();
        if (!this.check(result)) {
          return;
        }
        this.comLoading({
          text: '正在提交中'
        });
        signModel.submit(result).then(() => {
          this.comLoading(false);
          this.$router.push({
            name: routerNames.con_index
          });
        }, () => {
          this.comLoading(false);
        });
      }
    },
    filters: {
      formatTime,
      formatDate,
      cutZero
    }
  };
</script>
