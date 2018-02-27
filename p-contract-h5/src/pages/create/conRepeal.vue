<style type="text/scss" lang="scss" scoped>
  .basic-info {
    .el-table__expanded-cell {
      z-index: 1
    }
    .title {
      position: relative;
      padding: 0 15px;
    }
    .errorCount {
      font-style: normal;
      position: absolute;
      top: -9px;
      left: 0;
      line-height: 18px;
      text-align: center;
      background: red;
      color: white;
      border-radius: 50% 50%;
      width: 18px;
      height: 18px;
    }
  }
</style>

<template>
  <div class="pd20">
    <div class="mb10 clearfix" v-if="procInstId">
      <div class="fl fb">{{procTitle}}</div>
      <div class="fr mr20">流程编号 {{procInstId}}</div>
    </div>
    <div class="basic-info">
      <el-form :model="form" :rules="rules" ref="form" label-width="120px">
        <el-row>
          <el-col :span="8">
            <el-form-item label="合同编号">
              <el-input
                :disabled="disabled"
                v-model="contractCode"
                @keyup.enter.native="search">
                <i slot="suffix" class="el-icon-search" @click="search"></i>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-button type="primary" class="ml20" v-show="toDetail.query.contractNo">
              <router-link class="router-link-default" :to="toDetail" target="_blank">详 情</router-link>
            </el-button>
          </el-col>
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
        </el-row>
        <el-row>
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
            <el-form-item label="实际中止日期" prop="suspendTime">
              <el-date-picker
                style="width:100%;"
                :disabled="disabled"
                v-model="form.suspendTime"
                type="date"
                placeholder="选择日期"
                :picker-options="pickerOptions">
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="原因说明" prop="suspendRemark">
          <el-input
            type="textarea"
            :disabled="disabled"
            v-model.trim="form.suspendRemark">
          </el-input>
        </el-form-item>
      </el-form>
      <el-card>
        <el-tabs>
          <el-tab-pane>
            <span slot="label" class="title">
              <i v-if="cardSealInfoForm.errorCount" class="errorCount">{{cardSealInfoForm.errorCount}}</i>
              合同附件
            </span>
            <FileInfo :cardSealInfoForm="cardSealInfoForm" ref="cardSealInfoForm"></FileInfo>
          </el-tab-pane>
          <el-tab-pane label="盖章附件" v-if="showSealFile">
            <span slot="label" class="title">
              <i v-if="cardSealFileForm.errorCount" class="errorCount">{{cardSealFileForm.errorCount}}</i>盖章附件
            </span>
            <SealFile :items="cardSealInfoForm.sealAttaches"></SealFile>
          </el-tab-pane>
        </el-tabs>
      </el-card>
    </div>
    <div class="mt20 mb20" v-if="showSubmit">
      <!--<el-button>保 存</el-button>-->
      <el-button type="primary" @click="submit">提 交</el-button>
    </div>
    <Process :extraFn="callback.bind(this)"></Process>
  </div>
</template>

