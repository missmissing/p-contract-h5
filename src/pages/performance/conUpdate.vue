<style>
  .card {
    margin-bottom: 20px;
  }

  .tb-head {
    margin-top: 15px;
    line-height: 30px;
  }

  .width180 {
    width: 180px;
  }

  .width360 {
    width: 360px;
  }
</style>
<template>
  <div>
    <Card class="card">
      <p slot="title">变更原因</p>
      <Form :label-width="80" inline>
        <Form-item label="合同编号">
          <Input placeholder="请输入" class="width180"/>
        </Form-item>
        <Form-item>
          <Button type="primary" @click="nextStep">
            <span>查找</span>
          </Button>
        </Form-item>
        </br>
        <Form-item label="变更方式">
          <Select placeholder="请选择" class="width180">
            <Option value="template">框架意向合同</Option>
          </Select>
        </Form-item>
        </br>
        <Form-item label="备注">
          <Input placeholder="请输入" type="textarea" :autosize="{minRows: 4,maxRows: 6}" style="width: 330px;"/>
        </Form-item>
      </Form>
    </Card>

    <Tabs value="name1">
      <Tab-pane label="合同基本信息" name="name11">
        <Form :label-width="100" inline>
          <Form-item label="业务经办人">
            <Input placeholder="请输入" class="width180"/>
          </Form-item>
          <Form-item label="业务部门">
            <Input placeholder="请输入" class="width180"/>
          </Form-item>
          </br>
          <Form-item label="合同编号">
            <Input placeholder="请输入" class="width180"/>
          </Form-item>
          <Form-item label="合同模式">
            <Select placeholder="请选择" class="width180">
              <Option value="template">框架意向合同</Option>
            </Select>
          </Form-item>
          </br>
          <Form-item label="合同类型">
            <Select placeholder="请选择" class="width180">
              <Option value="template">框架意向合同</Option>
            </Select>
          </Form-item>
          <Form-item label="所属项目">
            <Input placeholder="请输入" class="width180"/>
          </Form-item>
          <Form-item label="合同版本">
            <Input placeholder="请输入" class="width180"/>
          </Form-item>
          </br>
          <Form-item label="合同文本类型">
            <Select placeholder="请选择" class="width180">
              <Option value="template">框架意向合同</Option>
            </Select>
          </Form-item>
          <Form-item label="模板名称">
            <Select placeholder="请选择" class="width180">
              <Option value="template">框架意向合同</Option>
            </Select>
          </Form-item>
          </br>
          <Form-item label="盖章次序">
            <Radio-group v-model="isOtherSeal">
              <Radio label="1"><span>对方先盖章（默认）</span></Radio>
              <Radio label="0"><span>我方先盖章</span></Radio>
            </Radio-group>
          </Form-item>
          </br>
          <Form-item label="我方先盖章原因" v-show="isOtherSeal==0">
            <Input type="textarea" :autosize="{minRows: 3,maxRows: 6}" placeholder="请输入..."
                   style="width:475px;"/>
          </Form-item>
        </Form>
      </Tab-pane>
      <Tab-pane label="合同内容信息" name="name1">
        <div class="tb-head">合同供应商信息</div>
        <Table border :columns="conContentProviderColumns" :data="conContentProviderData"></Table>
        <div class="tb-head">
          <div style="float: left;">
            合同我方主体名称
          </div>
          <div style="float: right;">
            <i class="ivu-icon ivu-icon-ios-plus" style="font-size:16px;cursor: pointer;"
               @click="showConOurmodal = true">
              <span style="font-size:12px;">新增我方主体</span></i>
          </div>
          <div style="clear: both;"></div>
        </div>
        <Table border :columns="conContentOurColumns" :data="conContentOurData"></Table>
        <Modal v-model="showConOurmodal" title="新增我方公司" @on-ok="ok">
          <Form :label-width="100">
            <Form-item label="公司代码">
              <Input placeholder="请输入"/>
            </Form-item>
            <Form-item label="公司名称">
              <Input placeholder="请输入"/>
            </Form-item>
          </Form>
        </Modal>
        <div class="tb-head">第三方信息</div>
        <Table border :columns="conContentProviderColumns"></Table>
        <div class="tb-head">合同标的</div>
        <Table border :columns="conContentMaterielColumns"></Table>
        <Form :label-width="100" inline style="margin-top: 20px;">
          <Form-item label="合同生效日期">
            <Date-picker type="date" placeholder="选择日期" style="width: 200px"/>
          </Form-item>
          <Form-item label="合同终止日期">
            <Date-picker type="date" placeholder="选择日期" style="width: 200px"/>
          </Form-item>
        </Form>
      </Tab-pane>
      <Tab-pane label="合同财务信息" name="name2">
        <Form :label-width="100" style="margin-top: 20px;">
          <Form-item label="是否涉及金额">
            <Radio-group v-model="isAboutAmount">
              <Radio label="1"><span>是</span></Radio>
              <Radio label="0"><span>否</span></Radio>
            </Radio-group>
          </Form-item>
          <Form-item label="是否一次性付款">
            <Radio-group v-model="isOnePay">
              <Radio label="1"><span>是</span></Radio>
              <Radio label="0"><span>否</span></Radio>
            </Radio-group>
          </Form-item>
        </Form>
        <div class="tb-head">
          <div style="float: left;">
            付款方式
          </div>
          <div style="float: right;">
            <i class="ivu-icon ivu-icon-ios-plus" style="font-size:16px;cursor: pointer;"
               @click="showConFinancePaymodal = true">
              <span style="font-size:12px;">新增付款方式</span></i>
          </div>
          <div style="clear: both;"></div>
        </div>
        <Table border :columns="conFinancePayColumns"></Table>
        <Modal v-model="showConFinancePaymodal" title="新增付款方式" @on-ok="ok" width="360">
          <Form :label-width="100">
            <Form-item label="类型">
              <Select placeholder="请选择" class="width180" v-model="payType">
                <Option value="1">预付款</Option>
                <Option value="2">进度款</Option>
                <Option value="3">尾款</Option>
              </Select>
            </Form-item>
            <Form-item label="付款金额">
              <Input placeholder="请输入" class="width180"/>
            </Form-item>
            <Form-item label="付款时间" v-show="payType==1">
              <Select placeholder="请选择" class="width180">
                <Option value="template">合同签约后15天</Option>
                <Option value="template">合同签约后30天</Option>
                <Option value="template">合同签约后90天</Option>
              </Select>
            </Form-item>
            <Form-item label="付款时间" v-show="payType==2">
              <Select placeholder="请选择" class="width180">
                <Option value="template">验收后15天</Option>
                <Option value="template">验收后30天</Option>
              </Select>
            </Form-item>
            <Form-item label="付款时间" v-show="payType==3">
              <Select placeholder="请选择" class="width180">
                <Option value="template">合同结束后15天</Option>
                <Option value="template">合同结束后30天</Option>
                <Option value="template">合同结束后90天</Option>
                <Option value="template">合同结束后180天</Option>
              </Select>
            </Form-item>
            <Form-item label="备注">
              <Input type="textarea" :rows="3" placeholder="请输入" class="width180"/>
            </Form-item>
          </Form>
        </Modal>
        <Form :label-width="100" inline style="margin-top: 20px;">
          <Form-item label="币种">
            <Select placeholder="请选择" class="width180">
              <Option value="template">CNY 人民币</Option>
              <Option value="template">USD 美元</Option>
            </Select>
          </Form-item>
          <Form-item label="开票类型">
            <Select placeholder="请选择" class="width180">
              <Option value="template">增值税专用发票</Option>
              <Option value="template">增值税普通发票</Option>
              <Option value="template">普通发票</Option>
            </Select>
          </Form-item>
          <Form-item label="税率">
            <Select placeholder="请选择" class="width180">
              <Option value="template">17%</Option>
              <Option value="template">13%</Option>
              <Option value="template">7%</Option>
              <Option value="template">6%</Option>
              <Option value="template">3%</Option>
            </Select>
          </Form-item>
          </br>
          <Form-item label="是否收取保证金">
            <Radio-group v-model="isCollectBond">
              <Radio label="1"><span>是</span></Radio>
              <Radio label="0"><span>否</span></Radio>
            </Radio-group>
          </Form-item>
          </br>
          <Form-item label="保证金金额">
            <Input placeholder="请输入"/>
          </Form-item>
          <Form-item label="保证金占比">
            <Input placeholder="请输入"/>
          </Form-item>
          <Form-item label="付款时间">
            <Select placeholder="请选择" class="width180">
              <Option value="template">框架意向合同</Option>
            </Select>
          </Form-item>
        </Form>
      </Tab-pane>
      <Tab-pane label="合同验收与样品信息" name="name3">
        <Form :label-width="100" inline style="margin-top: 20px;">
          <Form-item label="验收责任人">
            <Input placeholder="请输入"/>
          </Form-item>
          <Form-item label="验收责任人部门">
            <Input placeholder="请输入"/>
          </Form-item>
          <Form-item label="服务类验收方式">
            <Select placeholder="请选择" class="width180">
              <Option value="template">按阶段验收</Option>
              <Option value="template">收货验收</Option>
            </Select>
          </Form-item>
          </br>
          <Form-item label="验收监督人">
            <Input placeholder="请输入"/>
          </Form-item>
          <Form-item label="验收监督人部门">
            <Input placeholder="请输入"/>
          </Form-item>
        </Form>
        <div class="tb-head">
          <div style="float: left;">
            <div>联合验收人</div>
          </div>
          <div style="float: right;">
            <i class="ivu-icon ivu-icon-ios-plus" style="font-size:16px;cursor: pointer;"
               @click="showConCheckPersonModal = true">
              <span style="font-size:12px;">新增联合验收人</span></i>
          </div>
          <div style="clear: both;"></div>
        </div>
        <Table border :columns="conCheckPersonColumns"></Table>
        <Modal v-model="showConCheckPersonModal" title="新增联合验收人" @on-ok="ok">
          <Form :label-width="100">
            <Form-item label="联合验收人">
              <Input placeholder="请输入"/>
            </Form-item>
            <Form-item label="联合验收人部门">
              <Input placeholder="请输入"/>
            </Form-item>
          </Form>
        </Modal>
        <Form>
          <Form-item label="是否有样品">
            <Radio-group>
              <Radio label="1"><span>是</span></Radio>
              <Radio label="0"><span>否</span></Radio>
            </Radio-group>
          </Form-item>
        </Form>
        <div class="tb-head">物资验收事项</div>
        <Table border :columns="conContentCheckMaterielColumns"></Table>
        <div class="tb-head">
          <div style="float: left;">
            <div>服务验收事项</div>
          </div>
          <div style="float: right;">
            <i class="ivu-icon ivu-icon-ios-plus" style="font-size:16px;cursor: pointer;"
               @click="showConContentCheckServiceModal = true">
              <span style="font-size:12px;">新增服务验收</span></i>
          </div>
          <div style="clear: both;"></div>
        </div>
        <Modal v-model="showConContentCheckServiceModal" title="新增服务验收" @on-ok="ok">
          <Form :label-width="100">
            <Form-item label="服务名称">
              <Input placeholder="请输入"/>
            </Form-item>
            <Form-item label="验收要求">
              <Input placeholder="请输入"/>
            </Form-item>
            <Form-item label="备注">
              <Input placeholder="请输入"/>
            </Form-item>
          </Form>
        </Modal>
        <Table border :columns="conContentCheckServiceColumns"></Table>
      </Tab-pane>
      <Tab-pane label="合同盖章信息" name="name4">
        <h4>合同文件列表</h4>
        <Table border :columns="conSealColumns"></Table>
      </Tab-pane>
    </Tabs>

    <Card class="card">
      <p slot="title">备注</p>
      <div class="tb-head">其他说明</div>
      <Input placeholder="请输入" type="textarea" :autosize="{minRows: 3,maxRows: 6}"/>
      <Form style="margin-top: 10px;">
        <Form-item label="从协议编号">
          <Input placeholder="请输入" class="width180"/>
        </Form-item>
      </Form>
      <div class="tb-head">附件信息</div>
      <Table border :columns="attachmentColumns"></Table>
    </Card>

    <div style="text-align: center;margin-top: 30px;">
      <Button type="primary">
        <span>提交</span>
      </Button>
    </div>

  </div>
