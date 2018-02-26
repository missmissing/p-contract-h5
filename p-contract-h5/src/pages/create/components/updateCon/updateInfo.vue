<template>
  <el-form ref="updateForm" :model="updateForm" label-width="100px" :rules="rules">
    <el-row :gutter="20">
      <el-col :span="8">
        <el-form-item label="合同编号" prop="code">
          <el-input v-model="updateForm.code" placeholder="请输入合同编号"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="4">
        <el-button type="primary" @click="search">查找</el-button>
      </el-col>
    </el-row>
    <el-form-item label="变更原因" prop="remark">
      <el-input v-model="updateForm.remark" placeholder="变更原因" type="textarea" :rows="4"></el-input>
    </el-form-item>
  </el-form>
</template>

<script>
  import bus from '../../../../core/bus'
  import Api from '../../../../api/manageContract/index'

  export default {
    name: 'update-info',
    props: {
      updateForm: Object,
      visible: Boolean
    },
    data () {
      return {
        rules: {
          code: [{required: true, message: '请输入合同编号'}],
          remark: [{required: true, message: '请输入变更原因'}]
        }
      }
    },
    methods: {
      search () {
        const params = {
          contractNo: this.updateForm.code,
          operate: 'ALTER'
        }
        // 根据合同编号获取合同模式设置当前合同模式及业务类型
        Api.getContractDetailByNo(params).then((res) => {
          const data = res.data.dataMap
          if (data) {
            bus.$emit('initData', data)
            this.$emit('update:visible', true)
          }
        })
      },
      valid () {
        let errorCount = 0
        this.$refs.updateForm.validate((valid) => {
          if (!valid) {
            errorCount++
            this.$message.warning('请填写变更原因再提交！')
          }
        })
        return !errorCount
      }
    }
  }
</script>

<style type="text/scss" lang="scss" scoped>

</style>