<script>
  import {mapState, mapGetters} from 'vuex'
  import Api from '../../api/manageContract'
  import {formatDate} from '../../filters/moment'
  import {routerNames} from '../../core/consts'
  import {downloadUrl, uploadUrl} from '../../api/consts'
  import getStructure from '../../util/getStructure'
  import sealInfoStructure from '../../structure/create/sealInfo'

  import bus from '../../core/bus'
  
  import comLoading from '../../mixins/comLoading'

  import FileInfo from './components/fileInfo.vue'
  import SealFile from './components/sealFile.vue'
  import Process from '../../components/process.vue'

  export default {
    mixins: [comLoading],
    data () {
      return {
        downloadUrl,
        uploadUrl,
        procInstId: '', // 流程id
        procTitle: '', // 流程名称
        id: null,
        contractCode: '',
        approvalDate: '',
        contractStatusName: '',
        startTime: '',
        endTime: '',
        form: {
          suspendTime: '',
          suspendRemark: '',
          sealAttachments: []
        },
        rules: {
          suspendTime: [{
            type: 'date', required: true, message: '请选择中止时间', trigger: 'change'
          }],
          suspendRemark: [
            {required: true, message: '请填写原因说明', trigger: 'change'},
            {max: 300, message: '长度不超过300个字符', trigger: 'change'}
          ]
        },
        cardSealInfoForm: {
          ...sealInfoStructure,
          contract: [],
          errorCount: 0
        }, // 附件信息
        cardSealFileForm: {
          errorCount: 0
        }, // 盖章信息
        pickerOptions: {
          disabledDate () {
            return true
          }
        },
        info: null,
        toDetail: {name: routerNames.con_Check, query: {contractNo: ''}}
      }
    },
    computed: {
      ...mapGetters(['backLogSealRole', 'backLogPurchaseRole']),
      ...mapState(['pageStatus']),
      showSealFile () {
        return [3, 4].indexOf(this.pageStatus) > -1
      },
      showSubmit () {
        return this.pageStatus === 1
      },
      disabled () {
        return this.pageStatus !== 1
      }
    },
    created () {
      if (this.pageStatus === 1) {
        this.bindEvents()
      }

      if (this.pageStatus !== 1) {
        const {id} = this.$route.query
        this.getInfo(id)
      }

      if (this.pageStatus === 4) {
        this.initProcessData()
      }
    },
    methods: {
      search () {
        if (!this.contractCode) {
          this.$message.warning('请输入合同编号！')
          return
        }
        this.comLoading()
        Api.getContractDetailByNo({contractNo: this.contractCode, operate: 'SUSPENDED'}).then((res) => {
          const data = res.data.dataMap
          this.info = data
          const {baseInfoForm, cardContentInfoForm} = data
          const {approvalDate, contractStatusName} = baseInfoForm
          const {startTime, endTime} = cardContentInfoForm
          this.approvalDate = approvalDate
          this.contractStatusName = contractStatusName
          this.startTime = startTime
          this.endTime = endTime
          this.toDetail.query.contractNo = this.contractCode
          this.pickerOptions.disabledDate = (time) => time.getTime() < this.startTime
          this.comLoading(false)
        }, () => {
          this.comLoading(false)
        })
      },
      getResult () {
        const {baseInfoForm} = this.info
        const {id} = baseInfoForm
        const result = {
          id,
          suspendTime: formatDate(this.form.suspendTime),
          suspendRemark: this.form.suspendRemark,
          sealAttachments: getStructure(sealInfoStructure, this.cardSealInfoForm)
        }
        return result
      },
      valid () {
        if (!this.info) {
          this.$message.warning('请输入合同编号查询')
          return false
        }
        let errorCount = 0

        const form = this.cardSealInfoForm
        if (!this.$refs.cardSealInfoForm.valid()) {
          errorCount++
        }

        const exist = this.cardSealInfoForm.contract.some(item => item.fileId)
        if (!exist) {
          errorCount++
        }

        form.errorCount = errorCount

        this.$refs.form.validate((valid) => {
          if (!valid) {
            errorCount++
          }
        })

        return !errorCount
      },
      submit () {
        if (!this.valid()) {
          return
        }
        const result = this.getResult()
        this.comLoading({
          text: '正在提交中'
        })
        Api.contractSuspendSubmit(result).then((res) => {
          this.$router.push({
            name: routerNames.con_index
          })
        }).finally(() => {
          this.comLoading(false)
        })
      },
      getInfo (id) {
        this.comLoading()
        Api.getContractDetailById({id, operate: 'PROCESS'}).then((res) => {
          this.comLoading(false)
          const data = res.data.dataMap
          this.setData(data)
        }, () => {
          this.comLoading(false)
        })
      },
      setData (data) {
        const {
          baseInfoForm, cardContentInfoForm, contSuspend, cardSealInfoForm
        } = data
        const {
          contractNo, approvalDate, contractStatusName, id
        } = baseInfoForm
        const {suspendReason, suspendTime, suspendRemark} = contSuspend || {}
        const {startTime, endTime} = cardContentInfoForm
        const {sealAttachments} = cardSealInfoForm
        this.contractCode = contractNo
        this.signDate = approvalDate
        this.contractStatus = contractStatusName
        this.startTime = startTime
        this.endTime = endTime
        this.id = id

        Object.assign(this.form, {
          suspendReason,
          suspendTime,
          suspendRemark
        })

        const result = getStructure(sealInfoStructure, sealAttachments)
        Object.assign(this.cardSealInfoForm, result)

        this.toDetail.query.contractNo = contractNo
      },

      bindEvents () {
        bus.$on('sealInfoValid', this.valid)
      },

      // 流程审批前置动作
      callback (params) { // isSign:是否是加签人 isAgree:审批操作类型是否是同意
        const t = this
        const promises = []
        const {isSign, isAgree} = params
        if (!isSign && isAgree && (t.backLogSealRole || t.backLogPurchaseRole)) {
          promises.push(t.modifyAddNewFiles())
        } else {
          return Promise.resolve()
        }
        return Promise.all(promises)
      },
      // 印章保管人，采购合同上传，盖章信息修改
      modifyAddNewFiles () {
        const sealAttachments = this.cardSealInfoForm.sealAttaches.filter(item => !item.id)
        return Api.uploadSealAttachments({
          id: this.baseInfoForm.id,
          type: 1,
          uploadPerson: true,
          sealAttachments
        })
      },
      // 初始化流程数据
      initProcessData () {
        const {processData} = this.$route.query
        const data = JSON.parse(processData)
        const {procTitle, procInstId} = data
        this.procInstId = procInstId
        this.procTitle = procTitle
      }
    },
    filters: {
      formatDate
    },
    components: {
      FileInfo,
      SealFile,
      Process
    }
  }
</script>
