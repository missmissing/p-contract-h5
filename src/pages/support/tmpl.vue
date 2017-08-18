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
                v-model="tplType"
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
                v-model="form.contentModule"
                :props="{key: 'id',label: 'moduleName'}"
                :data="modulesData">
              </el-transfer>
            </div>
            <div>
              <quill-editor
                v-model="form.content"
                ref="myQuillEditor"
                :options="editorOption">
              </quill-editor>
            </div>
          </el-col>
          <el-col :span="12" :offset="1">
            <div class="row pre-title">预览</div>
            <div class="preview">
              <div v-html="header" class="header"></div>
              <div v-html="form.content"></div>
              <div v-html="footer" class="footer"></div>
            </div>
          </el-col>
        </el-row>
        <div class="mt20">
          <el-button type="primary" @click="save">保 存</el-button>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
  import _ from 'lodash';
  import {mapMutations} from 'vuex';
  import {quillEditor} from 'vue-quill-editor';
  import {routerNames} from '@/core/consts';
  import * as types from '../../store/consts';
  import supportModel from '../../api/support';

  export default {
    data() {
      return {
        form: {
          contentModule: [],
          content: ''
        },
        tplType: '',
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
        supportModel.getTmplTypes({}).then((res) => {
          this.options = res.data.dataMap;
        });
      },
      getModuleData() {
        supportModel.getModuleData({}).then((res) => {
          this.modulesData = res.data.dataMap;
        });
      },
      setData() {
        const {tplInfo} = this.$store.state.support;
        Object.keys(this.form).forEach((key) => {
          if (tplInfo.hasOwnProperty(key)) {
            if (key === 'contentModule') {
              this.form[key] = tplInfo[key].map(item => item.id);
            } else {
              this.form[key] = tplInfo[key];
            }
          }
        });
      },
      setModulesData(type) {
        const value = this.form.contentModule;
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
      save() {
        this[types.SET_INFO]({
          info: this.form
        });
        this.back();
      },
      back() {
        this.$emit('update:showTmpl', false);
      },
      ...mapMutations([
        types.SET_INFO
      ])
    },
    watch: {
      ['tplType']() {
        const options = this.options;
        if (!options.length) {
          return;
        }
        const option = _.find(options, (o) => {
          return o.value === this.form.tplType;
        });
        this.form.contentModule = option.contentModule;
      },
      $route() {
        const id = this.$route.params.id;
        if (!id) {
          Object.assign(this.form, {
            tplType: '',
            contentModule: [],
            content: ''
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
      if (routerNames.con_tpl_see === this.$route.name) {
        this.setData();
      }
    }
  };
</script>
