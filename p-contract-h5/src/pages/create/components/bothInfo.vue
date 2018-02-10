<style type="text/scss" lang="scss" scoped>

</style>

<template>
  <el-row>
    <el-col v-if="jiaBillingInfo.length>1" :span="12">
      <h4>具体开票信息以采购提供为准</h4>
    </el-col>
    <el-col v-else :span="12">
      <h4>甲方增值税专用开票信息：</h4>
      <el-row>
        <el-col :span="6">
          公司名称:
        </el-col>
        <el-col :span="16">
          {{jia.company}}
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6">
          统一社会信用代码:
        </el-col>
        <el-col :span="16">
          {{jia.unifiedSocialCreditCode}}
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6">
          注册地址:
        </el-col>
        <el-col :span="16">
          {{jia.registeredAddress}}
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6">
          经营地址:
        </el-col>
        <el-col :span="16">
          {{jia.businessAddress}}
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6">
          联系电话:
        </el-col>
        <el-col :span="16">
          {{jia.contactNumber}}
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6">
          银行账号:
        </el-col>
        <el-col :span="16">
          {{jia.bankAccount}}
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6">
          开 户 行:
        </el-col>
        <el-col :span="16">
          {{jia.depositBank}}
        </el-col>
      </el-row>
    </el-col>
    <el-col :span="12">
      <h4>乙方指定甲方汇款的账户为：</h4>
      <el-row>
        <el-col :span="6">
          乙方:
        </el-col>
        <el-col :span="16">
          {{yi.company}}
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6">
          银行账号:
        </el-col>
        <el-col :span="16">
          {{yi.bankAccount}}
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6">
          开 户 行:
        </el-col>
        <el-col :span="16">
          {{yi.depositBank}}
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6">
          联系人:
        </el-col>
        <el-col :span="16">
          {{yi.contacts}}
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6">
          注册地址:
        </el-col>
        <el-col :span="16">
          {{yi.registeredAddress}}
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6">
          联系电话:
        </el-col>
        <el-col :span="16">
          {{yi.contactNumber}}
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6">
          E-mail:
        </el-col>
        <el-col :span="16">
          {{yi.email}}
        </el-col>
      </el-row>
    </el-col>
  </el-row>
</template>

<script>
  export default {
    props: {
      jiaBillingInfo: {
        type: Array,
        default: []
      },
      yiBillingInfo: {
        type: Array,
        default: []
      }
    },
    data () {
      return {}
    },
    computed: {
      jia () {
        const jiaBillingInfo = this.jiaBillingInfo
        let result = {}
        if (jiaBillingInfo.length) {
          result = jiaBillingInfo[0] || {}
        }
        return result
      },
      yi () {
        const yiBillingInfo = this.yiBillingInfo
        let result = {}
        if (yiBillingInfo.length) {
          result = yiBillingInfo[0] || {}
        }
        return result
      }
    }
  }
</script>
