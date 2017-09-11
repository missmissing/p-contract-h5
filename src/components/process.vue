<style type="text/scss" lang="scss" scoped>
  .title {
    padding: 5px 10px;
    border-bottom: 1px solid #dedede;
    font-size: 16px;
  }

  .main {
    padding: 20px;
  }

  .item {
    margin-bottom: 10px;
    border: 1px solid #ddd;
    border-radius: 10px;
  }

  .header {
    padding: 10px;
    border-bottom: 1px solid #ccc;
  }

  .content {
    padding: 10px;
  }
</style>

<template>
  <div>
    <div>
      <div class="title">审批意见</div>
      <div class="main">
        <div class="item" v-for="list in lists" :key="list.commentId">
          <div class="header">
            <span>{{list.activityName}}</span>
            <span>{{list.approverName}}:</span>
            <span>{{list.actionName}}</span>
            <span class="fr">{{list.approveTime | formatTime}}</span>
          </div>
          <div class="content">{{list.comment}}</div>
        </div>
        <el-form class="mt20" labelWidth="80px">
          <el-form-item label="审批操作">
            <el-radio-group v-model="actionName">
              <el-radio v-for="btn in btns" :label="btn" :key="btn">{{btn}}</el-radio>
              <el-radio v-for="btn in commonBtns" :label="btn" :key="btn">{{btn}}</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="收文人" v-if="visible">
            <el-input readonly :value="receiver" style="width:300px;"></el-input>
            <SelectPerson @change="change"></SelectPerson>
          </el-form-item>
          <el-form-item label="审批意见">
            <el-input
              type="textarea"
              :autosize="{ minRows: 2 }"
              :maxlength="300"
              resize="none"
              v-model="approveRemark">
            </el-input>
          </el-form-item>
        </el-form>
        <div class="ml10 mb20">
          <el-button type="primary" @click="submit">提 交</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Api from '@/api/process'
  import {routerNames} from '../core/consts'
  import {formatTime} from '@/filters/moment'
  import {SelectPerson} from '@/components/selectPerson.vue'

  export default {
    data() {
      return {
        processData: {},
        lists: [],
        btns: [],
        commonBtns: ['加签', '转签'],
        actionName: '',
        receiver: '',
        approveRemark: ''
      }
    },
    computed: {
      visible() {
        return this.commonBtns.some(btn => btn === this.actionName)
      }
    },
    methods: {
      change(value) {
        console.log('person', value)
      },
      submit() {
        if (!this.actionName) {
          this.$message.warning('请选择审批操作!')
          return
        }
        const {procInstId, procCode, serialNumber, operatorId} = this.processData
        Api.submitProcess({
          procInstId,
          procCode,
          serialNumber,
          approverId: operatorId,
          actionName: this.actionName,
          redirectApproverId: '',
          approveRemark: this.approveRemark
        }).then((res) => {
          console.log(res)
          this.$router.push({
            name: routerNames.con_handing_process
          })
        })
      }
    },
    created() {
      let {processData} = this.$route.query
      processData = JSON.parse(processData)
      console.log(processData)
      const {procInstId, procCode, operatorId, actions} = processData
      this.btns = actions || []
      this.processData = processData

      Api.getComments({
        procInstId,
        procCode,
        operatorId
      }).then((res) => {
        this.lists = res.data.dataMap.nodes
      })
    },
    components: {
      SelectPerson
    },
    filters: {
      formatTime
    }
  }
</script>
