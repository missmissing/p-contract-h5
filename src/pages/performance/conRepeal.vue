<style type="text/scss" lang="scss" scoped>
  .basic-info {

  }
</style>

<template>
  <div class="pd20">
    <div class="basic-info">
      <el-form :model="form" :rules="rules" ref="form" label-width="120px">
        <el-row>
          <el-col :span="8">
            <el-form-item label="合同编号">
              <el-input
                v-model="contractCode"
                icon="search"
                :on-icon-click="search"
                @keyup.enter.native="search">
              </el-input>
            </el-form-item>
          </el-col>
          <el-button type="primary" class="ml20" v-show="toDetail.query.contractId">
            <router-link class="router-link-default" :to="toDetail" target="_blank">详 情</router-link>
          </el-button>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="合同签署日期">
              <el-input :value="approvalDate | formatDate" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8" :offset="1">
            <el-form-item label="合同状态">
              <el-input :value="contractStatusName" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="合同生效日期">
              <el-input :value="startTime | formatDate" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8" :offset="1">
            <el-form-item label="合同截止日期">
              <el-input :value="endTime | formatDate" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="合同中止原因" prop="suspendReason">
              <el-select
                class="wp100"
                v-model="form.suspendReason"
                placeholder="请选择">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8" :offset="1">
            <el-form-item label="实际中止日期" prop="suspendTime">
              <el-date-picker
                style="width:100%;"
                v-model="form.suspendTime"
                type="date"
                placeholder="选择日期">
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="原因说明" prop="suspendRemark">
          <el-input
            type="textarea"
            :autosize="{ minRows: 2 }"
            resize="none"
            v-model.trim="form.suspendRemark">
          </el-input>
        </el-form-item>
      </el-form>
    </div>
    <div class="mt20 mb20 ml20">
      <!--<el-button>保 存</el-button>-->
      <el-button type="primary" @click="submit">提 交</el-button>
    </div>
  </div>
</template>

<script>
  import Api from '@/api/manageContract'
  import {formatDate} from '@/filters/moment'
  import comLoading from '@/mixins/comLoading'
  import {routerNames} from '@/core/consts'

  export default {
    mixins: [comLoading],
    data() {
      return {
        form: {
          suspendReason: '',
          suspendTime: '',
          suspendRemark: ''
        },
        rules: {
          suspendReason: [
            {required: true, message: '请选择中止原因'}
          ],
          suspendTime: [
            {type: 'date', required: true, message: '请选择中止时间', trigger: 'change'}
          ],
          suspendRemark: [
            {required: true, message: '请填写原因说明', trigger: 'change'},
            {max: 300, message: '长度不超过300个字符', trigger: 'change'}
          ]
        },
        contractCode: '',
        approvalDate: '',
        contractStatusName: '',
        startTime: '',
        endTime: '',
        options: [{value: 1, label: '合同违约中止'}, {value: 2, label: '合同变更后中止'}, {value: 3, label: '固定期限合同正常履行完成后中止'}],
        info: null,
        toDetail: {name: routerNames.con_Check, query: {contractId: ''}}
      }
    },
    methods: {
      search() {
        console.log(this.contractCode)
        if (!this.contractCode) {
          this.$message.warning('请输入合同编号！')
          return
        }
        this.comLoading()
        Api.getContractDetailByCode({id: this.contractCode}).then((res) => {
          const data = res.data.dataMap
          console.log(data)
          const {baseInfoForm, cardContentInfoForm} = data
          const {id, approvalDate, contractStatusName} = baseInfoForm
          const {startTime, endTime} = cardContentInfoForm
          this.approvalDate = approvalDate
          this.contractStatusName = contractStatusName
          this.startTime = startTime
          this.endTime = endTime
          this.toDetail.query.contractId = id
          this.comLoading(false)
        }, () => {
          this.comLoading(false)
        })
      },
      submit() {
        this.$refs['form'].validate((valid) => {
          if (valid) {
            if (!this.info) {
              this.$message.warning('请输入合同编号查询')
              return
            }
            const {baseInfoForm} = this.info
            const {id} = baseInfoForm
            const result = {
              id,
              suspendTime: formatDate(this.suspendTime),
              suspendReason: this.suspendReason,
              suspendRemark: this.suspendRemark
            }
            console.log(result)
            this.comLoading({
              text: '正在提交中'
            })
            Api.contractSuspendSubmit(result).then((res) => {
              console.log(res)
              this.comLoading(false)
            })
          } else {
            console.log('error submit!!')
            return false
          }
        })
      }
    },
    filters: {
      formatDate
    }
  }
</script>
