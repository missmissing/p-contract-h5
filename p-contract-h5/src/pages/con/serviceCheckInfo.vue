<template>
  <div>
    <el-card>
      <header slot="header">服务验收事项<i class="tip ml20">{{serviceCheckMsg}}</i></header>
      <el-button v-show="!disabled" size="small" type="primary" @click="visible=true" prefix-icon="el-icon-plus" class="mb10">
        添加
      </el-button>
      <el-table :data="items">
        <el-table-column type="index" label="序号" width="80">
          <template slot-scope="scope">
            {{scope.$index + 1}}
          </template>
        </el-table-column>
        <el-table-column prop="serviceName" label="服务名称"></el-table-column>
        <el-table-column prop="serviceRequire" label="验收要求"></el-table-column>
        <el-table-column prop="remark" label="备注"></el-table-column>
        <el-table-column label="操作" width="100" v-if="!disabled">
          <template slot-scope="scope">
            <el-button v-if="scope.row.addNew" @click="handleRemove(scope.$index, items)" type="danger" size="small">移除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <el-dialog title="新增服务验收事项" :visible.sync="visible">
      <el-form ref="form" :model="form" :rules="rules" label-width="100px">
        <el-form-item prop="name" label="服务名称">
          <el-input v-model="form.name" placeholder="请输入服务名称"></el-input>
        </el-form-item>
        <el-form-item prop="requirement" label="验收要求">
          <el-input v-model="form.requirement" placeholder="请输入验收要求"></el-input>
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input v-model="form.remark" placeholder="请输入备注"></el-input>
        </el-form-item>
      </el-form>
      <footer slot="footer">
        <el-button @click="handleCancelAddServiceCheck('form')">取消</el-button>
        <el-button type="primary" @click="handleAddServiceCheckItem('form')">确定</el-button>
      </footer>
    </el-dialog>
  </div>
</template>

<script>
  import {mapState} from 'vuex'

  import bus from '../../core/bus'

  export default {
    name: 'service-check-info',
    props: {
      items: Array
    },
    data () {
      return {
        visible: false,
        form: {
          name: '',
          requirement: '',
          remark: ''
        },
        rules: {
          name: [{required: true, message: '请输入服务名称', trigger: 'blur'}],
          requirement: [{required: true, message: '请输入验收要求', trigger: 'blur'}]
        }
      }
    },
    computed: {
      ...mapState(['pageStatus']),
      disabled () {
        return this.pageStatus !== 1
      },
      serviceCheckMsg () {
        if (this.items.length) {
          return null
        }
        return '请填写服务验收事项'
      }
    },
    methods: {
      handleRemove (index, rows) {
        rows.splice(index, 1)
        bus.$emit('checkInfoValid')
      },
      handleAddServiceCheckItem (formName) {
        const curForm = this.$refs[formName]
        curForm.validate((valid) => {
          if (valid) {
            const exist = this.items.some(chr => chr.name === this.form.name)
            if (exist) {
              this.$message.error('这条数据已存在咯！')
              return
            }
            this.items.push({
              serviceRequire: this.form.requirement,
              serviceName: this.form.name,
              remark: this.form.remark,
              addNew: true
            })
            curForm.resetFields()
            this.visible = false
            bus.$emit('checkInfoValid')
          }
        })
      },
      handleCancelAddServiceCheck (formName) {
        this.$refs[formName].resetFields()
        this.visible = false
      }
    }
  }
</script>

<style type="text/scss" lang="scss" scoped>

</style>
