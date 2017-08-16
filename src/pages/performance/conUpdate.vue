<style type="text/scss" lang="scss" scoped></style>

<template>
  <div>
    <el-card>
      <div slot="header">
        <span class="common-title">变更原因</span>
      </div>
      <div>
        <el-form label-width="120px">
          <el-row>
            <el-col :span="8">
              <el-form-item label="合同编号">
                <el-input
                  icon="search"
                  placeholder="点击图标进行搜索"
                  v-model="form.contractCode"
                  :on-icon-click="search">
                </el-input>
              </el-form-item>
            </el-col>
            <el-button type="info" class="ml20">详 情</el-button>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="变更方式">
                <el-select
                  class="wp100"
                  v-model="form.changeMode"
                  placeholder="请选择">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="新合同编号">
                <el-input disabled></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item label="备注">
            <el-input
              type="textarea"
              :maxlength="300"
              :autosize="{ minRows: 2 }"
              resize="none"
              v-model="form.remark">
            </el-input>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
    <el-card>
      <div slot="header">
        <span class="common-title">合同信息</span>
      </div>
      <div>
        <el-tabs value="1" type="card">
          <el-tab-pane label="合同基本信息" name="1">
            <template>
              合同基本信息
            </template>
          </el-tab-pane>
          <el-tab-pane label="合同内容信息" name="2">配置管理</el-tab-pane>
          <el-tab-pane label="合同财务信息" name="3">角色管理</el-tab-pane>
          <el-tab-pane label="合同验收与样品信息" name="4">定时任务补偿</el-tab-pane>
          <el-tab-pane label="备注" name="5">备注</el-tab-pane>
        </el-tabs>
      </div>
    </el-card>
  </div>
</template>

<script>


  export default {
    data() {
      return {
        form: {
          contractCode: '',
          remark: '',
          changeMode: ''
        },
        options: [{
          value: 1,
          label: '原合同有效'
        }]
      };
    },
    methods: {
      search() {
        console.log(JSON.stringify(this.form));
      }
    }
  };
</script>
