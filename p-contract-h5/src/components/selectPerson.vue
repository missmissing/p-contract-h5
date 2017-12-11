<style type="text/scss" lang="scss" scoped>
  .select-person {
    .el-select-dropdown__item {
      height: auto
    }
  }
</style>

<template>
  <el-select
    v-model="value"
    :multiple="multiple"
    clearable
    @clear="value=null"
    filterable
    remote
    placeholder="请输入关键词"
    :remote-method="remoteMethod"
    :loading="loading"
    popper-class="select-person"
    @change="change">
    <el-option
      v-for="item in options"
      :key="item.userId"
      :label="item.userName"
      :value="item.userId">
      <div>
        <div>
          <span>{{item.userName}}</span><span>({{item.userId}})</span>
        </div>
        <div>{{item.deptName}}</div>
      </div>
    </el-option>
  </el-select>
</template>

<script>
  import Api from '../api/manageContract';

  export default {
    name: 'SelectPerson',
    props: {
      multiple: {
        default: false
      }
    },
    data() {
      return {
        value: null,
        options: [],
        loading: false
      };
    },
    methods: {
      remoteMethod(query) {
        if (query !== '') {
          this.loading = true;
          Api.getRemoteCreatePersonsByKeyWord({ keyword: query }).then(res => {
            this.loading = false;
            this.options = res.data.dataMap;
          }, () => {
            this.options = [];
          });
        } else {
          this.options = [];
        }
      },
      change(value) {
        this.$emit('change', value);
      }
    }
  };
</script>
