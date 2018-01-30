<style type="text/scss" lang="scss" scoped>
  .tmpl-container {
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
      font-size: 11px;
      .title {
        text-align: center;
        font-size: 18px;
        margin-bottom: 20px;
      }
      .header {
        margin-bottom: 20px;
        &:after {
          content: '';
          clear: both;
          display: table;
        }
      }
      .content {
        white-space: pre-wrap;
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
            <el-row>
              <el-select
                class="mr10"
                :disabled="disabled"
                v-model="tplType"
                placeholder="请选择">
                <el-option
                  v-for="item in options"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
              <Dropdown class="mr10" :datas="staticLabels" @command="chooseStaticLabel">
                <el-button type="primary">
                  固定标签<i class="el-icon-arrow-down ml10"></i>
                </el-button>
              </Dropdown>
              <Dropdown splitButton type="primary" :datas="customLabels" @click="dialogVisible=true"
                        @command="chooseCustomLabel">
                <i class="el-icon-plus mr10"></i>自定义标签
              </Dropdown>
            </el-row>
            <div class="mb20">
              <!--<el-transfer
                :titles="['可选模块', '已选模块']"
                v-model="contentModule"
                :props="{key: 'id',label: 'moduleName'}"
                :data="modulesData | setItemDisabled(this)">
              </el-transfer>-->
            </div>
            <div>
              <el-tabs v-model="editableTabsValue" type="card" addable @edit="handleTabsEdit">
                <el-tab-pane
                  :key="item.name"
                  v-for="(item, index) in editableTabs"
                  :label="item.title"
                  :name="item.name"
                  :closable="index!==0"
                >
                  <span class="drag-elements" slot="label" v-if="index!==0">{{item.title}}</span>
                  <Editor :editorId="item.name" :content="item.content" @onChange="onEditorChange"
                          :ref="`editor-${item.name}`"></Editor>
                </el-tab-pane>
              </el-tabs>
            </div>
          </el-col>
          <el-col :span="12" :offset="1">
            <div class="mb20 pre-title">预览</div>
            <div class="preview">
              <div class="title">合同</div>
              <div v-html="header" class="header"></div>
              <div v-html="previewContent" class="content"></div>
              <div v-html="footer" class="footer"></div>
            </div>
          </el-col>
        </el-row>
      </div>
    </el-card>
    <el-button class="mt20 ml20" type="primary" @click="save">返 回</el-button>
    <el-dialog
      title="添加自定义标签"
      :visible.sync="dialogVisible"
      size="tiny">
      <el-form :model="customLabelForm" :rules="customLabelRules" ref="customLabelForm" label-width="100px">
        <el-form-item label="标签名称" prop="name">
          <el-input v-model="customLabelForm.name"></el-input>
        </el-form-item>
        <el-form-item label="标签描述" prop="description">
          <el-input type="textarea" v-model="customLabelForm.description"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addCustomLabel">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import _ from 'lodash';
  import Sortable from 'sortablejs';
  import {routerNames} from '../../core/consts';
  import getModules from '../../mixins/getModules';
  import Api from '../../api/support';

  import Editor from '../../components/editor.vue';
  import Dropdown from '../../components/dropdown.vue';

  export default {
    components: {
      Editor,
      Dropdown
    },
    mixins: [getModules],
    data() {
      return {
        contentModule: [],
        header: '',
        footer: '',
        tplType: '',
        options: [],
        editableTabsValue: '0',
        editableTabs: [
          {
            title: '正文',
            name: '0',
            content: ''
          }
        ],
        Sortable: null,
        dialogVisible: false,
        staticLabels: [],
        customLabels: [],
        customLabelForm: {
          name: '',
          description: ''
        },
        customLabelRules: {
          name: [{required: true, message: '请填写标签名称'}]
        }
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
        Api.getTmplTypes({}).then((res) => {
          this.options = res.data.dataMap;
        });
      },
      onEditorChange(html, editor) {
        const id = editor.$textContainerElem[0].id;
        const index = id.split('-')[1];
        this.editableTabs.some((item, i) => {
          if (i === +index) {
            const obj = Object.assign({}, item);
            obj.content = html;
            this.editableTabs.splice(i, 1, obj);
            return true;
          }
          return false;
        });
      },
      handleTabsEdit(targetName, action) {
        if (action === 'add') {
          const len = `${this.editableTabs.length}`;
          this.editableTabs.push({
            title: '附件',
            name: len,
            content: ''
          });
          this.editableTabsValue = len;
        }
        if (action === 'remove') {
          const tabs = this.editableTabs;
          let activeName = this.editableTabsValue;
          if (activeName === targetName) {
            tabs.some((tab, index) => {
              if (tab.name === targetName) {
                const nextTab = tabs[index + 1] || tabs[index - 1];
                if (nextTab) {
                  activeName = nextTab.name;
                }
                return true;
              }
              return false;
            });
          }

          this.editableTabsValue = activeName;
          this.editableTabs = tabs.filter(tab => tab.name !== targetName);
        }
        this.$nextTick(() => {
          this.sortInit();
        });
      },
      save() {
        if (!this.disabled) {
          const content = this.editableTabs.map(item => item.content.replace(/\s/g, '&nbsp;'));
          const form = {...this.form, content};
          this.$emit('getData', form);
        }
        this.back();
      },
      back() {
        this.$emit('update:showTmpl', false);
      },
      sortInit() {
        const t = this;
        if (this.Sortable) {
          this.Sortable.destroy();
        }
        const container = document.querySelector('.el-tabs__nav');
        const ignoreElem = container.firstChild;
        this.Sortable = Sortable.create(container, {
          handle: '.drag-elements',
          onEnd(evt) {
            const {newIndex, oldIndex} = evt;
            if (newIndex !== oldIndex) {
              const editableTabs = t.editableTabs.slice(0);
              const item = editableTabs.splice(oldIndex, 1);
              editableTabs.splice(newIndex, 0, item[0]);
              t.editableTabs = editableTabs;
            }
          },
          onMove(evt) {
            return ignoreElem !== evt.related;
          }
        });
      },
      chooseStaticLabel(item) {
        console.log('选中固定标签', item);
      },
      addCustomLabel() {
        const form = this.$refs.customLabelForm;
        form.validate((valid) => {
          if (!valid) {
            return;
          }
          this.customLabels.unshift({
            label: this.customLabelForm.name
          });
          form.resetFields();
          this.dialogVisible = false;
        });
      },
      chooseCustomLabel(item) {
        console.log('选中自定义标签', item);
        const currentEditor = this.$refs[`editor-${this.editableTabsValue}`][0];
        currentEditor.editor.cmd.do('insertHTML', item.label);
      }
    },
    watch: {
      modulesData() {
        this.getTmplTypes();
      },
      options() {
        this.tplType = this.options[0].id;
      },
      tplType() {
        const options = this.options;
        if (!options.length) {
          return;
        }
        const option = _.find(options, (o) => o.id === this.tplType);
        this.contentModule = option.moduleIds;
      },
      tplInfo() {
        const tplInfo = this.tplInfo;
        if (!Object.keys(tplInfo).length) {
          return;
        }
        this.contentModule = tplInfo.contentModule.map(item => item.id);
        this.editableTabs[0].content = tplInfo.content;
      },
      contentModule(val) {
        const modulesData = this.modulesData;
        if (!val.length || !modulesData.length) {
          return;
        }
        const header = [];
        const footer = [];
        val.forEach((key) => {
          const module = _.find(modulesData, (o) => o.id === key);
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
      },
      previewContent() {
        return this.editableTabs.map(item => item.content).join('');
      }
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
    },
    mounted() {
      this.$nextTick(() => {
        this.sortInit();
      });
    }
  };
</script>
