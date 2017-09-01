<template>
  <el-dialog
    title="合同预览"
    :visible.sync="visible"
    size="tiny">
    <div>

    </div>
    <div slot="footer">
      <el-button type="primary" @click="ok">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
  export default {
    props: {
      visible: Boolean
    },
    methods: {
      ok() {
        this.$emit('update:visible', false)
      }
    }
  }
</script>
