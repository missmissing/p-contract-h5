<template>
  <div>
    <CheckConditionForm :cardContCheckInfoForm="cardContCheckInfoForm" :cardContentInfoForm="cardContentInfoForm" :baseInfoForm="baseInfoForm" :disabled="disabled" ref="form"></CheckConditionForm>
    <UnionCheckInfo :items="cardContCheckInfoForm.unionCheckPersons" :disabled="disabled"></UnionCheckInfo>
    <template v-if="ifServiceCheck">
      <ServiceCheckInfo :items="cardContCheckInfoForm.serviceMatters" :disabled="disabled"></ServiceCheckInfo>
    </template>
    <template v-else>
      <MaterialCheckInfo :items="cardContCheckInfoForm.materialMatters"></MaterialCheckInfo>
    </template>
  </div>
</template>

<script>
  import CheckConditionForm from './checkConditionForm.vue'
  import UnionCheckInfo from './unionCheckInfo.vue'
  import MaterialCheckInfo from './materialCheckInfo.vue'
  import ServiceCheckInfo from './serviceCheckInfo.vue'

  export default {
    name: 'check-info',
    props: {
      cardContCheckInfoForm: Object,
      disabled: Boolean,
      baseInfoForm: Object,
      cardContentInfoForm: Object
    },
    data () {
      return {}
    },
    computed: {
      // 是否显示服务类验收方式，服务类验收事项
      ifServiceCheck () {
        const exist = this.cardContentInfoForm.conStandard.some(item => !!item.materialCode)
        return !exist && this.baseInfoForm.contractBusinessTypeFirst === 2
      }
    },
    methods: {
      valid () {
        let errorCount = 0
        const form = this.cardContCheckInfoForm
        const {serviceMatters} = form
        if (!this.$refs.form.valid()) {
          errorCount++
        }
        if (this.ifServiceCheck) {
          if (!serviceMatters.length) {
            errorCount++
          }
        }
        form.errorCount = errorCount
        return !errorCount
      }
    },
    components: {
      CheckConditionForm,
      UnionCheckInfo,
      MaterialCheckInfo,
      ServiceCheckInfo
    }
  }
</script>

<style type="text/scss" lang="scss" scoped>

</style>
