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
        <el-col :span="6">
          <el-form-item label="订单类型">
            <el-select v-model="form.orderType">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="发起人">
            <SelectPerson @change="selectPerson"></SelectPerson>
          </el-form-item>
        </el-col>
        <el-col :span="9">
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
          <el-button type="text" @click.native.prevent="see(scope.row)">{{scope.row.templateCode}}</el-button>
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
  import {routerNames} from '@/core/consts'
  import comLoading from '@/mixins/comLoading'
  import {formatDate} from '@/filters/moment'
  import SelectPerson from '@/components/selectPerson.vue'

  export default {
    mixins: [comLoading],
    data() {
      return {
        form: {
          fuzzySearch: '',
          orderType: '',
          createDateStart: '',
          createDateEnd: '',
          initiator: '',
          orderSource: 0,
          category: 0,
          pageNo: 1,
          pageSize: 10
        },
        options: [{
          label: '一般物资',
          value: 1
        }, {
          label: '服务',
          value: 2
        }],
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
        this.getList()
      },
      selectPerson(val) {
        this.form.initiator = val
      },
      getList() {
        this.comLoading(1)
        Api.query(this.form).then((res) => {
          console.log(res)
          this.comLoading()
          const {total, data} = res.data.dataMap
          this.tableData = data
          this.totalPage = total
        })
      },
      see(index, row) {
        console.log(row)
        const id = row.id
        this.$router.push({
          name: routerNames.con_purchase_see,
          query: {id}
        })
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
    },
    components: {
      SelectPerson
    }
  }
</script>
