<template>
  <div>
    <el-table :data="items" ref="table" border>
      <el-table-column type="index" label="序号" width="80">
        <template slot-scope="scope">
          {{scope.$index + 1}}
        </template>
      </el-table-column>
      <el-table-column prop="contractNo" label="合同号"></el-table-column>
      <el-table-column prop="contractType" label="类型">
        <template slot-scope="scope">
          {{scope.row.contractType | contractType}}
        </template>
      </el-table-column>
      <el-table-column prop="contractStatusName" label="状态"></el-table-column>
      <el-table-column prop="startTime" label="开始时间">
        <template slot-scope="scope">
          {{scope.row.startTime | formatDate}}
        </template>
      </el-table-column>
      <el-table-column prop="endTime" label="终止时间">
        <template slot-scope="scope">
          {{scope.row.endTime | formatDate}}
        </template>
      </el-table-column>
    </el-table>
    <div class="mt20">
      <el-pagination
        class="fr"
        @size-change="handleRelatedInfoSizeChange"
        @current-change="handleRelatedInfoCurrentChange"
        :current-page="pageNo"
        :page-size="pageSize"
        :page-sizes="[10, 20, 30, 50]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
  import Api from '../../api/manageContract'
  import contractType from '../../filters/contractType'
  import {formatDate} from '../../filters/moment'

  import comLoading from '../../mixins/comLoading'

  export default {
    name: 'relate-info',
    mixins: [comLoading],
    props: {
      supplierCode: String
    },
    data () {
      return {
        items: [],
        total: 0,
        pageNo: 1,
        pageSize: 10
      }
    },
    watch: {
      supplierCode () {
        this.getList()
      }
    },
    created () {
      this.getList()
    },
    methods: {
      getList () {
        if (!this.supplierCode) {
          return
        }
        this.comLoading({
          target: this.$refs.table.$el
        })
        Api.getConList({
          pageNo: this.pageNo,
          pageSize: this.pageSize,
          supplierCode: this.supplierCode
        }).then((data) => {
          const dataMap = data.data.dataMap
          if (dataMap) {
            this.items = dataMap.data
            this.total = dataMap.total
          }
        }).finally(() => {
          this.comLoading(false)
        })
      },
      handleRelatedInfoSizeChange (val) {
        this.pageSize = val
        this.getList()
      },
      handleRelatedInfoCurrentChange (page) {
        this.pageNo = page
        this.getList()
      }
    },
    filters: {
      contractType,
      formatDate
    }
  }
</script>

<style type="text/scss" lang="scss" scoped>

</style>
