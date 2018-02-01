<template>
  <el-dropdown disabled :split-button="splitButton" :type="type" @click="handleClick" @command="handleCommand">
    <slot/>
    <el-dropdown-menu slot="dropdown">
      <template v-for="item in items">
        <el-dropdown-item :command="item">{{item.label}}</el-dropdown-item>
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
      datas: Array,
      prop: {
        type: Object,
        default() {
          return {
            label: 'label',
            value: 'value'
          };
        }
      }
    },
    watch: {
      data(val) {
        this.items = this.transform(val);
      }
    },
    computed: {
      items() {
        if (!this.datas.length) {
          return [];
        }
        const {label, value} = this.prop;
        return this.datas.map((item) => {
          if (Object.keys(item).length) {
            let labelKey = '';
            let valueKey = '';
            if (value in item) {
              valueKey = item[value];
            }
            if (label in item) {
              labelKey = item[label];
            } else {
              labelKey = valueKey;
            }
            return {
              label: labelKey,
              value: valueKey,
              source: item
            };
          }
          return {
            label: item,
            value: item,
            source: item
          };
        });
      }
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
