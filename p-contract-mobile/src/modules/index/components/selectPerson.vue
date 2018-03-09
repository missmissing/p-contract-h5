<style type="text/scss" lang="scss" scoped>
  .select-person-container {
    padding-top: 62px;
    .mint-search-list {
      padding-top: 106px;
    }
  }
</style>

<template>
  <div>
    <div @click="show">
      <mt-cell
        title="选择员工"
        is-link
        :value="username">
      </mt-cell>
    </div>
    <mt-popup
      v-model="visible"
      :modal="false"
      :closeOnClickModal="false"
      position="bottom"
      class="popup">
      <div>
        <mt-header fixed title="选择员工">
          <mt-button icon="back" slot="left" @click="back"></mt-button>
        </mt-header>
        <div class="select-person-container">
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
  import _ from 'lodash'
  import Api from '../../../api/manageContract'

  export default {
    props: {
      value: {
        type: Object,
        default () {
          return {}
        }
      }
    },
    data () {
      return {
        username: '',
        visible: false,
        key: '',
        result: []
      }
    },
    methods: {
      show () {
        this.visible = true
      },
      back () {
        this.visible = false
        document.activeElement.blur()
      },
      select (item) {
        this.visible = false
        this.username = item.userName
        this.$emit('input', item.userId)
      },
      getResult (keyword) {
        Api.getRemoteCreatePersonsByKeyWord({keyword}).then(res => {
          console.log(res)
          this.result = res.data.dataMap
        })
      }
    },
    watch: {
      value (val) {
        if (!val) {
          this.username = ''
        }
      },
      key: _.debounce(function (val) {
        if (!val) {
          this.result = []
          return
        }
        this.getResult(val)
      }, 500
      )
    }
  }
</script>
