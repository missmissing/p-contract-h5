<style type="text/scss" lang="scss" scoped>
  .form-container {

  }
</style>

<template>
  <div class="form-container">
    <div>
      <el-card>
        <div slot="header">
          <span class="common-title">基本信息</span>
        </div>
        <div class="basic-info">
          <el-form label-width="120px">
            <el-row>
              <el-col :span="8">
                <el-form-item label="合同编号">
                  <el-input v-model="contractCode" icon="search" :on-icon-click="search"></el-input>
                </el-form-item>
              </el-col>
              <el-button type="info" class="ml20">详 情</el-button>
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
                <el-form-item label="合同中止原因">
                  <el-select
                    class="wp100"
                    v-model="suspendReason"
                    placeholder="请选择">
                    <el-option
                      v-for="item in options"
                      :key="item"
                      :label="item"
                      :value="item">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8" :offset="1">
                <el-form-item label="实际中止日期">
                  <el-date-picker
                    style="width:100%;"
                    v-model="suspendTime"
                    type="date"
                    placeholder="选择日期">
                  </el-date-picker>
                </el-form-item>
              </el-col>
            </el-row>
            <el-form-item label="原因说明">
              <el-input
                type="textarea"
                :maxlength="300"
                :autosize="{ minRows: 2 }"
                resize="none"
                v-model="suspendRemark">
              </el-input>
            </el-form-item>
          </el-form>
        </div>
      </el-card>
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

  export default {
    data() {
      return {
        contractCode: '',
        signDate: '',
        contractStatus: '',
        startTime: '',
        endTime: '',
        suspendTime: '',
        suspendReason: '',
        suspendRemark: '',
        options: ['合同违约中止', '合同变更后中止', '固定期限合同正常履行完成后中止'],
        info: {}
      }
    },
    methods: {
      search() {
        console.log(this.contractCode)
        Api.getContractDetailByCode({id: this.contractCode}).then((res) => {
          const data = res.data.dataMap
          console.log(data)
          this.info = data
          const {cardContentInfoForm} = data
          const {startTime, endTime} = cardContentInfoForm
          this.startTime = startTime
          this.endTime = endTime
        })
      },
      submit() {
        const {baseInfoForm} = this.info
        const {id} = baseInfoForm
        const result = {
          id,
          suspendTime: formatDate(this.suspendTime),
          suspendReason: this.suspendReason,
          suspendRemark: this.suspendRemark
        }
        console.log(result)
//        Api.contractSuspendSubmit(result).then((res) => {
//          console.log(res)
//        })
      }
    },
    filters: {
      formatDate
    }
  }
</script>
