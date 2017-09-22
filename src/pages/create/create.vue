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
              <el-input v-model="conForm.strPC"  v-on:keyup.enter="handleQuery" placeholder="请输入比价单号"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8" v-if="conForm.isPr">
            <el-button style="margin-left: 33px" :disabled="!conForm.strPC" class="btnSearch"
                       @click="handleQuery" type="primary">查找
            </el-button>
            <el-button @click="handleHighQuery" type="primary">高级
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
            <el-form-item label="合同类型" prop="conTypeName">
              <el-input readonly placeholder="请选择合同类型" @focus="visible=true" v-model="conForm.conTypeName"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-card>
    <el-card v-if="curPriceList.length">
      <el-table ref="prTable" :data="curPriceList">
        <el-table-column
          property="folio"
          label="比价单编码">
          <template scope="scope">
            {{scope.row.folio}}
          </template>
        </el-table-column>
        <el-table-column
          property="originatorName"
          label="发起人">
        </el-table-column>
        <el-table-column
          property="originatorDepartmentName"
          label="发起部门"
          :show-overflow-tooltip="true">
        </el-table-column>
        <el-table-column
          property="startTime"
          label="发起时间">
          <template scope="scope">
            {{transformDataFormat(curPriceList[scope.$index].startTime)}}
          </template>
        </el-table-column>
        <el-table-column
          property="finishTime"
          label="结束时间">
          <template scope="scope">
            {{transformDataFormat(curPriceList[scope.$index].finishTime)}}
          </template>
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作">
          <template scope="scope">
            <el-button @click.stop="handleDetailPR(scope.$index,scope.row)" type="text">查看</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <div style="text-align: center;margin-top:20px">
      <el-button type="primary" @click="handleNext('conForm')" :disabled="!!(arrPr.length&&!currentPr)">下一步
      </el-button>
    </div>
    <!--<el-row>
      <el-col :span="8">
        <el-button type="primary" @click="handleTestCreate">创建</el-button>
      </el-col>
      <el-col :span="8">
        <el-button type="primary" @click="handleTestUpdate">更新</el-button>
      </el-col>
      <el-col :span="8">
        <el-button type="primary" @click="handleTestQuery">查看</el-button>
      </el-col>
    </el-row>-->
    <el-dialog title="查询比价单" :visible.sync="dialogVisible" size="large">
      <el-form ref="prForm" :model="prForm" label-width="100px" :rules="prForm.rules">
        <el-row>
          <el-col :span="8">
            <el-form-item label="PR号" prop="prCode">
              <el-input v-model="prForm.prCode" placeholder="请输入PR号"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="创建人" prop="createPerson">
              <el-select
                style="width:300px"
                size="small"
                v-model="prForm.createPerson"
                filterable
                remote
                placeholder="请输入关键词搜索"
                :remote-method="getRemoteCreatePersonsByKeyWord"
                :loading="prForm.loading">
                <el-option
                  v-for="item in prForm.createPersons"
                  :key="item.userId"
                  :label="item.userName"
                  :value="item.userId">
                  <span style="float: left">{{ item.userName }}</span>
                  <span style="float: right; color: #8492a6; font-size: 13px">{{ item.deptName }}</span>
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <!--<el-form-item label="材料编码">
          <el-input v-model="prForm.meterialCode" placeholder="请输入材料编码"></el-input>
        </el-form-item>-->
        <el-row>
          <el-col :span="8" prop="createTime">
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
          </el-col>
          <el-col :span="8" :offset="1">
            <el-button type="primary" @click="handleQueryPriceList('prForm')">查询</el-button>
          </el-col>
        </el-row>
      </el-form>
      <el-table ref="priceList" :data="priceList" highlight-current-row border @current-change="handleSelectCurrent"
                max-height="250" @row-click="handleRowClick">
        <el-table-column prop="ifSelect" label="选择">
          <template scope="scope">
            <el-checkbox v-model="scope.row.ifSelect"></el-checkbox>
          </template>
        </el-table-column>
        <el-table-column
          label="序号"
          type="index"
          width="80px">
        </el-table-column>
        <el-table-column
          property="folio"
          label="比价单编码">
        </el-table-column>
        <el-table-column
          property="originatorName"
          label="发起人">
        </el-table-column>
        <el-table-column
          :show-overflow-tooltip="true"
          property="originatorDepartmentName"
          label="发起部门">
        </el-table-column>
        <el-table-column
          property="startTime"
          label="发起时间">
          <template scope="scope">
            {{transformDataFormat(priceList[scope.$index].startTime)}}
          </template>
        </el-table-column>
        <el-table-column
          property="finishTime"
          label="结束时间">
          <template scope="scope">
            {{transformDataFormat(priceList[scope.$index].finishTime)}}
          </template>
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作">
          <template scope="scope">
            <el-button @click.stop="handleDetailPR(scope.$index,scope.row)" type="text">查看</el-button>
          </template>
        </el-table-column>
      </el-table>
      <template slot="footer">
        <el-button type="primary" @click="handleCloseDialog">关闭</el-button>
        <el-button type="primary" @click="handleOKDialog">确定</el-button>
      </template>
    </el-dialog>
    <TreeModal
      nodeKey="id"
      title="选择业务类型"
      :visible.sync="visible"
      :regions="regions"
      :defaultProps="defaultProps"
      @ok="setBusiType"
      v-on:close="closeTree">
    </TreeModal>
  </div>
