<template>
  <div class="pd20" v-loading="loading" element-loading-text="拼命加载中">
    <el-form class="mb20" ref="form" :model="form" label-width="100px">
      <el-row>
        <el-col :span="7">
          <el-form-item label="合同编号">
            <el-input v-model="form.contractNo" placeholder="请输入合同编号"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="14">
          <el-form-item label="合同名称">
            <el-input v-model="form.contractName" placeholder="请输入合同名称"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="7">
          <el-form-item label="合同模式">
            <el-select
              v-model="form.contractTextType"
              placeholder="请选择合同模式"
              class="wp100">
              <el-option label="合同模板" value="1"></el-option>
              <el-option label="合同文本" value="2"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="7">
          <el-form-item label="合同类型" prop="conTypeName">
            <el-select
              v-model="form.contractType"
              placeholder="请选择合同类型"
              class="wp100"
            >
              <el-option
                v-for="item in conModels"
                :key="item.id"
                :value="item.id"
                :label="item.name"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="7">
          <el-form-item label="采购订单">
            <el-input v-model="form.purchaseOrder" placeholder="请输入采购订单号"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="7">
          <el-form-item label="发起人" prop="creatorName">
            <el-select
              size="small"
              v-model="form.creatorId"
              filterable
              remote
              placeholder="请输入发起人"
              :remote-method="getRemoteCreatorsByKeyWord"
              :loading="form.loading"
              @change="handleCreatorChange">
              <el-option
                v-for="item in form.creators"
                :key="item.userId"
                :label="item.userName"
                :value="item.userId">
                <span style="float: left">{{ item.userName }}</span>
                <span style="float: right; color: #8492a6; font-size: 13px">{{ item.deptName }}</span>
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="7">
          <el-form-item label="业务经办人" prop="businessOperator">
            <el-select
              size="small"
              v-model="form.businessOperatorId"
              filterable
              remote
              placeholder="请输入发起人"
              :remote-method="getRemoteOperatorsByKeyWord"
              :loading="form.opratorLoading"
              @change="handleOperatorChange">
              <el-option
                v-for="item in form.operators"
                :key="item.userId"
                :label="item.userName"
                :value="item.userId">
                <span style="float: left">{{ item.userName }}</span>
                <span style="float: right; color: #8492a6; font-size: 13px">{{ item.deptName }}</span>
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="7">
          <el-form-item label="业务部门">
            <el-input :disabled="true" v-model="form.businessDept" placeholder="请输入业务部门"></el-input>
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
          <el-form-item label="有效合同">
            <el-switch v-model="form.effective1"></el-switch>
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
      <el-table-column type="index" label="序号" width="70"></el-table-column>
      <el-table-column prop="contractNo" label="合同编号" width="150px">
        <template scope="scope">
          <router-link :to="{path:'/ConCreate/conCheck', query:{operateType: 'query',contractNo:''+tableData[scope.$index].contractNo,currentPr:''+tableData[scope.$index].prNo,curConModelId:''+tableData[scope.$index].contractType}}">
            {{tableData[scope.$index].contractNo}}
          </router-link>
        </template>
      </el-table-column>
      <el-table-column prop="contractTextType" label="合同文本类型" width="150px">
        <template scope="scope">
          {{getContractTextType(tableData[scope.$index].contractTextType)}}
        </template>
      </el-table-column>
      <el-table-column prop="contractType" label="合同模式" width="100px">
        <template scope="scope">
          {{getContractModel(tableData[scope.$index].contractType)}}
        </template>
      </el-table-column>
      <el-table-column prop="creator" label="发起人" width="100"></el-table-column>
      <el-table-column prop="businessDept" label="业务部门" width="100"></el-table-column>
      <el-table-column prop="businessOperator" label="经办人" width="100"></el-table-column>
      <el-table-column prop="submitTime" label="创建日期" width="120"></el-table-column>
      <el-table-column prop="approvalDate" label="批准日期" width="120"></el-table-column>
      <el-table-column prop="sealTime" label="盖章日期" width="120"></el-table-column>
      <el-table-column prop="startTime" label="生效日期" width="120"></el-table-column>
      <el-table-column prop="prNo" label="终止日期" width="120"></el-table-column>
      <el-table-column prop="contractStatusName" label="合同状态" width="120"></el-table-column>
      <el-table-column prop="slaveProtocolNo" label="从协议编号" width="120"></el-table-column>
    </el-table>
  </div>
</template>

<script>
  import Api from '@/api/manageContract'

  // document.cookie='sys=FFKHLEH21HEOFKLIEIMKHOFFKHKLHNM'

  export default {
    data() {
      return {
        form: {
          contractNo: '',
          contractName: '',
          contractTextType: '',
          contractType: '',
          purchaseOrder: '',
          creatorName: '',
          creatorId: '',
          businessOperator: '',
          businessOperatorId: '',
          createStart: '',
          createEnd: '',
          businessDept: '',
          effective1: true,
          daterange: [],
          loading: false,
          opratorLoading: false
        },
        conModels: [
          {id: '1', name: '单一合同'},
          {id: '2', name: '简易合同'},
          {id: '3', name: '框架合同'},
          {id: '4', name: '框架意向合同'}
        ],
        defaultProps: {
          children: 'children',
          label: 'businessName'
        },
        tableData: [],
        creators: [],
        loading: false
      }
    },
    watch: {},
    methods: {
      search() {
        this.loading = true

        Api.getConList(this.form).then((res) => {
          this.tableData = res.data.dataMap.data
          this.loading = false
        })
      },
      getContractTextType(id) {
        if (id) {
          switch (id) {
            case 1:
              return '模版合同'
            case 2:
              return '非模版合同'
          }
        }
      },
      getContractModel(id) {
        if (id) {
          switch (id) {
            case 1:
              return '单一合同'
            case 2:
              return '简易合同'
            case 3:
              return '框架合同'
            case 4:
              return '框架意向合同'
          }
        }
      },
      formatDateRange(value) {
        const daterange = value.split(' ')
        this.form.createStart = daterange[0]
        this.form.createEnd = daterange[2]
      },
      getRemoteCreatorsByKeyWord(query) {
        if (query !== '') {
          this.form.loading = true
          Api.getRemoteCreatePersonsByKeyWord({keyword: query})
            .then((data) => {
              this.form.loading = false
              this.form.creators = data.data.dataMap
            })
        } else {
          this.form.creators = []
        }
      },
      getRemoteOperatorsByKeyWord(query) {
        if (query !== '') {
          this.form.opratorLoading = true
          Api.getRemoteCreatePersonsByKeyWord({keyword: query})
            .then((data) => {
              this.form.opratorLoading = false
              this.form.operators = data.data.dataMap
            })
        } else {
          this.form.operators = []
        }
      },
      handleOperatorChange(val) {
        const operators = this.form.operators
        if (operators.length) {
          for (let i = 0, len = operators.length; i < len; i++) {
            if (val === operators[i].userId) {
              this.form.businessOperator = operators[i].userName
              this.form.businessDept = operators[i].deptName
            }
          }
        }
      },
      handleCreatorChange(val) {
        const creators = this.form.creators
        if (creators.length) {
          for (let i = 0, len = creators.length; i < len; i++) {
            if (val === creators[i].userId) {
              this.form.creatorName = creators[i].userName
            }
          }
        }
      }
    },
    created() {
      this.search()
    }
  }
</script>
