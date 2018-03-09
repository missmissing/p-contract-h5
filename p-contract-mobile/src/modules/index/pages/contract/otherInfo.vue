<style type="text/scss" lang="scss" scoped>

</style>

<template>
  <div>
    <mt-button size="small" type="primary" @click.native="sheetVisible=true" class="mb20">切换列表</mt-button>
    <component :info="info" :is="tabs"></component>
    <mt-actionsheet
      :actions="actions"
      v-model="sheetVisible">
    </mt-actionsheet>
  </div>
</template>

<script>
  export default {
    props: {
      info: {
        type: Object,
        default () {
          return {}
        }
      }
    },
    data () {
      const t = this
      const change = function (item) {
        t.condition = item.value
      }
      return {
        actions: [
          {
            value: 2,
            name: '比价单信息',
            method: change
          },
          {
            value: 3,
            name: '合同信息',
            method: change
          },
          {
            value: 4,
            name: '订单信息',
            method: change
          }
        ],
        sheetVisible: false,
        condition: 4
      }
    },
    computed: {
      tabs () {
        let type
        switch (this.condition) {
          case 1:
            type = 'PrTable'
            break
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
      }
    },
    watch: {
      sheetVisible (val) {
        if (val) {
          document.querySelector('#action-submit-container').style.display = 'none'
        } else {
          document.querySelector('#action-submit-container').style.display = 'block'
        }
      }
    },
    components: {
      PriceTable: () => import('./priceTable.vue'),
      ContractTable: () => import('./contractTable.vue'),
      OrderTable: () => import('./orderTable.vue')
    }
  }
</script>
