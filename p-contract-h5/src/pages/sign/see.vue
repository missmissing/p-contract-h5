<style type="text/scss" lang="scss" scoped>

</style>

<template>
  <div class="pd20">
    <div class="clearfix" v-if="procInstId">
      <div class="fl fb">{{procTitle}}</div>
      <div class="fr mr20">流程编号 {{procInstId}}</div>
    </div>
    <el-tabs>
      <el-tab-pane label="订单信息">
        <div class="order-info">
          <el-form label-width="100px">
            <el-row>
              <el-col :span="8">
                <el-form-item label="采购订单">
                  <el-input :value="orderForm.purchaseOrderNo" disabled></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="供应商编码">
                  <el-input :value="orderForm.supplierCode" disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="供应商名称">
                  <el-tooltip effect="light" :content="orderForm.supplierName" placement="top-end">
                    <el-input :value="orderForm.supplierName" disabled></el-input>
                  </el-tooltip>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="订单类型">
                  <el-input :value="orderForm.type" disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="公司编码">
                  <el-tooltip effect="light" :content="orderForm.companyCode" placement="top-end">
                    <el-input :value="orderForm.companyCode" disabled></el-input>
                  </el-tooltip>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
          <el-table
            :data="orderData"
            border
            class="wp100">
            <el-table-column
              type="index"
              label="序号"
              width="65">
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
              <template slot-scope="scope">
                {{scope.row.materialCode | cutZero}}
              </template>
            </el-table-column>
            <el-table-column
              prop="materialName"
              label="物料名称"
              min-width="300">
            </el-table-column>
            <el-table-column
              prop="total"
              label="数量"
              width="80">
            </el-table-column>
            <el-table-column
              prop="price"
              label="含税价"
              width="80">
            </el-table-column>
            <el-table-column
              prop="taxRate"
              label="税率"
              width="80">
              <template slot-scope="scope">
                {{scope.row.taxRate ? `${scope.row.taxRate}%` : ''}}
              </template>
            </el-table-column>
            <el-table-column
              prop="deliveryTime"
              label="交货日期"
              width="120"
              :formatter="formatDate">
            </el-table-column>
            <el-table-column
              prop="pr"
              label="采购申请"
              width="130">
            </el-table-column>
            <el-table-column
              prop="itemNo"
              label="行项目"
              width="80">
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
              <el-button type="primary" class="ml20" v-show="toDetail.query.contractNo">
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
                <el-form-item label="业务类型">
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
      <el-tab-pane label="服务验收信息" v-if="serverData.length">
        <div class="server-info">
          <el-table
            :data="serverData"
            border
            class="wp100">
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
              prop="serviceRequire"
              label="验收要求">
            </el-table-column>
            <el-table-column
              prop="remark"
              label="备注">
            </el-table-column>
          </el-table>
        </div>
      </el-tab-pane>
      <el-tab-pane label="收货信息" v-if="receiveInfo.length">
        <el-table :data="receiveInfo" border class="wp100">
          <el-table-column type="expand">
            <template slot-scope="scope">
              <el-table :data="scope.row.poReceiveBindVoList" v-if="scope.row.poReceiveBindVoList.length" border
                        class="wp100 mb20">
                <el-table-column prop="itemNo" label="行项目号"></el-table-column>
                <el-table-column prop="materialsCode" label="物料编码"
                                 v-if="scope.row.poReceiveBindVoList[0].materialsCode"></el-table-column>
                <el-table-column prop="materialsName" label="物料名称"
                                 v-if="scope.row.poReceiveBindVoList[0].materialsCode"></el-table-column>
                <el-table-column prop="materialsName" label="服务名称"
                                 v-if="!scope.row.poReceiveBindVoList[0].materialsCode"></el-table-column>
                <el-table-column prop="receiveNum" label="收货数量"></el-table-column>
                <el-table-column prop="receiveAmount" label="收货金额"></el-table-column>
              </el-table>
              <el-table :data="scope.row.poServerCheckInfos" v-if="scope.row.poServerCheckInfos.length" border
                        class="wp100">
                <el-table-column prop="checkElement" label="验收要素"></el-table-column>
                <el-table-column prop="referenceStandard" label="参考标准"></el-table-column>
                <el-table-column prop="examineResult" label="检查结果"></el-table-column>
                <el-table-column prop="remark" label="备注"></el-table-column>
              </el-table>
            </template>
          </el-table-column>
          <el-table-column prop="materialsProof" label="收货凭证"></el-table-column>
          <el-table-column prop="totalAmount" label="收货总金额"></el-table-column>
          <el-table-column prop="initiator" label="发起人" width="130"></el-table-column>
          <el-table-column prop="epoCreateTime" label="凭证创建日期" width="130">
            <template slot-scope="scope">{{scope.row.epoCreateTime | formatDate}}</template>
          </el-table-column>
          <el-table-column prop="checkResult" label="验收结论"></el-table-column>
          <el-table-column prop="checkRemark" label="验收备注"></el-table-column>
          <el-table-column prop="checkDate" label="验收日期" width="130">
            <template slot-scope="scope">{{scope.row.checkDate | formatDate}}</template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>
    <Process></Process>
  </div>
