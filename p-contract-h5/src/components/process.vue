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
  <div v-if="processData">
    <div style="margin-top:30px;">
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
        <div v-if="show">
          <el-form class="mt20" labelWidth="80px">
            <el-form-item label="审批操作">
              <el-radio-group v-model="actionName">
                <el-radio v-for="btn in btns" :label="btn" :key="btn">{{btn}}</el-radio>
                <el-radio v-for="btn in commonBtns" :label="btn" :key="btn">{{btn}}</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="收文人" v-if="visible">
              <SelectPerson @change="change"></SelectPerson>
            </el-form-item>
            <el-form-item
              label="审批意见"
              :required="required">
              <el-input
                type="textarea"
                :autosize="{ minRows: 2 }"
                :maxlength="300"
                resize="none"
                v-model.trim="approveRemark">
              </el-input>
            </el-form-item>
          </el-form>
          <div class="ml10 mb20">
            <el-button type="primary" @click="beforeSubmit">提 交</el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Api from '../api/process/index';
  import {formatTime} from '../filters/moment';
  import SelectPerson from './selectPerson.vue';
  import {routerNames, processListMap} from '../core/consts';
  import comLoading from '../mixins/comLoading';
  import env from '../util/env';

  export default {
    mixins: [comLoading],
    props: {
      extraFn: {
        type: Function,
        default: null
      }
    },
    data() {
      return {
        processData: null,
        lists: [],
        btns: [],
        commonBtns: ['加签', '转签'],
        actionName: '',
        receiver: '',
        approveRemark: ''
      };
    },
    computed: {
      visible() {
        return this.commonBtns.some(btn => btn === this.actionName);
      },
      required() {
        return this.actionName === '拒绝';
      }
    },
    methods: {
      change(value) {
        this.receiver = value;
      },
      beforeSubmit() {
        if (!this.actionName) {
          this.$message.warning('请选择审批操作!');
          return;
        }
        if (this.extraFn) {
          const {sign} = this.processData;
          const isSign = sign === 1;
          const isAgree = this.actionName === '同意';
          this.extraFn({isSign, isAgree}).then(() => {
            this.submit();
          });
          return;
        }
        this.submit();
      },
      check(data) {
        const {actionName, redirectApproverId} = data;
        if (actionName === '拒绝') {
          if (!this.approveRemark) {
            this.$message.warning('请输入审批意见！');
            return false;
          }
        }
        if (this.visible) {
          if (!redirectApproverId) {
            this.$message.warning('请选择收文人！');
            return false;
          }
        }
        return true;
      },
      submit() {
        const {
          procInstId,
          procCode,
          serialNumber,
          roleName
        } = this.processData;
        const result = {
          procInstId,
          procCode,
          serialNumber,
          actName: roleName,
          actionName: this.actionName,
          redirectApproverId: this.receiver,
          approveRemark: this.approveRemark
        };
        if (!this.check(result)) {
          return;
        }
        this.comLoading({
          text: '正在提交中'
        });
        Api.submitProcess(result).then(() => {
          this.$message.success('提交成功！');
          if (this.$route.query.from === 'out') {
            if (env === 'prd') {
              window.location.href = 'http://a.oa.chinaredstar.com/tip/success?t=1';
            } else {
              window.location.href = 'http://10.11.25.157:81/tip/success?t=1 ';
            }
            return;
          }
          this.$router.push({name: routerNames.con_index});
        }).finally(() => {
          this.comLoading(false);
        });
      }
    },
    created() {
      let {processData} = this.$route.query;
      if (!processData) {
        return;
      }
      processData = JSON.parse(processData);
      const {
        procInstId, procCode, actions, sign, dataType
      } = processData;
      if (sign === 1) {
        this.commonBtns = [];
      }
      this.btns = actions || [];
      this.processData = processData;
      this.show = dataType === processListMap[0];

      Api.getStartedProcNodes({
        procInstId,
        procCode
      }).then((res) => {
        this.lists = res.data.dataMap.nodes;
      });
    },
    components: {
      SelectPerson
    },
    filters: {
      formatTime
    },
    watch: {
      $route() {
        const {processData} = this.$route.query;
        if (!processData) {
          this.processData = null;
        }
      }
    }
  };
</script>
