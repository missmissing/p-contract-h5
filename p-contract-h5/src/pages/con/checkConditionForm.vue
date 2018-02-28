<template>
  <el-form ref="form" :model="cardContCheckInfoForm" label-width="130px" :rules="disabled?{}:rules">
    <el-row :gutter="20">
      <el-col :span="8">
        <el-form-item label="验收责任人">
          <el-input class="wp100" :disabled="true" v-model="cardContCheckInfoForm.responsibleName" placeholder="请输入验收责任人"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="验收责任人部门">
          <el-input :disabled="true" v-model="cardContCheckInfoForm.responsibleDeptName" placeholder="请输入验收责任人部门"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8" v-if="ifServiceCheck">
        <el-form-item prop="checkType" label="服务类验收方式">
          <el-select :disabled="disabled" v-model="cardContCheckInfoForm.checkType" placeholder="请选择服务类验收方式" @change="emitValid">
            <el-option v-for="item in checkServiceMethods" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
    </el-row>
    <el-form-item prop="haveSample" label="是否有样品">
      <el-radio-group v-model="cardContCheckInfoForm.haveSample" :disabled="disabled">
        <el-radio :label="true">是</el-radio>
        <el-radio :label="false">否</el-radio>
      </el-radio-group>
    </el-form-item>
  </el-form>
</template>

<script>
  import {mapState} from 'vuex'

  import bus from '../../core/bus'

  export default {
    name: 'check-condition-form',
    props: {
      cardContCheckInfoForm: Object,
      cardContentInfoForm: Object,
      baseInfoForm: Object
    },
    data () {
      return {
        checkServiceMethods: [{
          id: 1, name: '收货验收'
        }, {
          id: 2, name: '按阶段验收'
        }],
        rules: {
          checkType: [{required: true, message: '请选择服务类验收方式'}]
        }
      }
    },
    computed: {
      ...mapState(['pageStatus']),
      disabled () {
        return this.pageStatus !== 1
      },
      // 是否显示服务类验收方式，服务类验收事项
      ifServiceCheck () {
        const exist = this.cardContentInfoForm.conStandard.some(item => !!item.materialCode)
        return !exist && this.baseInfoForm.contractBusinessTypeFirst === 2
      }
    },
    methods: {
      // 触发顶级校验
      emitValid () {
        bus.$emit('checkInfoValid')
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
