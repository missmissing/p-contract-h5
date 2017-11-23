<style type="text/scss" lang="scss" scope>
  .basic-info {

  }
  .basic-info .el-table__expanded-cell {
    z-index: 1
  }
  .basic-info .errorMsg {
    color: red;
    font-style: normal;
    font-size: 12px;
    margin-left: 20px;
  }
</style>

<template>
  <div class="pd20">
    <div class="basic-info">
      <el-card>
        <el-form :model="form" :rules="rules" ref="form" label-width="120px">
          <el-row>
            <el-col :span="8">
              <el-form-item label="合同编号">
                <el-input
                  v-model="contractCode"
                  icon="search"
                  :on-icon-click="search"
                  @keyup.enter.native="search">
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-button type="primary" class="ml20" v-show="toDetail.query.contractId">
                <router-link class="router-link-default" :to="toDetail" target="_blank">详 情</router-link>
              </el-button>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="合同签署日期">
                <el-input :value="approvalDate | formatDate" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8" :offset="1">
              <el-form-item label="合同状态">
                <el-input :value="contractStatusName" disabled></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="合同生效日期">
                <el-input :value="startTime | formatDate" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8" :offset="1">
              <el-form-item label="合同截止日期">
                <el-input :value="endTime | formatDate" disabled></el-input>
              </el-form-item>
            </el-col>
            <!--<el-col :span="8">
              <el-form-item label="合同中止原因" prop="suspendReason">
                <el-select
                  class="wp100"
                  v-model="form.suspendReason"
                  placeholder="请选择">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>-->
            <el-col :span="8">
              <el-form-item label="实际中止日期" prop="suspendTime">
                <el-date-picker
                  style="width:100%;"
                  v-model="form.suspendTime"
                  type="date"
                  placeholder="选择日期"
                  :picker-options="pickerOptions">
                </el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item label="原因说明" prop="suspendRemark">
            <el-input
              type="textarea"
              :autosize="{ minRows: 2 }"
              resize="none"
              v-model.trim="form.suspendRemark">
            </el-input>
          </el-form-item>
          <el-button type="primary" @click="handleNewSealFile" size="small" icon="plus" class="mb20">
            添加附件
          </el-button>
          <i class="errorMsg">{{form.errorMsg}}</i>
          <template v-if="form.sealAttachments.length" v-for="(item,index) in form.sealAttachments">
            <el-table :data="item" :show-header="index===0?true:false">
              <el-table-column type="expand" v-if="item[0].haveSale">
                <template scope="props" v-if="item[0].haveSale">
                  <div v-if="item[0].haveSale" v-bind:class="{tdPd:item[0].haveSale}">
                    <el-row>
                      <el-col :span="6">
                        <el-form-item label="用章次数" prop="saleTime">
                          <el-input-number size="small" :disabled="true" v-model="props.row.saleTime">
                          </el-input-number>
                        </el-form-item>
                      </el-col>
                      <el-col :span="6">
                        <el-form-item label="打印份数" prop="printTime" class="el-form-item is-required">
                          <el-input-number  size="small" :max="10"
                                           v-model="props.row.printTime" @change="handleChangeValidateForms"></el-input-number>
                        </el-form-item>
                      </el-col>
                      <el-col :span="6">
                        <el-form-item label="留存份数" prop="remainTime" class="el-form-item is-required">
                          <el-input-number  size="small" :max="10"
                                           v-model="props.row.remainTime" @change="handleChangeValidateForms"></el-input-number>
                        </el-form-item>
                      </el-col>
                    </el-row>
                    <el-row>
                      <el-col :span="12">
                        <el-form-item label="选择用章" prop="saleInfos" class="is-required">
                          <el-checkbox-group v-model="props.row.saleInfos" @change="handleChangeValidateForms">
                            <el-checkbox label="1" name="sealInfo" >公章</el-checkbox>
                            <el-checkbox label="2" name="sealInfo" >法人章</el-checkbox>
                          </el-checkbox-group>
                        </el-form-item>
                      </el-col>
                    </el-row>
                  </div>
                </template>
              </el-table-column>
              <el-table-column prop="attachType" label="附件类型" width="150px">
                <template scope="scope">
                  其他
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
                    <el-button :disabled="!getEnabledUploadBtnOuter(item[scope.$index].fileName)"
                               size="small" type="primary" @click="handleUploadOuter(index)">上传
                    </el-button>
                  </el-upload>
                </template>
              </el-table-column>
              <el-table-column prop="haveSale" label="是否盖章" width="70px">
                <template scope="scope">
                  <el-checkbox
                    @change="handleChangeValidateForms"
                    v-model="item[scope.$index].haveSale"></el-checkbox>
                </template>
              </el-table-column>
              <el-table-column prop="remark" label="备注" width="200px">
                <template scope="scope">
                  <el-input
                    v-model="item[scope.$index].remark"></el-input>
                </template>
              </el-table-column>
              <el-table-column
                fixed="right"
                label="操作">
                <template scope="scope">
                  <el-button v-if="item[scope.$index].operate"
                             @click="handleRemoveAttachmentsItem(index, form.sealAttachments)"
                             type="danger" size="small">移除
                  </el-button>
                </template>
              </el-table-column>
            </el-table>
          </template>
        </el-form>
      </el-card>
    </div>
    <div class="mt20 mb20 ml20">
      <!--<el-button>保 存</el-button>-->
      <el-button type="primary" @click="submit">提 交</el-button>
    </div>
  </div>
