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
</style>
<template>
  <div class="createSlaveProtocal">
    <!--<el-card>
      <header slot="header">多层table测试</header>
      <el-form rel="testForm" :model="testForm" :rules="testForm.rules">
        <template v-for="(item,index) in testForm.tableData">
          <el-table :data="item">
            <el-table-column type="expand">
              <template scope="props">
                <el-form-item prop="work" :rules="[{ type: 'array', required: true, message: '请选择用章类型', trigger: 'change' }]">
                  {{props.row.work}}
                  <el-checkbox-group v-model="props.row.work">
                    <el-checkbox label="1" name="sealType"></el-checkbox>
                    <el-checkbox label="2" name="sealType"></el-checkbox>
                  </el-checkbox-group>
                </el-form-item>
              </template>
            </el-table-column>
            <el-table-column prop="id" label="id"></el-table-column>
            <el-table-column prop="name" label="name"></el-table-column>
          </el-table>
        </template>
      </el-form>
    </el-card>
    <el-card>
      <header slot="header">table测试</header>
      <el-form rel="testForm1" :model="testForm1" :rules="testForm1.rules">
          <el-table :data="testForm1.tableData">
            <el-table-column type="expand">
              <template scope="props">
                <el-form-item prop="work" :rules="[{ type: 'array', required: true, message: '请选择用章类型', trigger: 'change' }]">
                  {{props.row.work}}
                  <el-checkbox-group v-model="props.row.work">
                    <el-checkbox label="1" name="sealType"></el-checkbox>
                    <el-checkbox label="2" name="sealType"></el-checkbox>
                  </el-checkbox-group>
                </el-form-item>
              </template>
            </el-table-column>
            <el-table-column prop="id" label="id"></el-table-column>
            <el-table-column prop="name" label="name"></el-table-column>
            <el-table-column prop="sex" label="sex">
              <template scope="scope">
                  <el-checkbox v-model="scope.row.sex"></el-checkbox>
              </template>
            </el-table-column>
          </el-table>
      </el-form>
    </el-card>-->
    <div class="mb10 clearfix" v-if="procInstId">
      <div class="fr mr20">流程编号 {{procInstId}}</div>
    </div>
    <el-card v-if="operateType==='create'">
      <header slot="header">合同查询</header>
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
                   v-if="enabledInupdated">新增</el-button>
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
                          :href="props.row.filesSealed[scope.$index].sealFileUrl">{{props.row.filesSealed[scope.$index].sealFileName}}</a>
                      </template>
                    </el-table-column>
                    <el-table-column label="上传人" prop="sealFileCreatorName"></el-table-column>
                    <el-table-column label="上传时间" prop="sealFileCreateTime"></el-table-column>
                    <el-table-column fixed="right" label="操作" v-if="props.row.filesSealed[0].operate||enabledUpdateInApprove">
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
                        <el-input  :disabled="!enabledUpdateInApprovePrint"
                                  v-model="props.row.printTime" @change="handleChangeValidateForms"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="6">
                      <el-form-item label="留存份数" prop="remainTime" class="is-required">
                        <el-input :disabled="!enabledUpdateInApprovePrint"
                                  v-model="props.row.remainTime" @change="handleChangeValidateForms"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="6">
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
                          <el-button :disabled="!getEnabledUploadBtn(props.row.filesSealed)||!enabledUpdateInApprove"
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
                <a :href="item[scope.$index].fileUrl">{{item[scope.$index].fileName}}</a>
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
                  <el-checkbox :disabled="!enabledInupdated" v-model="item[scope.$index].haveSale" @change="handleChangeValidateForms"></el-checkbox>
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
    <Process :extraFn="callback"></Process>
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
  import Api from '../../api/manageContract'
  import store from 'store'
  import {downloadUrl, uploadUrl} from '@/api/consts'
  import _ from 'lodash'
  import Process from '@/components/process.vue'
  import {routerNames} from '@/core/consts'

  const user = store.get('user')

  export default {
    data: function () {
      return {
        testForm:{
          tableData:[
            [{
              id:'1',
              name:'11',
              work:[],
              works:[{
                id:'1',
                name:'程序员'
              },
                {
                  id:'2',
                  name:'分析师'
                }]
            }]
          ],
          rules:{}
        },
        testForm1:{
          tableData:
            [{
              id:'1',
              name:'11',
              sex:null,
              work:[],
              works:[
                {
                id:'1',
                name:'程序员'
              },
                {
                  id:'2',
                  name:'分析师'
                }]
            }],
          rules:{
            sex:[{required: true, message: '请选择活动性质', trigger: 'change' }]
          }
        },
        procInstId: '', // 流程编号：
        queryContractForm: {
          testtype:[],//??delete
          visible: false, // 在创建从协议时控制从协议页面数据的显示与否
          code: '',
          rules: {
            code: [{required: true, message: '请输入合同编号', trigger: 'blur'}]
          }
        },
        isSubmit: false,
        users: user,
        downloadUrl: downloadUrl,
        uploadUrl: uploadUrl,
        protocolNo: null, // 从协议编号
        code:null,//合同编号
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
          type: null,// 为上传功能保存当前附件类型
          rules:{
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
        btnStatus: true// 提交按钮状态（提交中不可用）
      }
    },
    computed: {
      contentVisible: function () {
        let visible = false
        if (this.operateType === 'query') {
          visible = true
        } else if (this.queryContractForm.visible) {
          visible = true
        }
        return visible
      },
      enabledInupdated: function () { // 在各种操作类型下，控制元素的是否可见和是否可用
        let result = false
        if (this.operateType === 'query') {
          result = false
        }
        if (this.operateType === 'create') {
          result = true
        }
        return result
      },
      ifShowNewSeals: function () {
        let show = false
        if (this.enabledInupdated) {
          show = true
        } else {
          if (this.cardSealInfoForm.sealAttachments.length) {
            show = true
          } else {
            show = false
          }
        }
        return show
      },
      ifRole:function(){
        let ifRole=false,reg=/用章保管人/g
        reg.test(this.users.roleName)?ifRole= true:ifRole=false
        return ifRole
      },
      enabledUpdateInApprove:function(){//在审批阶段修改附件时，控件的状态（仅用章保管人可用）
        let enabled=false
        if(this.operateType==='query'){
          this.ifRole?enabled=true:enabled=false
        }
        return enabled
      },
      enabledUpdateInApprovePrint:function(){//创建可用，审批阶段且角色是用章保管人可用
        let enabled=true
        if(this.operateType==='query'){
          this.ifRole?enabled=true:enabled=false
        }
        return enabled
      },
    },
    mounted: function () {
      const query = this.$route.query
      if(query.processData){
        this.procInstId=JSON.parse(query.processData).procInstId
      }
      if (this.$route.path && this.$route.path === '/ConCreate/querySlaveProtocol') {
        this.operateType = 'query'
        this.requestQueryData()
      }
    },
    components: {
      Process
    },
    methods: {
      requestQueryData() {
        Api.getAgreenmentDetail(this.$route.query.id)
          .then((data) => {
            const dataMap = data.data.dataMap
            if (dataMap) {
              Object.assign(this, dataMap)
            }
          })
      },
      handleAddContractSupplier() {
        this.baseInfoForm.dialogAddContractSupplier = true
      },
      getRemoteSuppliersByKeyWord(query) {
        if (query !== '') {
          this.formContractSupplier.loading = true
          Api.getRemoteSuppliersByKeyWord({key: query})
            .then((data) => {
              this.formContractSupplier.loading = false
              this.formContractSupplier.suppliers = data.data.dataMap || []
            })
        } else {
          this.formContractSupplier.suppliers = []
        }
      },
      handleNewContractSupplier(formName) {
        let curForm = this.$refs[formName]
        curForm.validate((valid) => {
          if (valid) {
            let key = this.formContractSupplier.search
            const suppliers = this.formContractSupplier.suppliers
            if (suppliers && suppliers.length) {
              for (let i = 0, len = suppliers.length; i < len; i++) {
                if (parseInt(suppliers[i].companyCode) === parseInt(key)) {
                  this.baseInfoForm.tableSupplierInfo = [{
                    id: suppliers[i].companyCode,
                    name: suppliers[i].company,
                    type: 'add'
                  }]
                }
              }
            }

            console.log('this.baseInfoForm.tableSupplierInfo', this.baseInfoForm.tableSupplierInfo)
            curForm.resetFields()
            this.baseInfoForm.dialogAddContractSupplier = false
            if (this.isSubmit) {
              this.validateForms()
            }
          } else {
            console.log('error submit!!')
            return false
          }
        })
      },
      handleNewContractSupplierCancel(formName) {
        this.$refs[formName].resetFields()
        this.baseInfoForm.dialogAddContractSupplier = false
      },
      handleNewSubjectName() {
        this.baseInfoForm.dialogNewSubjectVisible = true
      },
      getRemoteSubjectsByKeyWord(query) {
        if (query !== '') {
          this.formNewSubject.loading = true
          Api.getRemoteSubjectsByKeyWord({key: query})
            .then((data) => {
              this.formNewSubject.loading = false
              this.formNewSubject.subjects = data.data.dataMap || []
            })
        } else {
          this.formNewSubject.subjects = []
        }
      },
      handleCancelAddNewSubject(formName) {
        this.$refs[formName].resetFields()
        this.baseInfoForm.dialogNewSubjectVisible = false
      },
      handleAddNewSubject(formName) {
        let curForm = this.$refs[formName]
        curForm.validate((valid) => {
          if (valid) {
            const subjects = this.formNewSubject.subjects
            const key = this.formNewSubject.search
            let index = _.findIndex(this.baseInfoForm.conSubjctName, function (chr) {
              return chr.code === key
            })
            if (index > -1) {
              this.$message.error('这条数据已存在咯！')
              return false
            }
            if (subjects && subjects.length) {
              for (let i = 0, len = subjects.length; i < len; i++) {
                if (subjects[i].companyCode === key) {
                  this.baseInfoForm.conSubjctName.push({
                    id: subjects[i].companyCode,
                    name: subjects[i].company,
                    type: 'add'
                  })
                }
              }
            }

            curForm.resetFields()
            if (this.isSubmit) {
              this.validateForms()
            }
            this.baseInfoForm.dialogNewSubjectVisible = false
          } else {
            console.log('error submit!!')
            return false
          }
        })
      },
      handleNewSealFile() {
        let item = [{
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
        }]
        this.cardSealInfoForm.sealAttachments.push(item)
      },
      handleUploadFileAfterSealSuccess(res, file, fileList) {
        const dataMap = res.dataMap

        if (dataMap.fileId) {
          const index = this.cardSealInfoForm.current
          const curentFile = this.cardSealInfoForm.sealAttachments[index]
          curentFile[0].filesSealed = [{
            sealFileId: dataMap.fileId,
            sealFileName: dataMap.fileName,
            sealFileUrl: downloadUrl + dataMap.fileId,
            sealFileCreatorName: dataMap.username,
            sealFileCreateTime: dataMap.uploadTime,
            operate: 'add'
          }]
          this.$message.success('文件上传成功')
        }
      },
      handleUploadFileAfterSealError(err, file, fileList) {
        console.log('error', err)
        console.log('file', file)
        console.log('fileList', fileList)
      },
      handleUploadSealFileSuccess(res, file, fileList) {
        const dataMap = res.dataMap
        if (dataMap.fileId) {
          const index = this.cardSealInfoForm.current
          const curentFile = this.cardSealInfoForm.sealAttachments[index]
          curentFile[0].fileId = dataMap.fileId
          curentFile[0].fileName = dataMap.fileName
          curentFile[0].fileUrl = downloadUrl + dataMap.fileId
          this.$message.success('文件上传成功')
        }
      },
      handleUploadSealFileError(err, file, fileList) {
        console.log('error', err)
        console.log('file', file)
        console.log('fileList', fileList)
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
          const baseInfoForm = this.baseInfoForm
          const suppliers = baseInfoForm.tableSupplierInfo
          const subjects = baseInfoForm.conSubjctName
          const attachments = this.cardSealInfoForm.sealAttachments
          if (!suppliers.length) {
            baseInfoForm.supplierErrorMsg = '合同供应商信息不能为空'
            this.$message.error('请填写完合同供应商信息再提交！')
            return
          } else {
            baseInfoForm.supplierErrorMsg = ''
          }
          if (!subjects.length) {
            baseInfoForm.subjectErrorMsg = '我方主体信息不能为空'
            this.$message.error('请填写完合同我方主体信息再提交！')
            return
          } else {
            baseInfoForm.subjectErrorMsg = ''
          }
          //验证附件的数据是否填写完整
          if (attachments&&attachments.length){
            for(let i=0,len=attachments.length;i<len;i++){
              const item=attachments[i]
              if(item[0].haveSale){
                if(item[0].printTime&&item[0].remainTime&&item[0].saleInfos.length){
                  this.cardSealInfoForm.attachmentErrorMsg=''
                }else{
                  this.cardSealInfoForm.attachmentErrorMsg='请确保所有附件信息填写完整'
                }
              }else{
                this.cardSealInfoForm.attachmentErrorMsg=''
              }
            }
          }else{
            this.cardSealInfoForm.attachmentErrorMsg='合同附件及盖章信息不能为空'
          }
          if (suppliers.length === 1 && subjects.length >= 1 &&!this.cardSealInfoForm.attachmentErrorMsg) {
            resolve()
          }else{
            reject()
          }
        })
      },
      handleSubmit() {
        this.btnStatus = false
        this.isSubmit = true
        this.validateForms().then(() => {
          this.cardSealInfoForm.sealAttachments = this.combineSealsInfo()
          const params = {}
          params.id = parseInt(this.id)
          params.baseInfoForm = this.baseInfoForm
          params.cardSealInfoForm = this.cardSealInfoForm
          params.cardRemarkInfoForm = this.cardRemarkInfoForm
          params.protocolNo = ''
          params.code = this.queryContractForm.code
          Api.createAgreenment(params).then((data) => {
            this.btnStatus = true
            if (parseInt(data.data.code) === 200) {
              this.operateType = 'query'
              this.$message.success(data.data.message)
              this.$router.push({
                name: routerNames.con_index
              })
            }
          })
            .catch(() => {
              this.btnStatus = true
            })
        }).catch(()=>{
          this.btnStatus = true
          this.$message.error('请填写完从协议信息再提交!')
        })
      },
      combineSealsInfo() {
        if (this.operateType !== 'query') {
          let sealAttachments = this.cardSealInfoForm.sealAttachments
          const sealAttachment = []
          if (sealAttachments && sealAttachments.length) {
            for (let i = 0, len = sealAttachments.length; i < len; i++) {
              const item = sealAttachments[i]

              if (item[0] && item[0].fileName) {
                sealAttachment.push(item)
              }
            }
          }
          return sealAttachment
        }
      },
      handleContractDetail(index, row) {
        console.log('详情', index, row)
      },
      handleChangeType(index, row) {
        index === 2 ? row.isSeal = false : row.isSeal = true
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
          filesSealed: []// 上传的盖章后的文件信息
        }]
        this.cardSealInfoForm.sealAttachments.push(file)
        if (this.isSubmit) {
          this.validateForms().catch(()=>{})
        }
      },
      getContractAgreenmentName(id) {
        switch (id) {
          case 1:
            return '其他'
          case 2:
            return '从协议'
          case 3:
            return '合同'
        }
      },
      getEnabledUploadBtn(items) {
        let enabled = true
        items && items.length >= 1 ? enabled = false : enabled = true
        return enabled
      },
      getEnabledUploadBtnOuter(fileName) {
        let enabled = true
        fileName ? enabled = false : enabled = true
        return enabled
      },
      handleUploadOuter(index) {
        this.cardSealInfoForm.current = index
      },
      handleUpload(index) {
        this.cardSealInfoForm.current = index || 0
      },
      handleRemoveItem(index, rows) {
        rows.splice(index, 1)
      },
      handleQuery(code) {
        Api.getUpdateInfo(code).then((data) => {
          const dataMap = data.data.dataMap
          if (dataMap && dataMap.baseInfoForm.id) {
            this.queryContractForm.visible = true
            if (dataMap.cardContentInfoForm.tableSupplierInfo && dataMap.cardContentInfoForm.tableSupplierInfo.length) {
              this.baseInfoForm.tableSupplierInfo = dataMap.cardContentInfoForm.tableSupplierInfo
            }
            if (dataMap.cardContentInfoForm.conSubjctName && dataMap.cardContentInfoForm.conSubjctName.length) {
              this.baseInfoForm.conSubjctName = dataMap.cardContentInfoForm.conSubjctName
            }
          }
        })
      },
      handleChangeValidateForms(){
        if(this.isSubmit){
          this.validateForms().catch(()=>{
            console.log('handleChangeValidateForms-fail');
          })
        }
      },
      callback(params){//isSign:是否是加签人 isAgree:审批操作类型是否是同意
        return new Promise((resolve,reject)=>{
          // const roleName=users.roleName//当前登陆人的角色
          // const sealAttachments = this.combineSealsInfo()
          const {isSign,isAgree}=params
          resolve()
          /*if(!isSign&&isAgree){
           Api.uploadSealAttachments(sealAttachments)
           .then((data)=>{
           const dataMap=data.data.dataMap
           if(dataMap&&dataMap.status==='200'){
           resolve()
           }
           })
           .catch(()=>{
           reject()
           })
           }*/
        })
      },
    },
    watch: {
      '$route'(to, from) {
        let path = this.$route.path
        if (path && path === '/ConCreate/querySlaveProtocol') {
          this.operateType = 'query'
          this.requestQueryData()
        }
        if (path && path === '/ConCreate/createSlaveProtocol') {
          this.operateType = 'create'
          const obj = {
            isSubmit: false,
            users: user,
            downloadUrl: downloadUrl,
            uploadUrl: uploadUrl,
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
              type: null// 为上传功能保存当前附件类型
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
          }
          Object.assign(this, obj)
        }
      }
    }
  }
</script>
