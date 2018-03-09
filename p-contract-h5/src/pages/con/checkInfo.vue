<template>
  <div>
    <CheckConditionForm :cardContCheckInfoForm="cardContCheckInfoForm" ref="form"></CheckConditionForm>
    <UnionCheckInfo :items="cardContCheckInfoForm.unionCheckPersons"></UnionCheckInfo>
    <template v-if="serviceFlag">
      <ServiceCheckInfo :items="cardContCheckInfoForm.serviceMatters"></ServiceCheckInfo>
    </template>
    <template v-else>
      <MaterialCheckInfo :items="cardContCheckInfoForm.materialMatters"></MaterialCheckInfo>
    </template>
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  import CheckConditionForm from './checkConditionForm.vue'
  import UnionCheckInfo from './unionCheckInfo.vue'
  import MaterialCheckInfo from './materialCheckInfo.vue'
  import ServiceCheckInfo from './serviceCheckInfo.vue'

  export default {
    name: 'check-info',
    props: {
      cardContCheckInfoForm: Object
    },
    data () {
      return {}
    },
    computed: {
      ...mapState('con', ['serviceFlag'])
    },
    methods: {
      valid () {
        let errorCount = 0
        const form = this.cardContCheckInfoForm
        const {serviceMatters} = form
        if (!this.$refs.form.valid()) {
          errorCount++
        }
        if (this.serviceFlag) {
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
