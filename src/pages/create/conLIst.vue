<template>
  <div class="pd20"
       v-loading="loading"
       element-loading-text="拼命加载中">
    <el-form class="mb20" ref="form" :model="form" label-width="100px">
      <el-row>
        <el-col :span="7">
          <el-form-item label="合同编号">
            <el-input v-model="form.contractCode"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="14">
          <el-form-item label="合同名称">
            <el-input v-model="form.contractName"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="7">
          <el-form-item label="合同模式">
            <el-select
              v-model="form.contractPattern"
              placeholder="请选择"
              class="wp100">
              <el-option label="合同模板" value="1"></el-option>
              <el-option label="合同文本" value="2"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="7">
          <el-form-item label="合同类型">
            <el-select
              v-model="form.contractType"
              placeholder="请选择"
              class="wp100">
              <el-option label="合同模板" value="1"></el-option>
              <el-option label="合同文本" value="2"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="7">
          <el-form-item label="采购订单">
            <el-input v-model="form.pr"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="7">
          <el-form-item label="发起人">
            <el-input v-model="form.initiator"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="7">
          <el-form-item label="业务经办人">
            <el-input v-model="form.busiController"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="7">
          <el-form-item label="业务部门">
            <el-input v-model="form.busiApartment"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="7">
          <el-form-item label="创建时间">
            <el-date-picker
              style="width:100%;"
              v-model="form.daterange"
              type="daterange"
              placeholder="选择日期范围"
              @change="formatDateRange">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="7">
          <el-form-item label="有效文本">
            <el-switch v-model="form.valid"></el-switch>
            <el-button type="primary" @click="search" style="margin-left:30px;">搜 索</el-button>
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
        type="index"
        label="序号"
        width="80">
      </el-table-column>
      <el-table-column
        prop="createDate"
        label="日期"
        width="120">
      </el-table-column>
      <el-table-column
        prop="owner"
        label="创建人"
        width="100">
      </el-table-column>
      <el-table-column prop="conTypeName" label="合同类型"></el-table-column>
      <el-table-column prop="conModelName" label="合同模式"></el-table-column>
      <el-table-column
        prop="conCode"
        label="合同编号">
        <template scope="scope">
          <router-link :to="{path:'/ConCreate/conCheck', query:{operateType: 'query',currentPr:''+tableData[scope.$index].pr,curConModelId:''+tableData[scope.$index].curConModelId,curConTypeId:''+tableData[scope.$index].conTypeId}}">
            {{tableData[scope.$index].conCode}}
          </router-link>
        </template>
      </el-table-column>
      <el-table-column
        prop="pr"
        label="PR">
      </el-table-column>
      <el-table-column
        prop="materialCode"
        label="物料编码">
      </el-table-column>
      <el-table-column
        prop="price"
        label="单价"
        width="100"
      >
      </el-table-column>
      <el-table-column
        prop="counts"
        label="数量"
        width="100">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  import performanceModel from '@/api/performance'

  export default {
    data() {
      return {
        form: {
          contractCode: '',
          contractName: '',
          contractPattern: '',
          contractType: '',
          pr: '',
          initiator: '',
          busiController: '',
          daterange: [],
          valid: true
        },
        tableData: [],
        loading: false
      }
    },
    watch: {
      dialogVisible() {
        if (!this.dialogVisible) {
          this.stopData.endDate = ''
          this.stopData.reason = ''
        }
      }
    },
    methods: {
      search() {
        console.log('搜索')
        console.log(JSON.stringify(this.form))
      },
      getList() {
        this.loading = true
        performanceModel.getConList({}).then((res) => {
          this.tableData = res.data.dataMap
          this.loading = false
        })
      },
      formatDateRange(value) {
        const daterange = value.split(' ')
        this.form.daterange = [daterange[0], daterange[2]]
      }
    },
    created() {
      this.getList()
    }
  }
</script>
