<style>
    .card {
        margin-bottom: 20px;
    }

    .ivu-input-type,
    .ivu-select-single {
        width: 180px;
    }

    .template-preview {
        border: solid 1px #dddee1;
        padding: 10px;
        margin-left: 20px;
        height: 450px;
        overflow: auto;
    }
</style>
<template>
    <div>
        <el-card>
            <header slot="header">合同基本信息</header>
            <el-form ref="baseInfoForm" :model="baseInfoForm" label-width="100px">
                <el-row>
                    <el-col :span="8">
                        <el-form-item label="业务经办人">
                            <el-input :disabled="true" v-model="baseInfoForm.businessPerson"
                                      placeholder="请输入业务经办人"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="业务部门">
                            <el-input :disabled="true" v-model="baseInfoForm.businessDepartment"
                                      placeholder="请输入业务部门"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="8">
                        <el-form-item label="合同模式">
                            <el-input :disabled="true" v-model="baseInfoForm.conModelName"
                                      placeholder="请输入合同模式"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="合同类型">
                            <el-input :disabled="true" v-model="baseInfoForm.conTypeName"
                                      placeholder="请输入合同类型"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="8">
                        <el-form-item label="所属项目">
                            <el-input v-model="baseInfoForm.belongProject" placeholder="请输入所属项目"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="16">
                        <el-form-item label="模版名称">
                            <el-select v-model="baseInfoForm.templateName" placeholder="请选择合同模版">
                                <el-option
                                        v-for="item in baseInfoForm.templateOptions"
                                        :key="item.id"
                                        :label="item.name"
                                        :value="item.id">
                                </el-option>
                            </el-select>
                            {{conVersion}}
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="8">
                        <el-form-item label="合同文本类型">
                            <el-select v-model="baseInfoForm.conTextType" placeholder="请选择合同文本类型">
                                <el-option
                                        v-for="item in baseInfoForm.conTextTypeOptions"
                                        :key="item.id"
                                        :label="item.name"
                                        :value="item.id">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8" v-if="operateType==='query'">
                        <el-form-item label="合同编号">
                            <el-input v-model="baseInfoForm.conNumber" placeholder="请输入合同编号"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
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
        </el-card>
        <el-card>
            <el-tabs v-model="activeTabName" @tab-click="handleTabClick">
                <el-tab-pane label="合同内容信息" name="tabContInfo">
                    <el-form rel="cardContentInfoForm" :model="cardContentInfoForm" label-width="100px">
                        <el-card>
                            <header slot="header">合同供应商信息</header>
                            <el-button v-if="cardContentInfoForm.tableSupplierInfo.length<=0"
                                       @click="handleAddContractSupplier" icon="plus"
                                       type="primary">添加合同供应商信息
                            </el-button>
                            <el-table :data="cardContentInfoForm.tableSupplierInfo">
                                <el-table-column type="index"></el-table-column>
                                <el-table-column prop="id" label="供应商编号"></el-table-column>
                                <el-table-column prop="name" label="供应商名称"></el-table-column>
                                <el-table-column
                                        fixed="right"
                                        label="操作"
                                        width="100">
                                    <template scope="scope">
                                        <el-button
                                                v-if="cardContentInfoForm.tableSupplierInfo[scope.$index].type"
                                                @click="handleRemoveSupplier(scope.$index, cardContentInfoForm.tableSupplierInfo)"
                                                type="text" size="small">移除
                                        </el-button>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </el-card>
                        <el-card>
                            <header slot="header">合同我方主体名称</header>
                            <el-button type="primary" @click="handleNewSubjectName" icon="plus">新增合同我方主体</el-button>
                            <el-table :data="cardContentInfoForm.conSubjctName">
                                <el-table-column prop="id" label="公司代码"></el-table-column>
                                <el-table-column prop="name" label="公司名称"></el-table-column>
                                <el-table-column
                                        fixed="right"
                                        label="操作"
                                        width="100">
                                    <template scope="scope">
                                        <el-button
                                                v-if="cardContentInfoForm.conSubjctName[scope.$index].type"
                                                @click="handleRemoveSubect(scope.$index, cardContentInfoForm.conSubjctName)"
                                                type="text" size="small">移除
                                        </el-button>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </el-card>
                        <el-card v-if="baseInfoForm.conModel!='con4'">
                            <header slot="header">第三方信息</header>
                            <el-table :data="cardContentInfoForm.thirdPartyInfo">
                                <el-table-column prop="id" label="供应商编号"></el-table-column>
                                <el-table-column prop="name" label="供应商名称"></el-table-column>
                            </el-table>
                        </el-card>
                        <el-card v-if="baseInfoForm.conModel!='con1'">
                            <header slot="header">合同标的</header>
                            <el-table :data="cardContentInfoForm.conStandard">
                                <el-table-column type="index"></el-table-column>
                                <el-table-column prop="id" label="物料编码"></el-table-column>
                                <el-table-column prop="name" label="物料名称"></el-table-column>
                                <el-table-column prop="number" label="数量"></el-table-column>
                                <el-table-column prop="taxRate" label="税率"></el-table-column>
                            </el-table>
                            <el-row>
                                <el-col :span="8">
                                    <el-form-item label="合同生效日期" prop="effectiveDate"
                                                  :rules="cardContentInfoForm.effectiveDateRules">
                                        <el-date-picker v-model="cardContentInfoForm.effectiveDate"
                                                        placeholder="请输入合同生效期日期"
                                                        type="date"
                                                        @change="handleChangeEffectiveDate"></el-date-picker>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="8">
                                    <el-form-item label="合同终止日期" prop="endDate"
                                                  :rules="cardContentInfoForm.endDateRules">
                                        <el-date-picker v-model="cardContentInfoForm.endDate"
                                                        placeholder="请输入合同终止日期"
                                                        type="date"
                                                        @change="handleChangeEndDate"></el-date-picker>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                        </el-card>
                    </el-form>
                </el-tab-pane>
                <el-tab-pane label="合同财务信息" name="tabContFinanceInfo">
                    <el-form rel="cardFinanceInfoForm" :model="cardFinanceInfoForm" label-width="100px">
                        <el-row>
                            <el-col :span="8">
                                <el-form-item label="是否涉及金额">
                                    <el-radio-group v-model="cardFinanceInfoForm.hasMoney">
                                        <el-radio :label="1">是</el-radio>
                                        <el-radio :label="0">否</el-radio>
                                    </el-radio-group>
                                </el-form-item>
                            </el-col>
                            <el-col :span="8">
                                <el-form-item label="是否一次性付款" label-width="120px">
                                    <el-radio-group v-model="cardFinanceInfoForm.onePayment">
                                        <el-radio :label="1">是</el-radio>
                                        <el-radio :label="0">否</el-radio>
                                    </el-radio-group>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-card>
                            <header slot="header">付款方式</header>
                            <el-button type="primary" @click="handleAddPaymentMethod" icon="plus">新增付款方式</el-button>
                            <el-table :data="cardFinanceInfoForm.paymentMethod">
                                <el-table-column prop="type" label="类型"></el-table-column>
                                <el-table-column prop="ifMultiPayment" label="是否多次付款"></el-table-column>
                                <el-table-column prop="money" label="付款金额"></el-table-column>
                                <el-table-column prop="time" label="付款时间"></el-table-column>
                                <el-table-column prop="remark" label="备注"></el-table-column>
                                <el-table-column prop="proportion" label="占比"></el-table-column>
                            </el-table>
                            <el-row>
                                <el-col :span="8">
                                    <el-form-item label="币种" prop="currency">
                                        <el-select v-model="cardFinanceInfoForm.currency" placeholder="请选择币种">
                                            <el-option
                                                    v-for="item in cardFinanceInfoForm.currencyOptions"
                                                    :key="item.value"
                                                    :label="item.label"
                                                    :value="item.value">
                                            </el-option>
                                        </el-select>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="8">
                                    <el-form-item label="开票类型" prop="billingType">
                                        <el-select v-model="cardFinanceInfoForm.billingType"
                                                   placeholder="请选择开票类型">
                                            <el-option
                                                    v-for="item in cardFinanceInfoForm.billingTypeOptions"
                                                    :key="item.value"
                                                    :label="item.label"
                                                    :value="item.value">
                                            </el-option>
                                        </el-select>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="8">
                                    <el-form-item label="合同总金额" prop="totalConMoney">
                                        <el-input v-model="cardFinanceInfoForm.totalConMoney"
                                                  placeholder="根据上表累加(含税价)"></el-input>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                            <el-row>
                                <el-col :span="8">
                                    <el-form-item label="是否收取保证金" label-width="120px">
                                        <el-radio-group v-model="cardFinanceInfoForm.hasBond">
                                            <el-radio :label="1">是</el-radio>
                                            <el-radio :label="0">否</el-radio>
                                        </el-radio-group>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="8">
                                    <el-form-item label="保证金金额" prop="bondMoney">
                                        <el-input v-model="cardFinanceInfoForm.bondMoney"
                                                  placeholder="请输入保证金金额"></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="8">
                                    <el-form-item label="保证金占比" prop="bondProportion">
                                        <el-input v-model="cardFinanceInfoForm.bondProportion"
                                                  placeholder="请输入保证金占比"></el-input>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                            <el-row>
                                <el-col :span="8">
                                    <el-form-item label="付款时间" prop="paymentTime">
                                        <el-date-picker v-model="cardFinanceInfoForm.paymentTime"
                                                        placeholder="请输入付款时间"
                                                        type="date"></el-date-picker>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                        </el-card>
                        <el-card v-if="baseInfoForm.conModel==='con2'">
                            <header slot="header">开票信息</header>
                            <el-row>
                                <el-col :span="12" class="billingInfo">
                                    <h4>甲方增值税专用开票信息：</h4>
                                    <el-row>
                                        <el-col :span="6">
                                            公司名称:
                                        </el-col>
                                        <el-col :span="16">
                                            {{cardFinanceInfoForm.jiaBillingInfo.companyName}}
                                        </el-col>
                                    </el-row>
                                    <el-row>
                                        <el-col :span="6">
                                            统一社会信用代码:
                                        </el-col>
                                        <el-col :span="16">
                                            {{cardFinanceInfoForm.jiaBillingInfo.creditCode}}
                                        </el-col>
                                    </el-row>
                                    <el-row>
                                        <el-col :span="6">
                                            注册地址:
                                        </el-col>
                                        <el-col :span="16">
                                            {{cardFinanceInfoForm.jiaBillingInfo.registerAddress}}
                                        </el-col>
                                    </el-row>
                                    <el-row>
                                        <el-col :span="6">
                                            经营地址:
                                        </el-col>
                                        <el-col :span="16">
                                            {{cardFinanceInfoForm.jiaBillingInfo.managementAddress}}
                                        </el-col>
                                    </el-row>
                                    <el-row>
                                        <el-col :span="6">
                                            联系电话:
                                        </el-col>
                                        <el-col :span="16">
                                            {{cardFinanceInfoForm.jiaBillingInfo.phone}}
                                        </el-col>
                                    </el-row>
                                    <el-row>
                                        <el-col :span="6">
                                            联系电话:
                                        </el-col>
                                        <el-col :span="16">
                                            {{cardFinanceInfoForm.jiaBillingInfo.phone}}
                                        </el-col>
                                    </el-row>
                                    <el-row>
                                        <el-col :span="6">
                                            银行账号:
                                        </el-col>
                                        <el-col :span="16">
                                            {{cardFinanceInfoForm.jiaBillingInfo.bankAccount}}
                                        </el-col>
                                    </el-row>
                                    <el-row>
                                        <el-col :span="6">
                                            开 户 行:
                                        </el-col>
                                        <el-col :span="16">
                                            {{cardFinanceInfoForm.jiaBillingInfo.openBank}}
                                        </el-col>
                                    </el-row>
                                </el-col>
                                <el-col :span="12" class="billingInfo">
                                    <h4>乙方指定甲方汇款的账户为：</h4>
                                    <el-row>
                                        <el-col :span="6">
                                            乙方:
                                        </el-col>
                                        <el-col :span="16">
                                            {{cardFinanceInfoForm.yiBillingInfo.companyName}}
                                        </el-col>
                                    </el-row>
                                    <el-row>
                                        <el-col :span="6">
                                            银行账号:
                                        </el-col>
                                        <el-col :span="16">
                                            {{cardFinanceInfoForm.yiBillingInfo.bankAccount}}
                                        </el-col>
                                    </el-row>
                                    <el-row>
                                        <el-col :span="6">
                                            开 户 行:
                                        </el-col>
                                        <el-col :span="16">
                                            {{cardFinanceInfoForm.yiBillingInfo.openBank}}
                                        </el-col>
                                    </el-row>
                                    <el-row>
                                        <el-col :span="6">
                                            联系人:
                                        </el-col>
                                        <el-col :span="16">
                                            {{cardFinanceInfoForm.yiBillingInfo.contact}}
                                        </el-col>
                                    </el-row>
                                    <el-row>
                                        <el-col :span="6">
                                            注册地址:
                                        </el-col>
                                        <el-col :span="16">
                                            {{cardFinanceInfoForm.yiBillingInfo.address}}
                                        </el-col>
                                    </el-row>
                                    <el-row>
                                        <el-col :span="6">
                                            联系电话:
                                        </el-col>
                                        <el-col :span="16">
                                            {{cardFinanceInfoForm.yiBillingInfo.phone}}
                                        </el-col>
                                    </el-row>
                                    <el-row>
                                        <el-col :span="6">
                                            E-mail:
                                        </el-col>
                                        <el-col :span="16">
                                            {{cardFinanceInfoForm.yiBillingInfo.email}}
                                        </el-col>
                                    </el-row>
                                </el-col>
                            </el-row>
                        </el-card>
                    </el-form>
                </el-tab-pane>
                <el-tab-pane label="合同验收与样品信息" name="tabContCheckInfo"
                             v-if="baseInfoForm.conModel==='con2'">
                    <el-form rel="cardContCheckInfoForm" :model="cardContCheckInfoForm" label-width="100px">
                        <el-row>
                            <el-col :span="8">
                                <el-form-item prop="checkPerson" label="验收责任人">
                                    <el-input v-model="cardContCheckInfoForm.checkPerson"
                                              placeholder="请输入验收责任人"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="8">
                                <el-form-item prop="checkPersonDepart" label="验收责任人部门" label-width="120px">
                                    <el-input v-model="cardContCheckInfoForm.checkPersonDepart"
                                              placeholder="请输入验收责任人部门"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="8">
                                <el-form-item prop="checkServiceMethod" label="服务类验收方式" label-width="120px">
                                    <el-input v-model="cardContCheckInfoForm.checkServiceMethod"
                                              placeholder="请输入服务类验收方式"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="8">
                                <el-form-item prop="checkSupervisor" label="验收监督人">
                                    <el-input v-model="cardContCheckInfoForm.checkSupervisor"
                                              placeholder="请输入验收监督人"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="8">
                                <el-form-item prop="checkSupervisorDepart" label="验收监督人部门" label-width="120px">
                                    <el-input v-model="cardContCheckInfoForm.checkSupervisorDepart"
                                              placeholder="请输入验收监督人部门"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-button @click="handleAddUnionCheck" icon="plus" type="primary">添加联合验收人</el-button>
                        <el-table :data="cardContCheckInfoForm.unionCheckPersons">
                            <el-table-column prop="name" label="联合验收人"></el-table-column>
                            <el-table-column prop="depart" label="联合验收人部门"></el-table-column>
                            <el-table-column prop="ifMandatory" label="是否必选"></el-table-column>
                        </el-table>
                        <el-form-item prop="hasSample" label="是否有样品">
                            <el-radio-group v-model="cardContCheckInfoForm.hasSample">
                                <el-radio :label="1">是</el-radio>
                                <el-radio :label="0">否</el-radio>
                            </el-radio-group>
                        </el-form-item>
                        <el-card>
                            <header slot="header">物资验收事项</header>
                            <el-table :data="cardContCheckInfoForm.materialMatters">
                                <el-table-column type="index" label="序号" width="100px">
                                </el-table-column>
                                <el-table-column prop="number" label="物料编码"></el-table-column>
                                <el-table-column prop="description" label="物料描述"></el-table-column>
                                <el-table-column prop="remark" label="备注"></el-table-column>
                            </el-table>
                        </el-card>
                        <el-card>
                            <header slot="header">服务验收事项</header>
                            <el-button type="primary" @click="handleAddServiceMatter" icon="plus">添加服务验收事项</el-button>
                            <el-table :data="cardContCheckInfoForm.serviceMatters">
                                <el-table-column type="index" label="序号" width="100px">
                                </el-table-column>
                                <el-table-column prop="name" label="服务名称"></el-table-column>
                                <el-table-column prop="demand" label="验收要求"></el-table-column>
                                <el-table-column prop="remark" label="备注"></el-table-column>
                            </el-table>
                        </el-card>
                    </el-form>
                </el-tab-pane>
                <el-tab-pane label="合同盖章信息" name="tabSealInfo" v-if="baseInfoForm.conModel!='con4'">
                    <el-form rel="cardSealInfoForm" :model="cardSealInfoForm" label-width="100px">
                        <el-card>
                            <header slot="header">合同文件列表</header>
                            <el-button @click="handleAddContractFile" icon="plus"
                                       type="primary">添加合同文件
                            </el-button>
                            <el-table :data="cardSealInfoForm.sealFileList">
                                <el-table-column type="index" label="序号" width="100px"></el-table-column>
                                <el-table-column prop="name" label="文本名称"></el-table-column>
                                <el-table-column prop="sealTimes" label="用章次数"></el-table-column>
                                <el-table-column prop="printTimes" label="打印份数"></el-table-column>
                                <el-table-column prop="retainFileNumber" label="我方留存份数"></el-table-column>
                                <el-table-column prop="sealName" label="用章名称"></el-table-column>
                                <el-table-column prop="remark" label="备注"></el-table-column>
                                <el-table-column prop="ifPrint" label="无需打印"></el-table-column>
                            </el-table>
                        </el-card>
                    </el-form>
                </el-tab-pane>
                <el-tab-pane label="备注" name="tabRemark">
                    <el-form rel="cardRemarkInfoForm" :model="cardRemarkInfoForm" label-width="100px">
                        <el-card>
                            <header slot="header">其他说明</header>
                            <el-form-item prop="otherInstruction">
                                <el-input style="margin-left: -100px" type="textarea" placeholder="请输入内容" :rows="6"
                                          v-model="cardRemarkInfoForm.otherInstruction"></el-input>
                            </el-form-item>
                        </el-card>
                        <el-row>
                            <el-col :span="8">
                                <el-form-item prop="fromAgreementCode" label="从协议编号">
                                    <el-input v-model="cardRemarkInfoForm.fromAgreementCode"
                                              placeholder="请输入从协议编号"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-card>
                            <header slot="header">附件信息</header>
                            <el-button @click="handleAttachment" icon="plus" type="primary">添加附件信息</el-button>
                            <el-table :data="cardRemarkInfoForm.attachmentList">
                                <el-table-column prop="attachmentType" label="附件类型"></el-table-column>
                                <el-table-column prop="code" label="编号"></el-table-column>
                                <el-table-column prop="fileName" label="文件名称"></el-table-column>
                                <el-table-column prop="attachmentUrl" label="附件"></el-table-column>
                                <el-table-column
                                        fixed="right"
                                        label="操作"
                                        width="100">
                                    <template scope="scope">
                                        <!--<el-button @click="handleUploadAttachment" type="text" size="small">上传
                                        </el-button>-->
                                        <!--:file-list="formAddAttachment.fileList"-->
                                        <el-upload
                                                ref="uploadFile"
                                                action="https://jsonplaceholder.typicode.com/posts/"
                                                :with-credentials="true"
                                                :before-upload="handlebeforeFileUploadItem"
                                                :on-success="handleFileUploadSuccessItem"
                                                :on-error="handleFileUploadErrorItem"
                                        >
                                            <el-button size="small" type="primary">点击上传</el-button>
                                        </el-upload>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </el-card>
                    </el-form>
                </el-tab-pane>
                <el-tab-pane label="相关数据" name="tabRelatedData" v-if="baseInfoForm.conModel!='con4'">
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
        <el-dialog title="新增合同供应商信息" :visible.sync="cardContentInfoForm.dialogAddContractSupplier" size="small">
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
        <el-dialog title="新增付款方式" :visible.sync="cardFinanceInfoForm.dialogNewPaymentVisible" size="small">
            <el-form :model="formNewPayment" label-width="100px" ref="formNewPayment">
                <el-form-item label="类型" prop="type">
                    <el-select v-model="formNewPayment.type" placeholder="请选择付款类型">
                        <el-option v-for="item in formNewPayment.typeOptions"
                                   :key="item.value"
                                   :label="item.label"
                                   :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="是否多次付款" prop="ifMultiPayment">
                    <el-radio-group v-model="formNewPayment.ifMultiPayment">
                        <el-radio :label="0">是</el-radio>
                        <el-radio :label="1">否</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="付款金额" prop="money">
                    <el-input v-model="formNewPayment.money" placeholder="请输入付款金额"></el-input>
                </el-form-item>
                <el-form-item label="付款时间">
                    <el-select v-model="formNewPayment.time" placeholder="请选择付款时间">
                        <el-option v-for="item in formNewPayment.timeOptions[formNewPayment.type]"
                                   :key="item.value"
                                   :label="item.label"
                                   :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="备注" prop="remark">
                    <el-input v-model="formNewPayment.remark" placeholder="请输入备注"></el-input>
                </el-form-item>
            </el-form>
            <footer slot="footer">
                <el-button type="primary" @click="handleAddNewPay('formNewPayment')">确定</el-button>
                <el-button type="primary" @click="handleCancelAddNewPay">取消</el-button>
            </footer>
        </el-dialog>
        <el-dialog title="添加联合验收人" :visible.sync="cardContCheckInfoForm.dialogAddUnionCheckVisible"
                   size="small">
            <el-form ref="formAddUnionCheck" :model="formAddUnionCheck" label-width="100px">
                <el-form-item prop="name" label="联合验收人">
                    <el-input v-model="formAddUnionCheck.name" placeholder="请输入联合验收人"></el-input>
                </el-form-item>
                <el-form-item prop="depart" label="联合验收人部门">
                    <el-input v-model="formAddUnionCheck.depart" placeholder="请输入联合验收人部门"></el-input>
                </el-form-item>
                <el-form-item label="是否必选" prop="ifRequired">
                    <el-radio-group v-model="formAddUnionCheck.ifRequired">
                        <el-radio :label="0">是</el-radio>
                        <el-radio :label="1">否</el-radio>
                    </el-radio-group>
                </el-form-item>
            </el-form>
            <footer slot="footer">
                <el-button type="primary" @click="handleAddUnionCheckItem('formAddUnionCheck')">确定</el-button>
                <el-button type="primary" @click="handleCancelAddUnionCheck('formAddUnionCheck')">取消</el-button>
            </footer>
        </el-dialog>
        <el-dialog title="添加服务验收事项" :visible.sync="cardContCheckInfoForm.dialogAddServiceVisible"
                   size="small">
            <el-form ref="formAddServiceCheck" :model="formAddServiceCheck" label-width="100px">
                <el-form-item prop="name" label="服务名称">
                    <el-input v-model="formAddServiceCheck.name" placeholder="请输入服务名称"></el-input>
                </el-form-item>
                <el-form-item prop="requirement" label="验收要求">
                    <el-input v-model="formAddServiceCheck.requirement" placeholder="请输入验收要求"></el-input>
                </el-form-item>
                <el-form-item label="备注" prop="remark">
                    <el-input v-model="formAddServiceCheck.remark" placeholder="请输入备注"></el-input>
                </el-form-item>
            </el-form>
            <footer slot="footer">
                <el-button type="primary" @click="handleAddServiceCheckItem('formAddServiceCheck')">确定</el-button>
                <el-button type="primary" @click="handleCancelAddServiceCheck('formAddServiceCheck')">取消</el-button>
            </footer>
        </el-dialog>
        <el-dialog title="添加合同文件" :visible.sync="cardSealInfoForm.dialogNewContractVisible"
                   size="small">
            <el-form ref="formAddContract" :model="formAddContract" label-width="100px">
                <el-form-item prop="name" label="文本名称">
                    <el-input v-model="formAddContract.name" placeholder="请输入服务名称"></el-input>
                </el-form-item>
                <el-form-item prop="sealTimes" label="用章次数">
                    <el-input v-model="formAddContract.sealTimes" placeholder="请输入用章次数"></el-input>
                </el-form-item>
                <el-form-item label="打印份数" prop="printTimes">
                    <el-input v-model="formAddContract.printTimes" placeholder="请输入打印份数"></el-input>
                </el-form-item>
                <el-form-item label="我方留存份数" prop="retainFileNumber">
                    <el-input v-model="formAddContract.retainFileNumber" placeholder="请输入我方留存份数"></el-input>
                </el-form-item>
                <el-form-item label="用章名称" prop="sealName">
                    <el-input v-model="formAddContract.sealName" placeholder="请输入用章名称"></el-input>
                </el-form-item>
                <el-form-item label="备注" prop="remark">
                    <el-input v-model="formAddContract.remark" placeholder="请输入备注"></el-input>
                </el-form-item>
                <el-form-item label="是否打印" prop="ifPrint">
                    <el-radio-group v-model="formAddContract.ifPrint">
                        <el-radio :label="0">是</el-radio>
                        <el-radio :label="1">否</el-radio>
                    </el-radio-group>
                </el-form-item>
            </el-form>
            <footer slot="footer">
                <el-button type="primary" @click="handleAddContractItem('formAddContract')">确定</el-button>
                <el-button type="primary" @click="handleCancelContract('formAddContract')">取消</el-button>
            </footer>
        </el-dialog>
        <el-dialog title="添加附件信息" :visible.sync="cardRemarkInfoForm.dialogAddAttachmentVisible"
                   size="small">
            <el-form ref="formAddAttachment" :model="formAddAttachment" label-width="100px">
                <el-form-item prop="name" label="文本名称">
                    <el-form-item label="附件类型" prop="type">
                        <el-select v-model="formAddAttachment.type" placeholder="请选择附件类型">
                            <el-option v-for="item in formAddAttachment.typeOptions"
                                       :key="item.value"
                                       :label="item.label"
                                       :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-form-item>
                <el-form-item prop="code" label="编号">
                    <el-input v-model="formAddAttachment.code" placeholder="请输入编号"></el-input>
                </el-form-item>
                <el-form-item label="文件名称" prop="fileName">
                    <el-input v-model="formAddAttachment.fileName" placeholder="请输入文件名称"></el-input>
                </el-form-item>
                <el-form-item label="附件" prop="attachmentUrl">
                    <el-input v-model="formAddAttachment.attachmentUrl" placeholder="显示附件链接地址"></el-input>
                </el-form-item>
                <el-form-item label="上传" prop="uploadFile">
                    <el-upload
                            ref="upload"
                            action="https://jsonplaceholder.typicode.com/posts/"
                            :file-list="formAddAttachment.fileList"
                            :with-credentials="true"
                            :auto-upload="false"
                            :before-upload="handlebeforeFileUpload"
                            :on-success="handleFileUploadSuccess"
                            :on-error="handleFileUploadError"
                    >
                        <el-button size="small" type="primary">点击上传</el-button>
                        <div slot="tip" class="el-upload__tip">只能上传excel文件，且不超过500kb</div>
                    </el-upload>
                </el-form-item>
            </el-form>
            <footer slot="footer">
                <el-button type="primary" @click="handleAddAttachmentItem('formAddAttachment')">确定</el-button>
                <el-button type="primary" @click="handleCancelAttachment('formAddAttachment')">取消</el-button>
            </footer>
        </el-dialog>
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
                <el-button type="primary" @click="handleSubmit('')">提交</el-button>
            </el-col>
        </el-row>
    </div>
