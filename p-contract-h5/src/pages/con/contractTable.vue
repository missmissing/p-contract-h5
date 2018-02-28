<template>
  <div>
    <el-table
      :data="contractInfo"
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
      <el-table-column
        prop="creatorDept"
        label="发起部门">
      </el-table-column>
      <el-table-column
        prop="submitTime"
        label="发起时间"
        width="120">
        <template slot-scope="scope">
          {{scope.row.submitTime | formatDate}}
        </template>
      </el-table-column>
      <el-table-column
        prop="sealTime"
        label="盖章时间"
        width="120">
        <template slot-scope="scope">
          {{scope.row.sealTime | formatDate}}
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  import {formatDate} from '../../filters/moment'

  export default {
    props: {
      contractInfo: Array
    },
    data () {
      return {}
    },
    filters: {
      formatDate
    }
  }
</script>
