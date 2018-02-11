<template>
  <div>
    <FileList v-if="cardSealInfoForm.others.length" :items="cardSealInfoForm.others" class="mb20"></FileList>
    <div v-if="baseInfoForm.templateId">
      <SealConditionForm :cardSealInfoForm="cardSealInfoForm" :disabled="disabled" ref="form"></SealConditionForm>
      <SealTable v-if="cardSealInfoForm.contract.length" :items="cardSealInfoForm.contract" :baseInfoForm="baseInfoForm" class="mb20"></SealTable>
      <AgreementInfo :items="cardSealInfoForm.agreenments" class="mt20"></AgreementInfo>
    </div>
    <h4 v-else>请选择合同基本信息的模板名称！</h4>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'

  import SealConditionForm from './sealConditionForm.vue'
  import FileList from './fileList.vue'
  import SealTable from './sealTable.vue'
  import AgreementInfo from './agreementInfo.vue'

  export default {
    name: 'file-info',
    props: {
      cardSealInfoForm: Object,
      disabled: Boolean,
      baseInfoForm: Object
    },
    computed: {
      ...mapGetters([
        'isModify'
      ])
    },
    methods: {
      valid () {
        let errorCount = 0
        const form = this.cardSealInfoForm
        if (!this.$refs.form.valid()) {
          errorCount++
        }
        form.errorCount = errorCount
        return !errorCount
      }
    },
    components: {
      SealConditionForm,
      FileList,
      SealTable,
      AgreementInfo
    }
  }
</script>

<style type="text/scss" lang="scss" scoped>

</style>
