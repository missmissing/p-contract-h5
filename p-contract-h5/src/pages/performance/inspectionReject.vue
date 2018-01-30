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
          <el-form label-width="120px" :model="basicForm" :rules="basicRules" ref="basicForm">
            <el-row>
              <el-col :span="8">
                <el-form-item label="采购订单号" prop="orderNo">
                  <el-input v-model="basicForm.orderNo" icon="search" :on-icon-click="search"
                            @keyup.enter.native="search"></el-input>
                </el-form-item>
              </el-col>
              <el-button type="primary" class="ml20" v-show="toDetail.query.id">
                <router-link class="router-link-default" :to="toDetail" target="_blank">详 情</router-link>
              </el-button>
            </el-row>
            <el-row>
              <el-col :span="6">
                <el-form-item label="业务经办人">
                  <el-input :value="basicForm.businessOperatorName" disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="业务部门">
                  <el-input :value="basicForm.businessDeptName" disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="合同编号">
                  <el-input :value="basicForm.contractNo" disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="合同模式">
                  <el-input :value="basicForm.contractType" disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="合同类型">
                  <el-input :value="basicForm.contractTextType" disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="所属项目">
                  <el-input :value="basicForm.belongProject" disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="验收责任人">
                  <el-input :value="basicForm.responsibleName" disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="合同生效日期">
                  <el-input :value="basicForm.startTime | formatDate" disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="合同终止日期">
                  <el-input :value="basicForm.endTime | formatDate" disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="合同验收日期" prop="contractCheckDate">
                  <el-date-picker
                    style="width:100%;"
                    v-model="basicForm.contractCheckDate"
                    type="date"
                    :editable="false"
                    :picker-options="pickerOptions"
                    placeholder="选择日期">
                  </el-date-picker>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </el-card>
      <el-card>
        <div slot="header">
          <span class="common-title">验收信息</span>
        </div>
        <div class="checkItems-info">
          <div class="mb20">
            <el-button size="small" type="primary" @click="addItem">新 增</el-button>
          </div>
          <el-table
            :data="checkItems"
            border
            style="width: 100%">
            <el-table-column
              type="index"
              label="序号"
              width="80">
            </el-table-column>
            <el-table-column
              prop="serviceName"
              label="验收要素">
            </el-table-column>
            <el-table-column
              prop="serviceRequire"
              label="参考标准">
            </el-table-column>
            <el-table-column
              prop="checkResult"
              label="检查结果">
            </el-table-column>
            <el-table-column
              prop="remark"
              label="备注">
            </el-table-column>
            <el-table-column
              fixed="right"
              label="操作"
              width="160">
              <template slot-scope="scope">
                <el-button
                  @click.native.prevent="editRow(scope.$index,scope.row)"
                  type="primary"
                  size="small">
                  编辑
                </el-button>
                <el-button
                  v-if="!scope.row.static"
                  @click.native.prevent="deleteRow(scope.$index, checkItems)"
                  type="danger"
                  size="small">
                  移除
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-card>
      <el-card>
        <div slot="header">
          <span class="common-title">处理结论</span>
        </div>
        <div class="handle-info">
          <el-form label-width="120px" :model="handleForm" :rules="handleFormRules" ref="handleForm">
            <el-form-item label="">
              <el-radio class="radio" v-model="handleForm.schemeType" :label="0">继续履行</el-radio>
              <el-radio class="radio" v-model="handleForm.schemeType" :label="1">变更合同</el-radio>
              <el-radio class="radio" v-model="handleForm.schemeType" :label="2">按验收实际结果履行合同</el-radio>
            </el-form-item>
            <el-form-item label="不合格原因" prop="unqualifiedReason">
              <el-input
                type="textarea"
                :maxlength="300"
                v-model.trim="handleForm.unqualifiedReason">
              </el-input>
            </el-form-item>
            <el-form-item label="处理方案" prop="treatmentScheme">
              <el-input
                type="textarea"
                :maxlength="300"
                v-model.trim="handleForm.treatmentScheme">
              </el-input>
            </el-form-item>
            <el-form-item label="相关附件">
              <Upload
                :fileList.sync="fileList"
                multiple>
                <!--<div class="el-upload__tip" slot="tip">文件不超过10M</div>-->
              </Upload>
            </el-form-item>
          </el-form>
        </div>
      </el-card>
    </div>
    <div class="mt20 mb20 ml20">
      <!--<el-button>保 存</el-button>-->
      <el-button type="primary" @click="submit">提 交</el-button>
    </div>

    <el-dialog
      title="新增验收事项"
      :visible.sync="addNotQualityDialogVisible">
      <el-form
        ref="addNotQualityDialogForm"
        :model="addNotQualityDialogForm"
        :rules="qualityRules"
        label-width="80px">
        <el-form-item label="验收要求" prop="serviceName">
          <el-input
            :disabled="addNotQualityDialogForm.static"
            type="textarea"
            v-model.trim="addNotQualityDialogForm.serviceName">
          </el-input>
        </el-form-item>
        <el-form-item label="参考标准" prop="serviceRequire">
          <el-input
            :disabled="addNotQualityDialogForm.static"
            type="textarea"
            v-model.trim="addNotQualityDialogForm.serviceRequire">
          </el-input>
        </el-form-item>
        <el-form-item label="检查结果" prop="checkResult">
          <el-input
            type="textarea"
            v-model.trim="addNotQualityDialogForm.checkResult">
          </el-input>
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input
            type="textarea"
            v-model.trim="addNotQualityDialogForm.remark">
          </el-input>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="addNotQualityDialogCancel">取 消</el-button>
        <el-button type="primary" @click="addNotQualityDialogOk">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import Api from '../../api/performance';
  import Upload from '../../components/upload.vue';
  import {routerNames, contractPatternMap, contractTextTypeMap} from '../../core/consts';
  import comLoading from '../../mixins/comLoading';
  import {formatDate, formatTimeStamp} from '../../filters/moment';

  export default {
    mixins: [comLoading],
    data() {
      return {
        fileList: [],
        checkItems: [],
        pickerOptions: {
          disabledDate() {
            return true;
          }
        },
        addNotQualityDialogForm: {
          serviceName: '',
          serviceRequire: '',
          checkResult: '',
          remark: '',
          editIndex: null
        },
        editIndex: null,
        addNotQualityDialogVisible: false,
        qualityRules: {
          serviceName: [{
            required: true,
            message: '请输入验收要求',
            trigger: 'blur'
          }, {
            max: 300,
            message: '长度不超过300个字符',
            trigger: 'change'
          }],
          serviceRequire: [{
            required: true,
            message: '请输入参考标准',
            trigger: 'blur'
          }, {
            max: 300,
            message: '长度不超过300个字符',
            trigger: 'change'
          }],
          checkResult: [{
            required: true,
            message: '请输入检查结果',
            trigger: 'blur'
          }, {
            max: 300,
            message: '长度不超过300个字符',
            trigger: 'change'
          }],
          remark: [{max: 300, message: '长度不超过300个字符', trigger: 'change'}]
        },
        basicForm: {
          orderNo: '',
          contractCheckDate: '',
          businessOperatorName: '',
          businessDeptName: '',
          contractTextType: '',
          responsibleName: '',
          belongProject: '',
          startTime: '',
          endTime: '',
          contractType: '',
          contractNo: ''
        },
        basicRules: {
          orderNo: [{required: true, message: '请输入采购订单号', trigger: 'change'}],
          contractCheckDate: [{required: true, message: '请选择日期'}]
        },
        handleForm: {
          schemeType: 1,
          unqualifiedReason: '',
          treatmentScheme: '',
          files: null
        },
        handleFormRules: {
          unqualifiedReason: [{required: true, message: '请输入违约/赔付原因'}, {
            max: 300,
            message: '长度不超过300个字符'
          }],
          treatmentScheme: [{required: true, message: '请输入处理方案'}, {
            max: 300,
            message: '长度不超过300个字符'
          }]
        },
        toDetail: {name: routerNames.con_purchase_see, query: {id: ''}},
        info: {}
      };
    },
    methods: {
      search() {
        if (!this.basicForm.orderNo) {
          this.$message.warning('请输入采购订单号！');
          return;
        }
        this.comLoading();
        Api.getUnqualifiedByOrderNo({orderNo: this.basicForm.orderNo}).then((res) => {
          const data = res.data.dataMap;
          const {purchaseOrderId, checkItems} = data;
          this.toDetail.query.id = purchaseOrderId;
          this.info = data;
          if (checkItems && checkItems.length) {
            this.checkItems = checkItems.map((item) => {
              item.static = true;
              return item;
            });
          }
          this.setBasicForm();
          this.pickerOptions.disabledDate = (time) => time.getTime() < this.basicForm.startTime;
          this.comLoading(false);
        }, () => {
          this.comLoading(false);
        });
      },
      setBasicForm() {
        const {
          businessOperatorName, businessDeptName, responsibleName, belongProject, startTime, endTime, contractTextType, contractType, contractNo
        } = this.info;
        Object.assign(this.basicForm, {
          businessOperatorName,
          businessDeptName,
          responsibleName,
          belongProject,
          startTime,
          endTime,
          contractTextType: contractTextTypeMap[contractTextType],
          contractType: contractPatternMap[contractType],
          contractNo
        });
      },
      addNotQualityDialogReset() {
        this.addNotQualityDialogForm = {
          serviceName: '',
          serviceRequire: '',
          checkResult: '',
          remark: '',
          editIndex: null
        };
      },
      addNotQualityDialogOk() {
        const form = this.$refs.addNotQualityDialogForm;
        form.validate((valid) => {
          if (valid) {
            const item = {...this.addNotQualityDialogForm};
            if (this.addNotQualityDialogForm.editIndex === null) {
              this.checkItems.push(item);
            } else {
              this.checkItems.splice(this.editIndex, 1, item);
            }
            this.addNotQualityDialogReset();
            this.addNotQualityDialogVisible = false;
          } else {
            console.log('error submit!!');
          }
        });
      },
      addNotQualityDialogCancel() {
        this.addNotQualityDialogReset();
        this.addNotQualityDialogVisible = false;
      },
      addItem() {
        this.addNotQualityDialogVisible = true;
      },
      editRow(index, row) {
        this.addNotQualityDialogForm.editIndex = index;
        Object.assign(this.addNotQualityDialogForm, row);
        this.addNotQualityDialogVisible = true;
      },
      deleteRow(index, rows) {
        rows.splice(index, 1);
      },
      getResult() {
        const files = [];
        this.fileList.forEach((file) => {
          if (file.status === 'success') {
            files.push(file.fileId);
          }
        });
        this.handleForm.files = files;
        return {
          orderNo: this.info.orderNo,
          contractNo: this.info.contractNo,
          contractCheckDate: formatTimeStamp(this.basicForm.contractCheckDate),
          checkItems: this.checkItems,
          ...this.handleForm
        };
      },
      check(result) {
        let flag = false;
        this.$refs.basicForm.validate((valid) => {
          if (valid) {
            this.$refs.handleForm.validate((valid1) => {
              if (valid1) {
                const {checkItems} = result;
                if (checkItems.length) {
                  const exist = checkItems.some((item) => !item.checkResult);
                  if (exist) {
                    this.$message.warning('请填写验收信息检查结果！');
                  } else {
                    flag = true;
                  }
                }
              }
            });
          }
        });

        return flag;
      },
      submit() {
        const result = this.getResult();
        if (!this.check(result)) {
          this.$message.warning('表单信息不完整！');
          return;
        }
        this.comLoading({
          text: '正在提交中'
        });
        Api.unqualifiedSave(result).then(() => {
          this.comLoading(false);
          this.$router.push({
            name: routerNames.con_index
          });
        }, () => {
          this.comLoading(false);
        });
      }
    },
    components: {
      Upload
    },
    filters: {
      formatDate
    }
  };
</script>
