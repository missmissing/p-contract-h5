<template>
  <div>
    <SupplierInfo :items="cardContentInfoForm.tableSupplierInfo" class="mb20"></SupplierInfo>
    <SubjectInfo class="mb20" :items="cardContentInfoForm.conSubjctName"></SubjectInfo>
    <ThirdPartyInfo :items="cardContentInfoForm.thirdPartyInfo" class="mb20" v-if="ifThirdInfo"></ThirdPartyInfo>
    <StandardInfo :cardContentInfoForm="cardContentInfoForm" class="mb20" v-if="ifStandardInfo"></StandardInfo>
    <EffectiveConditionForm :cardContentInfoForm="cardContentInfoForm" ref="form"></EffectiveConditionForm>
  </div>
</template>

<script>
  import {mapState} from 'vuex'

  import SupplierInfo from './supplierInfo.vue'
  import SubjectInfo from './subjectInfo.vue'
  import ThirdPartyInfo from './thirdPartyInfo.vue'
  import StandardInfo from './standardInfo.vue'
  import EffectiveConditionForm from './effectiveConditionForm.vue'

  export default {
    name: 'content-info',
    props: {
      cardContentInfoForm: Object
    },
    data () {
      return {}
    },
    computed: {
      ...mapState('con', ['contractType', 'contractBusinessType']),
      // 当合同模式不是固定格式合同时，显示第三方信息
      ifThirdInfo () {
        return this.contractType !== 2
      },
      // 当合同模式不是框架意向合同时，显示合同标的信息
      ifStandardInfo () {
        return this.contractType !== 4
      }
    },
    methods: {
      valid () {
        let errorCount = 0
        const form = this.cardContentInfoForm
        const {tableSupplierInfo, conSubjctName} = form
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