</template>

<script>
  import Api from '../../api/manageContract'
  import getBusiType from '@/mixins/getBusiType'
  import comLoading from '@/mixins/comLoading'
  import TreeModal from '@/components/treeModal.vue'
  import {formatDate} from '@/filters/moment'

  export default {
    mixins: [getBusiType, comLoading],
    data() {
      return {
        conForm: {
          isPr: true,
          strPC: '', // 比价单编号
          curConModelId: null,
          conModel:[
            {id: '1', name: '单一合同'},
            {id: '2', name: '简易合同'},
            {id: '3', name: '框架合同'},
            {id: '4', name: '框架意向合同'}
          ],
          conType: '',
          conTypeName: '',
        },
        conFormRules: {
          curConModelId: [
            {required: true, message: '请选择合同模式', trigger: 'change'}
          ],
          conTypeName: [
            {required: true, message: '请选择合同类型', trigger: 'change'}
          ],
        },
        arrPr: [], // 比价单列表
        dialogVisible: false,
        prForm: {
          prCode: '',
          meterialCode: '',
          createPerson: '',
          createPersons: [],
          loading: false,
          createTime: '',
          pickerOption: {
            shortcuts: [
              {
                text: '最近一周',
                onClick(picker) {
                  const end = new Date()
                  const start = new Date()
                  start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
                  picker.$emit('pick', [start, end])
                }
              }, {
                text: '最近一个月',
                onClick(picker) {
                  const end = new Date()
                  const start = new Date()
                  start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
                  picker.$emit('pick', [start, end])
                }
              }, {
                text: '最近三个月',
                onClick(picker) {
                  const end = new Date()
                  const start = new Date()
                  start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
                  picker.$emit('pick', [start, end])
                }
              }
            ]
          },
          rules: {
            /*createPerson: [
              {required: true, message: '请输入搜索关键字', trigger: 'blur'}
            ]*/
          },
        },
        priceList: [],
        currentPr: null, // 当前选择的比价单
        curPriceList: [], // 当前选择的比价单
        visible: false,
        defaultProps: {
          children: 'children',
          label: 'businessName'
        },
      }
    },
    mounted() {
    },
    computed: {
      conModels: function () {
        const conForm = this.conForm
        return conForm.isPr ? [conForm.conModel[0], conForm.conModel[1], conForm.conModel[2]] : [conForm.conModel[2], conForm.conModel[3]]
      }
    },
    watch: {
      'conForm.isPr': function (val, oldVal) {
        if (!val) {
          this.curPriceList = [];
        }
      }
    },
    components: {
      TreeModal
    },
    methods: {
      transformDataFormat(date){
        return formatDate(date)
      },
      handleSwitch(newStatus) {
        if (!newStatus) {
          this.arrPr = []
          this.conForm.strPC = ''
          this.conForm.curConModelId = ''
          this.conForm.conTypeName = ''
          this.conForm.conType = ''
        }
      },
      handleQuery(e) {
        console.log('query');
        this.comLoading(1)
        Api.getQrDetail({
          folio: this.conForm.strPC,
        }).then((data) => {
          if (data.data.dataMap) {
            this.currentPr = data.data.dataMap;
            this.curPriceList = [data.data.dataMap];
          }
          this.comLoading()
        })
      },
      handleHighQuery() {
        this.dialogVisible = true
      },
      handleNext(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            if (this.conForm.isPr && !this.curPriceList.length) {
              this.$message({
                message: '请选择一条比加单信息！',
                type: 'warning'
              });
              return
            }
            let routePath = ''
            switch (this.conForm.curConModelId) {
              case '4':
                routePath = '/ConCreate/CreateIntentionContract'
                break
              case '3':
                routePath = '/ConCreate/CreateFrameContract'
                break
              case '1':
                routePath = '/ConCreate/CreateSingleContract'
                break
              case '2':
                routePath = '/ConCreate/CreateSimpleContract'
                break
            }
            this.$router.push({
              path: routePath,
              query: {
                currentFolio: this.currentPr ? this.currentPr.folio : '',
                curConModelId: this.conForm.curConModelId,
                curConTypeId: this.conForm.conType,
                operateType: 'create'
              }
            })

            if (this.curPriceList.length) {
              this.curPriceList = [];
              this.currentPr = null;
            }
            this.$refs[formName].resetFields();

          } else {
            return false
          }
        })
      },
      handleCloseDialog() {
        this.dialogVisible = false
        if (this.currentPr) {
          this.currentPr.clicked = false;
          this.currentPr.ifSelect = false;
          this.$refs.priceList.setCurrentRow(null);
          this.priceList=[];
        }
        this.$refs.prForm.resetFields()
      },
      handleOKDialog() {
        this.dialogVisible = false
        if (this.currentPr) {
          this.curPriceList = [this.currentPr];
          this.conForm.strPC = '';
        }
        this.currentPr.clicked = false;
        this.currentPr.ifSelect = false;
        this.$refs.priceList.setCurrentRow(null);
        this.priceList=[];
        this.$refs.prForm.resetFields()

      },
      handleDetailPR(index, row) {
        window.open(row.processViewUrl)
      },
      /* handleTestCreate() {
       console.log('create')
       let routePath = '/ConCreate/CreateFrameContract'
       this.$router.push({
       path: routePath,
       query: {
       currentPr: this.currentPr ? this.currentPr.id : '',
       curConModelId: this.conForm.curConModelId,
       curConTypeId: this.conForm.curConTypeId,
       operateType: 'create'
       }
       })
       },
       handleTestUpdate() {
       console.log('update')
       let routePath = '/ConCreate/CreateFrameContract'
       this.$router.push({
       path: routePath,
       query: {
       currentPr: this.currentPr ? this.currentPr.id : '',
       curConModelId: this.conForm.curConModelId,
       curConTypeId: this.conForm.curConTypeId,
       operateType: 'update'
       }
       })
       },
       handleTestQuery() {
       console.log('query')
       // http://localhost:8080/#/ConCreate/CreateFrameContract?currentPr=&curConModelId=&curConTypeId=&operateType=update
       let routePath = '/ConCreate/CreateFrameContract'
       this.$router.push({
       path: routePath,
       query: {
       currentPr: this.currentPr ? this.currentPr.id : '',
       curConModelId: this.conForm.curConModelId,
       curConTypeId: this.conForm.curConTypeId,
       operateType: 'query'
       }
       })
       } */
      setBusiType(checkNodes,tree){
        const ids=[],names=[];
        if(checkNodes.length){
          for(let i=0,len=checkNodes.length;i<len;i++){
            ids.push(checkNodes[i].id);
            names.push(checkNodes[i].businessName);
          }
        }
        this.conForm.conType = ids.join('-')
        this.conForm.conTypeName = names.join('-')

        this.visible = false;
      },
      handleQueryPriceList(formName){
        this.comLoading(1)
        const startTime = this.prForm.createTime[0] ? this.prForm.createTime[0].toLocaleDateString() : ''
        const endTime = this.prForm.createTime[1] ? this.prForm.createTime[1].toLocaleDateString() : ''
        this.$refs[formName].validate((valid) => {
          if (valid) {
            Api.getQrList({
              pr: this.prForm.prCode,
              originator: this.prForm.createPerson,
              fromDate: formatDate(startTime),
              toDate: formatDate(endTime)
            }).then((data) => {
              if (data.data.dataMap && data.data.dataMap.length > 0) {
                let arr = data.data.dataMap;
                for (let i = 0, len = arr.length; i < len; i++) {
                  arr[i].ifSelect = false;
                }
                this.priceList = arr;
              }
              this.comLoading()
            })
          } else {
            console.log('error submit!!')
            return false
          }
        })
      },
      handleSelectCurrent(currentRow, oldRow){
        if (currentRow) {
          currentRow.ifSelect = true;
          this.currentPr = currentRow;
        }
        if (oldRow) {
          oldRow.ifSelect = false
        }
      },
      handleRowClick(row){
        if (row.clicked) {
          row.clicked = false;
          this.$refs.priceList.setCurrentRow(null);
          this.currentPr = null
        } else {
          row.clicked = true;
        }
      },
      closeTree(){
        this.visible = false;
      },
      getRemoteCreatePersonsByKeyWord(query){
        if (query !== '') {
          this.prForm.loading = true
          Api.getRemoteCreatePersonsByKeyWord({keyword: query})
            .then((data) => {
              this.prForm.loading = false
              this.prForm.createPersons = data.data.dataMap
            })
        } else {
          this.prForm.createPersons = []
        }
      },
    }
  }
</script>
