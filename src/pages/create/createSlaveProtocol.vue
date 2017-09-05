<template>
  <div>
    <el-card class="mb20">
      <el-tabs v-model="activeTabName" @tab-click="handleClick">
        <el-tab-pane label="基本信息" name="tabBaseInfo">
          <el-form ref="baseInfoForm" :model="baseInfoForm" label-width="100px"
                   :rules="baseInfoForm.rules">
            <el-row>
              <el-col :span="8">
                <el-form-item prop="code" label="从协议编号">
                  <el-input v-model="baseInfoForm.code" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-card class="mb20 mr20 ml20">
              <header slot="header">供应商信息</header>
              <el-button
                v-if="baseInfoForm.tableSupplierInfo.length<=0"
                @click="handleAddContractSupplier" icon="plus"
                type="primary">新增
              </el-button>
              <el-table :data="baseInfoForm.tableSupplierInfo">
                <el-table-column type="index"></el-table-column>
                <el-table-column prop="id" label="供应商编号"></el-table-column>
                <el-table-column prop="name" label="供应商名称"></el-table-column>
                <el-table-column
                  fixed="right"
                  label="操作"
                  width="100">
                  <template scope="scope">
                    <el-button
                      v-if="baseInfoForm.tableSupplierInfo[scope.$index].type"
                      @click="handleRemoveSupplier(scope.$index, cardContentInfoForm.tableSupplierInfo)"
                      type="text" size="small">移除
                    </el-button>
                  </template>
                </el-table-column>
              </el-table>
            </el-card>
            <el-card class="mb20 mr20 ml20">
              <header slot="header">我方主体名称</header>
              <el-button type="primary" @click="handleNewSubjectName" icon="plus">新增</el-button>
              <el-table :data="baseInfoForm.conSubjctName">
                <el-table-column prop="id" label="公司代码"></el-table-column>
                <el-table-column prop="name" label="公司名称"></el-table-column>
                <el-table-column
                  fixed="right"
                  label="操作"
                  width="100">
                  <template scope="scope">
                    <el-button
                      v-if="baseInfoForm.conSubjctName[scope.$index].type"
                      @click="handleRemoveSubect(scope.$index, baseInfoForm.conSubjctName)"
                      type="text" size="small">移除
                    </el-button>
                  </template>
                </el-table-column>
              </el-table>
            </el-card>
            <el-row>
              <el-col :span="16">
                <el-form-item label="盖章次序">
                  <el-radio-group v-model="baseInfoForm.radioSealOrder">
                    <el-radio :label="1">对方先盖章（默认)</el-radio>
                    <el-radio :label="0">我方先盖章</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row v-if="baseInfoForm.radioSealOrder==0">
              <el-col :span="16" style="margin-left: 100px">
                <el-input type="textarea" :rows="4" placeholder="请输入内容"
                          v-model="baseInfoForm.sealReason"></el-input>
              </el-col>
            </el-row>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="合同附件及盖章信息" name="tabSealInfo">
          <el-form rel="cardSealInfoForm" :model="cardSealInfoForm" label-width="100px">
            <el-button type="primary" @click="handleNewSealFile" icon="plus" class="mb20">新增</el-button>
            <template v-for="(item,index) in cardSealInfoForm.sealAttachments">
              <template v-if="index===0">
                <el-table :data="item">
                  <el-table-column type="expand" v-if="item[0].isSeal">
                    <template scope="props">
                      <el-row>
                        <el-col :span="6">
                          <el-form-item label="用章次数" prop="sealTimes">
                            <el-input  v-model="props.row.sealTimes"></el-input>
                          </el-form-item>
                        </el-col>
                        <el-col :span="6">
                          <el-form-item label="打印份数" prop="printTimes">
                            <el-input
                                      v-model="props.row.printTimes"></el-input>
                          </el-form-item>
                        </el-col>
                        <el-col :span="6">
                          <el-form-item label="我方留存份数" prop="retainFileNumber">
                            <el-input
                                      v-model="props.row.retainFileNumber"></el-input>
                          </el-form-item>
                        </el-col>
                        <el-col :span="6">
                          <el-form-item label="用印后上传">
                            <el-upload
                              ref="uploadFileAfterSeal"
                              action="https://jsonplaceholder.typicode.com/posts/"
                              :with-credentials="true"
                              :on-success="handleUploadFileAfterSealSuccess"
                              :on-error="handleUploadFileAfterSealError"
                            >
                              <el-button  size="small" type="primary">上传
                              </el-button>
                              </el-button>
                            </el-upload>
                          </el-form-item>
                        </el-col>
                      </el-row>
                      <el-row>
                        <el-col :span="12">
                          <el-form-item prop="useSeal">
                            <el-checkbox-group v-model="props.row.useSeal">
                              <el-checkbox
                                v-for="item in props.row.useSeals"
                                :label="item.id"
                                :key="item.id">
                                {{item.name}}
                              </el-checkbox>
                            </el-checkbox-group>
                          </el-form-item>
                        </el-col>
                      </el-row>
                    </template>
                  </el-table-column>
                  <el-table-column prop="type" label="附件类型">
                    <template scope="scope">
                      <el-select
                        :disabled="item[scope.$index].type===3"
                        size="small"
                        v-model="item[scope.$index].type">
                        <el-option
                          v-for="item in item[scope.$index].types"
                          :key="item.id"
                          :label="item.name"
                          :value="item.id">
                        </el-option>
                      </el-select>
                    </template>
                  </el-table-column>
                  <el-table-column prop="code" label="从协议编号">
                    <template scope="scope">
                      <el-input :disabled="item[scope.$index].type===3"
                                v-model="item[scope.$index].code"></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column prop="name" label="文件名称">
                    <template scope="scope">
                      <el-input :disabled="item[scope.$index].type===3"
                                v-model="item[scope.$index].name"></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column prop="upload" label="上传">
                    <template scope="scope">
                      <el-upload
                        ref="uploadSealFile"
                        action="https://jsonplaceholder.typicode.com/posts/"
                        :with-credentials="true"
                        :on-success="handleUploadSealFileSuccess"
                        :on-error="handleUploadSealFileError"
                      >
                        <el-button :disabled="item[scope.$index].type===3"
                                   size="small" type="primary">上传
                        </el-button>
                      </el-upload>
                    </template>
                  </el-table-column>
                  <el-table-column prop="isSeal" label="是否盖章">
                    <template scope="scope">
                      <el-checkbox
                        :disabled="item[scope.$index].type===3||item[scope.$index].type==2"
                        v-model="item[scope.$index].isSeal"></el-checkbox>
                    </template>
                  </el-table-column>
                  <el-table-column
                    prop="remark"
                    label="备注">
                    <template scope="scope">
                      <el-input
                        :disabled="item[scope.$index].type===3"
                        v-model="item[scope.$index].remark"></el-input>
                    </template>
                  </el-table-column>
                </el-table>
              </template>
              <template v-else>
                <el-table :show-header="false" :data="item">
                  <el-table-column type="expand" v-if="item[0].isSeal">
                    <template scope="props">
                      <el-row>
                        <el-col :span="6">
                          <el-form-item label="用章次数" prop="sealTimes">
                            <el-input :disabled="props.row.type!==1"
                                      v-model="props.row.sealTimes">
                            </el-input>
                          </el-form-item>
                        </el-col>
                        <el-col :span="6">
                          <el-form-item label="打印份数" prop="printTimes">
                            <el-input :disabled="props.row.type!==1"
                                      v-model="props.row.printTimes"></el-input>
                          </el-form-item>
                        </el-col>
                        <el-col :span="6">
                          <el-form-item label="我方留存份数" prop="retainFileNumber">
                            <el-input :disabled="props.row.type!==1"
                                      v-model="props.row.retainFileNumber"></el-input>
                          </el-form-item>
                        </el-col>
                        <el-col :span="6">
                          <el-form-item label="用印后上传">
                            <el-upload
                              ref="uploadFileAfterSeal"
                              action="https://jsonplaceholder.typicode.com/posts/"
                              :with-credentials="true"
                              :on-success="handleUploadFileAfterSealSuccess"
                              :on-error="handleUploadFileAfterSealError"
                            >
                              <el-button :disabled="props.row.type!==1" size="small"
                                         type="primary">上传
                              </el-button>
                              </el-button>
                            </el-upload>
                          </el-form-item>
                        </el-col>
                      </el-row>
                      <el-row>
                        <el-col :span="12">
                          <el-form-item prop="useSeal">
                            <el-checkbox-group v-model="props.row.useSeal">
                              <el-checkbox
                                disabled
                                v-for="item in props.row.useSeals"
                                :label="item.id"
                                :key="item.id">
                                {{item.name}}
                              </el-checkbox>
                            </el-checkbox-group>
                          </el-form-item>
                        </el-col>
                      </el-row>
                    </template>
                  </el-table-column>
                  <el-table-column prop="type" label="附件类型">
                    <template scope="scope">
                      <el-select
                        size="small"
                        v-model="item[scope.$index].type"
                        @change="handleChangeType(item[scope.$index].type,item[scope.$index])">
                        <el-option
                          v-for="item in item[scope.$index].types"
                          :key="item.id"
                          :label="item.name"
                          :value="item.id">
                        </el-option>
                      </el-select>
                    </template>
                  </el-table-column>
                  <el-table-column prop="code" label="从协议编号">
                    <template scope="scope">
                      <el-input :disabled="item[scope.$index].type===3"
                                v-model="item[scope.$index].code"></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column prop="name" label="文件名称">
                    <template scope="scope">
                      <el-input :disabled="item[scope.$index].type===3"
                                v-model="item[scope.$index].name"></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column prop="upload" label="上传">
                    <template scope="scope">
                      <el-upload
                        ref="uploadSealFile"
                        action="https://jsonplaceholder.typicode.com/posts/"
                        :with-credentials="true"
                        :on-success="handleUploadSealFileSuccess"
                        :on-error="handleUploadSealFileError"
                      >
                        <el-button :disabled="item[scope.$index].type===3"
                                   size="small" type="primary">上传
                        </el-button>
                      </el-upload>
                    </template>
                  </el-table-column>
                  <el-table-column prop="isSeal" label="是否盖章" width="50px">
                    <template scope="scope">
                      <el-checkbox
                        :disabled="item[scope.$index].type!==1"
                        v-model="item[scope.$index].isSeal"></el-checkbox>
                    </template>
                  </el-table-column>
                  <el-table-column
                    prop="remark"
                    label="备注">
                    <template scope="scope">
                      <el-input
                        :disabled="item[scope.$index].type===3"
                        v-model="item[scope.$index].remark"></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column>
                    <template v-if="item[scope.$index].operate==='add'" scope="scope">
                      <el-button @click="handleRemoveSealItem(index, cardSealInfoForm.sealAttachments)"
                                 type="text" size="small">移除
                      </el-button>
                    </template>
                  </el-table-column>
                </el-table>
              </template>
            </template>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="补充信息" name="tabRemark">
          <el-form rel="cardRemarkInfoForm" :model="cardRemarkInfoForm" label-width="100px">
            <el-card>
              <header slot="header">备注</header>
              <el-form-item prop="otherInstruction">
                <el-input style="margin-left: -100px" type="textarea" placeholder="请输入内容" :rows="6"
                          v-model="cardRemarkInfoForm.otherInstruction"></el-input>
              </el-form-item>
            </el-card>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="相关数据" name="tabRelatedData"
                     v-if="currentStage=='create'">
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
        </el-tab-pane>
      </el-tabs>
    </el-card>
    <el-row>
      <el-col :span="4" :offset="4">
        <el-button type="primary" @click="handleSave('')">保存</el-button>
      </el-col>
      <el-col :span="6">
        <el-button type="primary" @click="handlePreview" style="margin-left:33px"
                   v-if="baseInfoForm.conTextType==1">预览
        </el-button>
      </el-col>
      <el-col :span="4">
        <el-button type="primary" @click="handleSubmit">提交</el-button>
      </el-col>
    </el-row>
    <el-dialog title="新增合同供应商信息" :visible.sync="baseInfoForm.dialogAddContractSupplier" size="small">
      <el-form :model="formContractSupplier" label-width="100px" ref="formContractSupplier"
               :rules="formContractSupplier.rules">
        <el-form-item label="供应商名称／编号" prop="search" label-width="150px">
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
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <footer slot="footer">
        <el-button type="primary" @click="handleNewContractSupplier('formContractSupplier')">确定</el-button>
        <el-button type="primary" @click="handleNewContractSupplierCancel('formContractSupplier')">取消
        </el-button>
      </footer>
    </el-dialog>
    <el-dialog title="新增合同我方主体" :visible.sync="baseInfoForm.dialogNewSubjectVisible" size="small">
      <el-form :model="formNewSubject" label-width="100px" ref="formNewSubject"
               :rules="formNewSubject.rules">
        <el-form-item label="公司名称／编号" prop="search" label-width="150px">
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
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <footer slot="footer">
        <el-button type="primary" @click="handleAddNewSubject('formNewSubject')">确定</el-button>
        <el-button type="primary" @click="handleCancelAddNewSubject('formNewSubject')">取消</el-button>
      </footer>
    </el-dialog>
  </div>
