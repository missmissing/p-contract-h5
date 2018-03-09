<style scoped>

</style>
<template>
  <div class="create">
    <el-card>
      <el-form ref="conForm" :model="conForm" :rules="conFormRules" label-width="100px">
        <el-form-item label="是否有比价单">
          <el-switch v-model="conForm.isPr" @change="handleSwitch"></el-switch>
        </el-form-item>
        <el-row>
          <el-col :span="8">
            <el-form-item label="比价单" v-if="conForm.isPr" prop="strPC">
              <el-input v-model.trim="conForm.strPC" @keyup.enter.native="handleQuery" placeholder="请输入比价单号"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8" v-if="conForm.isPr">
            <el-button :disabled="!conForm.strPC" class="ml20 btnSearch" @click="handleQuery" type="primary">查找
            </el-button>
            <el-button @click="dialogVisible = true" type="primary">高级
            </el-button>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="合同模式" prop="curConModelId">
              <el-select
                v-model="conForm.curConModelId"
                placeholder="请选择合同模式"
                class="wp100">
                <el-option
                  v-for="item in conModels"
                  :key="item.id"
                  :value="item.id"
                  :label="item.name"
                  :disabled="item.disabled">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="业务类型" prop="conTypeName">
              <el-input readonly placeholder="请选择业务类型" @focus="visible=true" v-model="conForm.conTypeName"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-card>
    <el-card v-if="curPriceList.length">
      <el-table ref="prTable" :data="curPriceList" class="wp100">
        <el-table-column
          prop="folio"
          label="比价单编码">
          <template slot-scope="scope">
            <a href=";;" class="router-link"
               @click.stop="handleDetailPR(scope.$index,scope.row)">{{scope.row.folio}}</a>
          </template>
        </el-table-column>
        <el-table-column
          prop="originatorName"
          label="发起人">
        </el-table-column>
        <el-table-column
          prop="originatorDepartmentName"
          label="发起部门"
          :show-overflow-tooltip="true">
        </el-table-column>
        <el-table-column
          prop="startTime"
          label="发起时间">
          <template slot-scope="scope">
            {{curPriceList[scope.$index].startTime | formatDate}}
          </template>
        </el-table-column>
        <el-table-column
          prop="finishTime"
          label="结束时间">
          <template slot-scope="scope">
            {{curPriceList[scope.$index].finishTime | formatDate}}
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <div class="mt20">
      <el-button type="primary" @click="handleNext('conForm')">下一步</el-button>
    </div>
    <el-dialog title="查询比价单" :visible.sync="dialogVisible" width="90%">
      <el-form ref="prForm" :model="prForm" label-width="80px">
        <el-row :gutter="20">
          <el-col :span="5">
            <el-form-item label="PR号" prop="prCode">
              <el-input v-model="prForm.prCode" placeholder="请输入PR号"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="创建人" prop="createPerson">
              <el-select
                class="wp100"
                clearable
                v-model="prForm.createPerson"
                filterable
                remote
                placeholder="请输入关键词"
                :remote-method="getRemoteCreatePersonsByKeyWord"
                :loading="prForm.loading">
                <el-option
                  v-for="item in prForm.createPersons"
                  :key="item.userId"
                  :label="item.userName"
                  :value="item.userId">
                  <span class="fl">{{ item.userName }}</span>
                  <span class="fr">{{ item.deptName }}</span>
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="14">
            <el-form-item label="创建时间">
              <el-date-picker
                v-model="daterange"
                type="daterange"
                align="right"
                :editable="false"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                :picker-options="prForm.pickerOption">
              </el-date-picker>
              <el-button class="ml20" type="primary" @click="handleQueryPriceList">查询</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <el-table
        ref="priceList"
        :data="priceList"
        @current-change="handleSelectCurrent"
        max-height="250"
        @row-click="handleRowClick"
        highlight-current-row
        border
        class="wp100">
        <el-table-column prop="ifSelect" label="选择" width="80">
          <template slot-scope="scope">
            <el-checkbox v-model="scope.row.ifSelect" @change="handleRowClick(priceList[scope.$index])"></el-checkbox>
          </template>
        </el-table-column>
        <el-table-column prop="folio" label="比价单编码" width="200">
          <template slot-scope="scope">
            <a href=";;" class="router-link" @click.stop="handleDetailPR(scope.row)">{{scope.row.folio}}</a>
          </template>
        </el-table-column>
        <el-table-column
          prop="originatorName"
          label="发起人"
          width="80">
        </el-table-column>
        <el-table-column :show-overflow-tooltip="true" prop="originatorDepartmentName" label="发起部门"></el-table-column>
        <el-table-column
          prop="startTime"
          label="发起时间"
          width="130">
          <template slot-scope="scope">
            {{priceList[scope.$index].startTime | formatDate}}
          </template>
        </el-table-column>
        <el-table-column
          prop="finishTime"
          label="结束时间"
          width="130">
          <template slot-scope="scope">
            {{scope.row.finishTime | formatDate}}
          </template>
        </el-table-column>
      </el-table>
      <template slot="footer">
        <el-button @click="handleCloseDialog">取消</el-button>
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
      @close="visible = false">
    </TreeModal>
  </div>
