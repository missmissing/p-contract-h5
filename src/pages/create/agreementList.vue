<style scope="scope">
  /*.agreementList table{width:100%!important}*/
</style>
<template>
  <div class="agreementList">
    <el-card>
      <el-form ref="agreementForm" :model="agreementForm" :rules="agreementForm.rules" label-width="100px">
        <el-row>
          <el-col :span="8">
            <el-form-item prop="id" label="从协议编号">
              <el-input v-model="agreementForm.id" placeholder="请输入从协议编号"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="供应商名称" prop="supplierName">
              <el-select
                style="width:236px;height:36px"
                size="small"
                v-model="agreementForm.supplierName"
                filterable
                remote
                placeholder="请输入关键词搜索"
                :remote-method="getRemoteSuppliersByKeyWord"
                :loading="agreementForm.loading">
                <el-option
                  v-for="item in agreementForm.suppliers"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="公司名称" prop="companyName">
              <el-select
                style="width:236px;height:36px"
                v-model="agreementForm.companyName"
                filterable
                remote
                placeholder="请输入关键词搜索"
                :remote-method="getRemoteCompanyByKeyWord"
                :loading="agreementForm.agreementLoading">
                <el-option
                  v-for="item in agreementForm.companies"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8" :offset="2">
            <el-button size="large" type="primary" @click="handleQuery('agreementForm')">查找</el-button>
          </el-col>
        </el-row>
      </el-form>
    </el-card>
    <el-card v-if="agreementList.length" >
      <el-table :data="agreementList" style="width:100%">
        <el-table-column type="index"></el-table-column>
        <el-table-column prop="contractId" label="合同号"></el-table-column>
        <el-table-column prop="id" label="从协议编码"></el-table-column>
        <el-table-column prop="name" label="从协议名称"></el-table-column>
        <el-table-column prop="createPerson" label="发起人"></el-table-column>
        <el-table-column prop="createDepart" label="发起部门"></el-table-column>
        <el-table-column prop="createTime" label="发起时间"></el-table-column>
      </el-table>
    </el-card>

  </div>
</template>
<script>
  import Api from '../../api/manageContract'

  export default{
    data: function() {
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
          agreementLoading: false
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
              this.agreementForm.suppliers = data.data.dataMap.list
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
              this.agreementForm.companies = data.data.dataMap.list
            })
        } else {
          this.agreementForm.companies = []
        }
      },
      handleQuery() {
        const agreementForm = this.agreementForm
        let params = {}
        params.id = agreementForm.id
        params.supplierId = agreementForm.supplierId
        params.companyId = agreementForm.companyId
        Api.getAgreementList(params)
          .then((data) => {
            this.agreementList = data.data.dataMap || []
          })
      }
    }
  }
</script>