</template>
<script>
  import Api from '../../api/manageContract'
  import _ from 'lodash'

  export default {
    data: function () {
      return {
        currentStage: 'create', // 目前处于创建阶段
        activeTabName: 'tabBaseInfo',
        baseInfoForm: {
          tableSupplierInfo: [
            {
              id: '001',
              name: 'name'
            }
          ],
          conSubjctName: [
            {
              id: '002',
              name: 'name'
            }
          ],
          radioSealOrder: 0, // 0：我方先盖章 1：对方先盖章
          sealReason: '',
          dialogAddContractSupplier: false,
          dialogNewSubjectVisible: false,
          rules: {}
        },
        cardSealInfoForm: {
          sealAttachments: [
            [
              {
              id: '',
              name: '文件名',
              type: 3,
              code: '0011001',
              types: [
                {
                  id: 1,
                  name: '其他'
                },
                {
                  id: 2,
                  name: '从协议'
                },
                {
                  id: 3,
                  name: '合同'
                }
              ],
              isSeal: true,
              remark: '',
              sealTimes: '',
              printTimes: '',
              retainFileNumber: '',
              sealName: '',
              ifPrint: '',
              useSeal: ['seal1', 'seal2'],
              useSeals: [
                {
                  id: 'seal1',
                  name: '公章'
                },
                {
                  id: 'seal2',
                  name: '法人章'
                },
                {
                  id: 'seal3',
                  name: '人事章'
                }
              ]

            }
            ]
          ]
        },
        cardRemarkInfoForm: {
          otherInstruction: ''
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
        cardRelatedInfoForm: {
          contractList: [
            {
              contractCode: '0001001',
              type: '类型',
              status: '状态',
              company: '公司',
              startTime: '2018-09-11'
            }
          ]
        }
      }
    },
    methods: {
      handleClick: function (tab, event) {
        console.log(tab, event)
      },
      handleAddContractSupplier() {
        this.baseInfoForm.dialogAddContractSupplier = true
      },
      handleRemoveSupplier(index, rows) {
        rows.splice(index, 1)
      },
      getRemoteSuppliersByKeyWord(query) {
        if (query !== '') {
          this.formContractSupplier.loading = true
          Api.getRemoteSuppliersByKeyWord({key: query})
            .then((data) => {
              this.formContractSupplier.loading = false
              this.formContractSupplier.suppliers = data.data.dataMap.list
            })
        } else {
          this.formContractSupplier.suppliers = []
        }
      },
      handleNewContractSupplier(formName) {
        let curForm = this.$refs[formName]
        curForm.validate((valid) => {
          if (valid) {
            let arr = this.formContractSupplier.suppliers
            let key = this.formContractSupplier.search
            for (let i = 0, len = arr.length; i < len; i++) {
              if (arr[i].id === key) {
                this.baseInfoForm.tableSupplierInfo = [{
                  id: arr[i].id,
                  name: arr[i].name,
                  type: 'add'
                }]
              }
            }
            curForm.resetFields()
            this.baseInfoForm.dialogAddContractSupplier = false
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
      handleRemoveSubect(index, rows) {
        rows.splice(index, 1)
      },
      getRemoteSubjectsByKeyWord(query) {
        if (query !== '') {
          this.formNewSubject.loading = true
          Api.getRemoteSubjectsByKeyWord({key: query})
            .then((data) => {
              this.formNewSubject.loading = false
              this.formNewSubject.subjects = data.data.dataMap.list
            })
        } else {
          this.formNewSubject.subjects = []
        }
      },
      handleAddNewSubject(formName) {
        let curForm = this.$refs[formName]
        curForm.validate((valid) => {
          if (valid) {
            let arr = this.formNewSubject.subjects
            let key = this.formNewSubject.search
            let index = _.findIndex(this.baseInfoForm.conSubjctName, function (chr) {
              return chr.id === key
            })
            if (index > -1) {
              this.$message.error('这条数据已存在咯！')
              return false
            }
            for (let i = 0, len = arr.length; i < len; i++) {
              if (arr[i].id === key) {
                this.baseInfoForm.conSubjctName.push({
                  id: arr[i].id,
                  name: arr[i].name,
                  type: 'add'
                })
              }
            }
            curForm.resetFields()
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
            },
            {
              id: 2,
              name: '从协议'
            }
          ],
          isSeal: true,
          remark: ''
          /* sealTimes: '',
           printTimes: '',
           retainFileNumber: '',
           sealName: '',
           ifPrint: '',
           useSeal: ['seal1', 'seal2'],
           useSeals: [
           {
           id: 'seal1',
           name: '公章'
           },
           {
           id: 'seal2',
           name: '法人章'
           },
           {
           id: 'seal3',
           name: '人事章'
           },
           ], */

        }]
        this.cardSealInfoForm.sealAttachments.push(item)
      },
      handleUploadFileAfterSealSuccess(res, file, fileList) {
        console.log('res', res)
        console.log('file', file)
        console.log('fileList', fileList)
      },
      handleUploadFileAfterSealError(err, file, fileList) {
        console.log('error', err)
        console.log('file', file)
        console.log('fileList', fileList)
      },
      handleUploadSealFileSuccess(res, file, fileList) {
        console.log('res', res)
        console.log('file', file)
        console.log('fileList', fileList)
      },
      handleUploadSealFileError(err, file, fileList) {
        console.log('error', err)
        console.log('file', file)
        console.log('fileList', fileList)
      },
      handleSave() {
        console.log('save')
      },
      handleSubmit() {
        /* Api.getRelatedInfo({}).then((data)=> {
         this.cardRelatedInfoForm.contractList = data.data.dataMap.contractList;
         }); */
        console.log('submit')
        /* this.$refs.baseInfoForm.validate((valid)=> {
         console.log('validate');
         if (valid) {
         const supplier = this.cardContentInfoForm.tableSupplierInfo;
         if (supplier.length > 0) {
         console.log('success');
         } else {
         this.cardContentInfoForm.errCount = supplier;
         }

         } else {
         this.$message.error('请填写完整信息再提交！');
         return false;
         }
         }); */
      },
      handleContractDetail(index, row) {
        console.log('详情', index, row)
      },
      handleRemoveSealItem(index, rows) {
        rows.splice(index, 1)
      },
      handleChangeType(index, row) {
        index===2?row.isSeal = false:row.isSeal = true;
      },
    }
  }
</script>
