<template>
  <el-dropdown disabled :split-button="splitButton" :type="type" @click="handleClick" @command="handleCommand">
    <slot/>
    <el-dropdown-menu slot="dropdown">
      <template v-for="item in datas">
        <el-dropdown-item :command="item">{{item.label||item.value||item}}</el-dropdown-item>
      </template>
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script>
  export default {
    name: 'dropdown',
    props: {
      type: String,
      splitButton: Boolean,
      datas: Array
    },
    methods: {
      handleClick() {
        this.$emit('click');
      },
      handleCommand(item) {
        this.$emit('command', item);
      }
    }
  };
</script>

<style type="text/scss" lang="scss" scoped>

</style>
