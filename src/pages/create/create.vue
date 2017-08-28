<template>
    <div>
        <el-card>
            <el-form ref="conForm" :model="conForm" :rules="conFormRules" label-width="100px">
                <el-form-item label="是否有比价单">
                    <el-switch v-model="conForm.isPr" @change="handleSwitch"></el-switch>
                </el-form-item>
                <el-row>
                    <el-col :span="8">
                        <el-form-item label="比价单" v-if="conForm.isPr" prop="strPC">
                            <el-input v-model="conForm.strPC" placeholder="请输入比价单号"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8" v-if="conForm.isPr">
                        <el-button style="margin-left: 33px" :disabled="!conForm.strPC" class="btnSearch"
                                   @click="handleQuery" type="primary">查找
                        </el-button>
                        <el-button @click="handleDetail" :disabled="!conForm.strPC" type="primary">详情
                        </el-button>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="8">
                        <el-form-item label="合同模式" prop="curConModelId">
                            <el-select
                                    v-model="conForm.curConModelId"
                                    placeholder="请选择合同模式"
                                    class="wp100"
                            >
                                <el-option
                                        v-for="item in conModels"
                                        :key="item.id"
                                        :value="item.id"
                                        :label="item.name"
                                >
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="合同类型" prop="curConTypeId">
                            <el-select
                                    v-model="conForm.curConTypeId"
                                    placeholder="请选择合同类型"
                                    class="wp100"
                            >
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
        <el-card v-if="conForm.isPr&&arrPr.length">
            <el-table ref="prTable" :data="arrPr" highlight-current-row @current-change="handleCurrentChange">
                <el-table-column
                        label="序号"
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
                <el-table-column
                        fixed="right"
                        label="操作">
                    <template scope="scope">
                        <el-button @click.stop="handleDetailPR(scope.$index,scope.row)" type="text">查看</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div style="text-align: right;margin-top:20px">
                <el-button class="btnCancelChoose" type="primary" :disabled="!(currentPr&&currentPr.id)"
                           @click="handleCancel">取消选择
                </el-button>
            </div>
        </el-card>
        <div style="text-align: center;margin-top:20px">
            <el-button type="primary" @click="handleNext('conForm')" :disabled="!!(arrPr.length&&!currentPr)">下一步
            </el-button>
        </div>
        <el-row>
            <el-col :span="8">
                <el-button type="primary" @click="handleTestCreate">创建</el-button>
            </el-col>
            <el-col :span="8">
                <el-button type="primary" @click="handleTestUpdate">更新</el-button>
            </el-col>
            <el-col :span="8">
                <el-button type="primary" @click="handleTestQuery">查看</el-button>
            </el-col>
        </el-row>
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
                    <el-date-picker
                            style="width:100%"
                            v-model="prForm.createTime"
                            type="daterange"
                            align="right"
                            placeholder="选择日期范围"
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
    import Api from '../../api/manageContract';

    export default {
        data() {
            return {
                conForm: {
                    isPr: true,
                    strPC: '',//比价单编号
                    curConModelId: '',
                    curConTypeId: '',
                    conModel: [],
                    conType: [],
                },
                conFormRules: {
                    strPC: [
                        {required: true, message: '请输入比加单编号', trigger: 'blur'},
                    ],
                    curConTypeId: [
                        {required: true, message: '请选择合同模式', trigger: 'change'}
                    ],
                    curConModelId: [
                        {required: true, message: '请选择合同类型', trigger: 'change'}
                    ]
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
                                onClick(picker) {
                                    const end = new Date();
                                    const start = new Date();
                                    start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                                    picker.$emit('pick', [start, end]);
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
            };
        },
        mounted() {
            Api.getContractModelsAndTypes({}).then((data) => {
                this.conForm.conModel = data.data.dataMap.modelList;
                this.conForm.conType = data.data.dataMap.typeList;
            });
        },
        computed: {
            conModels: function () {
                const conForm = this.conForm;
                return conForm.isPr ? conForm.conModel : [conForm.conModel[0], conForm.conModel[1]];
            }
        },
        methods: {
            handleSwitch(newStatus) {
                if (!newStatus) {
                    this.arrPr = [];
                    this.conForm.strPC = '';
                    this.conForm.curConModelId = '';
                    this.conForm.curConTypeId = '';
                }
            },
            handleQuery() {
                this.dialogVisible = true;
            },
            handleDetail() {
                Api.getPrDetail({strPC: this.conForm.strPC})
                        .then((data)=> {
                            let url = data.data.dataMap ? data.data.dataMap.url : '';
                            if (url) {
                                window.open(url);
                            } else {
                                this.$message.error('您输入的比加单号错了哦');
                            }
                        });

            },
            handleNext(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        let routePath = '';
                        switch (this.conForm.curConModelId) {
                            case 'con1':
                                routePath = '/ConCreate/CreateIntentionContract';
                                break;
                            case 'con2':
                                routePath = '/ConCreate/CreateFrameContract';
                                break;
                            case 'con3':
                                routePath = '/ConCreate/CreateSingleContract';
                                break;
                            case 'con4':
                                routePath = '/ConCreate/CreateSimpleContract';
                                break;
                        }
                        this.$router.push({
                            path: routePath,
                            query: {
                                currentPr: this.currentPr ? this.currentPr.id : '',
                                curConModelId: this.conForm.curConModelId,
                                curConTypeId: this.conForm.curConTypeId,
                                operateType: 'create'
                            }
                        });
                    }
                    else {
                        return false;
                    }
                });
            },
            handleCurrentChange(currentRow) {
                this.currentPr = currentRow;
            },
            handleCancel(row) {
                this.$refs.prTable.setCurrentRow(row);
                this.currentPr = null;
            },
            handleCloseDialog() {
                this.dialogVisible = false;
            },
            handleOKDialog() {
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
                }).then((data)=> {
                    this.arrPr = data.data.dataMap ? data.data.dataMap.list : [];
                });
            },
            handleDetailPR(index, row) {
                window.open(row.url);
            },
            handleTestCreate(){
                console.log('create');
                let routePath = '/ConCreate/CreateFrameContract';
                this.$router.push({
                    path: routePath,
                    query: {
                        currentPr: this.currentPr ? this.currentPr.id : '',
                        curConModelId: this.conForm.curConModelId,
                        curConTypeId: this.conForm.curConTypeId,
                        operateType: 'create'
                    }
                });
            },
            handleTestUpdate(){
                console.log('update');
                let routePath = '/ConCreate/CreateFrameContract';
                this.$router.push({
                    path: routePath,
                    query: {
                        currentPr: this.currentPr ? this.currentPr.id : '',
                        curConModelId: this.conForm.curConModelId,
                        curConTypeId: this.conForm.curConTypeId,
                        operateType: 'update'
                    }
                });
            },
            handleTestQuery(){
                console.log('query');
                //http://localhost:8080/#/ConCreate/CreateFrameContract?currentPr=&curConModelId=&curConTypeId=&operateType=update
                let routePath = '/ConCreate/CreateFrameContract';
                this.$router.push({
                    path: routePath,
                    query: {
                        currentPr: this.currentPr ? this.currentPr.id : '',
                        curConModelId: this.conForm.curConModelId,
                        curConTypeId: this.conForm.curConTypeId,
                        operateType: 'query'
                    }
                });
            },
        },
    }
</script>
