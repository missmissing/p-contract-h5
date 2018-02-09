<template>
  <el-table v-if="items.length" :data="items" class="mt20">
    <el-table-column prop="attachType" label="附件类型" width="150px">
      <template slot-scope="scope">
        {{scope.row.attachType | attachmentType}}
      </template>
    </el-table-column>
    <el-table-column prop="fileName" label="从协议编号" width="150px">
      <template slot-scope="scope">
        <router-link v-if="scope.row.fileId"
                     :to="toPage(`${scope.row.fileId}`)">
          {{scope.row.fileName}}
        </router-link>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
  import attachmentType from '../../filters/attachmentType'
  import {routerNames} from '../../core/consts'

  export default {
    name: 'agreement-info',
    props: {
      items: Array
    },
    methods: {
      toPage (id) {
        return {
          name: routerNames.con_querySlaveProtocol,
          query: {
            id
          }
        }
      }
    },
    filters: {
      attachmentType
    }
  }
</script>

<style type="text/scss" lang="scss" scoped>

</style>
