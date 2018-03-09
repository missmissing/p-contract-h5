<template>
  <el-form ref="form" :model="cardContentInfoForm" label-width="120px" :rules="disabled?{}:rules">
    <div class="mt20">
      <el-form-item label="生效条件" prop="effectiveCondition">
        <el-radio-group v-model="cardContentInfoForm.effectiveCondition" :disabled="disabled">
          <el-radio :label="1">附期限生效</el-radio>
          <el-radio :label="2">附条件生效</el-radio>
          <el-radio :label="3">签订生效</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-row v-if="ifTerm">
        <el-col :span="8">
          <el-form-item label="合同生效日期" prop="startTime">
            <el-date-picker v-model="cardContentInfoForm.startTime" format="yyyy-MM-dd" value-format="timestamp" :disabled="disabled" placeholder="合同生效日期" type="date"
                            @change="emitValid"></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="合同终止日期" prop="endTime">
            <el-date-picker v-model="cardContentInfoForm.endTime" format="yyyy-MM-dd" value-format="timestamp" :disabled="disabled" placeholder="合同终止日期" type="date" @change="emitValid"></el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row v-if="ifCondition">
        <el-form-item prop="conditionDesc" class="mr20" label="备注">
          <el-input :disabled="disabled" @input="emitValid" v-model="cardContentInfoForm.conditionDesc" type="textarea" :rows="4"></el-input>
        </el-form-item>
      </el-row>
    </div>
  </el-form>
</template>

<script>
  import {mapState} from 'vuex'

  import bus from '../../core/bus'

  export default {
    name: 'effective-condition-form',
    props: {
      cardContentInfoForm: Object
    },
    data () {
      return {
        rules: {
          startTime: [{
            required: true, message: '请输入合同生效日期'
          }, {
            validator: (rule, value, callback) => {
              const endTime = this.cardContentInfoForm.endTime
              if (endTime && value > endTime) {
                callback(new Error('合同终止日期必须大于合同生效日期'))
              }
              callback()
            },
            trigger: 'change'
          }],
          endTime: [{
            required: true, message: '请输入合同截止日期'
          }, {
            validator: (rule, value, callback) => {
              const startTime = this.cardContentInfoForm.startTime
              if (startTime && value < startTime) {
                callback(new Error('合同终止日期必须大于合同生效日期'))
              }
              callback()
            },
            trigger: 'change'
          }],
          effectiveCondition: [{required: true, message: '请选择生效条件'}],
          conditionDesc: [{required: true, message: '请输入附期限生效信息'}]
        }
      }
    },
    computed: {
      ...mapState(['pageStatus']),
      disabled () {
        return this.pageStatus !== 1
      },
      // 附期限生效
      ifTerm () {
        return this.cardContentInfoForm.effectiveCondition === 1
      },
      // 附条件生效
      ifCondition () {
        return this.cardContentInfoForm.effectiveCondition === 2
      }
    },
    methods: {
      // 触发顶级校验
      emitValid () {
        bus.$emit('contentInfoValid')
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
