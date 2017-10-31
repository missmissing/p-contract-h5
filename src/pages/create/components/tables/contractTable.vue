<template>
  <div>
    <el-table
      :data="contractInfo"
      border
      class="wp100">
      <el-table-column
        prop="contractNo"
        label="合同号">
      </el-table-column>
      <el-table-column
        prop="creator"
        label="发起人"
        width="150">
      </el-table-column>
      <el-table-column
        prop="creatorDept"
        label="发起部门">
      </el-table-column>
      <el-table-column
        prop="submitTime"
        :formatter="formatDate"
        label="发起时间"
        width="120">
      </el-table-column>
      <el-table-column
        prop="sealTime"
        :formatter="formatDate"
        label="盖章时间"
        width="120">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  import Api from '@/api/manageContract'
  import {formatDate} from '@/filters/moment'
  import comLoading from '@/mixins/comLoading'

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
    methods: {
      formatDate(value) {
        return formatDate(value)
      }
    }
  }
</script>