</template>

<script>
  import Api from '../../api/sign';
  import {formatDate} from '../../filters/moment';
  import comLoading from '../../mixins/comLoading';
  import Process from '../../components/process.vue';
  import cutZero from '../../util/cutZero';
  import {routerNames, contractPatternMap, prTypeMap} from '../../core/consts';

  export default {
    mixins: [comLoading],
    data() {
      return {
        procTitle: '',
        procInstId: '',
        info: {},
        toDetail: {name: routerNames.con_Check, query: {contractNo: ''}},
        orderForm: {},
        orderData: [],
        serverData: [],
        receiveInfo: [],
        contractForm: {}
      };
    },
    methods: {
      getInfo(id) {
        this.comLoading();
        Api.detailByPoId({id}).then((res) => {
          console.log(res);
          this.info = res.data.dataMap;
          this.toDetail.query.contractNo = this.info.contractNo;
          this.setOrderData();
          this.setServerData();
          this.setReceiveData();
          this.setContractForm();
          this.comLoading(false);
        }).catch(() => {
          this.comLoading(false);
        });
      },
      setContractForm() {
        const {
          contractNo, contractBusinessTypeThirdName, contractType, belongProject, startTime, endTime
        } = this.info;
        this.contractForm = {
          contractNo,
          contractBusinessTypeThirdName,
          contractType: contractPatternMap[contractType],
          belongProject,
          startTime,
          endTime
        };
      },
      setOrderData() {
        const {
          purOrderMaterials, supplierName, companyCode, companyName, supplierCode, purchaseOrderNo
        } = this.info;
        let type = '';
        if (purOrderMaterials.length) {
          if ([1, 3].indexOf(purOrderMaterials[0].category) > -1) {
            type = prTypeMap[1];
          } else {
            type = prTypeMap[2];
          }
        }
        this.orderData = purOrderMaterials;
        this.orderForm = {
          supplierName,
          type,
          companyCode: `${companyCode} ${companyName}`,
          supplierCode,
          purchaseOrderNo
        };
      },
      setServerData() {
        const {orderCheckItems} = this.info;
        this.serverData = orderCheckItems || [];
      },
      setReceiveData() {
        const {poReceiveInfo} = this.info;
        this.receiveInfo = poReceiveInfo || [];
      },
      formatType(row, column, cellValue) {
        return prTypeMap[cellValue];
      },
      formatDate(value) {
        return formatDate(value);
      }
    },
    created() {
      const {id, processData} = this.$route.query;
      this.getInfo(id);
      if (processData) {
        const data = JSON.parse(processData);
        const {procInstId, procTitle} = data;
        this.procInstId = procInstId;
        this.procTitle = procTitle;
      }
    },
    filters: {
      formatDate,
      cutZero
    },
    components: {
      Process
    }
  };
</script>
