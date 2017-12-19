<style type="text/scss" lang="scss" scoped>
  .mint-search-list {
    padding-top: 84px;
  }
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
        <div class="container">
          <mt-search
            v-model="key"
            cancel-text="取消"
            placeholder="搜索"
            autofocus>
            <mt-cell
              v-for="item in result"
              :key="item.userId"
              @click.native="select(item)">
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
  import _ from 'lodash';
  import Api from '../../../api/manageContract';

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
          console.log(res);
          this.result = res.data.dataMap;
        });
      }
    },
    watch: {
      value(val) {
        if (!val) {
          this.username = '';
        }
      },
      key: _.debounce(function (val) {
          if (!val) {
            this.result = [];
            return;
          }
          this.getResult(val);
        }, 500
      )
    }
  };
</script>
