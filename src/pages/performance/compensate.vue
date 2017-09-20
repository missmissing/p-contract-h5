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
              <el-col :span="8">
                <el-form-item label="合同生效日期">
                  <el-input :value="startTime | formatDate" disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="合同中止日期">
                  <el-input :value="endTime | formatDate" disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="业务经办人">
                  <el-input :value="person" disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="所属部门">
                  <el-input :value="belongDePart" disabled></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-form-item label="违约方">
              <el-radio class="radio" v-model="breachRadio" label="1">我方</el-radio>
              <el-radio class="radio" v-model="breachRadio" label="2">对方</el-radio>
              <el-radio class="radio" v-model="breachRadio" label="3">双方</el-radio>
            </el-form-item>
            <el-form-item label="涉及赔付">
              <el-switch
                v-model="payment"
                on-text=""
                off-text="">
              </el-switch>
            </el-form-item>
            <el-row v-show="payment">
              <el-col :span="8">
                <el-form-item label="赔付类型">
                  <el-select v-model="payType" placeholder="请选择">
                    <el-option
                      v-for="item in options"
                      :key="item"
                      :label="item"
                      :value="item">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="赔付金额">
                  <el-input></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </el-card>
      <el-card>
        <div slot="header">
          <span class="common-title">处理结论</span>
        </div>
        <div class="handle-info">
          <el-form label-width="120px">
            <el-form-item label="">
              <el-radio class="radio" v-model="radio" label="1">继续履行</el-radio>
              <el-radio class="radio" v-model="radio" label="2">变更合同</el-radio>
              <el-radio class="radio" v-model="radio" label="3">按验收实际结果履行合同</el-radio>
              <el-radio class="radio" v-model="radio" label="4">转合同违约处理</el-radio>
            </el-form-item>
            <el-form-item label="违约/赔付原因">
              <el-input
                type="textarea"
                :maxlength="300"
                :autosize="{ minRows: 2 }"
                resize="none"
                v-model="reason">
              </el-input>
            </el-form-item>
            <el-form-item label="处理方案">
              <el-input
                type="textarea"
                :maxlength="300"
                :autosize="{ minRows: 2 }"
                resize="none"
                v-model="handleResult">
              </el-input>
            </el-form-item>
            <el-form-item label="相关附件">
              <Upload
                :action="action"
                :download="download"
                :fileList.sync="fileList"
                :data="uploadData"
                multiple>
                <!--<div class="el-upload__tip" slot="tip">文件不超过10M</div>-->
              </Upload>
            </el-form-item>
          </el-form>
        </div>
      </el-card>
    </div>
    <div class="mt20 mb20 ml20">
      <el-button>保 存</el-button>
      <el-button type="primary">提 交</el-button>
    </div>
  </div>
</template>

<script>
  import Api from '@/api/manageContract'
  import Upload from '@/components/upload.vue'
  import {uploadUrl, downloadUrl} from '@/api/consts'
  import {formatDate} from '@/filters/moment'

  export default {
    data() {
      return {
        contractCode: '',
        signDate: '',
        startTime: '',
        endTime: '',
        person: '',
        belongDePart: '',
        breachRadio: '2',
        payment: false,
        payType: '',
        radio: '1',
        reason: '',
        handleResult: '',
        action: uploadUrl,
        download: downloadUrl,
        fileList: [],
        uploadData: {},
        options: ['供应商向我方赔付', '我方向供应商佩服'],
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
      }
    },
    components: {
      Upload
    },
    filters: {
      formatDate
    }
  }
</script>
