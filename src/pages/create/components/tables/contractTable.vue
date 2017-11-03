<template>
  <div>
    <el-table
      :data="contractInfo"
      border
      class="wp100">
      <el-table-column
        width="200"
        prop="contractNo"
        label="合同号">
      </el-table-column>
      <el-table-column
        prop="creator"
        label="发起人"
        width="150">
      </el-table-column>
      <el-table-column v-if="contractInfo&&contractInfo[0]&&contractInfo[0].creatorDept"
        prop="creatorDept"
        label="发起部门">
      </el-table-column>
      <el-table-column
        prop="submitTime"
        label="发起时间"
        width="120">
        <template scope="scope">
          {{scope.row.submitTime | formatDate}}
        </template>
      </el-table-column>
      <el-table-column
        prop="sealTime"
        label="盖章时间"
        width="120">
        <template scope="scope">
          {{scope.row.sealTime | formatDate}}
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  import Api from '@/api/manageContract'
  import {formatDate} from '@/filters/moment'
  import comLoading from '@/mixins/comLoading'
  import moment from 'moment'

  export default {
    mixins: [comLoading],
    props:{
      contractInfo:Array
    },
    data() {
      return {
        tableData: []
      }
    },
    filters:{
      formatDate
    }
  }
</script>
