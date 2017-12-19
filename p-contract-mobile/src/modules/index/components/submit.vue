<style type="text/scss" lang="scss" scoped>
  .submit {
    margin-top: 20px;
    width: 90%;
  }
</style>

<template>
  <mt-popup
    v-model="value"
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
          <mt-button class="submit" size="small" @click="submit">提 交</mt-button>
        </div>
      </div>
    </div>
  </mt-popup>
</template>

<script>
  import Api from '../../../api/process';
  import Actions from '../components/actions.vue';
  import SelectPerson from '../components/selectPerson.vue';

  export default {
    props: {
      value: {
        type: Boolean,
        default: false
      },
      actionName: {
        type: Object,
        default() {
          return '';
        }
      },
      btns: {
        type: Array,
        default() {
          return [];
        }
      }
    },
    data() {
      return {
        redirectApproverId: '',
        approveRemark: ''
      };
    },
    methods: {
      check(result) {
        if (this.actionName === '拒绝') {
          if (!result.approveRemark) {
            return false;
          }
        }
        if (this.visible) {
          if (!this.redirectApproverId) {
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
        Api.submitProcess(result).then(() => {

        });
      },
      back() {
        this.$emit('input', false);
      }
    },
    computed: {
      visible() {
        return ['加签', '转签'].indexOf(this.actionName) > -1;
      }
    },
    watch: {
      actionName(val) {
        this.$emit('update:actionName', val);
        this.redirectApproverId = '';
      }
    },
    components: {
      Actions,
      SelectPerson
    }
  };
</script>
