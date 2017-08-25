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
      min-height: 630px;
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
                :disabled="disabled"
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
                :data="modulesData | setItemDisabled(this)">
              </el-transfer>
            </div>
            <div>
              <quill-editor
                :disabled="disabled"
                v-model="form.content"
                ref="myQuillEditor"
                :options="editorOption">
              </quill-editor>
            </div>
          </el-col>
          <el-col :span="12" :offset="1">
            <div class="mb20 pre-title">预览</div>
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
  import {mapMutations, mapGetters} from 'vuex';
  import {quillEditor} from 'vue-quill-editor';
  import {routerNames} from '@/core/consts';
  import * as types from '../../store/consts';
  import supportModel from '../../api/support';
  import getModules from '@/mixins/getModules';

  export default {
    mixins: [getModules],
    data() {
      return {
        form: {
          contentModule: [],
          content: ''
        },
        header: '',
        footer: '',
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
      },
      tplInfo: Object
    },
    methods: {
      getTmplTypes() {
//        supportModel.getTmplTypes({}).then((res) => {
//          this.options = res.data.dataMap;
//        });
        this.options = [{
          value: '',
          label: '自定义',
          contentModule: ''
        }];
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
      tplType() {
        const options = this.options;
        if (!options.length) {
          return;
        }
        const option = _.find(options, (o) => {
          return o.value === this.form.tplType;
        });
        this.form.contentModule = option.contentModule;
      },
      tplInfo() {
        const tplInfo = this.tplInfo;
        if (!tplInfo) {
          return;
        }
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
      ['form.contentModule']() {
        const value = this.form.contentModule;
        const modulesData = this.modulesData;
        if (!value.length || !modulesData.length) {
          return [];
        }

        const header = [];
        const footer = [];
        value.forEach((key) => {
          const module = _.find(modulesData, (o) => {
            return o.id === key;
          });
          const content = module.moduleContent;
          if (module.moduleType === 1) {
            header.push(content);
          } else if (module.moduleType === 2) {
            footer.push(content);
          }
        });
        this.header = header.join('');
        this.footer = footer.join('');
      }
    },
    computed: {
      disabled() {
        return [routerNames.con_tpl_see, routerNames.con_tpl_abolish].indexOf(this.$route.name) > -1;
      }
    },
    components: {
      quillEditor
    },
    created() {
      this.getTmplTypes();
    },
    filters: {
      setItemDisabled(items, self) {
        if (self.disabled) {
          return items.map((item) => {
            const newItem = Object.assign({}, item);
            newItem.disabled = true;
            return newItem;
          });
        }
        return items;
      }
    }
  };
</script>
