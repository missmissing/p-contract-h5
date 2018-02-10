<template>
  <div>
    <SupplierInfo :items="cardContentInfoForm.tableSupplierInfo" :disabled="disabled" class="mb20"></SupplierInfo>
    <SubjectInfo class="mb20" :items="cardContentInfoForm.conSubjctName" :contractType="baseInfoForm.contractType" :disabled="disabled"></SubjectInfo>
    <ThirdPartyInfo :items="cardContentInfoForm.thirdPartyInfo" :disabled="disabled" class="mb20" v-if="ifThirdInfo"></ThirdPartyInfo>
    <StandardInfo :cardContentInfoForm="cardContentInfoForm" :baseInfoForm="baseInfoForm" :disabled="disabled" class="mb20" v-if="ifStandardInfo"></StandardInfo>
    <EffectiveConditionForm :cardContentInfoForm="cardContentInfoForm" :disabled="disabled" ref="form"></EffectiveConditionForm>
  </div>
</template>

<script>
  import SupplierInfo from './supplierInfo.vue'
  import SubjectInfo from './subjectInfo.vue'
  import ThirdPartyInfo from './thirdPartyInfo.vue'
  import StandardInfo from './standardInfo.vue'
  import EffectiveConditionForm from './effectiveConditionForm.vue'

  export default {
    name: 'content-info',
    props: {
      cardContentInfoForm: Object,
      baseInfoForm: Object,
      disabled: Boolean
    },
    data () {
      return {
        rules: {
          startTime: [{
            required: true, message: '请输入合同生效日期'
          }, {
            validator: (rule, value, callback) => {
              const endTime = this.cardContentInfoForm.endTime
              if (endTime && value > endTime) {
                callback(new Error('合同终止日期必须大于合同生效日期'))
              }
              callback()
            },
            trigger: 'change'
          }],
          endTime: [{
            required: true, message: '请输入合同截止日期'
          }, {
            validator: (rule, value, callback) => {
              const startTime = this.cardContentInfoForm.startTime
              if (startTime && value < startTime) {
                callback(new Error('合同终止日期必须大于合同生效日期'))
              }
              callback()
            },
            trigger: 'change'
          }],
          effectiveCondition: [{required: true, message: '请选择生效条件'}],
          conditionDesc: [{required: true, message: '请输入附期限生效信息'}]
        }
      }
    },
    computed: {
      // 当合同模式不是固定格式合同时，显示第三方信息
      ifThirdInfo () {
        return this.baseInfoForm.contractType !== 2
      },
      // 当合同模式不是框架意向合同时，显示合同标的信息
      ifStandardInfo () {
        return this.baseInfoForm.contractType !== 4
      }
    },
    methods: {
      valid () {
        let errorCount = 0
        const form = this.cardContentInfoForm
        const {tableSupplierInfo, conSubjctName} = form
        console.log(this.$refs.form.valid())
        if (!this.$refs.form.valid()) {
          errorCount++
        }
        if (!tableSupplierInfo.length) {
          errorCount++
        }
        if (!conSubjctName.length) {
          errorCount++
        }
        form.errorCount = errorCount
        return !errorCount
      }
    },
    components: {
      SupplierInfo,
      SubjectInfo,
      ThirdPartyInfo,
      StandardInfo,
      EffectiveConditionForm
    }
  }
</script>

<style type="text/scss" lang="scss" scoped>

</style>
