<style type="text/scss" lang="scss" scoped>
  .createSlaveProtocal {
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
  <div class="createSlaveProtocal">
    <div class="mb10 clearfix" v-if="procInstId">
      <div class="fr">流程编号 {{procInstId}}</div>
      <div class="fl fb">{{procTitle}}</div>
    </div>
    <div class="mt20">
      <el-form rel="queryContractForm" :model="queryContractForm" label-width="100px" :rules="queryContractForm.rules">
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="合同编号" prop="code">
              <el-input v-model="queryContractForm.code" placeholder="请输入合同编号"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-button :disabled="!queryContractForm.code" type="primary" @click="handleQuery">
              查找
            </el-button>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div v-show="queryContractForm.visible">
      <el-tabs>
        <el-tab-pane>
          <span slot="label" class="title">基本信息</span>
          <BaseInfo :baseInfoForm="baseInfoForm" :protocolNo="protocolNo" :code="code"></BaseInfo>
        </el-tab-pane>
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
        <el-tab-pane>
          <span slot="label" class="title">补充信息</span>
          <el-form rel="cardRemarkInfoForm" :model="cardRemarkInfoForm">
            <el-form-item prop="otherInstruction" label="备注">
              <el-input type="textarea" placeholder="请输入内容" :rows="4" v-model="cardRemarkInfoForm.otherInstruction" :disabled="disabled"></el-input>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane v-if="cardRelatedInfoForm.contractList.length">
          <span slot="label" class="title">相关数据</span>
          <RelateTable :items="cardRelatedInfoForm.contractList"></RelateTable>
        </el-tab-pane>
      </el-tabs>
      <Process :extraFn="callback.bind(this)"></Process>
      <el-row>
        <el-col class="mt20 mb20">
          <el-button type="primary" @click="handleSubmit">提交</el-button>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
  import {mapState, mapGetters} from 'vuex'

  import Api from '../../api/manageContract'
  import {formatDate} from '../../filters/moment'
  import attachmentType from '../../filters/attachmentType'
  import {downloadUrl, uploadUrl} from '../../api/consts'
  import Process from '../../components/process.vue'
  import {routerNames} from '../../core/consts'
  import getStructure from '../../util/getStructure'
  import sealInfoStructure from '../../structure/create/sealInfo'

  import bus from '../../core/bus'

  import BaseInfo from './components/slaveProtocol/baseInfo.vue'
  import FileInfo from './components/fileInfo.vue'
  import SealFile from './components/sealFile.vue'
  import RelateTable from './components/slaveProtocol/relateTable.vue'

  export default {
    data () {
      return {
        downloadUrl,
        uploadUrl,
        procInstId: '', // 流程编号：
        procTitle: '', // 流程名称
        queryContractForm: {
          visible: false, // 在创建从协议时控制从协议页面数据的显示与否
          code: '',
          rules: {
            code: [{required: true, message: '请输入合同编号', trigger: 'blur'}]
          }
        },
        id: '', // 从协议id
        protocolNo: null, // 从协议编号
        code: null, // 合同编号
        baseInfoForm: {
          tableSupplierInfo: [],
          conSubjctName: [],
          radioSealOrder: 1, // 0：我方先盖章 1：对方先盖章
          sealReason: '',
          errorCount: 0
        },
        cardSealInfoForm: {
          ...sealInfoStructure,
          contract: [],
          errorCount: 0
        }, // 附件信息
        cardSealFileForm: {
          errorCount: 0
        }, // 盖章信息
        cardRemarkInfoForm: {
          otherInstruction: ''
        }, // 补充信息
        cardRelatedInfoForm: {
          contractList: []
        } // 相关数据
      }
    },
    computed: {
      ...mapGetters(['backLogSealRole', 'backLogPurchaseRole']),
      ...mapState(['pageStatus']),
      showSealFile () {
        return [3, 4].indexOf(this.pageStatus) > -1
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
        this.requestQueryData()
      }

      if (this.pageStatus === 4) {
        this.initProcessData()
      }
    },
    methods: {
      requestQueryData () {
        Api.getAgreenmentDetail(this.$route.query.id).then((res) => {
          const data = res.data.dataMap
          console.log(data)
        })
      },
      getResult () {
        const result = {
          id: this.id,
          baseInfoForm: this.baseInfoForm,
          cardSealInfoForm: this.cardSealInfoForm,
          cardRemarkInfoForm: this.cardRemarkInfoForm,
          code: this.queryContractForm.code
        }
        return result
      },
      valid () {

      },
      handleSubmit () {
        if (!this.valid()) {
          return
        }
        const result = this.getResult()
        Api.createAgreenment(result).then((data) => {
          this.$message.success('提交成功')
          this.$router.push({
            name: routerNames.con_index
          })
        })
      },
      // 查询
      handleQuery () {
        Api.getContractDetailByNo({
          contractNo: this.queryContractForm.code
        }).then((res) => {
          const data = res.data.dataMap
          if (data) {
            this.queryContractForm.visible = true
            const {cardContentInfoForm} = data
            const {tableSupplierInfo, conSubjctName} = cardContentInfoForm
            this.baseInfoForm.tableSupplierInfo = tableSupplierInfo
            this.baseInfoForm.conSubjctName = conSubjctName
          }
        })
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

      initProcessData () {
        const query = this.$route.query
        if (query.processData) {
          this.procInstId = JSON.parse(query.processData).procInstId
          this.procTitle = JSON.parse(query.processData).procTitle
          this.users.roleName = JSON.parse(query.processData).roleName
        }
      }
    },
    filters: {
      formatDate,
      attachmentType
    },
    components: {
      BaseInfo,
      FileInfo,
      SealFile,
      RelateTable,
      Process
    }
  }
</script>
