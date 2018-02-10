<template>
  <div>
    <FileList v-if="cardSealInfoForm.others.length" :items="cardSealInfoForm.others" class="mb20"></FileList>
    <div v-if="baseInfoForm.templateId">
      <el-form rel="cardSealInfoForm" :model="cardSealInfoForm" label-width="100px" :rules="cardSealInfoForm.rules">
        <el-row>
          <el-col :span="6">
            <el-form-item label="用章次数" prop="sealNumber">
              <el-input-number size="small" :disabled="true" v-model="cardSealInfoForm.sealNumber" :min="1" :max="10" class="wp100"></el-input-number>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="打印份数" prop="printNumber">
              <el-input-number :disabled="timesDisabled" size="small" :min="1" :max="10" v-model="cardSealInfoForm.printNumber" class="wp100"></el-input-number>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="留存份数" prop="remainNumber">
              <el-input-number :disabled="timesDisabled" size="small" :min="1" :max="10" v-model="cardSealInfoForm.remainNumber" class="wp100"></el-input-number>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="选择用章" prop="sealUsedInfo">
              <el-checkbox-group :disabled="!isCreate" v-model="cardSealInfoForm.sealUsedInfo">
                <el-checkbox label="1" name="sealInfo">公章</el-checkbox>
                <el-checkbox label="2" name="sealInfo">法人章</el-checkbox>
              </el-checkbox-group>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <SealTable v-if="cardSealInfoForm.contract.length" :items="cardSealInfoForm.contract" :backLogCreator="backLogCreator" :tplType="baseInfoForm.contractTextType" class="mb20"></SealTable>
      <AgreementInfo :items="cardSealInfoForm.agreenments" class="mt20"></AgreementInfo>
    </div>
    <h4 v-else>请选择合同基本信息的模板名称！</h4>
  </div>
</template>

<script>
  import FileList from './fileList.vue'
  import SealTable from './sealTable.vue'
  import AgreementInfo from './agreementInfo.vue'

  export default {
    name: 'file-info',
    props: {
      cardSealInfoForm: Object,
      disabled: Boolean
    },
    components: {
      FileList,
      SealTable,
      AgreementInfo
    }
  }
</script>

<style type="text/scss" lang="scss" scoped>

</style>
