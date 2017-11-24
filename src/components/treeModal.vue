<style type="text/scss" lang="scss" scoped>

</style>

<template>
  <el-dialog
    :title="title"
    :visible.sync="visible"
    size="tiny"
    @close="close">
    <div>
      <el-tree
        accordion
        :data="regions"
        ref="tree"
        :props="defaultProps"
        :node-key="nodeKey"
        :default-checked-keys="initialKeys"
        @check-change="getCheckedNodes"
        @node-click="nodeClick"
        :highlight-current="!multiple"
        :show-checkbox="multiple">
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
        currentNode: null,
        checkNodes: []
      };
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
          return [];
        }
      },
      visible: {
        type: Boolean,
        default: false
      },
      initialKeys: {
        type: Array,
        default() {
          return [];
        }
      },
      multiple: {
        type: Boolean,
        default: false
      }
    },
    methods: {
      nodeClick(node, nodeObj) {
        console.log(node, nodeObj);
        this.currentNode = nodeObj;
        if (!this.multiple) {
          this.checkNodes = [node];
        }
      },
      getCheckedNodes() {
        this.checkNodes = this.$refs.tree.getCheckedNodes();
      },
      getNodeDetail(node, result) {
        const { parent } = node;
        if (!parent) {
          return result;
        }
        const { data } = node;
        result.unshift(data);
        return this.getNodeDetail(parent, result);
      },
      ok() {
        if (!this.multiple) {
          if (this.currentNode && this.currentNode.childNodes && this.currentNode.childNodes.length) {
            this.$message.warning('请选择最后一级节点!');
            return;
          }
          this.checkNodes = this.getNodeDetail(this.currentNode, []);
          console.log(this.checkNodes);
        }
        this.$emit('ok', this.checkNodes, this.$refs.tree);
      },
      close() {
        this.$emit('update:visible', false);
      }
    }
  };
</script>