</template>

<script>
  import Api from '@/api/manageContract'
  import {formatDate} from '@/filters/moment'
  import comLoading from '@/mixins/comLoading'
  import {routerNames} from '@/core/consts'
  import {downloadUrl, uploadUrl} from '@/api/consts'

  export default {
    mixins: [comLoading],
    data() {
      return {
        procInstId: '', //流程id
        procTitle: '', //流程名称
        users: {},
        downloadUrl: downloadUrl,
        uploadUrl: uploadUrl,
        isSubmit: false,
        form: {
          errorMsg: '',
          /*suspendReason: '',*/
          suspendTime: '',
          suspendRemark: '',
          sealAttachments: [],
          current: null // 为上传功能保存当前所在附件列表的索引
        },
        rules: {
          /*suspendReason: [
            {required: true, message: '请选择中止原因'}
          ],*/
          suspendTime: [
            {type: 'date', required: true, message: '请选择中止时间', trigger: 'change'}
          ],
          suspendRemark: [
            {required: true, message: '请填写原因说明', trigger: 'change'},
            {max: 300, message: '长度不超过300个字符', trigger: 'change'}
          ]
        },
        contractCode: '',
        approvalDate: '',
        contractStatusName: '',
        startTime: '',
        endTime: '',
        pickerOptions: {
          disabledDate(time) {
            return true
          }
        },
        options: [{value: 1, label: '合同违约中止'}, {value: 2, label: '合同变更后中止'}, {value: 3, label: '固定期限合同正常履行完成后中止'}],
        info: null,
        toDetail: {name: routerNames.con_Check, query: {contractId: ''}}
      }
    },
    methods: {
      search() {
        if (!this.contractCode) {
          this.$message.warning('请输入合同编号！')
          return
        }
        this.comLoading()
        Api.getContractDetail(this.contractCode).then((res) => {
          const data = res.data.dataMap
          this.info = data
          const {baseInfoForm, cardContentInfoForm} = data
          const {id, approvalDate, contractStatusName} = baseInfoForm
          const {startTime, endTime} = cardContentInfoForm
          this.approvalDate = approvalDate
          this.contractStatusName = contractStatusName
          this.startTime = startTime
          this.endTime = endTime
          this.toDetail.query.contractId = id
          this.pickerOptions.disabledDate = (time) => {
            return time.getTime() < this.startTime
          }
          this.comLoading(false)
        }, () => {
          this.comLoading(false)
        })
      },
      submit() {
        this.isSubmit = true
        this.validateForms().then(() => {
          if (!this.info) {
            this.$message.warning('请输入合同编号查询')
            return
          }
          const {baseInfoForm} = this.info
          const {id} = baseInfoForm
          const result = {
            id,
            suspendTime: formatDate(this.form.suspendTime),
            /*suspendReason: this.form.suspendReason,*/
            suspendRemark: this.form.suspendRemark,
            sealAttachments: this.combineAttachments(this.form.sealAttachments)
          }
          this.comLoading({
            text: '正在提交中'
          })
          Api.contractSuspendSubmit(result).then((res) => {
            console.log(res)
            this.comLoading(false)
            this.$router.push({
              name: routerNames.con_index
            })
          }, () => {
            this.comLoading(false)
          })
        }).catch(() => {
          console.log('error submit!!')
          return false
        })
      },
      handleNewSealFile: function() {
        const file = [{
          operate: 'add',
          id: '',
          fileName: '',
          fileUrl: '', // 合同文本类型为非模版合同时，附件类型的合同的文件下载地址
          attachType: 1, // 附件类型
          slaveProtocolNo: '', // 从协议编号
          types: [
            {
              id: 1,
              name: '其他'
            },
            {
              id: 2,
              name: '从协议'
            }
          ], // 附件类型集合
          haveSale: true, // 是否用章
          remark: '',
          saleTime: 1, // 用章次数
          printTime: '', // 打印份数
          remainTime: '', // 我方留存份数
          saleInfos: [], // 当前选中的张
          useSeals: [
            {
              id: '1',
              name: '公章'
            },
            {
              id: '2',
              name: '法人章'
            }
          ], // 章列表
          filesSealed: []// 上传的盖章后的文件信息
        }]
        this.form.sealAttachments.push(file)
      },
      handleUploadSealFileSuccess(res, file, fileList) {
        const dataMap = res.dataMap
        if (dataMap.fileId) {
          const index = this.form.sealAttachments.current
          const curentFile = this.form.sealAttachments[index]
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
      getEnabledUploadBtnOuter(fileName) {
        let enabled = true
        fileName ? enabled = false : enabled = true
        return enabled
      },
      handleChangeValidateForms() {
        if (this.isSubmit) {
          this.validateForms().catch(() => {
            console.log('validate failed')
          })
        }
      },
      handleUploadOuter(index) {
        this.form.sealAttachments.current = index
      },
      handleRemoveAttachmentsItem(index, rows) {
        rows.splice(index, 1)
      },
      combineAttachments(files) { //上传附件剔除空附件
        const newFiles = []
        if (files && files.length) {
          files.map((item) => {
            if (item[0] && item[0].fileName) {
              let inItem = item[0]
              let {filesSealed} = inItem
              if (filesSealed && filesSealed[0]) {
                const {sealFileCreateTime} = filesSealed[0]
                filesSealed[0].sealFileCreateTime = formatDate(sealFileCreateTime)
              }
              newFiles.push(item)
            }
          })
        }
        return newFiles
      },
      validateForms() {
        return new Promise((resolve, reject) => {
          this.$refs.form.validate((valid) => {
            //验证附件的数据是否填写完整
            const sealAttachments = this.form.sealAttachments
            if (sealAttachments && sealAttachments.length) {
              sealAttachments.map((item) => {
                if (item[0].haveSale) {
                  if (item[0].printTime && item[0].remainTime && item[0].saleInfos.length) {
                    this.form.errorMsg = ''
                  } else {
                    this.form.errorMsg = '请确保所有附件信息填写完整'
                  }
                }
              })
            } else {
              this.form.errorMsg = '请确保所有附件信息填写完整'
            }
            if (valid && !this.form.errorMsg) {
              resolve()
            } else {
              reject()
            }
          }).catch(() => {
            console.log('验证失败')
            reject()
          })
        })
      }
    },
    filters: {
      formatDate
    }
  }
</script>
