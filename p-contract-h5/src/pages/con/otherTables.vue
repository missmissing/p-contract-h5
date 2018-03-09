<template>
  <div>
    <el-select v-model="condition" placeholder="请选择" class="mb20">
      <el-option v-for="item in conditionOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
    </el-select>
    <transition name="component-fade" mode="out-in">
      <component :contractInfo="[baseInfoForm]" :prNo="baseInfoForm.prNo" :contractNo="baseInfoForm.contractNo" :is="tabs"></component>
    </transition>
  </div>
</template>

<script>
  import {mapState} from 'vuex'

  import PriceTable from './priceTable'
  import ContractTable from './contractTable'
  import OrderTable from './orderTable'

  export default {
    name: 'other-tables',
    props: {
      baseInfoForm: Object
    },
    data () {
      return {
        condition: 4
      }
    },
    computed: {
      ...mapState('con', ['prFlag']),
      tabs () {
        let type
        switch (this.condition) {
          case 2:
            type = 'PriceTable'
            break
          case 3:
            type = 'ContractTable'
            break
          case 4:
            type = 'OrderTable'
            break
          default:
            type = ''
        }
        return type
      },
      conditionOptions () {
        const opts = [
          {
            value: 3,
            label: '合同信息'
          },
          {
            value: 4,
            label: '订单信息'
          }
        ]
        if (this.prFlag) {
          opts.unshift({
            value: 2,
            label: '比价单信息'
          })
        }
        return opts
      }
    },
    components: {
      PriceTable,
      ContractTable,
      OrderTable
    }
  }
</script>

<style type="text/scss" lang="scss" scoped>

</style>
