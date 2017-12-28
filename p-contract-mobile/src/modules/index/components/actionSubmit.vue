<style type="text/scss" lang="scss" scoped>
  .fixed {
    position: fixed;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: 10;
  }

  .submit {
    margin-top: 20px;
    width: 90%;
  }

  .tab-bars {
    display: flex;
    padding: 10px;
    background-image: linear-gradient(180deg, #d9d9d9, #d9d9d9 50%, transparent 0);
    background-size: 100% 1px;
    background-repeat: no-repeat;
    background-position: 0 0;
    background-color: #fafafa;
    .tab-item {
      flex: 1;
      font-size: 12px;
      margin: 0 10px;
    }
  }
</style>

<template>
  <div v-if="show">
    <div class="fixed">
      <mt-field label="" placeholder="请输入审批意见" v-model="approveRemark"></mt-field>
      <div class="tab-bars">
        <mt-button
          v-for="btn in btns"
          size="small"
          :key="btn"
          :type="btn | type"
          :class="{'tab-item':true}"
          @click.native="clickBtn(btn)"
          :disabled="btn===actionName&&disabled">
          {{btn}}
        </mt-button>
      </div>
    </div>
    <mt-popup
      v-model="popupVisible"
      :modal="false"
      :closeOnClickModal="false"
      position="right"
      class="popup">
      <div>
        <mt-header fixed>
          <mt-button icon="back" slot="left" @click="back"></mt-button>
        </mt-header>
        <div class="container">
          <Actions v-model="actionName" :btns="btns"></Actions>
          <SelectPerson v-model="redirectApproverId" v-show="visible"></SelectPerson>
          <mt-field label="" placeholder="请输入审批意见" type="textarea" rows="4" v-model="approveRemark"></mt-field>
          <div class="tc">
            <mt-button class="submit" type="primary" size="small" @click="submit" :disabled="disabled">提 交</mt-button>
          </div>
        </div>
      </div>
    </mt-popup>
  </div>
</template>

<script>
  import {Toast, Indicator} from 'mint-ui';
  import Api from '../../../api/process';
  import Actions from '../components/actions.vue';
  import SelectPerson from '../components/selectPerson.vue';

  export default {
    data() {
      return {
        disabled: null,
        actionName: '',
        btns: [],
        allBtns: [],
        commonBtns: ['加签', '转签'],
        sign: 0,
        redirectApproverId: '',
        approveRemark: '',
        popupVisible: false
      };
    },
    methods: {
      getInfo() {
        const {actions, sign} = this.$store.state.processData;
        if (sign === 1) {
          this.commonBtns = [];
        }
        this.allBtns = [...actions, ...this.commonBtns];
        if (this.allBtns.length > 4) {
          this.btns = this.allBtns.slice(0, 2).push('其它');
        } else {
          this.btns = this.allBtns;
        }
      },
      back() {
        this.popupVisible = false;
      },
      actionChange() {
        this.popupVisible = true;
      },
      clickBtn(btn) {
        this.actionName = btn;
        if ([...this.commonBtns, '其它'].indexOf(btn) > -1) {
          this.actionChange();
          return;
        }
        this.submit();
      },
      check(result) {
        if (result.actionName === '拒绝') {
          if (!result.approveRemark) {
            Toast({
              message: '请输入审批意见！',
              duration: 1500
            });
            return false;
          }
        }
        return true;
      },
      submit() {
        const {procInstId, procCode, serialNumber} = this.$store.state.processData;
        const result = {
          procInstId,
          procCode,
          serialNumber,
          actionName: this.actionName,
          redirectApproverId: this.redirectApproverId,
          approveRemark: this.approveRemark
        };
        if (!this.check(result)) {
          return;
        }
        this.disabled = true;
        Indicator.open({
          text: '提交中',
          spinnerType: 'triple-bounce'
        });
        Api.submitProcess(result).then(() => {
          window._____processCenterPageAction('pagebackrefresh');
          window._____processCenterPageAction('addnativebadgenum');
        }).finally(() => {
          Indicator.close();
          this.disabled = false;
        });
      },
    },
    computed: {
      show() {
        return this.$store.state.processData.type === '1';
      },
      visible() {
        return this.commonBtns.indexOf(this.actionName) > -1;
      }
    },
    created() {
      this.getInfo();
    },
    filters: {
      type(btn) {
        switch (btn) {
          case '同意':
            return 'primary';
          case '拒绝':
            return 'danger';
          default:
            return 'default';
        }
      }
    },
    components: {
      Actions,
      SelectPerson
    }
  };
</script>