</template>
<script>
  import store from 'store'
  import Api from '../../api/manageContract'
  import {routerNames} from '../../core/consts'
  import getBusiType from '../../mixins/getBusiType'
  import comLoading from '../../mixins/comLoading'
  import TreeModal from '../../components/treeModal.vue'
  import {formatDate} from '../../filters/moment'

  const user = store.get('user')
  export default {
    mixins: [getBusiType, comLoading],
    data () {
      return {
        conForm: {
          isPr: true,
          strPC: '', // 比价单编号
          curConModelId: '',
          conModel: [
            {id: '1', name: '单一合同'},
            /* {id: '2', name: '固定格式合同'}, */
            {id: '3', name: '框架协议'},
            {id: '4', name: '框架意向合同'}
          ],
          conType: '',
          conTypeName: ''
        },
        conFormRules: {
          curConModelId: [
            {required: true, message: '请选择合同模式', trigger: 'change'}
          ],
          conTypeName: [
            {required: true, message: '请选择业务类型', trigger: 'change'}
          ]
        },
        arrPr: [], // 比价单列表
        dialogVisible: false,
        prForm: {
          prCode: '',
          meterialCode: '',
          createPerson: '',
          createPersons: [],
          loading: false,
          pickerOption: {
            shortcuts: [
              {
                text: '最近一周',
                onClick (picker) {
                  const end = new Date()
                  const start = new Date()
                  start.setTime(start.getTime() - (3600 * 1000 * 24 * 6))
                  picker.$emit('pick', [start, end])
                }
              }, {
                text: '最近一个月',
                onClick (picker) {
                  const end = new Date()
                  const start = new Date()
                  start.setTime(start.getTime() - (3600 * 1000 * 24 * 30))
                  picker.$emit('pick', [start, end])
                }
              }
            ]
          },
          pageNo: 1,
          pageSize: 10
        },
        daterange: [],
        priceList: [],
        currentPr: null, // 当前选择的比价单
        curPriceList: [], // 当前选择的比价单
        visible: false,
        defaultProps: {
          children: 'children',
          label: 'businessName'
        },
        total: 0, // 总条目数
        pageCount: 0, // 总页数,
        regionSource: null
      }
    },
    created () {
      this.prForm.createPerson = user.userId
      this.getRemoteCreatePersonsByKeyWord(user.userId)
    },
    computed: {
      conModels () {
        const conForm = this.conForm
        return conForm.isPr ? [conForm.conModel[0], conForm.conModel[1]] : [conForm.conModel[2]]
      }
    },
    watch: {
      'conForm.isPr': function (val) {
        if (!val) {
          this.curPriceList = []
          this.regions = this.regionSource ? this.regionSource : this.regions
        }
      }
    },
    components: {
      TreeModal
    },
    filters: {
      formatDate
    },
    methods: {
      handleSwitch () {
        this.arrPr = []
        this.conForm.strPC = ''
        this.conForm.curConModelId = ''
        this.conForm.conTypeName = ''
        this.conForm.conType = ''
      },
      handleQuery () {
        this.comLoading()
        Api.getQrDetail({
          folio: this.conForm.strPC
        }).then((res) => {
          const data = res.data.dataMap
          if (data) {
            this.currentPr = data
            this.curPriceList = [data]

            const {createFixedFormatContractFlag, purchaseType} = data
            this.conForm.curConModelId = createFixedFormatContractFlag ? this.conForm.curConModelId : null
            if (!this.regionSource) {
              this.regionSource = this.regions
            }
            if (this.conForm.conType) {
              const conType = this.conForm.conType.split('-')[0]
              if (purchaseType === 1 && conType === '2') {
                this.conForm.conTypeName = ''
              } else if (purchaseType === 2 && conType !== '2') {
                this.conForm.conTypeName = ''
              }
            }
            this.regions = this.regionSource.filter((item) => {
              if (!purchaseType) {
                return true
              } else if (purchaseType === 1 && item.id !== 2) {
                return true
              } else if (purchaseType === 2 && item.id === 2) {
                return true
              }
              return false
            })
          }
          this.comLoading(false)
        }).catch(() => {
          this.comLoading(false)
        })
      },
      handleNext (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            if (this.conForm.isPr && !this.curPriceList.length) {
              this.$message.warning('请选择一条比价单信息！')
              return
            }

            const query = {
              currentFolio: '',
              curConModelId: this.conForm.curConModelId,
              curConTypeId: this.conForm.conType,
              curConTypeName: this.conForm.conTypeName
            }

            if (this.conForm.isPr) {
              if (this.currentPr) {
                query.currentFolio = this.currentPr.folio
              }
            }

            this.comLoading()
            Api.getContractBaseInfo({
              folio: query.currentFolio,
              contractType: query.curConModelId
            }).then(() => {
              this.$router.push({
                name: routerNames.con_contract_create,
                query
              })
              if (this.curPriceList.length) {
                this.curPriceList = []
                this.currentPr = null
              }
              this.$refs[formName].resetFields()
            }).finally(() => {
              this.comLoading(false)
            })
          }
        })
      },
      handleCloseDialog () {
        this.dialogVisible = false
        if (this.currentPr) {
          this.currentPr.clicked = false
          this.currentPr.ifSelect = false
          this.$refs.priceList.setCurrentRow(null)
          this.priceList = []
        }
        this.$refs.prForm.resetFields()
      },
      handleOKDialog () {
        this.dialogVisible = false
        if (this.currentPr) {
          const {folio} = this.currentPr
          this.conForm.strPC = folio
          this.handleQuery()
        }
        this.currentPr.clicked = false
        this.currentPr.ifSelect = false
        this.$refs.priceList.setCurrentRow(null)
        this.priceList = []
        this.$refs.prForm.resetFields()
      },
      handleDetailPR (row) {
        window.open(row.processViewUrl)
      },
      setBusiType (checkNodes) {
        const ids = []
        const names = []
        if (checkNodes.length) {
          for (let i = 0, len = checkNodes.length; i < len; i++) {
            ids.push(checkNodes[i].id)
            names.push(checkNodes[i].businessName)
          }
        }
        this.conForm.conType = ids.join('-')
        this.conForm.conTypeName = names.join('-')

        this.visible = false
      },
      handleQueryPriceList () {
        this.priceList = []
        const params = {
          pr: this.prForm.prCode,
          originator: this.prForm.createPerson,
          fromDate: '',
          toDate: '',
          pageNo: this.prForm.pageNo,
          pageSize: this.prForm.pageSize
        }
        if (this.daterange.length) {
          Object.assign(params, {
            fromDate: formatDate(this.daterange[0]),
            toDate: formatDate(this.daterange[1])
          })
        }
        this.$refs.prForm.validate((valid) => {
          if (valid) {
            this.comLoading({
              target: this.$refs.priceList.$el
            })
            Api.getQrList(params).then((data) => {
              if (data.data.dataMap && data.data.dataMap.length > 0) {
                const arr = data.data.dataMap
                for (let i = 0, len = arr.length; i < len; i++) {
                  arr[i].ifSelect = false
                }
                this.priceList = arr
              }
              this.comLoading(false)
            }, () => {
              this.comLoading(false)
            })
          } else {
            console.log('error submit!!')
          }
        })
      },
      handleSelectCurrent (currentRow, oldRow) {
        if (currentRow) {
          currentRow.ifSelect = true
          this.currentPr = currentRow
        }
        if (oldRow) {
          oldRow.ifSelect = false
          oldRow.clicked = false
        }
      },
      handleRowClick (row, event) {
        if (event) {
          event.stopPropagation()
          event.preventDefault()
        }
        if (row.clicked) {
          row.clicked = false
          this.$refs.priceList.setCurrentRow()
          this.currentPr = null
        } else {
          row.clicked = true
          this.$refs.priceList.setCurrentRow(row)
        }
      },
      getRemoteCreatePersonsByKeyWord (query) {
        if (query !== '') {
          this.prForm.loading = true
          Api.getRemoteCreatePersonsByKeyWord({keyword: query})
            .then((data) => {
              this.prForm.loading = false
              this.prForm.createPersons = data.data.dataMap
            })
        } else {
          this.prForm.createPersons = []
          this.prForm.createPerson = ''
        }
      }
    }
  }
</script>