</template>
<script>
  export default {
    data() {
      return {
        isOtherSeal: 1,
        isOnePay: 1,
        isAboutAmount: -1,
        isCollectBond: 1,

        showConOurmodal: false,
        showConFinancePaymodal: false,
        showConCheckPersonModal: false,
        showConContentCheckServiceModal: false,
        payType: -1,
        attachmentColumns: [{
          title: '附件类型',
          key: 'EmployeeName'
        },
          {
            title: '编号',
            key: 'Moible'
          },
          {
            title: '文件名称',
            key: 'Moible'
          },
          {
            title: '附件',
            key: 'Moible'
          }
        ],
        conContentProviderColumns: [{
          title: '供应商编号',
          key: 'Moible'
        },
          {
            title: '供应商名称',
            key: 'Moible'
          },
          {
            title: '银行账号',
            key: 'Moible'
          }
        ],
        conContentProviderData: [{
          Moible: 'Moible'
        }],
        conContentOurColumns: [{
          title: '公司代码',
          width: 300,
          key: 'Moible'
        },
          {
            title: '公司名称',
            key: 'Moible'
          }
        ],
        conContentOurData: [{
          Moible: 'Moible'
        }],
        conContentMaterielColumns: [{
          title: '序号',
          key: 'EmployeeName'
        },
          {
            title: '物料编码',
            key: 'Moible'
          },
          {
            title: '物料名称',
            key: 'EmployeeName'
          },
          {
            title: '数量',
            key: 'Moible'
          },
          {
            title: '价格',
            key: 'EmployeeName'
          },
          {
            title: '税率',
            key: 'Moible'
          }
        ],
        conContentCheckMaterielColumns: [{
          title: '序号',
          key: 'EmployeeName'
        },
          {
            title: '物料编码',
            key: 'Moible'
          },
          {
            title: '物料描述',
            key: 'EmployeeName'
          },
          {
            title: '备注',
            key: 'Moible'
          }
        ],
        conContentCheckServiceColumns: [{
          title: '序号',
          key: 'EmployeeName'
        },
          {
            title: '服务名称',
            key: 'Moible'
          },
          {
            title: '验收要求',
            key: 'EmployeeName'
          },
          {
            title: '备注',
            key: 'Moible'
          }
        ],
        conFinancePayColumns: [{
          title: '类型',
          key: 'EmployeeName'
        },
          {
            title: '是否多次付款',
            key: 'Moible'
          },
          {
            title: '付款金额',
            key: 'EmployeeName'
          },
          {
            title: '付款时间',
            key: 'Moible'
          },
          {
            title: '备注',
            key: 'EmployeeName'
          },
          {
            title: '占比',
            key: 'Moible'
          }
        ],
        conCheckPersonColumns: [{
          title: '联合验收人',
          key: 'EmployeeName'
        },
          {
            title: '联合验收人部门',
            key: 'Moible'
          },
          {
            title: '是否必选',
            key: 'EmployeeName'
          }
        ],
        conSealColumns: [{
          title: '序号',
          key: 'EmployeeName'
        },
          {
            title: '文本名称',
            key: 'Moible'
          },
          {
            title: '用章次数',
            key: 'EmployeeName'
          },
          {
            title: '打印份数',
            key: 'EmployeeName'
          },
          {
            title: '我方留存份数',
            key: 'Moible'
          },
          {
            title: '用章名称',
            key: 'EmployeeName'
          },
          {
            title: '备注',
            key: 'Moible'
          },
          {
            title: '无需打印',
            key: 'EmployeeName'
          }
        ],
        conOtherDataColumns: [{
          title: '序号',
          key: 'EmployeeName'
        },
          {
            title: '合同号',
            key: 'Moible'
          },
          {
            title: '类型',
            key: 'EmployeeName'
          },
          {
            title: '状态',
            key: 'EmployeeName'
          },
          {
            title: '公司',
            key: 'Moible'
          },
          {
            title: '合同开始时间',
            key: 'EmployeeName'
          }
        ]
      }
    }
  }
</script>
