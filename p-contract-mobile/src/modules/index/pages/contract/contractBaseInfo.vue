<style type="text/scss" lang="scss" scoped>

</style>

<template>
  <div>
    <mt-cell title="合同名称" :value="info.contractName" is-link @click.native="preview"></mt-cell>
    <mt-cell title="业务申请人" :value="info.businessOperatorId"></mt-cell>
    <mt-cell title="业务部门" :value="info.businessDeptName"></mt-cell>
    <mt-cell title="合同模式" :value="info.contractType | contractPattern"></mt-cell>
    <mt-cell title="业务类型"
             :value="`${info.contractBusinessTypeFirstName}-${info.contractBusinessTypeSecondName}-${info.contractBusinessTypeThirdName}`"></mt-cell>
    <mt-cell title="文本类型" :value="info.contractTextType | tplType"></mt-cell>
    <mt-cell title="模板名称" :value="info.templateId"></mt-cell>
    <mt-cell title="所属项目" :value="info.belongProject"></mt-cell>
    <mt-cell title="盖章次序" :value="info.sealOrder | printOpts"></mt-cell>
    <mt-cell
      v-if="info.sealOrder===0"
      title="原因"
      :value="info.ourSealOpinion">
    </mt-cell>
    <Preview :visible.sync="visible" :info="moreData"></Preview>
  </div>
</template>

<script>
  import contractPattern from '../../../../filters/contractPattern'
  import tplType from '../../../../filters/tplType'
  import printOpts from '../../../../filters/printOpts'
  import Preview from './preview.vue'

  export default {
    props: {
      info: {
        type: Object,
        default () {
          return {}
        }
      },
      moreData: {
        type: Object,
        default () {
          return {}
        }
      }
    },
    data () {
      return {
        visible: false
      }
    },
    watch: {
      visible (val) {
        if (val) {
          window._____processCenterPageAction('setheaderdisplay', {show: false})
        } else {
          window._____processCenterPageAction('setheaderdisplay', {show: true})
        }
      }
    },
    methods: {
      preview () {
        this.visible = true
      }
    },
    components: {
      Preview
    },
    filters: {
      contractPattern,
      tplType,
      printOpts
    }
  }
</script>
