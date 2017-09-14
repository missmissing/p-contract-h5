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
              v-model="form.keywords">
            </el-input>
          </el-form-item>
        </el-col>
        <el-button type="primary" @click="search" class="ml20">搜 索</el-button>
      </el-row>
      <el-row>
        <el-col :span="7">
          <el-form-item label="发起人">
            <el-input v-model="form.operatorName"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
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
        prop="templateCode"
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
          {{scope.row.createTime | formatTime}}
        </template>
      </el-table-column>
    </el-table>
    <TreeModal
      nodeKey="id"
      title="选择业务类型"
      :visible.sync="visible"
      :defaultProps="defaultProps"
      :regions="regions"
      :initialKeys="form.bizTypes"
      @ok="setBusiType">
    </TreeModal>
  </div>
</template>

<script>
  import supportModel from '@/api/support'
  import getBusiType from '@/mixins/getBusiType'
  import comLoading from '@/mixins/comLoading'
  import {formatTime} from '@/filters/moment'
  import TreeModal from '@/components/treeModal.vue'

  export default {
    mixins: [getBusiType, comLoading],
    data() {
      return {
        form: {
          keywords: '',
          startTime: '',
          endTime: '',
          operatorName: '',
          bizTypes: [],
          busiTypeText: ''
        },
        daterange: [],
        pickerOptions: {
          disabledDate(time) {
            return time.getTime() > Date.now()
          }
        },
        tableData: [],
        defaultProps: {
          children: 'children',
          label: 'businessName'
        },
        visible: false
      }
    },
    methods: {
      search() {
        console.log(JSON.stringify(this.form))
        this.getList(this.form)
      },
      getList(params) {
        this.comLoading(1)
        supportModel.getList(params).then((res) => {
          console.log(res)
          this.comLoading()
          this.tableData = res.data.dataMap
        }, () => {
          this.comLoading()
        })
      },
      setBusiType(value, tree) {
        const bizTypes = []
        const busiTypeText = []
        const leafs = tree.getCheckedNodes(true)
        leafs.forEach((item) => {
          bizTypes.push(item.id)
          busiTypeText.push(item.businessName)
        })
        this.form.bizTypes = bizTypes
        this.form.busiTypeText = busiTypeText.join(',')
        this.visible = false
      },
      see(index, row) {
        console.log(row)
        // this.$router.push(`/contemplate/see?id=${row.id}`)
      },
      formatDateRange(value) {
        const daterange = value.split(' ')
        this.daterange = [daterange[0], daterange[2]]
        this.form.startTime = daterange[0]
        this.form.ednTime = daterange[1]
      }
    },
    created() {
      this.getList()
    },
    filters: {
      formatTime
    },
    components: {
      TreeModal
    }
  }
</script>
