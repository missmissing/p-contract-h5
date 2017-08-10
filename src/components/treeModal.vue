<style>

</style>

<template>
  <el-dialog
    :title="title"
    :visible.sync="visible"
    size="tiny"
    :show-close="false"
    :close-on-click-modal="false">
    <div>
      <el-tree
        :data="regions"
        ref="tree"
        show-checkbox>
      </el-tree>
    </div>
    <div slot="footer">
      <el-button @click="close">取 消</el-button>
      <el-button type="primary" @click="ok">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
  export default {
    data() {
      return {
        checkNodes: []
      };
    },
    props: {
      title: {
        default: '提示'
      },
      regions: {
        default: []
      },
      visible: {
        default: false
      }
    },
    methods: {
      getCheckedNodes() {
        this.checkNodes = this.$refs.tree.getCheckedNodes();
      },
      ok() {
        this.close();
        this.getCheckedNodes();
        this.$emit('ok', this.checkNodes, this);
      },
      close() {
        this.$emit('update:visible', false);
      }
    }
  };
</script>
