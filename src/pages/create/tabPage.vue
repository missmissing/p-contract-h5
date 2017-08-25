<style type="text/scss" lang="scss" scoped>

</style>

<template>
  <div class="pd20">
    <el-select
      v-model="value"
      placeholder="请选择"
      class="mb20"
    >
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value">
      </el-option>
    </el-select>
    <keep-alive>
      <transition name="component-fade" mode="out-in">
        <component :is="view"></component>
      </transition>
    </keep-alive>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        options: [
          {
            value: 1,
            label: '采购申请'
          },
          {
            value: 2,
            label: '比价单信息'
          },
          {
            value: 3,
            label: '合同信息'
          },
          {
            value: 4,
            label: '订单信息'
          }
        ],
        value: 1
      };
    },
    computed: {
      view() {
        switch (this.value) {
          case 1:
            return 'PrTable';
          case 2:
            return 'PriceTable';
          case 3:
            return 'ContractTable';
          case 4:
            return 'OrderTable';
        }
      }
    },
    components: {
      PrTable: (resolve) => {
        require(['./components/tables/prTable'], resolve)
      },
      PriceTable: (resolve) => {
        require(['./components/tables/priceTable'], resolve)
      },
      ContractTable: (resolve) => {
        require(['./components/tables/contractTable'], resolve)
      },
      OrderTable: (resolve) => {
        require(['./components/tables/orderTable'], resolve)
      }
    }
  };
</script>
