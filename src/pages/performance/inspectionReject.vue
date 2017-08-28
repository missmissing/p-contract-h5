<style type="text/scss" lang="scss" scoped>
  .form-container {

  }
</style>

<template>
  <div class="form-container">
    <div>
      <el-card>
        <div slot="header">
          <span class="common-title">基本信息</span>
        </div>
        <div class="basic-info">
          <el-form label-width="120px">
            <el-row>
              <el-col :span="8">
                <el-form-item label="采购订单编号">
                  <el-input
                    icon="search"
                    placeholder="匹配前，先点击图标进行搜索"
                    v-model="form.prCode"
                    :on-icon-click="search">
                  </el-input>
                </el-form-item>
              </el-col>
              <el-button type="info" class="ml20">详 情</el-button>
            </el-row>
            <el-row>
              <el-col :span="6">
                <el-form-item label="业务经办人">
                  <el-input disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="业务部门">
                  <el-input disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="合同编号">
                  <el-input disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="合同模式">
                  <el-input disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="合同版本">
                  <el-input disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="合同类型">
                  <el-input disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="所属项目">
                  <el-input disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="验收责任人">
                  <el-input disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="合同生效日期">
                  <el-input disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="合同终止日期">
                  <el-input disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="合同验收日期">
                  <el-date-picker
                    style="width:100%;"
                    v-model="form.checkDate"
                    type="date"
                    :editable="false"
                    placeholder="选择日期">
                  </el-date-picker>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </el-card>
      <el-card>
        <div slot="header">
          <span class="common-title">不合格事项</span>
        </div>
        <div class="nonconformity-info">
          <div class="mb20">
            <el-button type="primary" @click="addItem">新 增</el-button>
          </div>
          <el-table
            :data="form.nonconformity"
            border
            style="width: 100%">
            <el-table-column
              type="index"
              label="序号"
              width="80">
            </el-table-column>
            <el-table-column
              prop="acceptRequire"
              label="验收要素">
              <template scope="scope">
                <el-input v-model="scope.row.acceptRequire"></el-input>
              </template>
            </el-table-column>
            <el-table-column
              prop="referStandar"
              label="参考标准">
              <template scope="scope">
                <el-input v-model="scope.row.referStandar"></el-input>
              </template>
            </el-table-column>
            <el-table-column
              prop="inspectResult"
              label="检查结果">
              <template scope="scope">
                <el-input v-model="scope.row.inspectResult"></el-input>
              </template>
            </el-table-column>
            <el-table-column
              prop="remark"
              label="备注">
              <template scope="scope">
                <el-input v-model="scope.row.remark"></el-input>
              </template>
            </el-table-column>
            <el-table-column
              fixed="right"
              label="操作"
              width="100">
              <template scope="scope">
                <el-button
                  @click.native.prevent="deleteRow(scope.$index, form.serverData)"
                  type="text"
                  size="small">
                  移除
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-card>
      <el-card>
        <div slot="header">
          <span class="common-title">处理结论</span>
        </div>
        <div class="handle-info">
          <el-form label-width="120px">
            <el-form-item label="">
              <el-radio class="radio" v-model="form.radio" label="1">继续履行</el-radio>
              <el-radio class="radio" v-model="form.radio" label="2">变更合同</el-radio>
              <el-radio class="radio" v-model="form.radio" label="3">按验收实际结果履行合同</el-radio>
              <el-radio class="radio" v-model="form.radio" label="4">转合同违约处理</el-radio>
            </el-form-item>
            <el-form-item label="不合格原因">
              <el-input
                type="textarea"
                :maxlength="300"
                :autosize="{ minRows: 2 }"
                resize="none"
                v-model="form.reason">
              </el-input>
            </el-form-item>
            <el-form-item label="处理方案">
              <el-input
                type="textarea"
                :maxlength="300"
                :autosize="{ minRows: 2 }"
                resize="none"
                v-model="form.handleResult">
              </el-input>
            </el-form-item>
            <el-form-item label="相关附件">
              <el-upload
                action="https://jsonplaceholder.typicode.com/posts/"
                :on-remove="handleRemove"
                :file-list="form.fileList">
                <el-button size="small" type="primary">点击上传</el-button>
              </el-upload>
            </el-form-item>
          </el-form>
        </div>
      </el-card>
    </div>
    <div class="mt20 mb20 ml20">
      <el-button>保 存</el-button>
      <el-button type="primary">提 交</el-button>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        form: {
          prCode: '',
          checkDate: '',
          nonconformity: [],
          radio: '1',
          reason: '',
          handleResult: '',
          fileList: []
        }
      }
    },
    methods: {
      search() {
        console.log(this.form.prCode)
      },
      addItem() {
        this.form.nonconformity = [...this.form.nonconformity, {
          acceptRequire: '',
          referStandar: '',
          inspectResult: '',
          remark: ''
        }]
      },
      handleRemove(file, fileList) {
        console.log(file, fileList)
      }
    }
  }
</script>
