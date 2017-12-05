<style type="text/scss" lang="scss" scoped>
  .basic-info {

  }
</style>

<template>
  <div class="pd20">
    <div class="mb10 clearfix" v-if="procInstId">
      <div class="fl fb">{{procTitle}}</div>
      <div class="fr mr20">流程编号 {{procInstId}}</div>
    </div>
    <div class="basic-info">
      <el-form :model="form" ref="form" label-width="120px">
        <el-row>
          <el-col :span="8">
            <el-form-item label="合同编号">
              {{contractCode}}
            </el-form-item>
          </el-col>
          <el-button type="primary" class="ml20" v-show="toDetail.query.contractNo">
            <router-link class="router-link-default" :to="toDetail" target="_blank">详 情</router-link>
          </el-button>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="合同签署日期">
              {{signDate | formatDate}}
            </el-form-item>
          </el-col>
          <el-col :span="8" :offset="1">
            <el-form-item label="合同状态">
              {{contractStatus}}
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="合同生效日期">
              {{startTime | formatDate}}
            </el-form-item>
          </el-col>
          <el-col :span="8" :offset="1">
            <el-form-item label="合同截止日期">
              {{endTime | formatDate}}
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="合同中止原因" prop="suspendReason">
              <el-select
                disabled
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
          </el-col>
          <el-col :span="8" :offset="1">
            <el-form-item label="实际中止日期" prop="suspendTime">
              <el-input :value="form.suspendTime | formatDate" disabled></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="原因说明" prop="suspendRemark">
          <el-input
            disabled
            type="textarea"
            :autosize="{ minRows: 2 }"
            resize="none"
            v-model.trim="form.suspendRemark">
          </el-input>
        </el-form-item>
        <i class="errorMsg">{{form.errorMsg}}</i>
        <template v-if="form.sealAttachments.length" v-for="(item,index) in form.sealAttachments">
          <el-table :data="item" :show-header="index===0?true:false">
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
                    <el-table-column label="上传时间" prop="sealFileCreateTime">
                      <template scope="scope">
                        {{props.row.filesSealed[scope.$index].sealFileCreateTime | formatDate}}
                      </template>
                    </el-table-column>
                    <el-table-column fixed="right" label="操作"
                                     v-if="props.row.filesSealed[0].operate||enabledUpdateInApprove">
                      <template scope="scope">
                        <el-button @click="handleRemoveFilesSealedItem(index, props.row.filesSealed)"
                                   type="danger" size="small">移除
                        </el-button>
                      </template>
                    </el-table-column>
                  </el-table>
                  <el-row>
                    <el-col :span="6">
                      <el-form-item label="用章次数" prop="saleTime">
                        <el-input-number size="small" :disabled="true" v-model="props.row.saleTime">
                        </el-input-number>
                      </el-form-item>
                    </el-col>
                    <el-col :span="6">
                      <el-form-item label="打印份数" prop="printTime" class="el-form-item is-required">
                        <el-input-number :disabled="!enabledUpdateInApprove" size="small" :max="10"
                                         v-model="props.row.printTime"
                                         @change="handleChangeValidateForms"></el-input-number>
                      </el-form-item>
                    </el-col>
                    <el-col :span="6">
                      <el-form-item label="留存份数" prop="remainTime" class="el-form-item is-required">
                        <el-input-number :disabled="!enabledUpdateInApprove" size="small" :max="10"
                                         v-model="props.row.remainTime"
                                         @change="handleChangeValidateForms"></el-input-number>
                      </el-form-item>
                    </el-col>
                    <el-col :span="6">
                      <el-form-item label="用印后上传" v-if="enabledUpdateInApprove">
                        <el-upload
                          ref="uploadFileAfterSeal"
                          :data="{userId:users.userId}"
                          :show-file-list="false"
                          :action="uploadUrl"
                          :with-credentials="true"
                          :on-success="handleUploadFileAfterSealSuccess"
                          :on-error="handleUploadFileAfterSealError"
                        >
                          <el-button
                            :disabled="!enabledUpdateInApprove||getEnabledUploadBtn(props.row.filesSealed)"
                            size="small"
                            type="primary" @click="form.current = index">上传
                          </el-button>
                        </el-upload>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="12">
                      <el-form-item label="选择用章" prop="saleInfos" class="is-required">
                        <el-checkbox-group v-model="props.row.saleInfos" @change="handleChangeValidateForms">
                          <el-checkbox label="1" name="sealInfo" :disabled="true">公章</el-checkbox>
                          <el-checkbox label="2" name="sealInfo" :disabled="true">法人章</el-checkbox>
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
            <el-table-column prop="fileName" label="文件名称">
              <template scope="scope">
                <a :href="item[scope.$index].fileUrl">{{item[scope.$index].fileName}}</a>
              </template>
            </el-table-column>
            <el-table-column prop="upload" label="上传" width="100px">
              <template scope="scope">
                <el-button :disabled="true"
                           size="small" type="primary" @click="handleUploadOuter(index)">上传
                </el-button>
              </template>
            </el-table-column>
            <el-table-column prop="haveSale" label="是否盖章" width="70px">
              <template scope="scope">
                <el-checkbox
                  @change="handleChangeValidateForms"
                  :disabled="true"
                  v-model="item[scope.$index].haveSale"></el-checkbox>
              </template>
            </el-table-column>
            <el-table-column prop="remark" :disabled="true" label="备注">
              <template scope="scope">
                <el-input
                  :disabled="true"
                  v-model="item[scope.$index].remark"></el-input>
              </template>
            </el-table-column>
          </el-table>
        </template>
      </el-form>
    </div>
    <Process :extraFn="callback.bind(this)"></Process>
  </div>
