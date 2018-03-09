<template>
  <div class="main">
    <div class="container">
      <mt-cell title="合同编号" :value="contractCode"></mt-cell>
      <mt-cell title="合同签署日期" :value="approvalDate | formatDate"></mt-cell>
      <mt-cell title="合同状态" :value="contractStatusName"></mt-cell>
      <mt-cell title="合同生效日期" :value="startTime | formatDate"></mt-cell>
      <mt-cell title="合同截止日期" :value="endTime | formatDate"></mt-cell>
      <mt-cell title="实际中止日期" :value="suspendTime | formatDate"></mt-cell>
      <mt-cell title="原因说明" :value="suspendRemark"></mt-cell>
      <mt-navbar v-model="selected" class="mt20 mb20">
        <mt-tab-item :id="1">审批意见</mt-tab-item>
        <mt-tab-item :id="2">合同附件</mt-tab-item>
        <mt-tab-item :id="3">盖章附件</mt-tab-item>
      </mt-navbar>
      <mt-tab-container v-model="selected">
        <mt-tab-container-item :id="1">
          <Comments></Comments>
        </mt-tab-container-item>
        <mt-tab-container-item :id="2">
          <SealInfo :info="cardSealInfoForm"></SealInfo>
        </mt-tab-container-item>
        <mt-tab-container-item :id="3">
          <SealFile :items="cardSealInfoForm.sealAttaches"></SealFile>
        </mt-tab-container-item>
      </mt-tab-container>
    </div>
    <ActionSumit></ActionSumit>
  </div>
</template>

<script>
  import Api from '../../../../api/manageContract'
  import {formatDate} from '../../../../filters/moment'

  import ActionSumit from '../../components/actionSubmit.vue'
  import SealInfo from './sealInfo.vue'
  import SealFile from '../../components/sealFile.vue'
  import Comments from '../../components/comments.vue'

  export default {
    name: 'con-repeal',
    data () {
      return {
        contractCode: null,
        startTime: null,
        endTime: null,
        approvalDate: null,
        contractStatusName: null,
        suspendTime: null,
        suspendRemark: null,
        selected: 1,
        cardSealInfoForm: {}
      }
    },
    created () {
      this.getInfo()
    },
    methods: {
      getInfo () {
        const id = this.$store.state.id
        Api.getContractDetailByContractId({id, operate: 'PROCESS'}).then((res) => {
          const data = res.data.dataMap
          this.setData(data)
        })
      },
      setData (data) {
        const {
          baseInfoForm, cardContentInfoForm, contSuspend, contractAttachAndSeal
        } = data
        const {contractNo, approvalDate, contractStatusName} = baseInfoForm
        const {suspendTime, suspendRemark} = contSuspend || {}
        const {startTime, endTime} = cardContentInfoForm
        this.contractCode = contractNo
        this.startTime = startTime
        this.endTime = endTime
        this.approvalDate = approvalDate
        this.contractStatusName = contractStatusName
        this.suspendTime = suspendTime
        this.suspendRemark = suspendRemark
        this.cardSealInfoForm = contractAttachAndSeal
      }
    },
    mounted () {
      window._____processCenterPageAction('pageloaded')
    },
    filters: {
      formatDate
    },
    components: {
      SealInfo,
      ActionSumit,
      SealFile,
      Comments
    }
  }
</script>

<style type="text/scss" lang="scss" scoped>

</style>