</template>
<script>
    import Api from '../../api/create';
    import _ from 'lodash';
    //import searchuser from '../../components/searchUser.vue'
    //import api from '../../api'
    //import tagService from '../../utils/tag.js'
    //import templateReplace from '../../utils/templateReplace.js'
    export default {
        data() {
            return {
                operateType: '',
                currentPr: '',
                baseInfoForm: {
                    businessPerson: '',//业务经办人
                    businessDepartment: '',
                    conModel: '',
                    conModelName: '',
                    conNumber: '',
                    conType: '',
                    conTypeName: '',
                    belongProject: '',
                    conTextType: '1',
                    conTextTypeOptions: [],
                    templateName: '',
                    templateOptions: [],
                    radioSealOrder: 0,//0：我方先盖章 1：对方先盖章
                    sealReason: '',
                    dialogNewSubjectVisible: false,
                },
                activeTabName: 'tabContInfo',
                cardContentInfoForm: {
                    tableSupplierInfo: [],
                    conSubjctName: [],
                    thirdPartyInfo: [],
                    conStandard: [],
                    effectiveDate: '',
                    effectiveDateRules: [],
                    endDate: '',
                    endDateRules: [],
                    dialogAddContractSupplier: false,
                },
                cardFinanceInfoForm: {
                    hasMoney: 1,
                    onePayment: 0,
                    paymentMethod: [],
                    dialogNewPaymentVisible: false,
                    currency: '',
                    currencyOptions: [
                        {
                            value: '1',
                            label: 'CNY 人民币'
                        },
                        {
                            value: '2',
                            label: 'USD 美元'
                        }
                    ],
                    billingType: '',
                    billingTypeOptions: [
                        {
                            value: '1',
                            label: '增值税专用发票'
                        },
                        {
                            value: '2',
                            label: '增值税普通发票'
                        },
                        {
                            value: '3',
                            label: '普通发票'
                        },
                    ],
                    hasBond: 1,
                    bondMoney: '',
                    bondProportion: '',
                    paymentTime: '',
                    jiaBillingInfo: {
                        companyName: '红星美凯龙家居集团股份有限公司',
                        creditCode: '913100006624816751',
                        registerAddress: '上海市浦东新区临御路518号6楼F801室',
                        managementAddress: '上海市普陀区怒江北路598号10楼',
                        phone: '021-22300563',
                        bankAccount: '0210 0141 7000 7578',
                        openBank: '中国民生银行上海市南支行'
                    },
                    yiBillingInfo: {
                        companyName: '上海史泰博股份有限公司',
                        contact: 'echo',
                        bankAccount: '0210 0141 7000 7578',
                        openBank: '中国民生银行上海市南支行',
                        address: '上海市浦东新区临御路518号6楼F801室',
                        phone: '021-22300563',
                        email: '134656343@qq.com'
                    },
                },
                cardContCheckInfoForm: {
                    checkPerson: '',
                    checkPersonDepart: '',
                    checkServiceMethod: '',
                    checkSupervisor: '',
                    checkSupervisorDepart: '',
                    unionCheckPersons: [],
                    hasSample: 1,
                    materialMatters: [],
                    serviceMatters: [],
                    dialogAddUnionCheckVisible: false,
                    dialogAddServiceVisible: false,
                },
                cardSealInfoForm: {
                    sealFileList: [],
                    dialogNewContractVisible: false,
                },
                cardRemarkInfoForm: {
                    otherInstruction: '',
                    fromAgreementCode: '',
                    attachmentList: [
                        {
                            attachmentType: '其他',
                            code: '1234',
                            fileName: '文件名',
                            attachmentUrl: ['www.baidu.com'],
                        }
                    ],
                    dialogAddAttachmentVisible: false,
                },
                cardRelatedInfoForm: {
                    contractList: [
                        {
                            contractCode: '32489328034',
                            type: '合同类型',
                            status: '状态',
                            company: '公司',
                            startTime: '2017-97-34',
                        }
                    ],
                },
                formNewSubject: {
                    rules: {
                        search: [
                            {required: true, message: '请输入搜索关键字', trigger: 'blur'},
                        ],
                    },
                    search: '',
                    subjects: [],
                    loading: false
                },
                formNewPayment: {
                    type: '1',
                    typeOptions: [
                        {
                            value: '1',
                            label: '预付款'
                        },
                        {
                            value: '2',
                            label: '进度款'
                        },
                        {
                            value: '3',
                            label: '尾款'
                        },
                    ],
                    ifMultiPayment: 1,
                    money: '',
                    time: '1',
                    timeOptions: {
                        1: [//预付款
                            {
                                value: '1',
                                label: '合同签约15天'
                            },
                            {
                                value: '2',
                                label: '合同签约30天'
                            },
                            {
                                value: '3',
                                label: '合同签约90天'
                            }
                        ],
                        2: [
                            {
                                value: '1',
                                label: '验收后15天'
                            },
                            {
                                value: '2',
                                label: '验收后30天'
                            }
                        ],
                        3: [
                            {
                                value: '1',
                                label: '合同结束后15天'
                            },
                            {
                                value: '2',
                                label: '合同结束后30天'
                            },
                            {
                                value: '3',
                                label: '合同结束后90天'
                            },
                            {
                                value: '4',
                                label: '合同结束后180天'
                            },
                        ]
                    },
                    remark: '',
                },
                formAddUnionCheck: {
                    name: '',
                    depart: '',
                    ifRequired: 1,
                },
                formAddServiceCheck: {
                    name: '',
                    requirement: '',
                    remark: '',
                },
                formAddContract: {
                    name: '',
                    sealTimes: '',
                    printTimes: '',
                    retainFileNumber: '',
                    sealName: '',
                    remark: '',
                    ifPrint: 1,
                },
                formAddAttachment: {
                    type: '1',
                    typeOptions: [
                        {
                            value: '0',
                            label: '其他'
                        },
                        {
                            value: '1',
                            label: '从协议'
                        },
                        {
                            value: '2',
                            label: '合同'
                        },
                    ],
                    fileList: [{
                        name: 'food.jpeg',
                        url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
                    }, {
                        name: 'food2.jpeg',
                        url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
                    }],
                },
                formContractSupplier: {
                    rules: {
                        search: [
                            {required: true, message: '请输入搜索关键字', trigger: 'blur'},
                        ],
                    },
                    search: '',
                    suppliers: [],
                    loading: false
                },
            }
        },
        created() {//?currentPr=&curConModelId=con2&curConTypeId=service1
            /*curConModelId:"con2"
             curConTypeId:"service1"
             currentPr:"",
             type:create*/
            let query = this.$route.query;
            this.operateType = query.operateType;
            this.currentPr = query.currentPr;
            this.baseInfoForm.conModel = query.curConModelId;
            this.baseInfoForm.conType = query.curConTypeId;
            console.log('currentPr', query.currentPr);
        },
        computed: {
            conVersion: function () {
                let id = this.baseInfoForm.templateName, templateOptions = this.baseInfoForm.templateOptions, result = '';
                if (templateOptions && templateOptions.length > 0) {
                    //result=_.result(_.findWhere(templateOptions, {'id': id}), 'version');//======???
                    for (let i = 0, len = templateOptions.length; i < len; i++) {
                        if (id == templateOptions[i].id) {
                            result = 'V-' + templateOptions[i].version;
                        }
                    }
                }
                return result;
            }
        },
        mounted(){
            Api.getContractBaseInfo({}).then((data)=> {
                this.baseInfoForm.businessPerson = data.data.dataMap.baseInfoForm.businessPerson;
                this.baseInfoForm.businessDepartment = data.data.dataMap.baseInfoForm.businessDepartment;
                this.baseInfoForm.conModelName = data.data.dataMap.baseInfoForm.conModelName;
                this.baseInfoForm.conTypeName = data.data.dataMap.baseInfoForm.conTypeName;
                this.baseInfoForm.conTextTypeOptions = data.data.dataMap.baseInfoForm.conTextType;
                this.baseInfoForm.templateOptions = data.data.dataMap.baseInfoForm.templateName;
                this.cardContentInfoForm.tableSupplierInfo = data.data.dataMap.contentInfo.tableSupplierInfo;
                this.cardContentInfoForm.conSubjctName = data.data.dataMap.contentInfo.conSubjctName;
                this.cardContentInfoForm.thirdPartyInfo = data.data.dataMap.contentInfo.thirdPartyInfo;
                this.cardContentInfoForm.conStandard = data.data.dataMap.contentInfo.conStandard;
            });
        },
        methods: {
            handlePreview(){
                console.log('合同预览');
            },
            handleTabClick(tab, event){
                console.log('handleTabClick');
            },
            handleNewSubjectName(){
                this.baseInfoForm.dialogNewSubjectVisible = true;
            },
            handleAddPaymentMethod(){
                this.cardFinanceInfoForm.dialogNewPaymentVisible = true;
            },
            handleAddNewPay(formName){
                this.$refs[formName].resetFields();
                this.cardFinanceInfoForm.dialogNewPaymentVisible = false;
            },
            handleCancelAddNewPay(){
                this.$refs[formName].resetFields();
                this.cardFinanceInfoForm.dialogNewPaymentVisible = false;
            },
            handleAddUnionCheck(){
                this.cardContCheckInfoForm.dialogAddUnionCheckVisible = true;
            },
            handleAddServiceMatter(){
                console.log('添加服务验收事项');
                this.cardContCheckInfoForm.dialogAddServiceVisible = true;
            },
            handleAddUnionCheckItem(formName){
                this.$refs[formName].resetFields();
                this.cardContCheckInfoForm.dialogAddUnionCheckVisible = false;
            },
            handleCancelAddUnionCheck(formName){
                this.$refs[formName].resetFields();
                this.cardContCheckInfoForm.dialogAddUnionCheckVisible = false;
            },
            handleAddServiceCheckItem(formName){
                this.$refs[formName].resetFields();
                this.cardContCheckInfoForm.dialogAddServiceVisible = false;
            },
            handleCancelAddServiceCheck(formName){
                this.$refs[formName].resetFields();
                this.cardContCheckInfoForm.dialogAddServiceVisible = false;
            },
            handleAddContractFile(){
                console.log('添加合同文件');
                this.cardSealInfoForm.dialogNewContractVisible = true;
            },
            handleAddContractItem(formName){
                this.$refs[formName].resetFields();
                this.cardSealInfoForm.dialogNewContractVisible = false;
            },
            handleCancelContract(formName){
                this.$refs[formName].resetFields();
                this.cardSealInfoForm.dialogNewContractVisible = false;
            },
            handleAttachment(){
                console.log('添加附件信息');
                this.cardRemarkInfoForm.dialogAddAttachmentVisible = true;
            },
            handleAddAttachmentItem(formName){
                this.$refs.upload.submit();
                this.$refs[formName].resetFields();
                this.cardRemarkInfoForm.dialogAddAttachmentVisible = false;
            },
            handleCancelAttachment(formName){
                this.$refs[formName].resetFields();
                this.cardRemarkInfoForm.dialogAddAttachmentVisible = false;
            },
            handlebeforeFileUpload(file){
                console.log('upload-file', file);
                return file;
            },
            handleFileUploadSuccess(res, file, fileList){
                console.log('res', res);
                console.log('file', file);
            },
            handleFileUploadError(err, file, fileList){
                console.log('error', err);
                console.log('file', file);
                console.log('fileList', fileList);
            },
            handlebeforeFileUploadItem(file){
                console.log('upload-file', file);
                return file;
            },
            handleFileUploadSuccessItem(res, file, fileList){
                console.log('res', res);
                console.log('file', file);
            },
            handleFileUploadErrorItem(err, file, fileList){
                console.log('error', err);
                console.log('file', file);
                console.log('fileList', fileList);
            },
            handleContractDetail(index, row){
                console.log('详情', index, row);
            },
            handleSave(formName){
                console.log('save', formName);
            },
            handleSubmit(formName){
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        alert('submit!');
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            handleAddNewSubject(formName){
                let curForm = this.$refs[formName];
                curForm.validate((valid) => {
                    if (valid) {
                        let arr = this.formNewSubject.subjects, key = this.formNewSubject.search;
                        let index = _.findIndex(this.cardContentInfoForm.conSubjctName, function (chr) {
                            return chr.id == key;
                        });
                        if (index > -1) {
                            this.$message.error('这条数据已存在咯！');
                            return false;
                        }
                        for (let i = 0, len = arr.length; i < len; i++) {
                            if (arr[i].id === key) {
                                this.cardContentInfoForm.conSubjctName.push({
                                    id: arr[i].id,
                                    name: arr[i].name,
                                    type: 'add'
                                });
                            }
                        }
                        curForm.resetFields();
                        this.baseInfoForm.dialogNewSubjectVisible = false;
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            handleCancelAddNewSubject(formName){
                this.$refs[formName].resetFields();
                this.baseInfoForm.dialogNewSubjectVisible = false;
            },
            handleChangeEffectiveDate(date){
                this.cardContentInfoForm.effectiveDate = date;
                let endDate = 'this.cardContentInfoForm.endDate';
                if (endDate) {

                    console.log(' has endDate');
                    console.log('new Date(date)', new Date(date));
                    console.log('this.cardContentInfoForm.endDate', this.cardContentInfoForm.endDate);
                    console.log('new Date(this.cardContentInfoForm.endDate)', new Date(this.cardContentInfoForm.endDate));
                    if (new Date(date) > new Date(this.cardContentInfoForm.endDate)) {
                        console.log('add rules');
                        this.cardContentInfoForm.effectiveDateRules = `[
      { required: true, message: '请输入邮箱地址', trigger: 'blur' },
      {  message: '合同终止日期必须大于合同生效日期', trigger: 'change' }
    ]`;
                    }
                }

            },
            handleChangeEndDate(date){
                this.cardContentInfoForm.endDate = date;
                console.log('end time', date);
            },
            handleAddContractSupplier(){
                this.cardContentInfoForm.dialogAddContractSupplier = true;
            },
            getRemoteSuppliersByKeyWord(query){
                if (query !== '') {
                    this.formContractSupplier.loading = true;
                    Api.getRemoteSuppliersByKeyWord({key: query})
                            .then((data)=> {
                                this.formContractSupplier.loading = false;
                                this.formContractSupplier.suppliers = data.data.dataMap.list;
                            });
                } else {
                    this.formContractSupplier.suppliers = [];
                }
            },
            handleNewContractSupplier(formName){
                let curForm = this.$refs[formName];
                curForm.validate((valid) => {
                    if (valid) {
                        let arr = this.formContractSupplier.suppliers, key = this.formContractSupplier.search;
                        for (let i = 0, len = arr.length; i < len; i++) {
                            if (arr[i].id === key) {
                                this.cardContentInfoForm.tableSupplierInfo = [{
                                    id: arr[i].id,
                                    name: arr[i].name,
                                    type: 'add'
                                }];
                            }
                        }
                        curForm.resetFields();
                        this.cardContentInfoForm.dialogAddContractSupplier = false;
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            handleNewContractSupplierCancel(formName){
                this.$refs[formName].resetFields();
                this.cardContentInfoForm.dialogAddContractSupplier = false;
            },
            handleRemoveSupplier(index, rows){
                rows.splice(index, 1);
            },
            getRemoteSubjectsByKeyWord(query){
                if (query !== '') {
                    this.formNewSubject.loading = true;
                    Api.getRemoteSubjectsByKeyWord({key: query})
                            .then((data)=> {
                                this.formNewSubject.loading = false;
                                this.formNewSubject.subjects = data.data.dataMap.list;
                            });
                } else {
                    this.formNewSubject.subjects = [];
                }
            },
            handleRemoveSubect(index, rows){
                rows.splice(index, 1);
            },


            getModuleList() {
                const $self = this;
                api.getTemplateModuleList({}).then((res) => {
                    $self.source.templateModules = res.data.data.modules.map(function (el) {
                        return {
                            key: el.Code,
                            label: el.Name,
                            disabled: false,
                            content: el.Content,
                            sort: el.Sort,
                            type: el.Type,
                            position: el.Position,
                        };

                    });

                    $self.source.templateTags = res.data.data.templateTags;
                });
            },
            refreshTemplate() {
                const newTargetItems = [];
                this.source.targetModuleKeys.forEach(key => {
                    newTargetItems.push(this.source.templateModules.find((m) => {
                        return m.key === key
                    }));
                });
//				newTargetItems.sort(m => {
//					return m.sort
//				});

                this.editTemplate.header = '';
                this.editTemplate.footer = '';
                const templateTags = this.source.templateTags;

                newTargetItems.forEach(m => {
                    if (m.type === 'H')
                        this.editTemplate.header += m.content;
                    else if (m.type === 'F')
                        this.editTemplate.footer += m.content;
                    else if (m.type === 'S') {
                        this.source.targetTagKeys.forEach(c => {
                            const item = templateTags.find(t => {
                                return c === t.Code && m.key === t.ModuleCode;
                            });
                            if (item) {
                                if (m.position === 'Top')
                                    this.editTemplate.header += item.Content;
                                else
                                    this.editTemplate.footer += item.Content;
                            }
                        });
                    }
                });
                this.editTemplate.header = tagService.template_preview('<h2 style="text-align:center;">' + "联合扶持品牌经销商营销活动协议" + '</h2><br/><br/>' + this.editTemplate.header);
                this.editTemplate.footer = tagService.template_preview(this.editTemplate.footer);
            },
            formatTemplateContent(content) {
                if (content) {
                    return content;
                } else {
                    return '';
                }
            },
            conPreview() {
                let templateCode = this.con.templateCode;
                if (templateCode === "0") {
                    this.$Message.error('请选择模板名称!');
                    return;
                }

                const conContent = '<span>依照《中华人民共和国合同法》，《中华人民共和国建筑法》，《中华人民共和国消防法》，及其他有关法律，行政法规，遵循平等，自愿，公平和诚实信用的原则，甲方将红星美凯龙北京西四环商场防火门改造安装工程承包给乙方施工，为确保施工进度和质量，经甲、乙双方协商一致，订立本合同。</span>';
                this.showConPreviewModal = true;
                const conTemplates = [
                    {concode: "1", moduleKeys: ['header2', 'purchase_table', 'footer'], content: conContent},
                    {concode: "2", moduleKeys: ['header2', 'payment', 'footer'], content: conContent},
                    {concode: "3", moduleKeys: ['header2', 'footer'], content: conContent},
                    {concode: "4", moduleKeys: ['header2', 'purchase_table', 'payment', 'footer'], content: conContent}
                ];

                let conTemplate = conTemplates.find(t => {
                    return templateCode === t.concode;
                });

                this.source.targetModuleKeys = conTemplate.moduleKeys;
                this.editTemplate.content = conTemplate.content;
                this.source.targetTagKeys = [];
                if (this.pr.type === 1) {
                    this.source.targetTagKeys.push("purchase_table_1");
                } else {
                    this.source.targetTagKeys.push("purchase_table_2");
                }
                if (this.con.isOnePay === 1) {
                    this.source.targetTagKeys.push("payment_2");
                } else {
                    this.source.targetTagKeys.push("payment_1");
                }
                this.refreshTemplate();

                this.editTemplate.html = this.editTemplate.header + this.formatTemplateContent(this.editTemplate.content) + this.editTemplate.footer;
                templateReplace.addData("materials", this.pr.materials);
                templateReplace.addData("payments", this.con.payments);
                this.editTemplate.html = templateReplace.getRepalceHtml(this.editTemplate.html);
            },
            cancel() {
                this.showConCheckPersonModal = false;
            },
            exportPDF() {
                const newWindow = window.open("打印窗口", "_blank");
                //打印内容写入newWindow文档
                newWindow.document.write(this.editTemplate.html);
                //关闭文档
                newWindow.document.close();
                //调用打印机
                newWindow.print();
                //关闭newWindow页面
                newWindow.close();
            }
        },
    }
</script>