<template>
  <el-select
    v-model="value"
    :multiple="multiple"
    filterable
    remote
    placeholder="请输入关键词"
    :remote-method="remoteMethod"
    :loading="loading"
    @change="change">
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>
</template>

<script>
  export default {
    props: {
      multiple: {
        default: false
      }
    },
    data() {
      return {
        value: {},
        loading: false
      }
    },
    methods: {
      remoteMethod(query) {
        if (query !== '') {
          this.loading = true
          setTimeout(() => {
            this.loading = false
            this.options = this.list.filter(item => {
              return item.label.toLowerCase()
                .indexOf(query.toLowerCase()) > -1
            })
          }, 200)
        } else {
          this.options = []
        }
      },
      change(value) {
        this.$emit('change', value)
      }
    }
  }
</script>
