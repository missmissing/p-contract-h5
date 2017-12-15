<style type="text/scss" lang="scss" scoped>

</style>

<template>
  <div>
    <mt-cell title="合同名称" :value="info.contractName"></mt-cell>
    <mt-cell title="业务申请人" :value="info.businessOperatorId"></mt-cell>
    <mt-cell title="业务部门" :value="info.businessDeptName"></mt-cell>
    <mt-cell title="合同模式" :value="info.contractTypeName"></mt-cell>
    <mt-cell title="业务类型" :value="info.contractBusinessTypeName"></mt-cell>
    <mt-cell title="文本类型" :value="info.contractTextType"></mt-cell>
    <mt-cell title="模板名称" :value="info.templateId"></mt-cell>
    <mt-cell title="所属项目" :value="info.belongProject"></mt-cell>
    <mt-cell title="盖章次序" :value="info.sealOrder"></mt-cell>
    <mt-field
      v-if="info.sealOrder===0"
      label="废除原因"
      type="textarea"
      rows="4"
      :value="info.ourSealOpinion"
      readonly>
    </mt-field>
  </div>
</template>

<script>
  export default {
    props: {
      info: {
        type: Object,
        default() {
          return {};
        }
      }
    },
    data() {
      return {};
    }
  };
</script>
