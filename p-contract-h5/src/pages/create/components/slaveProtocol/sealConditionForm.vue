<template>
  <el-form ref="form" :model="cardSealInfoForm" label-width="100px" :rules="disabled?{}:rules">
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
          <el-checkbox-group :disabled="disabled" v-model="cardSealInfoForm.sealUsedInfo" @change="emitValid">
            <el-checkbox label="1" name="sealInfo">公章</el-checkbox>
            <el-checkbox label="2" name="sealInfo">法人章</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>
</template>

<script>
  import {mapState} from 'vuex'

  import bus from '../../../../core/bus'

  export default {
    name: 'seal-condition-form',
    props: {
      cardSealInfoForm: Object
    },
    data () {
      return {
        rules: {
          sealUsedInfo: [{required: true, message: '请选择用章'}]
        }
      }
    },
    computed: {
      ...mapState(['pageStatus']),
      disabled () {
        return this.pageStatus !== 1 // mixins
      }
    },
    methods: {
      // 触发顶级校验
      emitValid () {
        if (this.pageStatus === 1) { // mixins
          bus.$emit('sealInfoValid')
        }
      },
      valid () {
        let flag = true
        this.$refs.form.validate((valid) => {
          flag = valid
        })
        return flag
      }
    }
  }
</script>

<style type="text/scss" lang="scss" scoped>

</style>
