<style type="text/scss" lang="scss" scoped>

</style>

<template>
  <div>
    <mt-cell title="模板编号" :value="form.templateCode"></mt-cell>
    <mt-cell title="文本名称" :value="form.templateName"></mt-cell>
    <mt-cell title="类型" :value="form.templateType | tplType"></mt-cell>
    <mt-cell title="状态" :value="form.templateStatus | tplStatus"></mt-cell>

    <div v-if="showText">
      <mt-cell title="业务经办人" :value="form.businessOperatorName"></mt-cell>
      <mt-cell title="金额" :value="form.amount"></mt-cell>
      <mt-cell title="合同类型" :value="form.contractType | contractPattern"></mt-cell>
    </div>

    <mt-cell title="生效时间" :value="form.startDate"></mt-cell>
    <mt-cell title="终止时间" :value="form.endDate"></mt-cell>
    <mt-cell title="版本" :value="form.version"></mt-cell>
    <mt-cell title="创建人" :value="form.creatorName"></mt-cell>
    <mt-cell title="最近更新人" :value="form.operatorName"></mt-cell>
    <mt-cell title="更新时间" :value="form.updateTime"></mt-cell>
    <mt-cell title="申请原因" :value="form.description"></mt-cell>
    <el-table
      v-if="fileList.length"
      :data="fileList"
      class="wp100">
      <el-table-column
        prop="fileName"
        label="文件名"
        min-width="200">
        <template slot-scope="scope">
          <a class="router-link" :download="fileName" @click="openFile(scope.row.fileId)">{{scope.row.fileName}}</a>
        </template>
      </el-table-column>
      <el-table-column
        prop="operatorName"
        width="100"
        label="上传人">
      </el-table-column>
      <el-table-column
        prop="createTime"
        width="130"
        label="上传时间">
        <template slot-scope="scope">
          {{scope.row.createTime | formatDate}}
        </template>
      </el-table-column>
    </el-table>
    <div v-if="showAbolish">
      <mt-cell title="废除日期" :value="form.endDate"></mt-cell>
      <mt-cell title="废除原因" :value="form.abolishReason"></mt-cell>
    </div>
  </div>
</template>

<script>
  import supportModel from '../../../../api/support/index'
  import {formatDate} from '../../../../filters/moment'
  import tplStatus from '../../../../filters/tplStatus'
  import tplType from '../../../../filters/tplTypeMap'
  import {tplMap} from '../../../../core/consts'
  import download from '../../../../filters/download'
  import contractPattern from '../../../../filters/contractPattern'

  export default {
    props: {
      info: {
        type: Object,
        default () {
          return {}
        }
      }
    },
    data () {
      return {
        templateId: this.$store.state.id,
        showAbolish: false,
        form: {
          templateCode: '',
          templateName: '',
          templateType: 'TEMPLATE',
          templateStatus: '',
          startDate: '',
          endDate: '',
          description: '',
          abolishReason: '',
          files: [],
          busiTypeText: '',
          operatorName: '',
          creatorName: '',
          version: '',
          businessOperatorName: null,
          amount: null,
          contractType: null
        },
        versions: [],
        fileList: []
      }
    },
    computed: {
      showText () {
        const processData = this.$store.state.processData
        return this.form.templateType === 'TEXT' && processData.procCode === tplMap[0]
      }
    },
    watch: {
      info () {
        this.setData()
      },
      'form.templateCode': function () {
        // this.getAllVersions();
      }
    },
    methods: {
      setData () {
        const {
          templateCode,
          templateName,
          templateType,
          templateStatus,
          bizTypes,
          startDate,
          endDate,
          updateTime,
          abolishReason,
          version,
          operatorName,
          creatorName,
          description,
          files,
          amount,
          contractType,
          businessOperatorName
        } = this.info
        this.form.templateCode = templateCode
        this.form.templateName = templateName
        this.form.templateType = templateType
        this.form.templateStatus = templateStatus
        this.form.busiTypeText = bizTypes.map(item => item.businessName).join(',')
        this.form.startDate = formatDate(startDate)
        this.form.endDate = formatDate(endDate)
        this.form.updateTime = formatDate(updateTime)
        this.form.abolishReason = abolishReason
        this.form.version = `V${version}`
        this.form.operatorName = operatorName
        this.form.creatorName = creatorName
        this.form.description = description
        this.form.amount = amount
        this.form.contractType = contractType
        this.form.businessOperatorName = businessOperatorName
        this.fileList = files || []
      },
      getAllVersions () {
        const {templateCode} = this.form
        supportModel.getAllTemplateByCode({templateCode}).then((res) => {
          this.versions = res.data.dataMap
        })
      },
      changeVersion (val) {
        this.$emit('changeVersion', val)
      },
      openFile (id) {
        const path = download(id)
        window._____processCenterPageAction('opennewwindow', {path})
      }
    },
    created () {
      const processData = this.$store.state.processData
      if (!Object.keys(processData).length) {
        return
      }
      const {procCode} = processData
      this.showAbolish = procCode === tplMap[2]
    },
    filters: {
      formatDate,
      tplStatus,
      tplType,
      contractPattern
    }
  }
</script>
