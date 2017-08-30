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
        :props="defaultProps"
        :node-key="nodeKey"
        :default-checked-keys="initialKeys"
        @check-change="getCheckedNodes"
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
      }
    },
    props: {
      defaultProps: {
        default: ''
      },
      nodeKey: {
        type: String,
        default: ''
      },
      title: {
        default: '提示'
      },
      regions: {
        type: Array,
        default() {
          return []
        }
      },
      visible: {
        type: Boolean,
        default: false
      },
      initialKeys: {
        type: Array,
        default() {
          return []
        }
      }
    },
    methods: {
      getCheckedNodes() {
        this.checkNodes = this.$refs.tree.getCheckedNodes()
      },
      ok() {
        this.close()
        this.$emit('ok', this.checkNodes, this.$refs.tree)
      },
      close() {
        this.$emit('update:visible', false)
      }
    }
  }
</script>
