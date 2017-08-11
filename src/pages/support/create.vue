<style type="text/scss" lang="scss" scoped>
  .form-container {
    .wp100 {
      width: 100%;
    }
    .line {
      text-align: center;
    }
  }
</style>

<template>
  <div>
    <div v-if="!showTmpl">
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
                  v-model="form.type"
                  placeholder="请选择"
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
                  placeholder="开始日期"
                  v-model="form.startDate"
                  @change="formatDate"
                  class="wp100"
                  :picker-options="pickerOptions"
                  :editable="false">
                </el-date-picker>
              </el-col>
              <el-col class="line" :span="2">--</el-col>
              <el-col :span="8">
                <el-input
                  v-model="form.endDate"
                  class="wp100"
                  disabled
                ></el-input>
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
              <el-button type="primary" @click="next">下一步</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-card>
    </div>
    <div v-if="showTmpl">
      <Tmpl></Tmpl>
    </div>
    <TreeModal
      nodeKey="value"
      title="选择业务类型"
      :visible.sync="visible"
      :regions="regions"
      :initialKeys="form.busiType | strToArr"
      @ok="setBusiType">
    </TreeModal>
  </div>
</template>

<script>
  import {mapMutations} from 'vuex';
  import * as types from '../../store/consts';
  import Tmpl from './tmpl.vue';
  import TreeModal from '../../components/treeModal.vue';
  import supportModel from '@/api/support';

  export default {
    data() {
      return {
        form: {
          number: '',
          name: '',
          type: '',
          startDate: '',
          endDate: '9999-12-31',
          desc: '',
          busiType: '',
          busiTypeText: '',
          files: ''
        },
        regions: [],
        pickerOptions: {
          disabledDate(time) {
            return time.getTime() < Date.now() - 8.64e7;
          }
        },
        visible: false,
        showTmpl: false
      };
    },
    methods: {
      showTreeModal() {
        this.visible = true;
      },
      formatDate(value) {
        this.form.startDate = value;
      },
      setBusiType(value, tree) {
        let busiType = [];
        let busiTypeText = [];
        const leafs = tree.getCheckedNodes(true);
        leafs.forEach((item) => {
          busiType.push(item.value);
          busiTypeText.push(item.label);
        });
        this.form.busiType = busiType.join(',');
        this.form.busiTypeText = busiTypeText.join(',');
      },
      getBusiType() {
        supportModel.getBusiType({}).then((res) => {
          this.regions = res.data.dataMap;
        });
      },
      next() {
        this[types.GET_INFO]({
          info: this.form
        });
        this.showTmpl = true;
      },
      getTmplData() {
        supportModel.getTmplData({}).then((res) => {
          const data = res.data.dataMap;
          this[types.GET_INTIALDATA]({
            initialData: data
          });
          Object.keys(this.form).forEach((key) => {
            if (data.hasOwnProperty(key)) {
              this.form[key] = data[key];
            }
          });
        });
      },
      ...mapMutations([
        types.GET_INFO,
        types.GET_INTIALDATA
      ])
    },
    computed: {
      showUpload() {
        return this.form.type === '2';
      }
    },
    components: {
      TreeModal,
      Tmpl
    },
    created() {
      const id = this.$route.params.id;
      if (id) {
        this.getTmplData();
      }

      this.getBusiType();
    },
    filters: {
      strToArr(value) {
        if (!value) {
          return [];
        }
        return value.split(',');
      }
    }
  };
</script>
