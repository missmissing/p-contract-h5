<template>
  <div>
    <el-card>
      <header slot="header">合同我方主体名称<i class="tip ml20">{{subjectsErrorMsg}}</i></header>
      <el-button v-if="!disabled" type="primary" size="small" @click="visible=true" prefix-icon="el-icon-plus" class="mb10">
        新增
      </el-button>
      <el-table :data="items">
        <el-table-column prop="code" label="公司代码"></el-table-column>
        <el-table-column prop="name" label="公司名称"></el-table-column>
        <el-table-column prop="applyAll" label="全公司适用" width="150" align="center">
          <template slot-scope="scope">
            <el-checkbox :disabled="!enabledAllApply(scope.row.code)" v-model="scope.row.applyAll"></el-checkbox>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="100" v-if="!disabled">
          <template slot-scope="scope">
            <el-button v-if="scope.row.addNew" @click="handleRemove(scope.$index, items)" type="danger" size="small">移除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <el-dialog title="新增合同我方主体" :visible.sync="visible">
      <el-form :model="form" label-width="100px" ref="form" :rules="rules">
        <el-form-item label="公司名称/编码" prop="search" label-width="150px">
          <el-select style="width:300px" size="small" v-model="form.search" filterable remote placeholder="请输入关键词搜索" :remote-method="getRemoteSubjectsByKeyWord" :loading="loading">
            <el-option v-for="item in subjects" :key="item.companyCode" :label="item.company" :value="item.companyCode">
              <span class="fl">{{ item.companyCode }}</span>
              <span class="fr">{{ item.company }}</span>
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <footer slot="footer">
        <el-button @click="handleCancelAddNewSubject('form')">取消</el-button>
        <el-button type="primary" @click="handleAddNewSubject('form')">确定</el-button>
      </footer>
    </el-dialog>
  </div>
</template>

<script>
  import {mapState} from 'vuex'

  import bus from '../../core/bus'
  import Api from '../../api/manageContract/index'

  export default {
    name: 'subject-info',
    props: {
      items: Array,
      contractType: Number
    },
    data () {
      return {
        visible: false,
        subjects: [],
        form: {
          search: ''
        },
        rules: {
          search: [
            {required: true, message: '请输入搜索关键字'}
          ]
        },
        loading: false
      }
    },
    computed: {
      ...mapState(['pageStatus']),
      disabled () {
        return this.pageStatus !== 1
      },
      subjectsErrorMsg () {
        if (this.disabled || this.items.length) {
          return null
        }
        return '请填写我方主体信息'
      }
    },
    methods: {
      enabledAllApply (code) {
        let enabled = false
        if (!this.disabled && code === '1001' && this.contractType >= 3) {
          enabled = true
        }
        return enabled
      },
      handleRemove (index, rows) {
        rows.splice(index, 1)
        bus.$emit('contentInfoValid')
      },
      getRemoteSubjectsByKeyWord (key) {
        if (key !== '') {
          this.loading = true
          Api.getRemoteSubjectsByKeyWord({key})
            .then((data) => {
              this.loading = false
              this.subjects = data.data.dataMap || []
            })
        } else {
          this.subjects = []
        }
      },
      handleAddNewSubject (formName) {
        const curForm = this.$refs[formName]
        curForm.validate((valid) => {
          if (valid) {
            const subjects = this.subjects
            const key = this.form.search
            const exist = this.items.some(chr => chr.code === key)
            if (exist) {
              this.$message.error('这条数据已存在咯！')
              return
            }
            subjects.some((item) => {
              if (item.companyCode === key) {
                this.items.push({
                  code: item.companyCode,
                  name: item.company,
                  applyAll: false,
                  addNew: true
                })
                bus.$emit('contentInfoValid')
                bus.$emit('getJiaBillingInfo', item)
                return true
              }
              return false
            })

            curForm.resetFields()
            this.visible = false
          }
        })
      },
      handleCancelAddNewSubject (formName) {
        this.$refs[formName].resetFields()
        this.visible = false
      }
    }
  }
</script>

<style type="text/scss" lang="scss" scoped>

</style>
