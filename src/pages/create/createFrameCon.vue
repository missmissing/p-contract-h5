<style>
  .card {
    margin-bottom: 20px;
  }

  .ivu-input-type,
  .ivu-select-single {
    width: 180px;
  }

  .template-preview {
    border: solid 1px #dddee1;
    padding: 10px;
    margin-left: 20px;
    height: 450px;
    overflow: auto;
  }
</style>
<template>
  <div>
    <Card class="card">
      <p slot="title">合同基本信息</p>
      <Form :label-width="100" inline>
        <Form-item label="业务经办人">
          <Input placeholder="请输入" v-model="pr.name"></Input>
        </Form-item>
        <Form-item label="业务部门">
          <Input placeholder="请输入" v-model="pr.name"></Input>
        </Form-item>
        </br>
        <Form-item label="合同模式">
          <Select placeholder="请选择" v-model="con.conModel">
            <Option value="1">框架意向合同</Option>
            <Option value="2">框架合同</Option>
            <Option value="3">单一合同</Option>
            <Option value="4">简易合同</Option>
          </Select>
        </Form-item>

        <Form-item label="合同类型">
          <Select placeholder="请选择" v-model="con.conType">
            <Option value="1">服务类</Option>
            <Option value="2">固定资产类</Option>
            <Option value="3">一般物资类</Option>
          </Select>
        </Form-item>
        </br>
        <Form-item label="所属项目">
          <Input placeholder="请输入"></Input>
        </Form-item>
        <Form-item label="合同版本">
          <Input placeholder="请输入"></Input>
        </Form-item>
        </br>
        <Form-item label="合同文本类型">
          <Select placeholder="请选择">
            <Option value="1">合同模板</Option>
            <Option value="2">文本</Option>
          </Select>
        </Form-item>
        <Form-item label="模板名称">
          <Select placeholder="请选择" v-model="con.templateCode">
            <Option value="3">普通模板</Option>
            <Option value="1">标的物模板</Option>
            <Option value="2">付款阶段模板</Option>
            <Option value="4">标的物和付款阶段模板</Option>
          </Select>
        </Form-item>
        <Form-item :label-width="20">
          <Button type="primary" @click="conPreview">
            <span>预览</span>
          </Button>
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
          <Input type="textarea" :autosize="{minRows: 3,maxRows: 6}" placeholder="请输入..." style="width:475px;"></Input>
        </Form-item>
      </Form>
      <Modal v-model="showConPreviewModal" title="合同预览" ok-text="导出PDF" width="900" :styles="{top: '20px'}"
             @on-ok="exportPDF">
        <div class="template-preview" v-html="editTemplate.html">
        </div>
      </Modal>
    </Card>

    <Card class="card">
      <Tabs value="name1">
        <Tab-pane label="合同内容信息" name="name1">
          <div class="list-title">合同供应商信息</div>
          <Table border :columns="conContentProviderColumns" :data="conContentProviderData"></Table>
          <div class="list-title">
            <div class="left">合同我方主体名称</div>
            <div class="right">
              <Button type="primary" size="small" icon="android-add" @click="showConOurmodal = true">新增我方主体</Button>
            </div>
            <div class="right">
              <Checkbox v-model="chkAllCompany">所有公司</Checkbox>
            </div>
            <div class="clear"></div>
          </div>
          <Table border :columns="conContentOurColumns" :data="conContentOurData"></Table>
          <Modal v-model="showConOurmodal" title="新增我方主体">
            <Form :label-width="100">
              <Form-item label="公司代码">
                <Input placeholder="请输入"></Input>
              </Form-item>
              <Form-item label="公司名称">
                <Input placeholder="请输入"></Input>
              </Form-item>
            </Form>
          </Modal>
          <div class="list-title">
            <div class="left">第三方信息</div>
            <div class="right">
              <Button type="primary" size="small" icon="android-add" @click="showConOurmodal = true">新增我方主体</Button>
            </div>
            <div class="clear"></div>
          </div>
          <Table border :columns="conContentProviderColumns"></Table>
          <div class="list-title">合同标的</div>
          <Table border :columns="conContentMaterielColumns"></Table>
          <Form :label-width="100" inline style="margin-top: 20px;">
            <Form-item label="合同生效日期">
              <Date-picker type="date" placeholder="选择日期" style="width: 200px"></Date-picker>
            </Form-item>
            <Form-item label="合同终止日期">
              <Date-picker type="date" placeholder="选择日期" style="width: 200px"></Date-picker>
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
              <Radio-group v-model="con.isOnePay">
                <Radio label="1"><span>是</span></Radio>
                <Radio label="0"><span>否</span></Radio>
              </Radio-group>
            </Form-item>
          </Form>
          <div class="list-title">
            <div class="left">付款方式</div>
            <div class="right">
              <Button type="primary" size="small" icon="android-add" @click="showConFinancePaymodal = true">新增付款方式
              </Button>
            </div>
            <div class="clear"></div>
          </div>
          <Table border :columns="conFinancePayColumns"></Table>
          <Modal v-model="showConFinancePaymodal" title="新增付款方式" width="360">
            <Form :label-width="100">
              <Form-item label="类型">
                <Select placeholder="请选择" v-model="payType">
                  <Option value="1">预付款</Option>
                  <Option value="2">进度款</Option>
                  <Option value="3">尾款</Option>
                </Select>
              </Form-item>
              <Form-item label="付款金额">
                <Input placeholder="请输入"></Input>
              </Form-item>
              <Form-item label="付款时间" v-show="payType==1">
                <Select placeholder="请选择">
                  <Option value="template">合同签约后15天</Option>
                  <Option value="template">合同签约后30天</Option>
                  <Option value="template">合同签约后90天</Option>
                </Select>
              </Form-item>
              <Form-item label="付款时间" v-show="payType==2">
                <Select placeholder="请选择">
                  <Option value="template">验收后15天</Option>
                  <Option value="template">验收后30天</Option>
                </Select>
              </Form-item>
              <Form-item label="付款时间" v-show="payType==3">
                <Select placeholder="请选择">
                  <Option value="template">合同结束后15天</Option>
                  <Option value="template">合同结束后30天</Option>
                  <Option value="template">合同结束后90天</Option>
                  <Option value="template">合同结束后180天</Option>
                </Select>
              </Form-item>
              <Form-item label="备注">
                <Input type="textarea" :rows="3" placeholder="请输入"></Input>
              </Form-item>
            </Form>
          </Modal>
          <Form :label-width="100" inline style="margin-top: 20px;">
            <Form-item label="币种">
              <Select placeholder="请选择">
                <Option value="template">CNY 人民币</Option>
                <Option value="template">USD 美元</Option>
              </Select>
            </Form-item>
            <Form-item label="开票类型">
              <Select placeholder="请选择">
                <Option value="template">增值税专用发票</Option>
                <Option value="template">增值税普通发票</Option>
                <Option value="template">普通发票</Option>
              </Select>
            </Form-item>
            <Form-item label="税率">
              <Select placeholder="请选择">
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
              <Input placeholder="请输入"></Input>
            </Form-item>
            <Form-item label="保证金占比">
              <Input placeholder="请输入"></Input>
            </Form-item>
            <Form-item label="付款时间">
              <Select placeholder="请选择">
                <Option value="template">框架意向合同</Option>
              </Select>
            </Form-item>
          </Form>
        </Tab-pane>

        <Tab-pane label="合同验收与样品信息" name="name3">
          <Form :label-width="100" inline style="margin-top: 20px;">
            <Form-item label="验收责任人">
              <Input placeholder="请输入"></Input>
            </Form-item>
            <Form-item label="验收责任人部门">
              <Input placeholder="请输入"></Input>
            </Form-item>
            <Form-item label="服务类验收方式">
              <Select placeholder="请选择">
                <Option value="template">按阶段验收</Option>
                <Option value="template">收货验收</Option>
              </Select>
            </Form-item>
            </br>
            <Form-item label="验收监督人">
              <Input placeholder="请输入"></Input>
            </Form-item>
            <Form-item label="验收监督人部门">
              <Input placeholder="请输入"></Input>
            </Form-item>
          </Form>
          <div class="list-title">
            <div class="left">
              <div>联合验收人</div>
            </div>
            <div class="right">
              <Button type="primary" size="small" icon="android-add" @click="showConCheckPersonModal = true">新增联合验收人
              </Button>
              <searchuser :showSearchUserModal="showConCheckPersonModal" @on-cancel="cancel"></searchuser>
            </div>
            <div class="clear"></div>

          </div>
          <Table border :columns="conCheckPersonColumns"></Table>
          <Form :label-width="100">
            <Form-item label="联合验收人">
              <Input placeholder="请输入"></Input>
            </Form-item>
            <Form-item label="联合验收人部门">
              <Input placeholder="请输入"></Input>
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
          <div class="list-title">物资验收事项</div>
          <Table border :columns="conContentCheckMaterielColumns"></Table>
          <div class="list-title">
            <div class="left">
              <div>服务验收事项</div>
            </div>
            <div class="right">
              <Button type="primary" size="small" icon="android-add" @click="showConContentCheckServiceModal = true">
                新增服务验收
              </Button>
            </div>
            <div class="clear"></div>
          </div>
          <Modal v-model="showConContentCheckServiceModal" title="新增服务验收">
            <Form :label-width="100">
              <Form-item label="服务名称">
                <Input placeholder="请输入"></Input>
              </Form-item>
              <Form-item label="验收要求">
                <Input placeholder="请输入"></Input>
              </Form-item>
              <Form-item label="备注">
                <Input placeholder="请输入"></Input>
              </Form-item>
            </Form>
          </Modal>
          <Table border :columns="conContentCheckServiceColumns"></Table>
        </Tab-pane>

        <Tab-pane label="合同盖章信息" name="name4">
          <div class="list-title">合同文件列表</div>
          <Table border :columns="conSealColumns"></Table>
        </Tab-pane>

        <Tab-pane label="从协议信息" name="name5">
          <Form inline :label-width="100">
            <Form-item label="从协议编号">
              <Input placeholder="请输入"></Input>
            </Form-item>
            <Form-item :label-width="20">
              <Button type="primary">
                <span>查找</span>
              </Button>
            </Form-item>
          </Form>
          <div class="list-title">从协议列表</div>
          <Table border :columns="conSealColumns"></Table>
        </Tab-pane>
        <Tab-pane label="备注" name="name6">
          <div class="list-title">其他说明</div>
          <Input placeholder="请输入" type="textarea" :autosize="{minRows: 4,maxRows: 8}" style="width: 400px;"></Input>

          <div class="list-title">附件信息</div>
          <Table border :columns="attachmentColumns"></Table>
        </Tab-pane>
        <Tab-pane label="相关数据" name="name7">
          <Table border :columns="conOtherDataColumns"></Table>
        </Tab-pane>
      </Tabs>
    </Card>

    <div class="submit">
      <Button type="primary">
        <span>提交</span>
      </Button>
    </div>
  </div>