</template>

<script>
  import Api from '../../api/manageContract';
  import {formatDate} from '../../filters/moment';
  import comLoading from '../../mixins/comLoading';
  import {routerNames} from '../../core/consts';
  import Process from '../../components/process.vue';
  import {downloadUrl, uploadUrl} from '../../api/consts';

  export default {
    mixins: [comLoading],
    data() {
      return {
        procInstId: '', //流程id
        procTitle: '', //流程名称
        users: {},
        downloadUrl,
        uploadUrl,
        isSubmit: false,

        form: {
          errorMsg: '',
          sealAttachments: [],
          suspendReason: '',
          suspendTime: '',
          suspendRemark: '',
          current: null // 为上传功能保存当前所在附件列表的索引
        },
        id: '',
        contractCode: '',
        signDate: '',
        contractStatus: '',
        startTime: '',
        endTime: '',
        options: [{value: 1, label: '合同违约中止'}, {value: 2, label: '合同变更后中止'}, {value: 3, label: '固定期限合同正常履行完成后中止'}],
        info: null,
        toDetail: {name: routerNames.con_Check, query: {contractNo: ''}}
      };
    },
    computed: {
      ifRole() {
        const reg = /印章保管人/g;
        return reg.test(this.users.roleName);
      },
      ifRole1() {
        const reg = /采购合同上传/g;
        return reg.test(this.users.roleName);
      },
      enabledUpdateInApprove() { //在审批阶段修改附件时，上传盖章合同控件的上传按钮状态（仅用章保管人可用）
        return this.ifRole || this.ifRole1;
      }
    },
    methods: {
      getInfo(id) {
        this.comLoading();
        const paras = {contractId: id, operate: 'PROCESS'};
        Api.getContractDetailByContractId(paras).then((res) => {
          this.comLoading(false);
          const data = res.data.dataMap;
          this.setData(data);
        }, () => {
          this.comLoading(false);
        });
      },
      getAttachmentsInProcess(data) {
        const arr = [];
        if (data && data.length) {
          data.forEach((item) => {
            if (item[0].attachStatus === 2) { //流程中
              arr.push(item);
            }
          });
        }
        return arr;
      },
      setData(data) {
        const {
          baseInfoForm, cardContentInfoForm, contSuspend, cardSealInfoForm
        } = data;
        const {
          contractNo, approvalDate, contractStatusName, id
        } = baseInfoForm;
        const {suspendReason, suspendTime, suspendRemark} = contSuspend || {};
        const {startTime, endTime} = cardContentInfoForm;
        const {sealAttachments} = cardSealInfoForm;
        this.contractCode = contractNo;
        this.signDate = approvalDate;
        this.contractStatus = contractStatusName;
        this.startTime = startTime;
        this.endTime = endTime;
        this.id = id;

        Object.assign(this.form, {
          suspendReason,
          suspendTime,
          suspendRemark,
          sealAttachments: this.getAttachmentsInProcess(sealAttachments)
        });

        this.toDetail.query.contractNo = contractNo;
      },
      handleChangeValidateForms() {
        if (this.isSubmit) {
          this.validateForms().catch(() => {
            console.log('validate failed');
          });
        }
      },
      validateForms() {
        return new Promise((resolve, reject) => {
          //验证附件的数据是否填写完整
          const sealAttachments = this.form.sealAttachments;
          if (sealAttachments && sealAttachments.length) {
            this.form.errorMsg = '';
            const exist = sealAttachments.some((item) => {
              if (item[0].haveSale) {
                return !(item[0].printTime && item[0].remainTime && item[0].saleInfos.length && item[0].fileName);
              }
              return false;
            });
            if (exist) {
              this.form.errorMsg = '请确保所有附件信息填写完整';
            }
          }
          if (!this.form.errorMsg) {
            resolve();
          } else {
            reject();
          }
        });
      },
      combineAttachments(files) { //上传附件剔除空附件
        const newFiles = [];
        if (files && files.length) {
          files.forEach((item) => {
            if (item[0] && item[0].fileName) {
              const inItem = item[0];
              const {filesSealed} = inItem;
              if (filesSealed && filesSealed[0]) {
                const {sealFileCreateTime} = filesSealed[0];
                filesSealed[0].sealFileCreateTime = formatDate(sealFileCreateTime);
              }
              newFiles.push(item);
            }
          });
        }
        return newFiles;
      },
      callback(params) {
        const t = this;
        //isSign:是否是加签人 isAgree:审批操作类型是否是同意
        return new Promise((resolve, reject) => {
          const {isSign, isAgree} = params;
          if (!isSign && isAgree && (t.ifRole || t.ifRole1)) {
            const para = {};
            para.sealAttachments = this.combineAttachments(this.form.sealAttachments);
            para.id = this.id;
            para.type = 1;
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
      },
      handleUploadFileAfterSealSuccess(res) {
        const dataMap = res.dataMap;
        if (dataMap.fileId) {
          const index = this.form.current;
          const curentFile = this.form.sealAttachments[index];
          curentFile[0].filesSealed = [{
            sealFileId: dataMap.fileId,
            sealFileName: dataMap.fileName,
            sealFileUrl: downloadUrl + dataMap.fileId,
            sealFileCreatorName: dataMap.userName,
            sealFileCreateTime: formatDate(dataMap.createTime),
            operate: 'add'
          }];
          console.log('this.cardSealInfoForm', this.form.sealAttachments);
          this.$message.success('文件上传成功');
        }
      },
      handleUploadFileAfterSealError(err, file, fileList) {
        console.log('error', err);
        console.log('file', file);
        console.log('fileList', fileList);
      },
      getEnabledUploadBtn(items) {
        return (items && items.length > 0);
      },
      handleUpload(type, index) {
        this.form.current = index || 0;
      }
    },
    created() {
      const {id, processData} = this.$route.query;
      this.getInfo(id);
      if (processData) {
        const data = JSON.parse(processData);
        const {procTitle, procInstId, roleName} = data;
        this.procInstId = procInstId;
        this.procTitle = procTitle;
        this.users.roleName = roleName;
        console.log('users', this.users);
      }
    },
    filters: {
      formatDate
    },
    components: {
      Process
    }
  };
</script>
