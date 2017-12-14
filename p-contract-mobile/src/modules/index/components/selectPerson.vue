<style type="text/scss" lang="scss" scoped>

</style>

<template>
  <div>
    <div @click="visible = true">
      <mt-cell
        title="选择人员"
        is-link
        :value="username">
      </mt-cell>
    </div>
    <mt-popup
      v-model="visible"
      :modal="false"
      :closeOnClickModal="false"
      position="right"
      class="popup">
      <div>
        <mt-header fixed>
          <mt-button icon="back" slot="left" @click="back"></mt-button>
        </mt-header>
        <div class="mt40">
          <mt-search
            v-model="key"
            cancel-text="取消"
            placeholder="搜索"
            autofocus>
            <mt-cell
              v-for="item in result"
              :key="item.userId"
              @click="select(item)">
              <div slot="title"><span>{{item.userName}}</span><span>({{item.userId}})</span></div>
              <div>{{item.deptName}}</div>
            </mt-cell>
          </mt-search>
        </div>
      </div>
    </mt-popup>
  </div>
</template>

<script>
  import Api from '../../../api/manageContract/index';

  export default {
    props: {
      value: {
        type: Object,
        default() {
          return {};
        }
      }
    },
    data() {
      return {
        username: '',
        visible: false,
        key: '',
        result: []
      };
    },
    methods: {
      back() {
        this.visible = false;
      },
      select(item) {
        this.visible = false;
        this.username = item.userName;
        this.$emit('input', item.userId);
      },
      getResult(keyword) {
        Api.getRemoteCreatePersonsByKeyWord({keyword}).then(res => {
          this.options = res.data.dataMap;
        });
      }
    },
    watch: {
      value(val) {
        if (!val) {
          this.username = '';
        }
      },
      key(val) {
        if (!val) {
          this.result = [];
          return;
        }
        this.getResult(val);
      }
    }
  }
  ;
</script>
