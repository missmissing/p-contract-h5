<style type="text/scss" lang="scss" scoped>
  .form-container {

  }
</style>

<template>
  <div class="form-container">
    <div>
      <div class="mb10 clearfix" v-if="procInstId">
        <div class="fr mr20">流程编号 {{procInstId}}</div>
      </div>
      <el-card>
        <div slot="header">
          <span class="common-title">基本信息</span>
        </div>
        <div class="basic-info">
          <el-form label-width="120px">
            <el-row>
              <el-col :span="8">
                <el-form-item label="采购订单号" prop="orderId">
                  <el-input v-model="orderNo" disabled></el-input>
                </el-form-item>
              </el-col>
              <el-button type="primary" class="ml20" v-show="toDetail.query.id">
                <router-link class="router-link-default" :to="toDetail" target="_blank">详 情</router-link>
              </el-button>
            </el-row>
            <el-row>
              <el-col :span="6">
                <el-form-item label="业务经办人">
                  <el-input :value="basicForm.businessOperatorName" disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="业务部门">
                  <el-input :value="basicForm.businessDeptName" disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="合同编号">
                  <el-input :value="basicForm.contractNo" disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="合同模式">
                  <el-input :value="basicForm.contractType" disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="合同类型">
                  <el-input :value="basicForm.contractTextType" disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="所属项目">
                  <el-input :value="basicForm.belongProject" disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="验收责任人">
                  <el-input :value="basicForm.responsibleName" disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="合同生效日期">
                  <el-input :value="basicForm.startTime | formatDate" disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="合同验收日期">
                  <el-input :value="contractCheckDate | formatDate" disabled></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </el-card>
      <el-card>
        <div slot="header">
          <span class="common-title">不合格事项</span>
        </div>
        <div class="checkItems-info">
          <el-table
            :data="checkItems"
            border
            style="width: 100%">
            <el-table-column
              type="index"
              label="序号"
              width="80">
            </el-table-column>
            <el-table-column
              prop="serviceName"
              label="验收要素">
            </el-table-column>
            <el-table-column
              prop="serviceRequire"
              label="参考标准">
            </el-table-column>
            <el-table-column
              prop="checkResult"
              label="检查结果">
            </el-table-column>
            <el-table-column
              prop="remark"
              label="备注">
            </el-table-column>
          </el-table>
        </div>
      </el-card>
      <el-card>
        <div slot="header">
          <span class="common-title">处理结论</span>
        </div>
        <div class="handle-info">
          <el-form label-width="120px">
            <el-form-item label="">
              <el-radio class="radio" v-model="schemeType" label="CONTINUE_TO_PERFORM" disabled>继续履行</el-radio>
              <el-radio class="radio" v-model="schemeType" label="UPDATED_CONTRACT" disabled>变更合同</el-radio>
              <el-radio class="radio" v-model="schemeType" label="PERFORM_WITH_CHECK_RESULT" disabled>按验收实际结果履行合同
              </el-radio>
              <el-radio class="radio" v-model="schemeType" label="BREACH" disabled>转合同违约处理</el-radio>
            </el-form-item>
            <el-form-item label="不合格原因" prop="unqualifiedReason">
              <el-input
                disabled
                type="textarea"
                :maxlength="300"
                :autosize="{ minRows: 2 }"
                resize="none"
                v-model="unqualifiedReason">
              </el-input>
            </el-form-item>
            <el-form-item label="处理方案" prop="treatmentScheme">
              <el-input
                disabled
                type="textarea"
                :maxlength="300"
                :autosize="{ minRows: 2 }"
                resize="none"
                v-model="treatmentScheme">
              </el-input>
            </el-form-item>
            <el-form-item label="相关附件">
              <el-table
                :data="fileList"
                border
                highlight-current-row
                class="wp100">
                <el-table-column
                  prop="fileName"
                  label="文件名">
                  <template slot-scope="scope">
                    <a class="router-link" :href="`${download}${scope.row.fileId}`">{{scope.row.fileName}}</a>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="operatorName"
                  width="150"
                  label="上传人">
                </el-table-column>
                <el-table-column
                  prop="createTime"
                  width="150"
                  label="上传时间">
                  <template slot-scope="scope">
                    {{scope.row.createTime | formatDate}}
                  </template>
                </el-table-column>
              </el-table>
            </el-form-item>
          </el-form>
        </div>
      </el-card>
      <Process></Process>
    </div>
  </div>
</template>

<script>
  import Api from '@/api/performance'
  import Upload from '@/components/upload.vue'
  import {routerNames, contractTextTypeMap, contractPatternMap} from '@/core/consts'
  import comLoading from '@/mixins/comLoading'
  import {formatDate} from '@/filters/moment'
  import Process from '@/components/process'
  import {downloadUrl} from '@/api/consts'

  export default {
    mixins: [comLoading],
    data() {
      return {
        procInstId: '',
        orderNo: '',
        basicForm: {
          businessOperatorName: '',
          businessDeptName: '',
          contractTextType: '',
          responsibleName: '',
          belongProject: '',
          startTime: '',
          endTime: '',
          contractType: '',
          contractNo: ''
        },
        contractCheckDate: '',
        checkItems: [],
        orderId: '',
        schemeType: 1,
        unqualifiedReason: '',
        treatmentScheme: '',
        fileList: [],
        toDetail: {name: routerNames.con_Check, query: {id: ''}},
        download: downloadUrl
      }
    },
    methods: {
      getInfo(procInstId) {
        this.comLoading()
        Api.getUnqualifiedByProcInstId({procInstId}).then((res) => {
          this.comLoading(false)
          const data = res.data.dataMap
          console.log(data)
          this.setData(data)
        })
      },
      setData(data) {
        const {unqualifiedBasic, contUnqualified} = data
        const {businessOperatorName, businessDeptName, responsibleName, belongProject, startTime, endTime, contractTextType, contractType, contractNo} = unqualifiedBasic
        const {orderNo, contractCheckDate, checkItems, unqualifiedReason, treatmentScheme, schemeType, files} = contUnqualified
        Object.assign(this.basicForm, {
          businessOperatorName,
          businessDeptName,
          responsibleName,
          belongProject,
          startTime,
          endTime,
          contractTextType: contractTextTypeMap[contractTextType],
          contractType: contractPatternMap[contractType],
          contractNo
        })
        this.orderNo = orderNo
        this.checkItems = checkItems
        this.contractCheckDate = contractCheckDate
        this.unqualifiedReason = unqualifiedReason
        this.treatmentScheme = treatmentScheme
        this.schemeType = schemeType
        this.fileList = files || []
      }
    },
    created() {
      const {id, processData} = this.$route.query
      this.getInfo(id)
      if (processData) {
        this.procInstId = JSON.parse(processData).procInstId
      }
    },
    components: {
      Upload,
      Process
    },
    filters: {
      formatDate
    }
  }
</script>
