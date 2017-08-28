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
                <el-form-item label="合同签署日期">
                  <el-input disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8" :offset="1">
                <el-form-item label="合同状态">
                  <el-input disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="合同生效日期">
                  <el-input disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8" :offset="1">
                <el-form-item label="合同截止日期">
                  <el-input disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="合同中止原因">
                  <el-select
                    class="wp100"
                    v-model="form.stopReason"
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
              <el-col :span="8" :offset="1">
                <el-form-item label="实际中止日期">
                  <el-date-picker
                    style="width:100%;"
                    v-model="form.stopDate"
                    type="date"
                    placeholder="选择日期">
                  </el-date-picker>
                </el-form-item>
              </el-col>
            </el-row>
            <el-form-item label="原因说明">
              <el-input
                type="textarea"
                :maxlength="300"
                :autosize="{ minRows: 2 }"
                resize="none"
                v-model="form.desc">
              </el-input>
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
          contractCode: '',
          stopDate: '',
          stopReason: '1',
          desc: ''
        },
        options: [{
          value: '1',
          label: '合同违约中止'
        }]
      }
    },
    methods: {
      search() {
        console.log(this.form.prCode)
      }
    }
  }
</script>
