<style type="text/scss" lang="scss" scoped>
  .tmpl-container {
    .quill-editor {
      height: 280px;
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
      word-wrap: break-word;
      .header {
        margin-bottom: 20px;
        &:after {
          content: '';
          clear: both;
          display: table;
        }
      }
      .footer {
        margin-top: 20px;
      }
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
            <div class="mb20">
              <el-select
                v-model="form.tplType"
                placeholder="请选择">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </div>
            <div class="mb20">
              <el-transfer
                :titles="['可选模块', '已选模块']"
                v-model="form.moduleId"
                :props="{key: 'id',label: 'moduleName'}"
                :data="modulesData">
              </el-transfer>
            </div>
            <div>
              <quill-editor
                v-model="form.tplContent"
                ref="myQuillEditor"
                :options="editorOption">
              </quill-editor>
            </div>
          </el-col>
          <el-col :span="12" :offset="1">
            <div class="row pre-title">预览</div>
            <div class="preview">
              <div v-html="header" class="header"></div>
              <div v-html="form.tplContent"></div>
              <div v-html="footer" class="footer"></div>
            </div>
          </el-col>
        </el-row>
        <div class="mt20">
          <el-button @click="save">保 存</el-button>
          <el-button type="primary" @click="submit">提 交</el-button>
          <el-button type="info" @click="backPrev" style="margin-left:30px;">上一步</el-button>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
  import _ from 'lodash';
  import {quillEditor} from 'vue-quill-editor';
  import supportModal from '../../api/support';

  export default {
    data() {
      return {
        form: {
          tplType: '',
          moduleId: [],
          tplContent: ''
        },
        options: [],
        modulesData: [],
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
    props: {
      showTmpl: {
        default: false
      }
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
      },
      setData() {
        const initialData = this.$store.state.support.create.initialData;
        Object.keys(this.form).forEach((key) => {
          if (initialData.hasOwnProperty(key)) {
            if (key === 'moduleId') {
              this.form[key] = initialData[key].split(',');
              return;
            }
            this.form[key] = initialData[key];
          }
        });
      },
      setModulesData(type) {
        const value = this.form.moduleId;
        const modulesData = this.modulesData;
        if (!value.length || !modulesData.length) {
          return '';
        }

        const result = [];
        value.forEach((key) => {
          const module = _.find(modulesData, (o) => {
            return o.id === key;
          });
          const content = module.moduleContent;
          if (module.moduleType === type) {
            result.push(content);
          }
        });
        return result.join('');
      },
      getResult() {
        const {info} = this.$store.state.support.create;
        return {...info, ...this.form, moduleId: this.form.moduleId.join(',')};
      },
      back() { //返回列表页
        this.$router.push('/contemplate/list');
      },
      save() {
        const result = this.getResult();
        console.log('click save：' + JSON.stringify(result));
        this.back();
      },
      submit() {
        console.log('click submit');
        this.back();

      },
      backPrev() {
        this.$emit('update:showTmpl', false);
      }
    },
    watch: {
      ['form.tplType']() {
        const options = this.options;
        if (!options.length) {
          return;
        }
        const option = _.find(options, (o) => {
          return o.value === this.form.tplType;
        });
        this.form.moduleId = option.moduleId ? option.moduleId.split(',') : [];
      },
      $route() {
        const id = this.$route.params.id;
        if (!id) {
          Object.assign(this.form, {
            tplType: '',
            moduleId: [],
            tplContent: ''
          });
        }
      }
    },
    computed: {
      header() {
        return this.setModulesData(1);
      },
      footer() {
        return this.setModulesData(2);
      }
    },
    components: {
      quillEditor
    },
    created() {
      this.getTmplTypes();
      this.getModuleData();
    },
    mounted() {
      const id = this.$route.params.id;
      if (id) {
        this.setData();
      }
    }
  };
</script>
