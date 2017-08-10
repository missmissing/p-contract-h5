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
        <el-dialog title="查询比价单" :visible.sync="dialogVisible" size="tiny" :before-close="handleCloseDialog">
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
        methods: {
            handleQuery(){
                console.log('handleQuery')
            },
            handleDetail(){
                console.log('handleDetail');
            },
            handleNext(){
                this.dialogVisible = true;
                console.log('handleNext');
            },
            handleCurrentChange(currentRow){
                this.currentPr = currentRow;
                console.log('currentRow', currentRow);
            },
            handleCancel(row){
                this.$refs.prTable.setCurrentRow(row);
            },
            handleCloseDialog(done){
                console.log('handleCloseDialog');
                done();
            },
            handleCloseDialog(){
                this.dialogVisible = false;
                console.log('handleCloseDialog');
            },
            handleOKDialog(){
                this.dialogVisible = false;
                console.log('handleOKDialog', this.prForm.createTime);
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