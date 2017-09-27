<style scope="scope">
  /*.agreementList table{width:100%!important}*/
</style>
<template>
  <div class="agreementList">
    <el-card>
      <el-form ref="agreementForm" :model="agreementForm" :rules="agreementForm.rules" label-width="100px">
        <el-row>
          <el-col :span="8">
            <el-form-item prop="id" label="从协议编号" label-width="150px">
              <el-input v-model="agreementForm.id" placeholder="请输入从协议编号"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="供应商名称/编码" prop="search" label-width="150px">
              <el-select
                size="small"
                v-model="agreementForm.supplierId"
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
            <el-form-item label="公司名称/编码" prop="companyId" label-width="150px">
              <el-select
                size="small"
                v-model="agreementForm.companyId"
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
            <el-form-item label="创建人" prop="createrId" label-width="150px">
              <el-select
                size="small"
                v-model="agreementForm.createrId"
                filterable
                remote
                placeholder="请输入创建人"
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
          <el-col :span="4" :offset="2">
            <el-button size="large" type="primary" @click="handleQuery('agreementForm')">查找</el-button>
          </el-col>
        </el-row>
      </el-form>
    </el-card>
    <el-card v-if="agreementList.length">
      <el-table :data="agreementList" style="width:100%">
        <el-table-column type="index"></el-table-column>
        <el-table-column prop="contractNo" label="从协议编码">
          <template scope="scope">
            <router-link :to="{path:'/ConCreate/querySlaveProtocol', query:{id:''+agreementList[scope.$index].id}}">
              {{agreementList[scope.$index].protocolNo}}
            </router-link>
          </template>
        </el-table-column>
        <el-table-column prop="creatorName" label="发起人"></el-table-column>
        <el-table-column prop="deptName" label="发起部门"></el-table-column>
        <el-table-column prop="createTime" label="发起时间"></el-table-column>
      </el-table>
    </el-card>
  </div>
</template>
<script>
  import Api from '../../api/manageContract'

  export default{
    data: function () {
      return {
        agreementForm: {
          id: '',
          suppliers: [],
          loading: false,
          supplierName: '',
          supplierId: '',
          companyName: '',
          companyId: '',
          companies: [],
          agreementLoading: false,
          creatorLoading: false,
          createrId: '',
          creators: [],
        },
        agreementList: []
      }
    },
    methods: {
      getRemoteSuppliersByKeyWord(query) {
        if (query !== '') {
          this.agreementForm.loading = true
          Api.getRemoteSuppliersByKeyWord({key: query})
            .then((data) => {
              this.agreementForm.loading = false
              this.agreementForm.suppliers = data.data.dataMap||[]
            })
        } else {
          this.agreementForm.suppliers = []
        }
      },
      getRemoteCompanyByKeyWord(query) {
        if (query !== '') {
          this.agreementForm.agreementLoading = true
          Api.getRemoteSubjectsByKeyWord({key: query})
            .then((data) => {
              this.agreementForm.agreementLoading = false
              this.agreementForm.companies = data.data.dataMap||[]
            })
        } else {
          this.agreementForm.companies = []
        }
      },
      handleQuery() {
        const agreementForm = this.agreementForm
        let params = {}
        params.protocolNo = agreementForm.id
        params.supplierName = agreementForm.supplierId
        params.conSubjctName = agreementForm.companyId
        params.creatorName = agreementForm.createrId
        Api.getAgreementList(params)
          .then((data) => {
            this.agreementList = data.data.dataMap || []
          })
      },
      getRemoteCreatorsByKeyWord(query){
        if (query !== '') {
          this.agreementForm.creatorLoading = true
          Api.getRemoteCreatePersonsByKeyWord({keyword: query})
            .then((data) => {
            this.agreementForm.creatorLoading = false
            this.agreementForm.creators = data.data.dataMap||[]
            })
        } else {
          this.agreementForm.creators = []
        }
      },
    }
  }
</script>
