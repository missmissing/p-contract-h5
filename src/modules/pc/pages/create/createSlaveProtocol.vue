<style scope>
  .createSlaveProtocal .errorMsg {
    color: red;
    font-style: normal;
    font-size: 12px;
    margin-left: 20px;
  }

  .createSlaveProtocal table {
    width: 100% !important;
  }

  .createSlaveProtocal .el-table__expanded-cell {
    z-index: 1
  }
</style>
<template>
  <div class="createSlaveProtocal">
    <div class="mb10 clearfix" v-if="procInstId">
      <div class="fr">流程编号 {{procInstId}}</div>
      <div class="fl" style="font-weight: bolder">{{procTitle}}</div>
    </div>
    <el-card v-if="operateType==='create'">
      <!--<header slot="header">合同查询</header>-->
      <el-form rel="queryContractForm" :model="queryContractForm" label-width="100px" :rules="queryContractForm.rules">
        <el-row>
          <el-col :span="8">
            <el-form-item label="合同编号" prop="code">
              <el-input v-model="queryContractForm.code" placeholder="请输入合同编号"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4" :offset="1" v-if="operateType==='create'">
            <el-button :disabled="!queryContractForm.code" type="primary" @click="handleQuery(queryContractForm.code)">
              查找
            </el-button>
          </el-col>
        </el-row>
        <!--<el-row>
          <el-button @click="handleTest">添加cks</el-button>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="活动性质" prop="testtype" :rules="[{ type: 'array', required: true, message: '请选择活动性质', trigger: 'change' }]">
              <el-checkbox-group  v-model="queryContractForm.testtype">
                <el-checkbox label="美食/餐厅线上活动" name="type"></el-checkbox>
                <el-checkbox label="地推活动" name="type"></el-checkbox>
                <el-checkbox label="线下主题活动" name="type"></el-checkbox>
                <el-checkbox label="单纯品牌曝光" name="type"></el-checkbox>
              </el-checkbox-group>
            </el-form-item>
          </el-col>
        </el-row>-->
      </el-form>
    </el-card>
    <el-card v-if="contentVisible">
      <header slot="header">基本信息</header>
      <el-form ref="baseInfoForm" :model="baseInfoForm" label-width="100px"
               :rules="baseInfoForm.rules">
        <el-row>
          <el-col :span="8" v-if="protocolNo">
            <el-form-item prop="protocolNo" label="从协议编号">
              <el-input v-model="protocolNo" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8" v-if="code">
            <el-form-item prop="code" label="关联合同编号">
              <el-input v-model="code" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-card class="mb20">
          <header slot="header">合同供应商信息<i class="errorMsg">{{baseInfoForm.supplierErrorMsg}}</i></header>
          <!--<el-button
            size="small"
            v-if="baseInfoForm.tableSupplierInfo.length<=0&&enabledInupdated"
            @click="handleAddContractSupplier" icon="plus"
            type="primary" class="mb20">新增
          </el-button>-->
          <el-table :data="baseInfoForm.tableSupplierInfo">
            <el-table-column type="index" label="序号" width="80"></el-table-column>
            <el-table-column prop="code" label="供应商编号"></el-table-column>
            <el-table-column prop="name" label="供应商名称"></el-table-column>
            <!--<el-table-column
              v-if="enabledInupdated"
              fixed="right"
              label="操作"
              width="100">
              <template scope="scope">
                <el-button
                  v-if="baseInfoForm.tableSupplierInfo[scope.$index].type"
                  @click="handleRemoveItem(scope.$index, baseInfoForm.tableSupplierInfo)"
                  type="danger" size="small">移除
                </el-button>
              </template>
            </el-table-column>-->
          </el-table>
        </el-card>
        <el-card class="mb20">
          <header slot="header">我方主体名称<i class="errorMsg">{{baseInfoForm.subjectErrorMsg}}</i></header>
          <!--<el-button size="small" type="primary" @click="handleNewSubjectName" icon="plus" v-if="enabledInupdated"
                     class="mb20">新增
          </el-button>-->
          <el-table :data="baseInfoForm.conSubjctName">
            <el-table-column prop="code" label="公司代码"></el-table-column>
            <el-table-column prop="name" label="公司名称"></el-table-column>
            <!--<el-table-column
              v-if="enabledInupdated"
              fixed="right"
              label="操作"
              width="100">
              <template scope="scope">
                <el-button
                  v-if="baseInfoForm.conSubjctName[scope.$index].type"
                  @click="handleRemoveItem(scope.$index, baseInfoForm.conSubjctName)"
                  type="danger" size="small">移除
                </el-button>
              </template>
            </el-table-column>-->
          </el-table>
        </el-card>
        <el-row>
          <el-col :span="16">
            <el-form-item label="盖章次序">
              <el-radio-group v-model="baseInfoForm.radioSealOrder" :disabled="!enabledInupdated">
                <el-radio :label="1">对方先盖章</el-radio>
                <el-radio :label="0">我方先盖章</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item v-if="baseInfoForm.radioSealOrder==0">
          <el-input
            type="textarea"
            :rows="4"
            placeholder="请输入内容"
            v-model="baseInfoForm.sealReason" :disabled="!enabledInupdated">
          </el-input>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card v-if="contentVisible&&ifShowNewSeals">
      <header slot="header">合同附件及盖章信息<i class="errorMsg">{{cardSealInfoForm.attachmentErrorMsg}}</i></header>
      <el-form rel="cardSealInfoForm" :model="cardSealInfoForm" label-width="100px" :rules="cardSealInfoForm.rules">
        <el-button size="small" type="primary" @click="handleNewOtherSealFile" icon="plus" class="mb20"
                   v-if="enabledInupdated">新增
        </el-button>
        <template v-if="cardSealInfoForm.sealAttachments.length"
                  v-for="(item,index) in cardSealInfoForm.sealAttachments">
          <el-table :data="item" :show-header="index===0?true:false" style="width:100%">
            <el-table-column type="expand" v-if="item[0].haveSale">
              <template scope="props" v-if="item[0].haveSale">
                <div v-if="item[0].haveSale" v-bind:class="{tdPd:item[0].haveSale}">
                  <el-table :data="props.row.filesSealed" class="mb20"
                            v-if="props.row.filesSealed&&props.row.filesSealed.length">
                    <el-table-column label="文件名" prop="sealFileName">
                      <template scope="scope">
                        <a
                          :href="props.row.filesSealed[scope.$index].sealFileUrl" target="_blank">{{props.row.filesSealed[scope.$index].sealFileName}}</a>
                      </template>
                    </el-table-column>
                    <el-table-column label="上传人" prop="sealFileCreatorName"></el-table-column>
                    <el-table-column label="上传时间" prop="sealFileCreateTime">
                      <template scope="scope">
                        {{props.row.filesSealed[scope.$index].sealFileCreateTime | formatDate}}
                      </template>
                    </el-table-column>
                    <el-table-column fixed="right" label="操作"
                                     v-if="props.row.filesSealed[0].operate||enabledUpdateInApprove">
                      <template scope="scope">
                        <el-button @click="handleRemoveItem(index, props.row.filesSealed)"
                                   type="danger" size="small">移除
                        </el-button>
                      </template>
                    </el-table-column>
                  </el-table>
                  <el-row>
                    <el-col :span="6">
                      <el-form-item label="用章次数" prop="saleTime">
                        <el-input :disabled="true"
                                  v-model="props.row.saleTime">
                        </el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="6">
                      <el-form-item label="打印份数" prop="printTime" class="is-required">
                        <el-input-number :disabled="!enabledUpdateInApprovePrint" size="small" :max="100"
                                         v-model="props.row.printTime"
                                         @change="handleChangeValidateForms"></el-input-number>
                      </el-form-item>
                    </el-col>
                    <el-col :span="6">
                      <el-form-item label="留存份数" prop="remainTime" class="is-required">
                        <el-input-number :disabled="!enabledUpdateInApprovePrint" size="small" :max="100"
                                         v-model="props.row.remainTime"
                                         @change="handleChangeValidateForms"></el-input-number>
                      </el-form-item>
                    </el-col>
                    <el-col :span="6" v-if="enabledUpdateInApprove">
                      <el-form-item label="用印后上传">
                        <el-upload
                          ref="uploadFileAfterSeal"
                          :data="{userId:users.userId}"
                          :show-file-list="false"
                          :action="uploadUrl"
                          :with-credentials="true"
                          :on-success="handleUploadFileAfterSealSuccess"
                          :on-error="handleUploadFileAfterSealError"
                        >
                          <el-button :disabled="!enabledUpdateInApprove||getEnabledUploadBtn(props.row.filesSealed)"
                                     size="small"
                                     type="primary" @click="handleUpload(index)">上传
                          </el-button>
                        </el-upload>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="12">
                      <el-form-item label="选择用章" prop="saleInfos" class="is-required">
                        <el-checkbox-group v-model="props.row.saleInfos" @change="handleChangeValidateForms">
                          <el-checkbox
                            :disabled="!enabledInupdated"
                            v-for="item in props.row.useSeals"
                            :label="item.id"
                            name="sealType"
                            :key="item.id">
                            {{item.name}}
                          </el-checkbox>
                        </el-checkbox-group>
                      </el-form-item>
                    </el-col>
                  </el-row>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="attachType" label="附件类型" width="150px">
              <template scope="scope">
                {{getContractAgreenmentName(item[scope.$index].attachType)}}
              </template>
            </el-table-column>
            <el-table-column prop="fileName" label="文件名称" width="200px">
              <template scope="scope">
                <a :href="item[scope.$index].fileUrl" target="_blank">{{item[scope.$index].fileName}}</a>
              </template>
            </el-table-column>
            <el-table-column prop="upload" label="上传" width="100px">
              <template scope="scope">
                <el-upload
                  :data="{userId:users.userId}"
                  :show-file-list="false"
                  :action="uploadUrl"
                  ref="uploadSealFile"
                  :with-credentials="true"
                  :on-success="handleUploadSealFileSuccess"
                  :on-error="handleUploadSealFileError"
                >
                  <el-button :disabled="!enabledInupdated||!getEnabledUploadBtnOuter(item[scope.$index].fileName)"
                             size="small" type="primary" @click="handleUploadOuter(index)">上传
                  </el-button>
                </el-upload>
              </template>
            </el-table-column>
            <el-table-column prop="haveSale" label="是否盖章" width="100px">
              <template scope="scope">
                <el-checkbox :disabled="!enabledInupdated" v-model="item[scope.$index].haveSale"
                             @change="handleChangeValidateForms"></el-checkbox>
              </template>
            </el-table-column>
            <el-table-column prop="remark" :disabled="!enabledInupdated" label="备注" width="200px">
              <template scope="scope">
                <el-input
                  :disabled="!enabledInupdated"
                  v-model="item[scope.$index].remark"></el-input>
              </template>
            </el-table-column>
            <el-table-column
              fixed="right"
              label="操作"
              width="80"
              v-if="enabledInupdated">
              <template scope="scope">
                <el-button
                  v-if="item[scope.$index].operate"
                  @click="handleRemoveItem(index, cardSealInfoForm.sealAttachments)"
                  type="danger" size="small">移除
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </template>
      </el-form>
    </el-card>
    <el-card v-if="contentVisible">
      <header slot="header">补充信息</header>
      <el-form rel="cardRemarkInfoForm" :model="cardRemarkInfoForm">
        <el-form-item prop="otherInstruction" label="备注">
          <el-input
            type="textarea"
            placeholder="请输入内容"
            :rows="4"
            v-model="cardRemarkInfoForm.otherInstruction" :disabled="!enabledInupdated">
          </el-input>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card class="mb20"
             v-if="cardRelatedInfoForm&&cardRelatedInfoForm.contractList&&cardRelatedInfoForm.contractList.length">
      <header slot="header">相关数据</header>
      <el-form rel="cardRelatedInfoForm" :model="cardRelatedInfoForm" label-width="100px">
        <el-table :data="cardRelatedInfoForm.contractList">
          <el-table-column type="index" label="序号" width="100px"></el-table-column>
          <el-table-column prop="contractCode" label="合同号"></el-table-column>
          <el-table-column prop="type" label="类型"></el-table-column>
          <el-table-column prop="status" label="状态"></el-table-column>
          <el-table-column prop="company" label="公司"></el-table-column>
          <el-table-column prop="startTime" label="开始时间"></el-table-column>
          <el-table-column
            fixed="right"
            label="操作"
            width="100">
            <template scope="scope">
              <el-button @click="handleContractDetail(scope.$index, scope.row)" type="text"
                         size="small">详情
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-form>
    </el-card>
    <Process :extraFn="callback.bind(this)"></Process>
    <el-row v-if="contentVisible">
      <el-col style="text-align: center" class="mt20">
        <el-button v-if="enabledInupdated" type="primary" :disabled="!enabledInupdated||!btnStatus"
                   @click="handleSubmit"
                   style="display:inline-block">提交
        </el-button>
      </el-col>
    </el-row>
    <el-dialog title="新增合同供应商信息" :visible.sync="baseInfoForm.dialogAddContractSupplier" size="small">
      <el-form :model="formContractSupplier" label-width="100px" ref="formContractSupplier"
               :rules="formContractSupplier.rules">
        <el-form-item label="供应商名称/编码" prop="search" label-width="150px">
          <el-select
            style="width:300px"
            size="small"
            v-model="formContractSupplier.search"
            filterable
            remote
            placeholder="请输入关键词搜索"
            :remote-method="getRemoteSuppliersByKeyWord"
            :loading="formContractSupplier.loading">
            <el-option
              v-for="item in formContractSupplier.suppliers"
              :key="item.companyCode"
              :label="item.company"
              :value="item.companyCode">
              <span style="float: right">{{ item.company }}</span>
              <span style="float: left; color: #8492a6; font-size: 13px">{{ item.companyCode }}</span>
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <footer slot="footer">
        <el-button @click="handleNewContractSupplierCancel('formContractSupplier')">取消</el-button>
        <el-button type="primary" @click="handleNewContractSupplier('formContractSupplier')">确定</el-button>
      </footer>
    </el-dialog>
    <el-dialog title="新增合同我方主体" :visible.sync="baseInfoForm.dialogNewSubjectVisible" size="small">
      <el-form :model="formNewSubject" label-width="100px" ref="formNewSubject"
               :rules="formNewSubject.rules">
        <el-form-item label="公司名称/编码" prop="search" label-width="150px">
          <el-select
            style="width:300px"
            size="small"
            v-model="formNewSubject.search"
            filterable
            remote
            placeholder="请输入关键词搜索"
            :remote-method="getRemoteSubjectsByKeyWord"
            :loading="formNewSubject.loading">
            <el-option
              v-for="item in formNewSubject.subjects"
              :key="item.companyCode"
              :label="item.company"
              :value="item.companyCode">
              <span style="float: right">{{ item.company }}</span>
              <span style="float: left; color: #8492a6; font-size: 13px">{{ item.companyCode }}</span>
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <footer slot="footer">
        <el-button @click="handleCancelAddNewSubject('formNewSubject')">取消</el-button>
        <el-button type="primary" @click="handleAddNewSubject('formNewSubject')">确定</el-button>
      </footer>
    </el-dialog>
  </div>