</template>
<script>
  import searchuser from '../../components/searchUser.vue'
  import api from '../../api'
  import tagService from '../../utils/tag.js'
  import templateReplace from '../../utils/templateReplace.js'

  export default {
    created() {
      let query = this.$route.query;
      this.con.conModel = query.conModel;
      this.con.conType = query.conType;

      api.getPR(query).then((res) => {
        this.pr = res.data.pr;
      }, function (res) {
        console.info(res)
      });

      this.getModuleList();
    },

    data() {
      return {
        pr: {},
        con: {
          conModel: "0",
          conType: "0",
          templateCode: "0",
          conTitle: "",
          isOnePay: 1,
          payments: [
            {
              id: "1",
              type: 1,
              amount: 11.00,
              percent: 0.7,
              payTime: '2017-7-8',
              description: '付款'
            },
            {
              id: "2",
              type: 2,
              amount: 121.00,
              percent: 0.8,
              payTime: '2017-7-7',
              description: '付款2222'
            }
          ]
        },
        isOtherSeal: 1,
        isOnePay: 1,
        isAboutAmount: -1,
        isCollectBond: 1,
        chkAllCompany: false,

        showConPreviewModal: false,
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
        ],
        source: {
          templateTags: [],
          templateModules: [],
          targetTagKeys: [],
          targetModuleKeys: [],
        },
        editTemplate: {
          show: false,
          header: '',
          content: '',
          footer: '',
          html: ' '
        }
      }
    },
    methods: {
      getModuleList() {
        const $self = this;
        api.getTemplateModuleList({}).then((res) => {
          $self.source.templateModules = res.data.data.modules.map(function (el) {

            return {
              key: el.Code,
              label: el.Name,
              disabled: false,
              content: el.Content,
              sort: el.Sort,
              type: el.Type,
              position: el.Position,
            };

          });

          $self.source.templateTags = res.data.data.templateTags;
        });
      },
      refreshTemplate() {
        const newTargetItems = [];
        this.source.targetModuleKeys.forEach(key => {
          newTargetItems.push(this.source.templateModules.find((m) => {
            return m.key === key
          }));
        });
//				newTargetItems.sort(m => {
//					return m.sort
//				});

        this.editTemplate.header = '';
        this.editTemplate.footer = '';
        const templateTags = this.source.templateTags;

        newTargetItems.forEach(m => {
          if (m.type === 'H')
            this.editTemplate.header += m.content;
          else if (m.type === 'F')
            this.editTemplate.footer += m.content;
          else if (m.type === 'S') {
            this.source.targetTagKeys.forEach(c => {
              const item = templateTags.find(t => {
                return c === t.Code && m.key === t.ModuleCode;
              });
              if (item) {
                if (m.position === 'Top')
                  this.editTemplate.header += item.Content;
                else
                  this.editTemplate.footer += item.Content;
              }
            });
          }
        });
        this.editTemplate.header = tagService.template_preview('<h2 style="text-align:center;">' + "联合扶持品牌经销商营销活动协议" + '</h2><br/><br/>' + this.editTemplate.header);
        this.editTemplate.footer = tagService.template_preview(this.editTemplate.footer);
      },
      formatTemplateContent(content) {
        if (content) {
          return content;
        } else {
          return '';
        }
      },
      conPreview() {
        let templateCode = this.con.templateCode;
        if (templateCode === "0") {
          this.$Message.error('请选择模板名称!');
          return;
        }

        const conContent = '<span>依照《中华人民共和国合同法》，《中华人民共和国建筑法》，《中华人民共和国消防法》，及其他有关法律，行政法规，遵循平等，自愿，公平和诚实信用的原则，甲方将红星美凯龙北京西四环商场防火门改造安装工程承包给乙方施工，为确保施工进度和质量，经甲、乙双方协商一致，订立本合同。</span>';
        this.showConPreviewModal = true;
        const conTemplates = [
          {concode: "1", moduleKeys: ['header2', 'purchase_table', 'footer'], content: conContent},
          {concode: "2", moduleKeys: ['header2', 'payment', 'footer'], content: conContent},
          {concode: "3", moduleKeys: ['header2', 'footer'], content: conContent},
          {concode: "4", moduleKeys: ['header2', 'purchase_table', 'payment', 'footer'], content: conContent}
        ];

        let conTemplate = conTemplates.find(t => {
          return templateCode === t.concode;
        });

        this.source.targetModuleKeys = conTemplate.moduleKeys;
        this.editTemplate.content = conTemplate.content;
        this.source.targetTagKeys = [];
        if (this.pr.type === 1) {
          this.source.targetTagKeys.push("purchase_table_1");
        } else {
          this.source.targetTagKeys.push("purchase_table_2");
        }
        if (this.con.isOnePay === 1) {
          this.source.targetTagKeys.push("payment_2");
        } else {
          this.source.targetTagKeys.push("payment_1");
        }
        this.refreshTemplate();

        this.editTemplate.html = this.editTemplate.header + this.formatTemplateContent(this.editTemplate.content) + this.editTemplate.footer;
        templateReplace.addData("materials", this.pr.materials);
        templateReplace.addData("payments", this.con.payments);
        this.editTemplate.html = templateReplace.getRepalceHtml(this.editTemplate.html);
      },
      cancel() {
        this.showConCheckPersonModal = false;
      },
      exportPDF() {
        const newWindow = window.open("打印窗口", "_blank");
        //打印内容写入newWindow文档
        newWindow.document.write(this.editTemplate.html);
        //关闭文档
        newWindow.document.close();
        //调用打印机
        newWindow.print();
        //关闭newWindow页面
        newWindow.close();
      }
    },
    components: {
      searchuser
    }
  }
</script>
