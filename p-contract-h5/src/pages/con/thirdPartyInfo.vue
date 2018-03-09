<template>
  <div>
    <el-card header="第三方信息">
      <el-button v-show="!disabled" type="primary" @click="visible=true" size="small" prefix-icon="el-icon-plus" class="mb10">
        新增
      </el-button>
      <el-table :data="items">
        <el-table-column prop="code" label="供应商编号"></el-table-column>
        <el-table-column prop="name" label="供应商名称"></el-table-column>
        <el-table-column label="操作" width="100" v-if="!disabled">
          <template slot-scope="scope">
            <el-button v-if="scope.row.addNew" @click="handleRemove(scope.$index, items)" type="danger" size="small">
              移除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <el-dialog title="第三方信息" :visible.sync="visible">
      <el-form :model="form" label-width="100px" ref="form" :rules="rules">
        <el-form-item label="供应商名称／编号" prop="search" label-width="150px">
          <el-select style="width:300px" size="small" v-model="form.search" filterable remote placeholder="请输入关键词搜索" :remote-method="getRemoteThirdPartiesByKeyWord" :loading="loading">
            <el-option v-for="item in thirdParties" :key="item.companyCode" :label="item.company" :value="item.companyCode">
              <span class="fr">{{ item.company }}</span>
              <span class="fl">{{ item.companyCode }}</span>
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <footer slot="footer">
        <el-button @click="handleCancelAddNewThirdParty('form')">取消</el-button>
        <el-button type="primary" @click="handleAddNewThirdParty('form')">确定</el-button>
      </footer>
    </el-dialog>
  </div>
</template>

<script>
  import {mapState} from 'vuex'

  import Api from '../../api/manageContract/index'

  export default {
    name: 'third-party-info',
    props: {
      items: Array
    },
    data () {
      return {
        visible: false,
        loading: false,
        thirdParties: [],
        form: {
          search: ''
        },
        rules: {
          search: [
            {required: true, message: '请输入搜索关键字'}
          ]
        }
      }
    },
    computed: {
      ...mapState(['pageStatus']),
      disabled () {
        return this.pageStatus !== 1
      }
    },
    methods: {
      handleRemove (index, rows) {
        rows.splice(index, 1)
      },
      getRemoteThirdPartiesByKeyWord (key) {
        if (key !== '') {
          this.loading = true
          Api.getRemoteSuppliersByKeyWord({key})
            .then((data) => {
              this.loading = false
              this.thirdParties = data.data.dataMap
            })
        } else {
          this.thirdParties = []
        }
      },
      handleAddNewThirdParty (formName) {
        const curForm = this.$refs[formName]
        curForm.validate((valid) => {
          if (valid) {
            const thirdParties = this.thirdParties
            const key = this.form.search
            const exist = this.items.some(chr => chr.code === key)
            if (exist) {
              this.$message.error('这条数据已存在咯！')
              return
            }
            thirdParties.some((item) => {
              if (item.companyCode === key) {
                this.items.push({
                  code: item.companyCode,
                  name: item.company,
                  addNew: true
                })
                return true
              }
              return false
            })

            curForm.resetFields()
            this.visible = false
          }
        })
      },
      handleCancelAddNewThirdParty (formName) {
        this.$refs[formName].resetFields()
        this.visible = false
      }
    }
  }
</script>

<style type="text/scss" lang="scss" scoped>

</style>
