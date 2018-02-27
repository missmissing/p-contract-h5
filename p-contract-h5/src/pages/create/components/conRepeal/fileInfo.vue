<template>
  <div>
    <div>
      <SealConditionForm :cardSealInfoForm="cardSealInfoForm" ref="form"></SealConditionForm>
      <SealTable :items="cardSealInfoForm.contract" class="mb20"></SealTable>
    </div>
  </div>
</template>

<script>
  import SealConditionForm from './sealConditionForm.vue'
  import SealTable from './sealTable.vue'

  export default {
    name: 'file-info',
    props: {
      cardSealInfoForm: Object,
      disabled: Boolean
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
      SealTable
    }
  }
</script>

<style type="text/scss" lang="scss" scoped>

</style>
