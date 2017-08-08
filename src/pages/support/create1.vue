<style type="text/scss" lang="scss" scoped>
  .form-container {
    .wp100 {
      width: 100%;
    }
  }
</style>

<template>
  <div>
    <el-card>
      <div slot="header">
        <span class="common-title">基本信息</span>
      </div>
      <div class="form-container">
        <el-form ref="form" :model="form" label-width="80px">
          <el-form-item label="文本编号" v-if="form.number">
            <el-col :span="8">
              <el-input v-model="form.number" class="wp100" disabled></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="文本名称">
            <el-col :span="8">
              <el-input v-model.trim="form.name" class="wp100"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="文本类型">
            <el-col :span="8">
              <el-select
                v-model.number="form.type"
                placeholder="请选择"
                @change="changeType"
                class="wp100">
                <el-option label="合同模板" value="1"></el-option>
                <el-option label="合同文本" value="2"></el-option>
              </el-select>
            </el-col>
          </el-form-item>
          <el-form-item label="业务类型">
            <el-col :span="8">
              <el-input
                type="textarea"
                :value="form.busiTypeText"
                @focus="showTreeModal"
                resize="none"
                :autosize="{maxRows:6}"
                readonly>
              </el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="启用时间">
            <el-col :span="8">
              <el-date-picker
                type="date"
                placeholder="选择日期"
                v-model="form.startDate"
                @change="formatDate"
                class="wp100"
              ></el-date-picker>
            </el-col>
          </el-form-item>
          <el-form-item label="使用说明">
            <el-input
              type="textarea"
              :maxlength="300"
              :autosize="{ minRows: 2 }"
              resize="none"
              v-model="form.desc">
            </el-input>
          </el-form-item>
          <el-form-item label="文本上传" v-show="showUpload">
            <el-upload
              drag
              action=""
              multiple>
              <i class="el-icon-upload"></i>
              <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
              <div class="el-upload__tip" slot="tip">文件大小不超过10M</div>
            </el-upload>
          </el-form-item>
          <el-form-item>
            <el-button @click="save">保存草稿</el-button>
            <el-button type="primary" @click="submit">提交审批</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
    <TreeModal
      title="选择业务类型"
      :visible.sync="visible"
      :regions="regions"
      @ok="getBusiType">
    </TreeModal>
  </div>
</template>


<script>
  import TreeModal from '../../components/treeModal.vue';

  export default {
    data() {
      return {
        form: {
          number: '',
          name: '',
          type: '',
          startDate: '',
          desc: '',
          busiType: '',
          busiTypeText: '',
          files: ''
        },
        regions: [{
          value: 1,
          label: '一级 1',
          children: [{
            value: 11,
            label: '二级 1-1',
            children: [{
              value: 111,
              label: '三级 1-1-1'
            }]
          }]
        }, {
          value: 2,
          label: '一级 2',
          children: [{
            value: 21,
            label: '二级 2-1',
            children: [{
              value: 211,
              label: '三级 2-1-1'
            }]
          }, {
            value: 22,
            label: '二级 2-2',
            children: [{
              value: 221,
              label: '三级 2-2-1'
            }]
          }]
        }, {
          value: 3,
          label: '一级 3',
          children: [{
            value: 31,
            label: '二级 3-1',
            children: [{
              value: 311,
              label: '三级 3-1-1'
            }]
          }, {
            value: 32,
            label: '二级 3-2',
            children: [{
              value: 321,
              label: '三级 3-2-1'
            }]
          }]
        }],
        visible: false,
        showUpload: false
      }
    },
    methods: {
      changeType(type) {
        this.showUpload = type === 2;
      },
      showTreeModal() {
        this.visible = true;
      },
      formatDate(value) {
        this.form.startDate = value;
      },
      getBusiType(value, tree) {
        let busiType = [];
        let busiTypeText = [];
        const leafs = tree.$refs.tree.getCheckedNodes(true);
        leafs.forEach((item) => {
          busiType.push(item.value);
          busiTypeText.push(item.label);
        });
        this.form.busiType = busiType.join(',');
        this.form.busiTypeText = busiTypeText.join(',');
      },
      save() {
        console.log('submit!: ' + JSON.stringify(this.form));
      },
      submit() {
        console.log('submit!: ' + JSON.stringify(this.form));
      }
    },
    components: {
      TreeModal
    }
  };
</script>
