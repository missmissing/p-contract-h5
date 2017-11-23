<style scope="scope">
  /*.agreementList table{width:100%!important}*/
</style>
<template>
  <div class="agreementList pd20">
    <el-form ref="agreementForm" :model="agreementForm" :rules="agreementForm.rules" label-width="150px">
      <el-row>
        <el-col :span="8">
          <el-form-item prop="id" label="从协议编号">
            <el-input class="wp100" v-model="agreementForm.protocolNo" placeholder="请输入从协议编号"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="合同编号">
            <el-input class="wp100" v-model="agreementForm.contractNo" placeholder="请输入合同编号"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="供应商名称/编码" prop="search">
            <el-select
              clearable
              class="wp100"
              v-model="agreementForm.supplierName"
              filterable
              remote
              placeholder="请输入关键词搜索"
              :remote-method="getRemoteSuppliersByKeyWord"
              :loading="agreementForm.loading">
              <el-option
                v-for="item in agreementForm.suppliers"
                :key="item.companyCode"
                :label="item.company"
                :value="item.companyCode">
                <span style="float: right">{{ item.company }}</span>
                <span style="float: left; color: #8492a6; font-size: 13px">{{ item.companyCode }}</span>
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="公司名称/编码" prop="conSubjctName">
            <el-select
              class="wp100"
              clearable
              v-model="agreementForm.conSubjctName"
              filterable
              remote
              placeholder="请输入关键词搜索"
              :remote-method="getRemoteCompanyByKeyWord"
              :loading="agreementForm.agreementLoading">
              <el-option
                v-for="item in agreementForm.companies"
                :key="item.companyCode"
                :label="item.company"
                :value="item.companyCode">
                <span style="float: right">{{ item.company }}</span>
                <span style="float: left; color: #8492a6; font-size: 13px">{{ item.companyCode }}</span>
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="发起人" prop="creatorName">
            <el-select
              class="wp100"
              clearable
              v-model="agreementForm.creatorName"
              filterable
              remote
              placeholder="请输入发起人"
              :remote-method="getRemoteCreatorsByKeyWord"
              :loading="agreementForm.creatorLoading">
              <el-option
                v-for="item in agreementForm.creators"
                :key="item.userId"
                :label="item.userName"
                :value="item.userId">
                <span style="float: left">{{ item.userName }}</span>
                <span style="float: right; color: #8492a6; font-size: 13px">{{ item.deptName }}</span>
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="4" :offset="1">
          <el-button type="primary" @click="handleQuery">查找</el-button>
        </el-col>
      </el-row>
    </el-form>
    <el-table :data="agreementList" border highlight-current-row style="width:100%">
      <el-table-column prop="protocolNo" label="从协议编码" width="210">
        <template scope="scope">
          <router-link class="router-link"
                       :to="{path:'/ConCreate/querySlaveProtocol', query:{id:''+agreementList[scope.$index].id}}">
            {{agreementList[scope.$index].protocolNo}}
          </router-link>
        </template>
      </el-table-column>
      <el-table-column prop="contractNo" label="合同编号" width="130"></el-table-column>
      <el-table-column prop="supplierId" label="供应商编码" width="125"></el-table-column>
      <el-table-column prop="supplierName" label="供应商名称" width="200"></el-table-column>
      <el-table-column prop="creatorName" label="发起人" width="100"></el-table-column>
      <el-table-column prop="deptName" label="发起部门"></el-table-column>
      <el-table-column prop="createTime" label="发起时间" width="120">
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
        :current-page="agreementForm.pageNo"
        :page-size="agreementForm.pageSize"
        :page-sizes="[10, 20, 30, 50]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalPage">
      </el-pagination>
    </div>
  </div>
</template>
<script>
  import Api from '@/api/manageContract'
  import {formatDate} from '@/filters/moment'

  export default {
    data: function () {
      return {
        agreementForm: {
          protocolNo: '',
          contractNo: '',
          suppliers: [],
          loading: false,
          supplierName: '',
          companyName: '',
          conSubjctName: '',
          companies: [],
          agreementLoading: false,
          creatorLoading: false,
          creatorName: '',
          creators: [],
          pageNo: 1,
          pageSize: 10
        },
        agreementList: [],
        totalPage: 0
      }
    },
    mounted: function () {
      this.handleQuery()
    },
    methods: {
      getRemoteSuppliersByKeyWord(query) {
        if (query !== '') {
          this.agreementForm.loading = true
          Api.getRemoteSuppliersByKeyWord({key: query})
            .then((data) => {
              this.agreementForm.loading = false
              this.agreementForm.suppliers = data.data.dataMap || []
            })
        } else {
          this.agreementForm.suppliers = []
        }
      },
      getRemoteCompanyByKeyWord(query) {
        if (query !== '') {
          this.agreementForm.agreementLoading = true
          Api.getRemoteSubjectsByKeyWord({key: query})
            .then((data)=>{
              this.agreementForm.agreementLoading = false
              this.agreementForm.companies = data.data.dataMap || []
            })
        } else {
          this.agreementForm.conSubjctName=''
          this.agreementForm.companies = []
        }
      },
      handleQuery() {
        const params = this.agreementForm
        Api.getAgreementList(params)
          .then((data) => {
            const dataMap = data.data.dataMap
            if (dataMap) {
              this.agreementList = dataMap.data || []
              this.totalPage = dataMap.total
            }
          })
      },
      getRemoteCreatorsByKeyWord(query) {
        if (query !== '') {
          this.agreementForm.creatorLoading = true
          Api.getRemoteCreatePersonsByKeyWord({keyword: query})
            .then((data) => {
              this.agreementForm.creatorLoading = false
              this.agreementForm.creators = data.data.dataMap || []
            })
        } else {
          this.agreementForm.creatorName=''
          this.agreementForm.creators = []
        }
      },
      handleSizeChange(val) {
        this.agreementForm.pageSize = val
        this.handleQuery()
      },
      handleCurrentChange(page) {
        this.agreementForm.pageNo = page
        this.handleQuery()
      }
    },
    filters: {
      formatDate
    }
  }
</script>
