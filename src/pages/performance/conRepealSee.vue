<style type="text/scss" lang="scss" scoped>
  .basic-info {

  }
</style>

<template>
  <div class="pd20">
    <div class="mb10 clearfix" v-if="procInstCode">
      <div class="fr mr20">流程编号 {{procInstCode}}</div>
    </div>
    <div class="basic-info">
      <el-form :model="form" ref="form" label-width="120px">
        <el-row>
          <el-col :span="8">
            <el-form-item label="合同编号">
              {{contractCode}}
            </el-form-item>
          </el-col>
          <el-button type="primary" class="ml20" v-show="toDetail.query.contractId">
            <router-link class="router-link-default" :to="toDetail" target="_blank">详 情</router-link>
          </el-button>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="合同签署日期">
              {{signDate | formatDate}}
            </el-form-item>
          </el-col>
          <el-col :span="8" :offset="1">
            <el-form-item label="合同状态">
              {{contractStatus}}
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="合同生效日期">
              {{startTime | formatDate}}
            </el-form-item>
          </el-col>
          <el-col :span="8" :offset="1">
            <el-form-item label="合同截止日期">
              {{endTime | formatDate}}
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="合同中止原因" prop="suspendReason">
              <el-select
                disabled
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
              <el-input :value="form.suspendTime | formatDate" disabled></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="原因说明" prop="suspendRemark">
          <el-input
            disabled
            type="textarea"
            :autosize="{ minRows: 2 }"
            resize="none"
            v-model.trim="form.suspendRemark">
          </el-input>
        </el-form-item>
      </el-form>
    </div>
    <Process></Process>
  </div>
</template>

<script>
  import Api from '@/api/manageContract'
  import {formatDate} from '@/filters/moment'
  import comLoading from '@/mixins/comLoading'
  import {routerNames} from '@/core/consts'
  import Process from '@/components/process.vue'

  export default {
    mixins: [comLoading],
    data() {
      return {
        procInstCode: '',
        form: {
          suspendReason: '',
          suspendTime: '',
          suspendRemark: ''
        },
        contractCode: '',
        signDate: '',
        contractStatus: '',
        startTime: '',
        endTime: '',
        options: [{value: 1, label: '合同违约中止'}, {value: 2, label: '合同变更后中止'}, {value: 3, label: '固定期限合同正常履行完成后中止'}],
        info: null,
        toDetail: {name: routerNames.con_Check, query: {contractId: ''}}
      }
    },
    methods: {
      getInfo(id) {
        this.comLoading()
        Api.getContractDetailByCode({id}).then((res) => {
          this.comLoading(false)
          const data = res.data.dataMap
          this.setData(data)
        }, () => {
          this.comLoading(false)
        })
      },
      setData(data) {
        const {baseInfoForm, cardContentInfoForm, contSuspend} = data
        debugger
        const {contractNo, approvalDate, contractStatusName} = baseInfoForm
        const {suspendReason, suspendTime, suspendRemark} = contSuspend
        const {startTime, endTime} = cardContentInfoForm
        this.contractCode = contractNo
        this.signDate = approvalDate
        this.contractStatus = contractStatusName
        this.startTime = startTime
        this.endTime = endTime
        Object.assign(this.form, {
          suspendReason,
          suspendTime,
          suspendRemark
        })
      }
    },
    created() {
      const {id, processData} = this.$route.query
      this.getInfo(id)
      if (processData) {
        this.procInstCode = JSON.parse(processData).procInstCode
      }
    },
    filters: {
      formatDate
    },
    components: {
      Process
    }
  }
</script>
