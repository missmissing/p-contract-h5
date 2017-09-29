<style type="text/scss" lang="scss" scoped>
  .basic-info {
    .router-link {
      color: #FFFFFF;
    }
  }
</style>

<template>
  <div class="pd20"
       v-loading="loadingFlag"
       :element-loading-text="loadingText">
    <div class="basic-info">
      <el-form :model="form" :rules="rules" ref="form" label-width="120px">
        <el-row>
          <el-col :span="8">
            <el-form-item label="合同编号">
              <el-input :value="contractCode" disabled>
              </el-input>
            </el-form-item>
          </el-col>
          <el-button type="primary" class="ml20" v-show="toDetail.query.contractId">
            <router-link class="router-link" :to="toDetail" target="_blank">详 情</router-link>
          </el-button>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="合同签署日期">
              <el-input :value="signDate | formatDate" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8" :offset="1">
            <el-form-item label="合同状态">
              <el-input :value="contractStatus" disabled></el-input>
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
      getInfo() {
        this.setData()
      },
      setData() {

      }
    },
    created() {

    },
    filters: {
      formatDate
    },
    components: {
      Process
    }
  }
</script>
