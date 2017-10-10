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
          <el-form-item label="合同模式" prop="contractType">
            <el-select
              v-model="form.contractType"
              placeholder="请选择合同模式"
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
          <el-form-item label="业务类型" prop="conTypeName">
            <el-input readonly placeholder="请选择业务类型" @focus="visible=true" v-model="form.conTypeName"></el-input>
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
          <el-form-item label="从协议编号">
            <el-input v-model="form.agreenmentId" placeholder="请输入从协议编号"></el-input>
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
      <el-table-column type="index" label="序号" width="80"></el-table-column>
      <el-table-column prop="id" label="合同编号" min-width="200px">
        <template scope="scope">
          <router-link class="router-link" :to="{path:'/ConCreate/conCheck', query:{contractId:''+tableData[scope.$index].id}}">
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
      <el-table-column prop="submitTime" label="创建日期" width="120">
        <template scope="scope">
          {{scope.row.submitTime | formatDate}}
        </template>
      </el-table-column>
      <el-table-column prop="approvalDate" label="批准日期" width="120">
        <template scope="scope">
          {{scope.row.approvalDate | formatDate}}
        </template>
      </el-table-column>
      <el-table-column prop="sealTime" label="盖章日期" width="120">
        <template scope="scope">
          {{scope.row.sealTime | formatDate}}
        </template>
      </el-table-column>
      <el-table-column prop="startTime" label="生效日期" width="120">
        <template scope="scope">
          {{scope.row.startTime | formatDate}}
        </template>
      </el-table-column>
      <el-table-column prop="endTime" label="终止日期" width="120">
        <template scope="scope">
          {{scope.row.endTime | formatDate}}
        </template>
      </el-table-column>
      <el-table-column prop="contractStatusName" label="合同状态" width="120"></el-table-column>
      <el-table-column prop="slaveProtocolNo" label="从协议编号" width="120"></el-table-column>
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
    <TreeModal
      nodeKey="id"
      title="选择业务类型"
      :visible.sync="visible"
      :regions="regions"
      :defaultProps="defaultProps"
      @ok="setBusiType"
      v-on:close="closeTree">
    </TreeModal>
  </div>
</template>

<script>
  import Api from '@/api/manageContract'
  import TreeModal from '@/components/treeModal.vue'
  import getBusiType from '@/mixins/getBusiType'
  import {formatDate} from '@/filters/moment'

  export default {
    mixins: [getBusiType],
    data() {
      return {
        visible: false,
        defaultProps: {
          children: 'children',
          label: 'businessName'
        },
        form: {
          contractNo: '',
          contractName: '',
          contractTextType: '',
          conTypeName: '', // 业务类型名
          conTypeId: '', // 业务类型id
          contractType: '', // 合同模式
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
          opratorLoading: false,
          pageNo: 1,
          pageSize: 10
        },
        conModels: [
          {id: '1', name: '单一合同'},
          {id: '2', name: '简易合同'},
          {id: '3', name: '框架合同'},
          {id: '4', name: '框架意向合同'}
        ],
        tableData: [],
        creators: [],
        loading: false,

        totalPage: 0
      }
    },
    watch: {},
    methods: {
      search() {
        this.loading = true
        Api.getConList(this.form).then((data) => {
          const dataMap = data.data.dataMap
          if (dataMap) {
            this.tableData = dataMap.data
            this.totalPage = dataMap.total
          }
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
      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`)
        this.form.pageSize = val
        this.search()
      },
      handleCurrentChange(page) {
        this.form.pageNo = page
        this.search()
      },
      setBusiType(checkNodes, tree) {
        const ids = []
        const names = []
        if (checkNodes.length) {
          for (let i = 0, len = checkNodes.length; i < len; i++) {
            ids.push(checkNodes[i].id)
            names.push(checkNodes[i].businessName)
          }
        }
        this.form.conTypeId = ids.join('-')
        this.form.conTypeName = names.join('-')

        this.visible = false
      },
      closeTree() {
        this.visible = false
      }
    },
    components: {
      TreeModal
    },
    mounted() {
      this.search()
    },
    filters: {
      formatDate
    }
  }
</script>
