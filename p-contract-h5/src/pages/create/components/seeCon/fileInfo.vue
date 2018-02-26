<template>
  <div>
    <div v-if="baseInfoForm.templateId">
      <SealConditionForm :cardSealInfoForm="cardSealInfoForm" :disabled="disabled" ref="form"></SealConditionForm>
      <SealTable v-if="cardSealInfoForm.contract.length" :items="cardSealInfoForm.contract" :baseInfoForm="baseInfoForm" class="mb20"></SealTable>
      <AgreementInfo :items="cardSealInfoForm.agreenments" class="mt20"></AgreementInfo>
    </div>
    <h4 v-else>请选择合同基本信息的模板名称！</h4>
  </div>
</template>

<script>
  import SealConditionForm from './sealConditionForm.vue'
  import SealTable from './sealTable.vue'
  import AgreementInfo from '../agreementInfo.vue'

  export default {
    name: 'file-info',
    props: {
      disabled: Boolean,
      cardSealInfoForm: Object,
      baseInfoForm: Object
    },
    components: {
      SealConditionForm,
      SealTable,
      AgreementInfo
    }
  }
</script>

<style type="text/scss" lang="scss" scoped>

</style>