</template>
<script>
  import store from 'store';
  import _ from 'lodash';
  import Api from '../../../../api/manageContract';
  import {formatDate} from '../../../../filters/moment';
  import {downloadUrl, uploadUrl} from '../../../../api/consts';
  import Process from '../../components/process.vue';
  import {routerNames} from '../../core/consts';

  const user = store.get('user');

  export default {
    data() {
      return {
        procInstId: '', // 流程编号：
        procTitle: '', //流程名称
        queryContractForm: {
          testtype: [], //??delete
          visible: false, // 在创建从协议时控制从协议页面数据的显示与否
          code: '',
          rules: {
            code: [{required: true, message: '请输入合同编号', trigger: 'blur'}]
          }
        },
        isSubmit: false,
        users: user,
        downloadUrl,
        uploadUrl,
        id: '', //从协议id
        protocolNo: null, // 从协议编号
        code: null, //合同编号
        operateType: 'create', // 默认创建状态，query：查看
        activeTabName: 'tabBaseInfo',
        baseInfoForm: {
          tableSupplierInfo: [],
          supplierErrorMsg: '',
          subjectErrorMsg: '',
          conSubjctName: [],
          radioSealOrder: 1, // 0：我方先盖章 1：对方先盖章
          sealReason: '',
          dialogAddContractSupplier: false,
          dialogNewSubjectVisible: false,
          rules: {}
        },
        cardSealInfoForm: {
          sealAttachments: [
            /* [{
              testtype:['地推活动'],////??delte
              operate: 'add',
              id: '',
              fileName: '',
              fileUrl: '', // 合同文本类型为非模版合同时，附件类型的合同的文件下载地址
              attachType: 1, // 附件类型
              slaveProtocolNo: '0011001', // 从协议编号
              types: [
                {
                  id: 1,
                  name: '其他'
                }
              ], // 附件类型集合
              haveSale: true, // 是否用章
              remark: '',
              saleTime: 1, // 用章次数
              printTime: '', // 打印份数
              remainTime: '', // 我方留存份数
              saleInfos: [1], // 当前选中的章
              useSeals: [
                {
                  id: 1,
                  name: '公章'
                },
                {
                  id: 2,
                  name: '法人章'
                }
              ], // 章列表
              filesSealed: []// 上传的盖章后的文件信息
            }]*/
          ],
          attachmentErrorMsg: '',
          current: null, // 为上传功能保存当前所在附件列表的索引
          type: null, // 为上传功能保存当前附件类型
          rules: {
            //testtype:[{ type: 'array', required: true, message: '请选择活动性质', trigger: 'change' }]
          }
        },
        cardRemarkInfoForm: {
          otherInstruction: ''
        },
        cardRelatedInfoForm: {
          contractList: [
            /* {
              contractCode: '0001001',
              type: '类型',
              status: '状态',
              company: '公司',
              startTime: '2018-09-11'
            } */
          ]
        },
        formContractSupplier: {
          rules: {
            search: [
              {required: true, message: '请输入搜索关键字', trigger: 'blur'}
            ]
          },
          search: '',
          suppliers: [],
          loading: false
        },
        formNewSubject: {
          rules: {
            search: [
              {required: true, message: '请输入搜索关键字', trigger: 'blur'}
            ]
          },
          search: '',
          subjects: [],
          loading: false
        },
        btnStatus: true // 提交按钮状态（提交中不可用）
      };
    },
    computed: {
      contentVisible() {
        let visible = false;
        if (this.operateType === 'query') {
          visible = true;
        } else if (this.queryContractForm.visible) {
          visible = true;
        }
        return visible;
      },
      enabledInupdated() { // 在各种操作类型下，控制元素的是否可见和是否可用
        let result = false;
        if (this.operateType === 'query') {
          result = false;
        }
        if (this.operateType === 'create') {
          result = true;
        }
        return result;
      },
      ifShowNewSeals() {
        let show = false;
        if (this.enabledInupdated) {
          show = true;
        } else if (this.cardSealInfoForm.sealAttachments.length) {
          show = true;
        } else {
          show = false;
        }
        return show;
      },
      ifRole() {
        const reg = /印章保管人/g;
        return reg.test(this.users.roleName);
      },
      ifRole1() {
        const reg = /采购合同上传/g;
        return reg.test(this.users.roleName);
      },
      enabledUpdateInApprove() { //在审批阶段修改附件时，控件的状态（仅用章保管人可用）
        let enabled = false;
        if (this.operateType === 'query') {
          enabled = this.ifRole || this.ifRole1;
        }
        return enabled;
      },
      enabledUpdateInApprovePrint() { //创建可用，审批阶段且角色是用章保管人可用
        let enabled = true;
        if (this.operateType === 'query') {
          enabled = !!this.ifRole;
        }
        return enabled;
      }
    },
    mounted() {
      const query = this.$route.query;
      if (query.processData) {
        this.procInstId = JSON.parse(query.processData).procInstId;
        this.procTitle = JSON.parse(query.processData).procTitle;
        this.users.roleName = JSON.parse(query.processData).roleName;
      }
      if (this.$route.path && this.$route.path === '/ConCreate/querySlaveProtocol') {
        this.operateType = 'query';
        this.requestQueryData();
      }
    },
    components: {
      Process
    },
    methods: {
      requestQueryData() {
        Api.getAgreenmentDetail(this.$route.query.id)
          .then((data) => {
            const dataMap = data.data.dataMap;
            if (dataMap) {
              Object.assign(this, dataMap);
            }
          });
      },
      handleAddContractSupplier() {
        this.baseInfoForm.dialogAddContractSupplier = true;
      },
      getRemoteSuppliersByKeyWord(query) {
        if (query !== '') {
          this.formContractSupplier.loading = true;
          Api.getRemoteSuppliersByKeyWord({key: query})
            .then((data) => {
              this.formContractSupplier.loading = false;
              this.formContractSupplier.suppliers = data.data.dataMap || [];
            });
        } else {
          this.formContractSupplier.suppliers = [];
        }
      },
      handleNewContractSupplier(formName) {
        const curForm = this.$refs[formName];
        curForm.validate((valid) => {
          if (valid) {
            const key = this.formContractSupplier.search;
            const suppliers = this.formContractSupplier.suppliers;
            if (suppliers && suppliers.length) {
              for (let i = 0, len = suppliers.length; i < len; i += 1) {
                if (parseInt(suppliers[i].companyCode, 10) === parseInt(key, 10)) {
                  this.baseInfoForm.tableSupplierInfo = [{
                    id: suppliers[i].companyCode,
                    name: suppliers[i].company,
                    type: 'add'
                  }];
                }
              }
            }
            curForm.resetFields();
            this.baseInfoForm.dialogAddContractSupplier = false;
            if (this.isSubmit) {
              this.validateForms();
            }
          } else {
            console.log('error submit!!');
          }
        });
      },
      handleNewContractSupplierCancel(formName) {
        this.$refs[formName].resetFields();
        this.baseInfoForm.dialogAddContractSupplier = false;
      },
      handleNewSubjectName() {
        this.baseInfoForm.dialogNewSubjectVisible = true;
      },
      getRemoteSubjectsByKeyWord(query) {
        if (query !== '') {
          this.formNewSubject.loading = true;
          Api.getRemoteSubjectsByKeyWord({key: query})
            .then((data) => {
              this.formNewSubject.loading = false;
              this.formNewSubject.subjects = data.data.dataMap || [];
            });
        } else {
          this.formNewSubject.subjects = [];
        }
      },
      handleCancelAddNewSubject(formName) {
        this.$refs[formName].resetFields();
        this.baseInfoForm.dialogNewSubjectVisible = false;
      },
      handleAddNewSubject(formName) {
        const curForm = this.$refs[formName];
        curForm.validate((valid) => {
          if (valid) {
            const subjects = this.formNewSubject.subjects;
            const key = this.formNewSubject.search;
            const index = _.findIndex(this.baseInfoForm.conSubjctName, (chr) => chr.code === key);
            if (index > -1) {
              this.$message.error('这条数据已存在咯！');
              return;
            }
            if (subjects && subjects.length) {
              for (let i = 0, len = subjects.length; i < len; i += 1) {
                if (subjects[i].companyCode === key) {
                  this.baseInfoForm.conSubjctName.push({
                    id: subjects[i].companyCode,
                    name: subjects[i].company,
                    type: 'add'
                  });
                }
              }
            }

            curForm.resetFields();
            if (this.isSubmit) {
              this.validateForms();
            }
            this.baseInfoForm.dialogNewSubjectVisible = false;
          } else {
            console.log('error submit!!');
          }
        });
      },
      handleNewSealFile() {
        const item = [{
          operate: 'add',
          name: '',
          type: 1,
          code: '',
          types: [
            {
              id: 1,
              name: '其他'
            }
          ],
          isSeal: true,
          remark: ''
        }];
        this.cardSealInfoForm.sealAttachments.push(item);
      },
      handleUploadFileAfterSealSuccess(res) {
        const dataMap = res.dataMap;
        if (dataMap.fileId) {
          const index = this.cardSealInfoForm.current;
          const curentFile = this.cardSealInfoForm.sealAttachments[index];
          curentFile[0].filesSealed = [{
            sealFileId: dataMap.fileId,
            sealFileName: dataMap.fileName,
            sealFileUrl: downloadUrl + dataMap.fileId,
            sealFileCreatorName: dataMap.userName,
            sealFileCreateTime: formatDate(dataMap.createTime),
            operate: 'add'
          }];
          this.$message.success('文件上传成功');
        }
      },
      handleUploadFileAfterSealError(err, file, fileList) {
        console.log('error', err);
        console.log('file', file);
        console.log('fileList', fileList);
      },
      handleUploadSealFileSuccess(res) {
        const dataMap = res.dataMap;
        if (dataMap.fileId) {
          const index = this.cardSealInfoForm.current;
          const curentFile = this.cardSealInfoForm.sealAttachments[index];
          curentFile[0].fileId = dataMap.fileId;
          curentFile[0].fileName = dataMap.fileName;
          curentFile[0].fileUrl = downloadUrl + dataMap.fileId;
          this.$message.success('文件上传成功');
        }
      },
      handleUploadSealFileError(err, file, fileList) {
        console.log('error', err);
        console.log('file', file);
        console.log('fileList', fileList);
      },
      /* handleSave() {
        console.log('save')
      }, */
      // 验证
      /*
      * 1.供应商有且仅有一个
      * 2.我方主体至少有一个
      * 3.附件至少有一个 */

      validateForms() { // supplierErrorMsg
        return new Promise((resolve, reject) => {
          const baseInfoForm = this.baseInfoForm;
          const suppliers = baseInfoForm.tableSupplierInfo;
          const subjects = baseInfoForm.conSubjctName;
          const attachments = this.cardSealInfoForm.sealAttachments;
          if (!suppliers.length) {
            baseInfoForm.supplierErrorMsg = '合同供应商信息不能为空';
            this.$message.error('请填写完合同供应商信息再提交！');
            return;
          }
          baseInfoForm.supplierErrorMsg = '';

          if (!subjects.length) {
            baseInfoForm.subjectErrorMsg = '我方主体信息不能为空';
            this.$message.error('请填写完合同我方主体信息再提交！');
            return;
          }
          baseInfoForm.subjectErrorMsg = '';

          //验证附件的数据是否填写完整
          if (attachments && attachments.length) {
            this.cardSealInfoForm.attachmentErrorMsg = '';
            const exist = attachments.some((item) => {
              if (item[0].haveSale) {
                return !(item[0].printTime && item[0].remainTime && item[0].saleInfos.length && item[0].fileName);
              }
              return false;
            });
            if (exist) {
              this.cardSealInfoForm.attachmentErrorMsg = '请确保所有附件信息填写完整';
            }
          } else {
            this.cardSealInfoForm.attachmentErrorMsg = '合同附件及盖章信息不能为空';
          }
          if (suppliers.length === 1 && subjects.length >= 1 && !this.cardSealInfoForm.attachmentErrorMsg) {
            resolve();
          } else {
            reject();
          }
        });
      },
      handleSubmit() {
        this.btnStatus = false;
        this.isSubmit = true;
        this.validateForms().then(() => {
          this.cardSealInfoForm.sealAttachments = this.combineSealsInfo();
          const params = {};
          params.id = parseInt(this.id, 10);
          params.baseInfoForm = this.baseInfoForm;
          params.cardSealInfoForm = this.cardSealInfoForm;
          params.cardRemarkInfoForm = this.cardRemarkInfoForm;
          params.protocolNo = '';
          params.code = this.queryContractForm.code;
          Api.createAgreenment(params).then((data) => {
            this.btnStatus = true;
            if (parseInt(data.data.code, 10) === 200) {
              this.operateType = 'query';
              this.$message.success(data.data.message);
              this.$router.push({
                name: routerNames.con_index
              });
            }
          })
            .catch(() => {
              this.btnStatus = true;
            });
        }).catch(() => {
          this.btnStatus = true;
          this.$message.error('请填写完从协议信息再提交!');
        });
      },
      combineSealsInfo() {
        const sealAttachments = this.cardSealInfoForm.sealAttachments;
        const sealAttachment = [];
        if (sealAttachments && sealAttachments.length) {
          for (let i = 0, len = sealAttachments.length; i < len; i += 1) {
            const item = sealAttachments[i];
            if (item[0] && item[0].fileName) {
              sealAttachment.push(item);
            }
          }
        }
        return sealAttachment;
      },
      handleContractDetail(index, row) {
        console.log('详情', index, row);
      },
      handleChangeType(index, row) {
        row.isSeal = index !== 2;
      },
      handleNewOtherSealFile() {
        const file = [{
          operate: 'add',
          id: '',
          fileName: '',
          fileUrl: '', // 合同文本类型为非模版合同时，附件类型的合同的文件下载地址
          attachType: 1, // 附件类型
          slaveProtocolNo: '0011001', // 从协议编号
          types: [
            {
              id: 1,
              name: '其他'
            }
          ], // 附件类型集合
          haveSale: true, // 是否用章
          remark: '',
          saleTime: 1, // 用章次数
          printTime: '', // 打印份数
          remainTime: '', // 我方留存份数
          saleInfos: [], // 当前选中的章
          useSeals: [
            {
              id: 1,
              name: '公章'
            },
            {
              id: 2,
              name: '法人章'
            }
          ], // 章列表
          filesSealed: [] // 上传的盖章后的文件信息
        }];
        this.cardSealInfoForm.sealAttachments.push(file);
        if (this.isSubmit) {
          this.validateForms().catch(() => {
          });
        }
      },
      getContractAgreenmentName(id) {
        switch (id) {
          case 1:
            return '其他';
          case 2:
            return '从协议';
          case 3:
            return '合同';
          default:
            return '';
        }
      },
      getEnabledUploadBtn(items) {
        return (items && items.length > 0);
      },
      getEnabledUploadBtnOuter(fileName) {
        return !fileName;
      },
      handleUploadOuter(index) {
        this.cardSealInfoForm.current = index;
      },
      handleUpload(index) {
        this.cardSealInfoForm.current = index || 0;
      },
      handleRemoveItem(index, rows) {
        rows.splice(index, 1);
      },
      handleQuery(code) {
        Api.getUpdateInfo(code).then((data) => {
          const dataMap = data.data.dataMap;
          if (dataMap && dataMap.baseInfoForm.id) {
            this.queryContractForm.visible = true;
            if (dataMap.cardContentInfoForm.tableSupplierInfo && dataMap.cardContentInfoForm.tableSupplierInfo.length) {
              this.baseInfoForm.tableSupplierInfo = dataMap.cardContentInfoForm.tableSupplierInfo;
            }
            if (dataMap.cardContentInfoForm.conSubjctName && dataMap.cardContentInfoForm.conSubjctName.length) {
              this.baseInfoForm.conSubjctName = dataMap.cardContentInfoForm.conSubjctName;
            }
          }
        });
      },
      handleChangeValidateForms() {
        if (this.isSubmit) {
          this.validateForms().catch(() => {
            console.log('handleChangeValidateForms-fail');
          });
        }
      },
      callback(params) { //isSign:是否是加签人 isAgree:审批操作类型是否是同意
        return new Promise((resolve, reject) => {
          const {isSign, isAgree} = params;
          if (!isSign && isAgree && (this.ifRole || this.ifRole1)) {
            const sealAttachments = this.combineSealsInfo();
            const para = {};
            para.sealAttachments = sealAttachments;
            para.id = this.id;
            para.type = 2;
            para.uploadPerson = this.ifRole1;
            Api.uploadSealAttachments(para)
              .then(() => {
                resolve();
              })
              .catch(() => {
                reject();
              });
          } else {
            resolve();
          }
        });
      }
    },
    filters: {
      formatDate
    },
    watch: {
      $route() {
        const path = this.$route.path;
        if (path && path === '/ConCreate/querySlaveProtocol') {
          this.operateType = 'query';
          this.requestQueryData();
        }
        if (path && path === '/ConCreate/createSlaveProtocol') {
          this.operateType = 'create';
          const obj = {
            isSubmit: false,
            users: user,
            downloadUrl,
            uploadUrl,
            protocolNo: null, // 从协议编号
            operateType: 'create', // 默认创建状态，query：查看
            activeTabName: 'tabBaseInfo',
            baseInfoForm: {
              tableSupplierInfo: [],
              supplierErrorMsg: '',
              subjectErrorMsg: '',
              conSubjctName: [],
              radioSealOrder: 0, // 0：我方先盖章 1：对方先盖章
              sealReason: '',
              dialogAddContractSupplier: false,
              dialogNewSubjectVisible: false,
              rules: {}
            },
            cardSealInfoForm: {
              attachmentErrorMsg: '',
              sealAttachments: [],
              current: null, // 为上传功能保存当前所在附件列表的索引
              type: null // 为上传功能保存当前附件类型
            },
            cardRemarkInfoForm: {
              otherInstruction: ''
            },
            cardRelatedInfoForm: {
              contractList: [
                /* {
                 contractCode: '0001001',
                 type: '类型',
                 status: '状态',
                 company: '公司',
                 startTime: '2018-09-11'
                 } */
              ]
            },
            formContractSupplier: {
              rules: {
                search: [
                  {required: true, message: '请输入搜索关键字', trigger: 'blur'}
                ]
              },
              search: '',
              suppliers: [],
              loading: false
            },
            formNewSubject: {
              rules: {
                search: [
                  {required: true, message: '请输入搜索关键字', trigger: 'blur'}
                ]
              },
              search: '',
              subjects: [],
              loading: false
            }
          };
          Object.assign(this, obj);
        }
      }
    }
  };
</script>
