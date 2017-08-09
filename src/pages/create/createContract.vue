<style>
    .ivu-input-type,
    .ivu-select-single {
        width: 180px;
    }
</style>
<template>
    <div>
        <el-card>
            <el-form ref="conForm" :model="conForm" label-width="100px">
                <el-form-item label="是否有比价单">
                    <el-switch v-model="conForm.isPr"></el-switch>
                </el-form-item>
                <el-row>
                    <el-col :span="8">
                        <el-form-item label="比价单" v-if="conForm.isPr">
                            <el-input v-model="conForm.strPC" placeholder="请输入"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8" v-if="conForm.isPr">
                        <el-button @click="handleQuery" type="primary">查找</el-button>
                        <el-button @click="handleDetail" type="primary">详情</el-button>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="8">
                        <el-form-item label="合同模式">
                            <el-select v-model="conForm.curConTypeId" placeholder="请选择合同类型">
                                <el-option
                                        v-for="item in conForm.conModel"
                                        :key="item.id"
                                        :value="item.id"
                                        :label="item.name"
                                >
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="合同类型">
                            <el-select v-model="conForm.curConModelId" placeholder="请选择合同模式">
                                <el-option
                                        v-for="item in conForm.conType"
                                        :key="item.id"
                                        :value="item.id"
                                        :label="item.name"
                                >
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
        </el-card>
        <el-button type="primary" @click="handleNext">下一步</el-button>
        <el-card v-if="arrPr.length>0">
            <el-table ref="prTable" :data="arrPr" highlight-current-row @current-change="handleCurrentChange">
                <el-table-column
                        type="index"
                        width="50">
                </el-table-column>
                <el-table-column
                        property="id"
                        label="比价单编码"
                        width="120">
                </el-table-column>
                <el-table-column
                        property="name"
                        label="发起人"
                        width="120">
                </el-table-column>
                <el-table-column
                        property="department"
                        label="发起部门"
                        width="120">
                </el-table-column>
                <el-table-column
                        property="startTime"
                        label="发起时间"
                        width="120">
                </el-table-column>
                <el-table-column
                        property="processStatus"
                        label="流程状态"
                        width="120">
                </el-table-column>
                <el-table-column
                        property="endTime"
                        label="结束时间"
                        width="120">
                </el-table-column>
            </el-table>
        </el-card>

        <!--<Modal v-model="showSearchComparisonModal" title="查询比价单" width="400">
            <Form :label-width="100">
                <Form-item label="PR号">
                    <Input placeholder="请输入"></Input>
                </Form-item>
                <Form-item label="材料编码">
                    <Input placeholder="请输入"></Input>
                </Form-item>
                <Form-item label="创建人">
                    <Input placeholder="请输入"></Input>
                </Form-item>
                <Form-item label="创建时间">
                    <Date-picker type="daterange" :options="options2" placement="bottom-end" placeholder="选择日期"
                                 style="width: 200px"></Date-picker>
                </Form-item>
            </Form>
        </Modal>-->
        <!--<approveprocess></approveprocess>-->
    </div>
</template>
<script>
    import approveprocess from '../../components/approveProcess.vue'

    export default {
        created() {
        },
        data(){
            return {
                conForm: {
                    isPr: true,
                    strPC: '',//比价单编号
                    curConModelId: '',
                    curConTypeId: '',
                    conModel: [
                        {id: 1, name: '框架意向合同'},
                        {id: 2, name: '框架合同'},
                        {id: 3, name: '单一合同'},
                        {id: 4, name: '简易合同'},
                    ],
                    conType: [
                        {id: 11, name: '服务类'},
                        {id: 22, name: '礼品类'},
                        {id: 33, name: '企划礼品类'},
                    ]
                },
                arrPr: [//比价单列表
                    {
                        id: 111,
                        name: 'wyy',
                        department: '技术研发部',
                        startTime: '2017-09-09',
                        processStatus: '1',
                        endTime: '2017-10-09'
                    },
                    {
                        id: 222,
                        name: 'wyy',
                        department: '技术研发部',
                        startTime: '2017-09-09',
                        processStatus: '1',
                        endTime: '2017-10-09'
                    },
                ],
            }
        },
        methods: {
            handleQuery(){
                console.log('handleQuery')
            },
            handleDetail(){
                console.log('handleDetail');
            },
            handleNext(){
                console.log('handleNext');
            },
            handleCurrentChange(currentRow){
                console.log('currentRow', currentRow);
            },
            nextStep() {
                if (this.hasPR) {
                    if (!this.pr) {
                        this.$Message.error('请填写PR号!');
                        return;
                    }
                }

                this.$router.push({
                    path: "/ConCreate/CreateFrameContract",
                    query: {
                        pr: this.pr,
                        conModel: this.conModel,
                        conType: this.conType,
                    }
                });

            }
        }
    }
</script>
