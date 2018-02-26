<template>
  <el-form ref="form" :model="cardSealInfoForm" label-width="100px">
    <el-row>
      <el-col :span="6">
        <el-form-item label="用章次数" prop="sealNumber">
          <el-input-number :disabled="true" size="small" :min="1" :max="10" v-model="cardSealInfoForm.sealNumber" class="wp100"></el-input-number>
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item label="打印份数" prop="printNumber">
          <el-input-number :disabled="disabled" size="small" :min="1" :max="10" v-model="cardSealInfoForm.printNumber" class="wp100"></el-input-number>
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item label="留存份数" prop="remainNumber">
          <el-input-number :disabled="disabled" size="small" :min="1" :max="10" v-model="cardSealInfoForm.remainNumber" class="wp100"></el-input-number>
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item label="选择用章" prop="sealUsedInfo">
          <el-checkbox-group :disabled="disabled" v-model="cardSealInfoForm.sealUsedInfo">
            <el-checkbox label="1" name="sealInfo">公章</el-checkbox>
            <el-checkbox label="2" name="sealInfo">法人章</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>
</template>

<script>
  export default {
    name: 'seal-condition-form',
    props: {
      cardSealInfoForm: Object,
      disabled: Boolean
    }
  }
</script>

<style type="text/scss" lang="scss" scoped>

</style>
