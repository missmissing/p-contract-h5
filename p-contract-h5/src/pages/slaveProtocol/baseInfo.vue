<template>
  <div>
    <el-form label-width="100px">
      <el-row :gutter="20">
        <el-col :span="8" v-if="protocolNo">
          <el-form-item prop="protocolNo" label="从协议编号">
            <el-input v-model="protocolNo" :disabled="true"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8" v-if="code">
          <el-form-item prop="code" label="关联合同编号">
            <el-input v-model="code" :disabled="true"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <SupplierInfo :items="baseInfoForm.tableSupplierInfo" :disabled="true" class="mb20"></SupplierInfo>
    <SubjectInfo :items="baseInfoForm.conSubjctName" :disabled="true" class="mb20"></SubjectInfo>
    <el-form ref="form" :model="baseInfoForm" label-width="100px" :rules="rules">
      <el-row>
        <el-col :span="16">
          <el-form-item label="盖章次序">
            <el-radio-group v-model="baseInfoForm.radioSealOrder" :disabled="disabled">
              <el-radio :label="1">对方先盖章</el-radio>
              <el-radio :label="0">我方先盖章</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item v-if="baseInfoForm.radioSealOrder==0">
        <el-input type="textarea" :rows="4" placeholder="请输入原因" v-model="baseInfoForm.sealReason" :disabled="disabled"></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import {mapState} from 'vuex'

  import SupplierInfo from './supplierInfo.vue'
  import SubjectInfo from './subjectInfo.vue'

  export default {
    name: 'base-info',
    props: {
      baseInfoForm: Object,
      protocolNo: String,
      code: String
    },
    data () {
      return {
        rules: {
          sealReason: [{required: true, message: '请输入原因'}]
        }
      }
    },
    computed: {
      ...mapState(['pageStatus']),
      disabled () {
        return this.pageStatus !== 1
      }
    },
    methods: {
      valid () {
        let flag = false
        this.$refs.form.validate((valid) => {
          if (valid) {
            flag = true
          }
        })
        return flag
      }
    },
    components: {
      SupplierInfo,
      SubjectInfo
    }
  }
</script>

<style type="text/scss" lang="scss" scoped>

</style>
