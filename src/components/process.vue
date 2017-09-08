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
        <div class="item" v-for="list in lists" :key="list.id">
          <div class="header">
            <span>{{list.role}}</span>
            <span v-if="list.prevStatus">【{{list.prevStatus}}】</span>
            <span>{{list.name}}:</span>
            <span>{{list.status}}</span>
            <span class="fr">{{list.time}}</span>
          </div>
          <div class="content">{{list.comment}}</div>
        </div>
        <el-form class="mt20" labelWidth="80px">
          <el-form-item label="审批操作">
            <el-radio-group v-model="radio">
              <el-radio v-for="btn in btns" :label="btn" :key="btn">{{btn}}</el-radio>
              <el-radio v-for="btn in commonBtns" :label="btn" :key="btn.value">{{btn}}</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="收文人" v-if="visible">
            <el-input readonly :value="receiver" style="width:300px;"></el-input>
          </el-form-item>
          <el-form-item label="审批意见">
            <el-input
              type="textarea"
              :autosize="{ minRows: 2 }"
              :maxlength="300"
              resize="none"
              v-model="comment">
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

  export default {
    data() {
      return {
        lists: [],
        btns: [],
        commonBtns: ['加签', '转签'],
        radio: '',
        receiver: '',
        comment: ''
      }
    },
    computed: {
      visible() {
        return this.commonBtns.some(btn => btn === this.radio)
      }
    },
    methods: {
      submit() {
        console.log('result:', this.radio, this.comment)
        if (!this.radio) {
          this.$message.warning('请选择审批操作!')
          return
        }
        Api.submitProcess({
          procInstId: '',
          procCode: '',
          actionName: '',
          approverId: '',
          redirectApproverId: '',
          serialNumber: '',
          approveRemark: ''
        }).then((res) => {
          console.log(res)
        })
      }
    },
    created() {
      Api.getComments().then((res) => {
        this.lists = res.data.dataMap
      })

      Api.getApproveNode({
        operatorId: '',
        serialNumber: '',
        procCode: ''
      }).then((res) => {
        const {actions} = res.data.dataMap
        this.btns = actions
      })
    }
  }
</script>
