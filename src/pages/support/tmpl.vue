<style type="text/scss" lang="scss" scoped>
  .tmpl-container {
    .back {
      float: right;
      margin-top: -7px;
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
        <el-button class="back" type="primary" @click="save">返 回</el-button>
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
                v-model="form.contentModule"
                :props="{key: 'id',label: 'moduleName'}"
                :data="modulesData | setItemDisabled(this)">
              </el-transfer>-->
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
              <div class="title">合同</div>
              <div v-html="header" class="header"></div>
              <div v-html="form.content" class="content"></div>
              <div v-html="footer" class="footer"></div>
            </div>
          </el-col>
        </el-row>
      </div>
    </el-card>
  </div>
</template>

<script>
  import _ from 'lodash'
  import {mapMutations} from 'vuex'
  import {quillEditor} from 'vue-quill-editor'
  import {routerNames} from '@/core/consts'
  import * as types from '../../store/consts'
  import getModules from '@/mixins/getModules'
  import Api from '@/api/support'

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
        editorOption: {
          placeholder: '请输入内容...',
          modules: {
            toolbar: [
              [
                {'header': [1, 2, 3, 4, 5, 6, false]},
                {'align': []}
              ]
            ]
          }
        },
        previewContent: ''
      }
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
          this.options = res.data.dataMap
        })
      },
      save() {
        if (!this.disabled) {
          if (!_.trim(this.form.content)) {
            this.$message.error('请输入内容！')
            return false
          }

          if (!this.form.contentModule.length) {
            this.$message.error('请选择模块！')
            return false
          }

          this[types.SET_INFO]({
            info: this.form
          })
        }
        this.back()
      },
      back() {
        this.$emit('update:showTmpl', false)
      },
      ...mapMutations([
        types.SET_INFO
      ])
    },
    watch: {
      modulesData() {
        this.getTmplTypes()
      },
      options() {
        this.tplType = this.options[0].id
      },
      tplType() {
        const options = this.options
        if (!options.length) {
          return
        }
        const option = _.find(options, (o) => {
          return o.id === this.tplType
        })
        this.form.contentModule = option.moduleIds
      },
      tplInfo() {
        const tplInfo = this.tplInfo
        if (!tplInfo) {
          return
        }
        Object.keys(this.form).forEach((key) => {
          if (tplInfo.hasOwnProperty(key)) {
            if (key === 'contentModule') {
              this.form[key] = tplInfo[key].map(item => item.id)
            } else {
              this.form[key] = tplInfo[key]
            }
          }
        })
      },
      'form.contentModule'() {
        const value = this.form.contentModule
        const modulesData = this.modulesData
        if (!value.length || !modulesData.length) {
          return []
        }

        const header = []
        const footer = []
        value.forEach((key) => {
          const module = _.find(modulesData, (o) => {
            return o.id === key
          })
          const content = module.moduleContent
          if (module.moduleType === 1) {
            header.push(content)
          } else if (module.moduleType === 2) {
            footer.push(content)
          }
        })
        this.header = header.join('')
        this.footer = footer.join('')
      }
    },
    computed: {
      disabled() {
        return [routerNames.con_tpl_see, routerNames.con_tpl_abolish].indexOf(this.$route.name) > -1
      }
    },
    components: {
      quillEditor
    },
    filters: {
      setItemDisabled(items, self) {
        if (self.disabled) {
          return items.map((item) => {
            const newItem = Object.assign({}, item)
            newItem.disabled = true
            return newItem
          })
        }
        return items
      }
    }
  }
</script>
