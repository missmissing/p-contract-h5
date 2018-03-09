<style type="text/scss" lang="scss" scoped>

</style>

<template>
  <div>
    <el-table
      :data="tableData"
      border
      highlight-current-row
      class="wp100">
      <el-table-column
        prop="id"
        width="300"
        label="ID">
      </el-table-column>
      <el-table-column
        prop="operatorName"
        width="100"
        label="操作人">
      </el-table-column>
      <el-table-column
        prop="createTime"
        width="200"
        label="时间">
        <template slot-scope="scope">
          {{ scope.row.createTime | formatTime}}
        </template>
      </el-table-column>
      <el-table-column
        prop="responseData"
        show-overflow-tooltip
        label="结果">
      </el-table-column>
      <el-table-column
        width="100"
        label="操作">
        <template slot-scope="scope">
          <el-button size="small" type="primary" @click="send(scope.row.id)">推 送</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      class="fr mt10"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="form.pageNo"
      :page-sizes="[10, 20, 30, 50]"
      :page-size="form.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
  </div>
</template>

<script>
  import Api from '../../api/sign'
  import {formatTime} from '../../filters/moment'
  import comLoading from '../../mixins/comLoading'

  export default {
    mixins: [comLoading],
    data () {
      return {
        tableData: [],
        total: 0,
        form: {
          pageSize: 10,
          pageNo: 1,
          excludeOperationResults: ['S']
        }
      }
    },
    methods: {
      getList () {
        this.comLoading()
        Api.getLogs(this.form).then((res) => {
          console.log(res)
          const {data, total} = res.data.dataMap
          this.tableData = data || []
          this.total = total
          this.comLoading(false)
        })
      },
      handleSizeChange (val) {
        console.log(`每页 ${val} 条`)
        this.form.pageSize = val
        this.getList()
      },
      handleCurrentChange (val) {
        console.log(`当前页: ${val}`)
        this.form.pageNo = val
        this.getList()
      },
      send (id) {
        this.comLoading({
          text: '推送执行中'
        })
        Api.sendOrder({id}).then(() => {
          this.comLoading(false)
          this.$message.success('推送成功')
          this.getList()
        }, () => {
          this.$message.warning('推送失败，请重试！')
          this.comLoading(false)
        })
      }
    },
    created () {
      this.getList()
    },
    filters: {
      formatTime
    }
  }
</script>
