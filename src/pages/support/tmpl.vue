<style type="text/scss" lang="scss" scoped>
  .tmpl-container {
    .row {
      margin-bottom: 20px;
      &:last-child {
        margin-bottom: 0;
      }
    }

    .quill-editor {
      height: 300px;
    }

    .pre-title {
      height: 36px;
      line-height: 36px;
      font-size: 14px;
      color: #1f2d3d;
    }

    .preview {
      padding: 15px;
      border: 1px solid #ddd;
      min-height: 646px;
    }
  }
</style>

<template>
  <div class="tmpl-container">
    <el-card>
      <div slot="header">
        <span class="common-title">模板信息</span>
      </div>
      <div>
        <el-row>
          <el-col :span="11">
            <div class="row">
              <el-select
                v-model="value"
                placeholder="请选择">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </div>
            <div class="row">
              <el-transfer
                :titles="['可选模块', '已选模块']"
                v-model="moduleId"
                :data="modulesData">
              </el-transfer>
            </div>
            <div class="row">
              <quill-editor
                v-model="content"
                ref="myQuillEditor"
                :options="editorOption">
              </quill-editor>
            </div>
          </el-col>
          <el-col :span="12" :offset="1">
            <div class="row pre-title">预览</div>
            <div class="preview">
              <div class="header" v-html="header"></div>
              <div v-html="content"></div>
              <div class="footer" v-html="footer"></div>
            </div>
          </el-col>
        </el-row>
      </div>
    </el-card>
  </div>
</template>

<script>
  import _ from 'lodash';
  import {quillEditor} from 'vue-quill-editor';
  import supportModal from '../../api/support';

  export default {
    props: {
      info: {
        default: {}
      }
    },
    data() {
      return {
        options: [],
        value: '',
        moduleId: [],
        modulesData: [],
        header: '',
        content: '',
        footer: '',
        editorOption: {
          placeholder: "请输入内容...",
          modules: {
            toolbar: [
              [
                {'header': [1, 2, 3, 4, 5, 6, false]},
                {'font': []},
                'bold',
                'italic',
                'underline',
                'strike',
                {'list': 'ordered'},
                {'list': 'bullet'},
                {'align': []},
                'link'
              ],
            ]
          }
        },
        previewContent: ''
      };
    },
    methods: {
      getTmplTypes() {
        supportModal.getTmplTypes({}).then((res) => {
          this.options = res.data.dataMap;
        });
      },
      getModuleData() {
        supportModal.getModuleData({}).then((res) => {
          this.modulesData = res.data.dataMap;
        });
      }
    },
    watch: {
      value() {
        const option = _.find(this.options, (o) => {
          return o.value === this.value;
        });
        this.moduleId = option.moduleId;
      },
      moduleId() {
        const value = this.moduleId;
        if (!value.length) {
          this.header = '';
          this.footer = '';
          return;
        }
        const header = [];
        const footer = [];
        value.forEach((key) => {
          const module = _.find(this.modulesData, (o) => {
            return o.key === key;
          });
          const content = module.content;
          if (module.type === 1) {
            header.push(content);
          } else {
            footer.push(content);
          }
        });
        this.header = header.join('');
        this.footer = footer.join('');
      }
    },
    components: {
      quillEditor
    },
    mounted() {
      this.getTmplTypes();
      this.getModuleData();
    }
  };
</script>
