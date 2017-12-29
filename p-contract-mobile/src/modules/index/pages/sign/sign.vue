<style type="text/scss" lang="scss" scoped>

</style>

<template>
  <div>
    <div class="container">
      <mt-cell title="采购订单" :value="orderForm.purchaseOrderNo" v-if="orderForm.purchaseOrderNo"></mt-cell>
      <mt-cell title="供应商编码" :value="orderForm.supplierCode"></mt-cell>
      <mt-cell title="供应商名称" :value="orderForm.supplierName"></mt-cell>
      <mt-cell title="订单类型" :value="orderForm.type"></mt-cell>
      <mt-cell title="公司编码" :value="orderForm.companyCode"></mt-cell>
      <mt-navbar v-model="selected" class="mb20">
        <mt-tab-item :id="1">审批意见</mt-tab-item>
        <mt-tab-item :id="2">订单信息</mt-tab-item>
        <mt-tab-item :id="3">合同信息</mt-tab-item>
        <mt-tab-item :id="4" v-if="serverData.length">服务验收信息</mt-tab-item>
        <mt-tab-item :id="5" v-if="receiveInfo.length">收货信息</mt-tab-item>
      </mt-navbar>
      <mt-tab-container v-model="selected">
        <mt-tab-container-item :id="1">
          <Comments></Comments>
        </mt-tab-container-item>
        <mt-tab-container-item :id="2">
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
              width="100">
              <template scope="scope">
                {{scope.row.category | contractType}}
              </template>
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
              <template scope="scope">
                {{scope.row.taxRate !== null ? `${scope.row.taxRate}%` : '0%'}}
              </template>
            </el-table-column>
            <el-table-column
              prop="deliveryTime"
              label="交货日期"
              width="120">
              <template scope="scope">{{scope.row.deliveryTime | formatDate}}</template>
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
        </mt-tab-container-item>
        <mt-tab-container-item :id="3">
          <mt-cell title="合同编号" :value="contractForm.contractNo"></mt-cell>
          <mt-cell title="合同模式" :value="contractForm.contractBusinessTypeThirdName"></mt-cell>
          <mt-cell title="合同类型" :value="contractForm.contractType"></mt-cell>
          <mt-cell title="所属项目" :value="contractForm.belongProject"></mt-cell>
          <mt-cell title="生效日期" :value="contractForm.startTime | formatDate"></mt-cell>
          <mt-cell title="终止日期" :value="contractForm.endTime | formatDate"></mt-cell>
        </mt-tab-container-item>
        <mt-tab-container-item :id="4">
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
        </mt-tab-container-item>
        <mt-tab-container-item :id="5">
          <el-table :data="receiveInfo" border class="wp100">
            <el-table-column type="expand">
              <template scope="scope">
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
              <template scope="scope">{{scope.row.epoCreateTime | formatDate}}</template>
            </el-table-column>
            <el-table-column prop="checkResult" label="验收结论"></el-table-column>
            <el-table-column prop="checkRemark" label="验收备注"></el-table-column>
            <el-table-column prop="checkDate" label="验收日期" width="130">
              <template scope="scope">{{scope.row.checkDate | formatDate}}</template>
            </el-table-column>
          </el-table>
        </mt-tab-container-item>
      </mt-tab-container>
    </div>
    <ActionSumit></ActionSumit>
  </div>
</template>

<script>
  import Api from '../../../../api/sign/index';
  import Header from '../../components/header.vue';
  import ActionSumit from '../../components/actionSubmit.vue';
  import Comments from '../../components/comments.vue';
  import {formatDate} from '../../../../filters/moment';
  import contractType from '../../../../filters/contractType';
  import {prTypeMap, contractPatternMap} from '../../../../core/consts';
  import cutZero from '../../../../util/cutZero';

  export default {
    data() {
      return {
        selected: 1,
        procTitle: '',
        procInstId: '',
        info: {},
        orderForm: {},
        orderData: [],
        serverData: [],
        receiveInfo: [],
        contractForm: {}
      }
    },
    methods: {
      getInfo() {
        const id = this.$store.state.id;
        Api.detailByPoId({id}).then((res) => {
          console.log(res);
          this.info = res.data.dataMap;
          this.setOrderData();
          this.setServerData();
          this.setReceiveData();
          this.setContractForm();
        })
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
        this.serverData = orderCheckItems;
      },
      setReceiveData() {
        const {poReceiveInfo} = this.info;
        this.receiveInfo = poReceiveInfo || [];
      },
    },
    created() {
      this.getInfo();
    },
    mounted() {
      window._____processCenterPageAction('pageloaded');
    },
    filters: {
      contractType,
      formatDate
    },
    components: {
      Header,
      ActionSumit,
      Comments
    }
  };
</script>
