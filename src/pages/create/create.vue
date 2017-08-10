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
                        <el-button style="margin-left: 33px" class="btnSearch" @click="handleQuery" type="primary">查找
                        </el-button>
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
        <el-card v-if="arrPr.length>0">
            <el-table ref="prTable" :data="arrPr" highlight-current-row @current-change="handleCurrentChange">
                <!--<el-table-column label="状态" width="50">
                    <i class="el-icon-circle-check"></i>
                </el-table-column>-->
                <el-table-column
                        type="index">
                </el-table-column>
                <el-table-column
                        property="id"
                        label="比价单编码">
                </el-table-column>
                <el-table-column
                        property="name"
                        label="发起人">
                </el-table-column>
                <el-table-column
                        property="department"
                        label="发起部门">
                </el-table-column>
                <el-table-column
                        property="startTime"
                        label="发起时间">
                </el-table-column>
                <el-table-column
                        property="processStatus"
                        label="流程状态">
                </el-table-column>
                <el-table-column
                        property="endTime"
                        label="结束时间">
                </el-table-column>
            </el-table>
            <div style="text-align: right;margin-top:20px">
                <el-button class="btnCancelChoose" type="primary" @click="handleCancel">取消选择
                </el-button>
            </div>
        </el-card>
        <div style="text-align: center;margin-top:20px">
            <el-button type="primary" @click="handleNext">下一步</el-button>
        </div>
        <el-dialog title="查询比价单" :visible.sync="dialogVisible" size="tiny">
            <el-form ref="prForm" :model="prForm" label-width="100px">
                <el-form-item label="PR号">
                    <el-input v-model="prForm.prCode" placeholder="请输入PR号"></el-input>
                </el-form-item>
                <el-form-item label="材料编码">
                    <el-input v-model="prForm.meterialCode" placeholder="请输入材料编码"></el-input>
                </el-form-item>
                <el-form-item label="创建人">
                    <el-input v-model="prForm.createPerson" placeholder="请输入创建人"></el-input>
                </el-form-item>
                <el-form-item label="创建时间">
                    <el-date-picker v-model="prForm.createTime" type="daterange" align="right" placeholder="选择日期范围"
                                    :picker-options="prForm.pickerOption">
                    </el-date-picker>
                </el-form-item>
            </el-form>
            <template slot="footer">
                <el-button type="primary" @click="handleCloseDialog">关闭</el-button>
                <el-button type="primary" @click="handleOKDialog">确定</el-button>
            </template>
        </el-dialog>
    </div>
</template>
<script>
    //import approveprocess from '../../components/approveProcess.vue';
    import Api from '../../api/create';

    export default {
        data(){
            return {
                conForm: {
                    isPr: true,
                    strPC: '',//比价单编号
                    curConModelId: '',
                    curConTypeId: '',
                    conModel: [],
                    conType: []
                },
                arrPr: [],//比价单列表
                currentPr: null,//当前选择的比价单
                dialogVisible: false,
                prForm: {
                    prCode: '',
                    meterialCode: '',
                    createPerson: '',
                    createTime: '',
                    pickerOption: {
                        shortcuts: [
                            {
                                text: '最近一周',
                                onClick(picker){
                                    const end = new Date();
                                    const start = new Date();
                                    start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                                    picker.$emit('pick', [start, end]);
                                    console.log('start', start);
                                    console.log('end', end);
                                }
                            }, {
                                text: '最近一个月',
                                onClick(picker) {
                                    const end = new Date();
                                    const start = new Date();
                                    start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                                    picker.$emit('pick', [start, end]);

                                }
                            }, {
                                text: '最近三个月',
                                onClick(picker) {
                                    const end = new Date();
                                    const start = new Date();
                                    start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                                    picker.$emit('pick', [start, end]);
                                }
                            }
                        ]
                    }
                },
            }
        },
        created() {
            Api.getContractModelsAndTypes({}).then((data)=> {
                this.conForm.conModel = data.data.dataMap.modelList;
                this.conForm.conType = data.data.dataMap.typeList;
            });
        },
        methods: {
            handleQuery(){
                this.dialogVisible = true;
            },
            handleDetail(){
                console.log('handleDetail');
            },
            handleNext(){
                this.$router.push({
                    path: '/ConCreate/CreateFrameContract',
                    query: {
                        currentPr: this.currentPr.id,
                        curConModelId: this.conForm.curConModelId,
                        curConTypeId: this.conForm.curConTypeId
                    }
                });
            },
            handleCurrentChange(currentRow){
                this.currentPr = currentRow;
            },
            handleCancel(row){
                this.$refs.prTable.setCurrentRow(row);
            },
            handleCloseDialog(){
                this.dialogVisible = false;
            },
            handleOKDialog(){
                this.dialogVisible = false;
                const startTime = this.prForm.createTime[0] ? this.prForm.createTime[0].toLocaleDateString() : '';
                const endTime = this.prForm.createTime[1] ? this.prForm.createTime[1].toLocaleDateString() : '';
                Api.getQrList({
                    qrCode: this.conForm.strPC,
                    prCode: this.prForm.prCode,
                    meterialCode: this.prForm.meterialCode,
                    createPerson: this.prForm.createPerson,
                    startTime: startTime,
                    endTime: endTime,
                })
                        .then((data)=> {
                            this.arrPr = data.data.dataMap.list;
                        });
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
        },
    }
</script>