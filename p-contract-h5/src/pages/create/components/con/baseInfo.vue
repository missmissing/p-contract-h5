<template>
  <el-card>
    <header slot="header">合同基本信息</header>
    <el-form ref="baseInfoForm" :model="baseInfoForm" label-width="100px" :rules="disabled?{}:rules">
      <el-row>
        <el-col :span="8">
          <el-form-item label="合同名称" prop="contractName">
            <el-input :readonly="disabled" :class="{disabledInput:disabled}" v-model="baseInfoForm.contractName" placeholder="请输入合同名称" :maxlength="30"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8" v-if="disabled">
          <el-form-item label="合同编号">
            <el-input v-model="baseInfoForm.contractNo" :readonly="true" :class="{disabledInput:true}"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="业务申请人" prop="businessOperatorId">
            <el-select v-if="!disabled" class="wp100" v-model="baseInfoForm.businessOperatorId" placeholder="请输入业务申请人" :remote-method="getBusinessOperator" :loading="loading"
                       @change="handleBusinessOperatorChange" clearable filterable remote>
              <el-option v-for="item in businessOperators" :key="item.userId" :label="item.userName" :value="item.userId">
                <span class="fl">{{ item.userName }}</span>
                <span class="fr">{{ item.deptName }}</span>
              </el-option>
            </el-select>
            <el-input v-else :readonly="true" v-model="baseInfoForm.businessOperatorName" :class="{wp100:true,disabledInput:true}"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="业务部门" prop="businessDeptName">
            <el-input :readonly="true" :class="{disabledInput:true}" v-model="baseInfoForm.businessDeptName" placeholder="请输入业务部门"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="合同模式">
            <el-input :readonly="true" :class="{disabledInput:true}" v-model="baseInfoForm.contractTypeName" placeholder="请输入合同模式"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="业务类型">
            <el-input :readonly="true" :class="{disabledInput:true}" v-model="contractBusinessTypeName" placeholder="请输入业务类型"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="文本类型">
            <el-select v-if="!disabled" class="wp100" v-model="baseInfoForm.contractTextType" placeholder="请选择合同文本类型" @change="handleContractTextTypeChange">
              <el-option v-for="item in contractTextTypeOptions" :key="item.id" :label="item.name" :value="item.id"></el-option>
            </el-select>
            <el-input v-else :readonly="true" v-model="contractTextTypeName" :class="{wp100:true,disabledInput:true}"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="模板名称" prop="templateId">
            <el-select v-if="!disabled" class="wp100" v-model="baseInfoForm.templateId" placeholder="请选择合同模版" @change="handleTemplateChange">
              <el-option v-for="item in templateOptions" :key="item.templateId" :label="item.templateName" :value="item.templateId"></el-option>
            </el-select>
            <el-input v-else :readonly="true" :class="{disabledInput:true}" v-model="baseInfoForm.templateName"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-button class="ml20" type="primary" @click="handlePreview" v-show="previewVisible">预览</el-button>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="所属项目" prop="belongProject">
            <el-input :readonly="disabled" :class="{disabledInput:disabled}" v-model="baseInfoForm.belongProject" placeholder="请输入所属项目"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="盖章次序">
            <el-radio-group v-model="baseInfoForm.sealOrder" :disabled="disabled">
              <el-radio :label="1">对方先盖章</el-radio>
              <el-radio :label="0">我方先盖章</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row v-if="ifOurSeal">
        <el-col :span="16">
          <el-form-item prop="ourSealOpinion">
            <el-input :disabled="disabled" type="textarea" :rows="4" placeholder="请输入内容" v-model="baseInfoForm.ourSealOpinion"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </el-card>
</template>

<script>
  import {mapState} from 'vuex'

  import bus from '../../../../core/bus'
  import Api from '../../../../api/manageContract/index'

  export default {
    name: 'base-info',
    props: {
      baseInfoForm: Object
    },
    data () {
      return {
        loading: false, // 业务操作人
        templateOptions: [],
        businessOperators: [], // 业务操作人数组
        contractTextTypeOptions: [
          {
            id: 1, name: '合同模板'
          },
          {
            id: 2, name: '合同文本'
          }
        ],
        rules: {
          contractName: [{required: true, message: '请输入合同名称'}],
          businessOperatorId: [{required: true, message: '请输入业务业务申请人'}],
          templateId: [{required: true, message: '请选择模板名称'}],
          ourSealOpinion: [{required: true, message: '请输入原因'}]
        }
      }
    },
    computed: {
      ...mapState(['pageStatus']),
      disabled () {
        return this.pageStatus !== 1
      },
      // 文本类型名称
      contractTextTypeName () {
        let name = ''
        this.contractTextTypeOptions.some((item) => {
          if (item.id === this.baseInfoForm.contractTextType) {
            name = item.name
          }
        })
        return name
      },
      // 基本信息业务类型名称
      contractBusinessTypeName () {
        const {contractBusinessTypeFirstName, contractBusinessTypeSecondName, contractBusinessTypeThirdName} = this.baseInfoForm
        return `${contractBusinessTypeFirstName}-${contractBusinessTypeSecondName}-${contractBusinessTypeThirdName}`
      },
      // 只有当文本类型为合同模板时，显示预览按钮
      previewVisible () {
        return this.baseInfoForm.contractTextType === 1
      },
      // 是否我方先盖章
      ifOurSeal () {
        return this.baseInfoForm.sealOrder === 0
      }
    },
    methods: {
      // 业务申请人查询
      getBusinessOperator (keyword) {
        if (!keyword) {
          this.baseInfoForm.businessOperatorName = null
          this.businessOperators = []
          return
        }
        this.loading = true
        Api.getRemoteCreatePersonsByKeyWord({keyword}).then((res) => {
          this.businessOperators = res.data.dataMap
        }).finally(() => {
          this.loading = false
        })
      },
      // 业务申请人选择
      handleBusinessOperatorChange (val) {
        this.businessOperators.some((item) => {
          if (item.userId === val) {
            this.baseInfoForm.businessOperatorName = item.userName
            this.baseInfoForm.businessDeptName = item.deptName
            this.baseInfoForm.businessDeptId = item.deptCode
            bus.$emit('getResponsibleInfo', item)
            return true
          }
          return false
        })
      },
      // 文本类型选择
      handleContractTextTypeChange () {
        const {contractBusinessTypeThird, contractTextType} = this.baseInfoForm
        // 更新合同模板列表
        Api.getTemplateByBizTypeId({
          bizTypeId: contractBusinessTypeThird, templateType: contractTextType === 1 ? 'TEMPLATE' : 'TEXT'
        }).then((res) => {
          this.baseInfoForm.templateId = null
          this.templateOptions = res.data.dataMap || []
        })
      },
      // 合同模板选择
      handleTemplateChange (val) {
        if (!val) {
          return
        }
        const contractTextType = this.baseInfoForm.contractTextType
        let templateName = null
        this.templateOptions.some((item) => {
          if (item.templateId === val) {
            templateName = item.templateName
            return true
          }
          return false
        })
        const params = {templateId: val, templateName, contractTextType}
        bus.$emit('getAttachmentInfo', params)
      },
      // 预览
      handlePreview () {
        bus.$emit('handlePreview')
      },
      // 检验
      valid () {
        let flag = false
        this.$refs.baseInfoForm.validate((valid) => {
          flag = valid
        })
        return flag
      }
    },
    created () {
      if (!this.disabled) {
        this.handleContractTextTypeChange()
      }
    }
  }
</script>

<style type="text/scss" lang="scss" scoped>

</style>
