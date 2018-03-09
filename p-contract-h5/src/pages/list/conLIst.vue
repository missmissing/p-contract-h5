<style scoped>

</style>
<template>
  <div class="pt20 pb20" v-loading="loading" element-loading-text="拼命加载中">
    <el-form class="mb20" ref="form" :model="form" label-width="100px">
      <el-row>
        <el-col :span="8">
          <el-form-item label="合同编号">
            <el-input v-model="form.contractNo" placeholder="请输入合同编号"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="合同模式" prop="contractType">
            <el-select clearable v-model="form.contractType" placeholder="请选择合同模式" class="wp100">
              <el-option v-for="item in conModels" :key="item.id" :value="item.id" :label="item.name"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="业务类型" prop="conTypeName">
            <el-input readonly placeholder="请选择业务类型" v-model="conTypeName" clearable @focus="visible=true">
              <i class="el-icon-error" @click="handleConTypeName" slot="suffix"></i>
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="采购订单">
            <el-input v-model="form.purchaseOrder" placeholder="请输入采购订单号"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="发起人" prop="creator">
            <el-input v-model="form.creator" placeholder="请输入发起人"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="业务申请人" prop="businessOperatorName">
            <el-input v-model="form.businessOperatorName" placeholder="请输入业务申请人"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="创建时间">
            <el-date-picker style="width:100%;" v-model="daterange" type="daterange" :editable="false" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="从协议编号">
            <el-input v-model="form.protocolNo" placeholder="请输入从协议编号"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="合同名称">
            <el-input v-model="form.contractName" placeholder="请输入合同名称"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="比价单号">
            <el-input v-model="form.prNo" placeholder="请输入比价单号"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="供应商名称/编码" prop="supplierCode" label-width="150px">
            <el-select class="wp100" clearable v-model="form.supplierCode" filterable remote placeholder="请输入关键词搜索" :remote-method="getRemoteSuppliersByKeyWord" :loading="form.loading">
              <el-option v-for="item in form.suppliers" :key="item.companyCode" :label="item.company" :value="item.companyCode">
                <span class="fl">{{ item.companyCode }}</span>
                <span class="fr">{{ item.company }}</span>
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="有效合同">
            <el-switch v-model="form.effective1"></el-switch>
            <el-button type="primary" @click="search" style="margin-left:30px;">搜 索</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <el-table :data="tableData" border highlight-current-row class="wp100">
      <el-table-column prop="id" label="合同编号" width="140px">
        <template slot-scope="scope">
          <div class="router-link" @click="goToSee(scope.row)">
            {{tableData[scope.$index].contractNo}}
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="id" label="流程id" width="100px">
        <template slot-scope="scope">
          <div v-if="[2,4].indexOf(scope.row.contractType)>-1||!scope.row.procCode">自动创建</div>
          <div class="router-link" @click="goToProcess(scope.row)" v-else>
            {{scope.row.procInstId}}
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="contractTextType" label="文本类型" width="100px">
        <template slot-scope="scope">
          {{getContractTextType(tableData[scope.$index].contractTextType)}}
        </template>
      </el-table-column>
      <el-table-column prop="contractType" label="合同模式" width="130px">
        <template slot-scope="scope">
          {{getContractModel(tableData[scope.$index].contractType)}}
        </template>
      </el-table-column>
      <el-table-column prop="creator" label="发起人" width="100"></el-table-column>
      <el-table-column prop="businessOperatorName" label="经办人" width="100"></el-table-column>
      <el-table-column prop="businessDeptName" label="业务部门" min-width="180"></el-table-column>
      <el-table-column prop="approvalDate" label="创建日期" width="120">
        <template slot-scope="scope">
          {{scope.row.approvalDate | formatDate}}
        </template>
      </el-table-column>
      <el-table-column prop="startTime" label="生效日期" width="120">
        <template slot-scope="scope">
          {{scope.row.startTime | formatDate}}
        </template>
      </el-table-column>
      <el-table-column prop="endTime" label="终止日期" width="120">
        <template slot-scope="scope">
          {{scope.row.endTime | formatDate}}
        </template>
      </el-table-column>
      <el-table-column prop="totalAmount" label="合同总金额" width="110"></el-table-column>
      <el-table-column prop="contractStatusName" label="合同状态" width="120"></el-table-column>
      <el-table-column prop="haveProtocol" label="从协议" width="80">
        <template slot-scope="scope">
          {{scope.row.haveProtocol ? '有' : ''}}
        </template>
      </el-table-column>
    </el-table>
    <div class="clearfix mt20 mb20">
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
  import Api from '../../api/manageContract/index'
  import {routerNames} from '../../core/consts'
  import TreeModal from '../../components/treeModal.vue'
  import getBusiType from '../../mixins/getBusiType'
  import {formatDate} from '../../filters/moment'
  import toPage from '../../assets/js/toPage'

  export default {
    mixins: [getBusiType],
    data () {
      return {
        visible: false,
        defaultProps: {
          children: 'children',
          label: 'businessName'
        },
        form: {
          contractName: '',
          contractNo: '',
          businessType: [], // 业务类型id
          contractType: '', // 合同模式
          purchaseOrder: '',
          protocolNo: '',
          creator: '',
          businessOperatorName: '',
          createStart: '',
          createEnd: '',
          effective1: true,
          suppliers: [],
          loading: false,
          supplierCode: '',
          prNo: '',
          pageNo: 1,
          pageSize: 10
        },
        conModels: [
          {id: '1', name: '单一合同'},
          {id: '2', name: '固定格式合同'},
          {id: '3', name: '框架协议'},
          {id: '4', name: '框架意向合同'}
        ],
        conTypeName: '', // 业务类型名
        daterange: [],
        tableData: [],
        creators: [],
        loading: false,
        totalPage: 0
      }
    },
    watch: {},
    methods: {
      search () {
        this.loading = true
        this.form.createStart = formatDate(this.daterange[0])
        this.form.createEnd = formatDate(this.daterange[1])
        Api.getConList(this.form).then((data) => {
          const dataMap = data.data.dataMap
          if (dataMap) {
            this.tableData = dataMap.data
            this.totalPage = dataMap.total
          }
          this.loading = false
        }).catch(() => {
          this.loading = false
        })
      },
      handleConTypeName () {
        this.form.businessType = []
        this.conTypeName = ''
      },
      getContractTextType (id) {
        switch (id) {
          case 1:
            return '合同模板'
          case 2:
            return '合同文本'
          default:
            return ''
        }
      },
      getContractModel (id) {
        switch (id) {
          case 1:
            return '单一合同'
          case 2:
            return '固定格式合同'
          case 3:
            return '框架协议'
          case 4:
            return '框架意向合同'
          default:
            return ''
        }
      },
      handleSizeChange (val) {
        this.form.pageSize = val
        this.search()
      },
      handleCurrentChange (page) {
        this.form.pageNo = page
        this.search()
      },
      setBusiType (checkNodes) {
        const ids = []
        const names = []
        if (checkNodes.length) {
          for (let i = 0, len = checkNodes.length; i < len; i++) {
            ids.push(checkNodes[i].id)
            names.push(checkNodes[i].businessName)
          }
        }
        this.form.businessType = [ids[2]]
        this.conTypeName = names.join('-')

        this.visible = false
      },
      closeTree () {
        this.visible = false
      },
      getRemoteSuppliersByKeyWord (query) {
        if (query !== '') {
          this.form.loading = true
          Api.getRemoteSuppliersByKeyWord({key: query})
            .then((data) => {
              this.form.loading = false
              this.form.suppliers = data.data.dataMap
            })
        } else {
          this.form.suppliers = []
        }
      },
      goToSee (row) {
        this.$router.push({
          name: routerNames.con_Check,
          query: {
            contractNo: row.contractNo,
            pageStatus: 3
          }
        })
      },
      goToProcess (row) {
        toPage.call(this, row)
      }
    },
    components: {
      TreeModal
    },
    mounted () {
      this.search()
    },
    filters: {
      formatDate
    }
  }
</script>
