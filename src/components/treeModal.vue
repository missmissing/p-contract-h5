<style>

</style>

<template>
  <el-dialog
    :title="title"
    :visible.sync="visible"
    size="tiny"
    @close="close">
    <div>
      <el-tree
        :data="regions"
        ref="tree"
        show-checkbox>
      </el-tree>
    </div>
    <span slot="footer" class="dialog-footer">
    <el-button @click="close">取 消</el-button>
    <el-button type="primary" @click="ok">确 定</el-button>
  </span>
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
