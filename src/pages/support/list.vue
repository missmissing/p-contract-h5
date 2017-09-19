<style type="text/scss" lang="scss" scoped>

</style>

<template>
  <div class="pd20">
    <el-form class="mb20" ref="form" :model="form" label-width="100px">
      <el-row>
        <el-col :span="21">
          <el-form-item label="查询条件">
            <el-input
              placeholder="请输入模板名称,支持模糊搜索"
              v-model="form.keywords">
            </el-input>
          </el-form-item>
        </el-col>
        <el-button type="primary" @click="search" class="ml20">搜 索</el-button>
      </el-row>
      <el-row>
        <el-col :span="7">
          <el-form-item label="模板类型">
            <el-select
              v-model="form.templateType"
              class="wp100">
              <el-option label="请选择" :value="null"></el-option>
              <el-option label="合同模板" value="0"></el-option>
              <el-option label="合同文本" value="1"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="7">
          <el-form-item label="文本编号">
            <el-input v-model="form.templateCode"></el-input>
          </el-form-item>
        </el-col>
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
        <el-col :span="7">
          <el-form-item label="有效文本">
            <el-switch v-model="form.valid"></el-switch>
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
        prop="templateName"
        min-width="150"
        label="模板名称">
        <template scope="scope">
          <el-button type="text" @click.native.prevent="see(scope.$index,scope.row)">{{scope.row.templateName}}
          </el-button>
        </template>
      </el-table-column>
      <el-table-column
        prop="templateCode"
        min-width="150"
        label="模板编号">
      </el-table-column>
      <el-table-column
        prop="templateType"
        min-width="120"
        label="文本类型">
        <template scope="scope">
          {{scope.row.templateType === 'TEXT' ? '合同文本' : '合同模板'}}
        </template>
      </el-table-column>
      <el-table-column
        prop="creatorName"
        min-width="100"
        label="发起人">
      </el-table-column>
      <el-table-column
        prop="departmentName"
        min-width="100"
        label="业务部门"
      >
      </el-table-column>
      <el-table-column
        prop="createTime"
        width="180"
        label="创建日期">
        <template scope="scope">
          {{scope.row.createTime | formatTime}}
        </template>
      </el-table-column>
      <el-table-column
        prop="startDate"
        width="120"
        label="生效日期">
        <template scope="scope">
          {{scope.row.startDate | formatDate}}
        </template>
      </el-table-column>
      <el-table-column
        prop="endDate"
        width="120"
        label="终止日期">
        <template scope="scope">
          {{scope.row.endDate | formatDate}}
        </template>
      </el-table-column>
      <el-table-column
        prop="usedCount"
        width="100"
        label="使用次数">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  import {routerNames} from '@/core/consts'
  import supportModel from '@/api/support'
  import comLoading from '@/mixins/comLoading'
  import {formatTime, formatDate, formatTimeStamp} from '@/filters/moment'

  export default {
    mixins: [comLoading],
    data() {
      return {
        form: {
          keywords: '',
          templateType: null,
          templateCode: '',
          startTime: '',
          endTime: '',
          operatorName: '',
          valid: true
        },
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
      see(index, row) {
        console.log(row)
        this.$router.push({
          name: routerNames.con_tpl_see,
          query: {
            id: row.id
          }
        })
      },
      formatDateRange(value) {
        const daterange = value.split(' ')
        this.daterange = [daterange[0], daterange[2]]
        this.form.startTime = formatTimeStamp(daterange[0])
        this.form.endTime = formatTimeStamp(daterange[2])
      }
    },
    filters: {
      formatDate,
      formatTime
    },
    created() {
      this.getList()
    }
  }
</script>
