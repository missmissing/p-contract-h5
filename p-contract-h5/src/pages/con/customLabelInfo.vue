<template>
  <el-form :model="form" :rules="rules" label-width="150px" ref="form">
    <el-row>
      <template v-for="(item,index) in items">
        <el-col :span="8">
          <el-form-item :label="item.labelName" :prop="item.labelKey">
            <el-input :readonly="disabled" :class="{disabledInput:disabled}" v-model="form[item.labelKey]" @input="change(index,form[item.labelKey])"></el-input>
            <div class="tip">{{item.labelDesc}}</div>
          </el-form-item>
        </el-col>
      </template>
    </el-row>
  </el-form>
</template>

<script>
  import {mapState} from 'vuex'

  import bus from '../../core/bus'

  export default {
    name: 'custom-label-info',
    props: {
      items: Array
    },
    data () {
      return {
        form: {},
        rules: {}
      }
    },
    computed: {
      ...mapState(['pageStatus']),
      disabled () {
        return this.pageStatus !== 1
      }
    },
    watch: {
      items () {
        this.createForm()
      }
    },
    created () {
      this.createForm()
    },
    methods: {
      createForm () {
        const rules = {}
        const form = {}
        this.items.forEach((item) => {
          form[item.labelKey] = item.value || null
          rules[item.labelKey] = [{
            required: true, message: '请输入必填项', trigger: 'change'
          }]
        })
        this.form = form
        this.rules = rules
      },
      change (index, value) {
        this.items[index].value = value
        bus.$emit('customLabelValid')
      },
      valid () {
        let flag = true
        this.$refs.form.validate((valid) => {
          if (!valid) {
            flag = false
          }
        })
        return flag
      }
    }
  }
</script>

<style type="text/scss" lang="scss" scoped>

</style>
