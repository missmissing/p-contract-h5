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
        </el-table-column>
        <el-table-column
          property="processStatus"
          label="流程状态">
        </el-table-column>
        <el-table-column
          property="finishTime"
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
      <el-form ref="prForm" :model="prForm" label-width="100px">
        <el-row>
          <el-col :span="8">
            <el-form-item label="PR号">
              <el-input v-model="prForm.prCode" placeholder="请输入PR号"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="创建人">
              <el-input v-model="prForm.createPerson" placeholder="请输入创建人"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <!--<el-form-item label="材料编码">
          <el-input v-model="prForm.meterialCode" placeholder="请输入材料编码"></el-input>
        </el-form-item>-->
        <el-row>
          <el-col :span="8">
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
          <el-col :span="8">
            <el-button type="primary" @click="handleQueryPriceList">查询</el-button>
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
        </el-table-column>
        <el-table-column
          property="finishTime"
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

  export default {
    mixins: [getBusiType, comLoading],
    data() {
      return {
        conForm: {
          isPr: true,
          strPC: '', // 比价单编号
          curConModelId: '',
          conModel: [{id: 'con1', name: '框架意向合同'},
            {id: 'con2', name: '框架合同'},
            {id: 'con3', name: '单一合同'},
            {id: 'con4', name: '简易合同'},],
          conType: [],
          conTypeName: '',
        },
        conFormRules: {
          strPC: [
            {required: true, message: '请输入比加单编号', trigger: 'blur'}
          ],
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
        return conForm.isPr ? conForm.conModel : [conForm.conModel[0], conForm.conModel[1]]
      }
    },
    components: {
      TreeModal
    },
    methods: {
      handleSwitch(newStatus) {
        if (!newStatus) {
          this.arrPr = []
          this.conForm.strPC = ''
          this.conForm.curConModelId = ''
          this.conForm.conTypeName = ''
          this.conForm.conType = []
        }
      },
      handleQuery() {
        this.comLoading(1)
        Api.getQrList({
          originator: this.conForm.strPC,
        }).then((data) => {
          this.arrPr = data.data.dataMap ? data.data.dataMap : [];
          this.comLoading()
        })
      },
      handleHighQuery() {
        this.dialogVisible = true
      },
      handleNext(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let routePath = ''
            switch (this.conForm.curConModelId) {
              case 'con1':
                routePath = '/ConCreate/CreateIntentionContract'
                break
              case 'con2':
                routePath = '/ConCreate/CreateFrameContract'
                break
              case 'con3':
                routePath = '/ConCreate/CreateSingleContract'
                break
              case 'con4':
                routePath = '/ConCreate/CreateSimpleContract'
                break
            }
            this.$router.push({
              path: routePath,
              query: {
                currentPr: this.currentPr ? this.currentPr.pr : '',
                curConModelId: this.conForm.curConModelId,
                curConTypeId: this.conForm.conType,
                operateType: 'create'
              }
            })
          } else {
            return false
          }
        })
      },
      handleCloseDialog() {
        this.dialogVisible = false
      },
      handleOKDialog() {
        this.dialogVisible = false
        if(this.currentPr){
          this.curPriceList = [this.currentPr];
        }
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
      setBusiType(checkNodes){
        this.conForm.conType = checkNodes[0].id
        this.conForm.conTypeName = checkNodes[0].businessName
        this.visible = false;
      },
      handleQueryPriceList(){
        this.comLoading(1)
        const startTime = this.prForm.createTime[0] ? this.prForm.createTime[0].toLocaleDateString() : ''
        const endTime = this.prForm.createTime[1] ? this.prForm.createTime[1].toLocaleDateString() : ''
        Api.getQrList({
          pr: this.prForm.prCode,
          createPerson: this.prForm.createPerson,
          fromDate: startTime,
          toDate: endTime
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
      },
      handleSelectCurrent(currentRow, oldRow){
        if(currentRow){
          currentRow.ifSelect = true;
          this.currentPr = currentRow;
        }
        if (oldRow) {
          oldRow.ifSelect = false
        }
      },
      handleRowClick(row){
        if(row.clicked){
          row.clicked = false;
          this.$refs.priceList.setCurrentRow(null);
          this.currentPr = null
        }else{
          row.clicked = true;
        }
      },
      closeTree(){
        this.visible = false;
      }
    }
  }
</script>
