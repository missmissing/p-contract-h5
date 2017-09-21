<style type="text/scss" lang="scss" scoped>

</style>

<template>
  <div class="pd20">
    <el-form class="mb20" ref="form" :model="form" label-width="100px">
      <el-row>
        <el-col :span="21">
          <el-form-item label="查询条件">
            <el-input
              placeholder="请输入供应商名称，物料名称"
              v-model="form.fuzzySearch">
            </el-input>
          </el-form-item>
        </el-col>
        <el-button type="primary" @click="search" class="ml20">搜 索</el-button>
      </el-row>
      <el-row>
        <el-col :span="7">
          <el-form-item label="发起人">
            <el-input v-model="form.initiator"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="7">
          <el-form-item label="创建时间">
            <el-date-picker
              style="width:100%;"
              v-model="daterange"
              type="daterange"
              placeholder="选择日期范围"
              @change="formatDateRange"
              :picker-options="pickerOptions">
            </el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <el-table
      :data="tableData"
      border
      highlight-current-row
      class="wp100">
      <el-table-column
        prop="pr"
        min-width="150"
        label="订单编号">
        <template scope="scope">
          <el-button type="text" @click.native.prevent="see(scope.$index,scope.row)">{{scope.row.templateCode}}
          </el-button>
        </template>
      </el-table-column>
      <el-table-column
        prop="creatorName"
        min-width="100"
        label="发起人">
      </el-table-column>
      <el-table-column
        prop="createTime"
        width="180"
        label="创建日期">
        <template scope="scope">
          {{scope.row.createTime | formatDate}}
        </template>
      </el-table-column>
    </el-table>
    <div class="mt20">
      <el-pagination
        class="fr"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="form.pageNo"
        :page-size="form.pageSize"
        :page-sizes="[10, 20, 30, 50]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalPage">
      </el-pagination>
    </div>
  </div>
</template>

<script>
  import Api from '@/api/sign'
  import comLoading from '@/mixins/comLoading'
  import {formatDate} from '@/filters/moment'

  export default {
    mixins: [comLoading],
    data() {
      return {
        form: {
          fuzzySearch: '',
          createDateStart: '',
          createDateEnd: '',
          initiator: '',
          orderSource: 0,
          category: 0,
          pageNo: 1,
          pageSize: 10
        },
        totalPage: 0,
        daterange: [],
        pickerOptions: {
          disabledDate(time) {
            return time.getTime() > Date.now()
          }
        },
        tableData: []
      }
    },
    methods: {
      search() {
        console.log(JSON.stringify(this.form))
        this.getList(this.form)
      },
      getList() {
        this.comLoading(1)
        Api.query(this.form).then((res) => {
          console.log(res)
          this.comLoading()
          const data = res.data.dataMap || []
          this.tableData = data
          const {totalPage} = data
          this.totalPage = totalPage
        })
      },
      see(index, row) {
        console.log(row)
        // this.$router.push(`/contemplate/see?id=${row.id}`)
      },
      formatDateRange(value) {
        const daterange = value.split(' ')
        this.daterange = [daterange[0], daterange[2]]
        this.form.createDateStart = daterange[0]
        this.form.createDateEnd = daterange[2]
      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`)
        this.pageSize = val
        this.getList()
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`)
        this.pageNo = val
        this.getList()
      }
    },
    created() {
      this.getList()
    },
    filters: {
      formatDate
    }
  }
</script>
