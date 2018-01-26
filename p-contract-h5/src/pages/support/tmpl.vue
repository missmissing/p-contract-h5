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
            <div class="mb20">
              <el-select
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
            </div>
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
                  <Editor :editorId="index" :content="item.content" @onChange="onEditorChange"></Editor>
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
  </div>
</template>

<script>
  import _ from 'lodash';
  import Sortable from 'sortablejs';
  import {routerNames} from '../../core/consts';
  import getModules from '../../mixins/getModules';
  import Api from '../../api/support';

  import Editor from '../../components/editor.vue';

  export default {
    components: {
      Editor
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
        Sortable: null
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
          this.dragulaInit();
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
      dragulaInit() {
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
        if (!tplInfo) {
          return;
        }
        this.form.contentModule = tplInfo.contentModule.map(item => item.id);
        this.form.content = tplInfo.content;
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
        this.dragulaInit();
      });
    }
  };
</script>
