<style scoped>
  .card {
    margin-bottom: 20px;
  }
</style>
<template>
  <div>
    <div>
      <Card class="card">
        <p slot="title">采购申请信息</p>
        <Form :label-width="80" inline>
          <Form-item label="采购申请号">
            <Input placeholder="请输入" @on-enter="QueryTextNO(formItem.textno)" v-model="formItem.textno">
            <Button @click="QueryTextNO(formItem.textno)" slot="append" icon="plus"></Button>
            </Input>
          </Form-item>
          <Button v-if="purchaseType==1" @click="modalContract=true">匹配配合</Button>
          <br/>
          <Form-item label="合同查询">
            <Input placeholder="请输入关键字或合同号"/>
          </Form-item>
          <Button type="success" @click="modalContract=true">查询</Button>

        </Form>
        <section v-if="purchaseType==1">
          <Table :columns="prTable.headers" :data="prTable.data"></Table>
        </section>
      </Card>
      <Card class="card">
        <p slot="title">合同信息 </p>
        <Form label-width="80" inline>
          <Form-item label="合同编号">
            <Input disabled/>
          </Form-item>
          <Form-item label-width="0">
            <Button>明细</Button>
          </Form-item>
          <br/>
          <Form-item label="业务经办人">
            <Input disabled/>
          </Form-item>
          <Form-item label="业务部门">
            <Input disabled/>
          </Form-item>
          <Form-item label="合同版本">
            <Input disabled/>
          </Form-item>
          <Form-item label="合同模式">
            <Input disabled/>
          </Form-item>
          <Form-item label="合同类型">
            <Input disabled/>
          </Form-item>
        </Form>
      </Card>
      <Card class="card">
        <p slot="title">订单信息 </p>
        <Form label-width="80" inline>
          <Form-item label="公司编号">
            <Input disabled/>
          </Form-item>
          <Form-item label="供应商">
            <Input disabled/>
          </Form-item>
          <Form-item label="订单类型">
            <Input disabled/>
          </Form-item>
        </Form>

        <p style="margin-bottom:10px;">下单物资(服务)
          <Button style="margin-left:5px;">重置</Button>
        </p>
        <Table :columns="table.headers" :data="table.data"/>
      </Card>
      <Card v-if="purchaseType==2">
        <p slot="title">服务验收信息</p>
        <p style="margin-bottom:10px;">服务验收事项
          <Button type="success" style="margin-left:5px;">新增</Button>
        </p>
        <Table :columns="serviceTable.headers" :data="serviceTable.data"/>
      </Card>
      <Modal
        v-model="modalContract"
        width="1000"
        title="选择合同"
        @on-ok="ok"
        @on-cancel="cancel">
        <Table :columns="contractTable.headers" :data="contractTable.data"></Table>
      </Modal>
    </div>
  </div>

</template>

<script>

  export default {
    data() {
      return {
        modalContract: false,
        purchaseType: 0,
        formItem: {
          textarea: "",
          selectvalue: 'template',
          textno: "",
          isValid: true,
        },
        contractTable: {
          headers: [
            {
              type: 'selection',
              width: 60,
              align: 'center'
            },
            {
              title: 'PR',
              key: 'pr',
              width: 120
            },
            {
              title: '合同编号',
              key: '1',
              width: 120
            },
            {
              title: '物料编码',
              key: '2'
            },
            {
              title: '物料名称',
              key: '3'
            },
            {
              title: '单价',
              key: '4'
            },
            {
              title: '数量',
              key: '5'
            }
          ],
          data: [
            {
              pr: '0005521211',
              1: '1192982198',
              2: '00000001232132100',
              3: '笔记本',
              4: '1200.00',
              5: '1',

            },
            {
              pr: '0000012121',
              1: '1192982198',
              2: '00000001232132100',
              3: '鼠标',
              4: '5.00',
              5: '1',

            },
            {
              pr: '0000012121',
              1: '1192982198',
              2: '00000001232132100',
              3: '键盘',
              4: '10.00',
              5: '1',

            }
          ]
        },
        prTable: {
          headers: [
            {
              type: 'index',
              align: 'center',
              width: 60
            },
            {
              title: 'PR',
              key: 'pr',
              width: 120
            },

            {
              title: '物料编码',
              key: '2'
            },
            {
              title: '物料名称',
              key: '3'
            },
            {
              title: '单价',
              key: '4'
            },
            {
              title: '数量',
              key: '5'
            }
          ],
          data: [
            {
              pr: '0000012121',
              1: '1',
              2: '00000001232132100',
              3: '笔记本',
              4: '12.00',
              5: '1',

            }
          ]
        },
        table: {
          headers: [
            {
              type: 'index',
              width: 60,
              align: 'center'
            },
            {
              title: '类型',
              key: '2'
            },
            {
              title: '物料编码',
              key: '3'
            },
            {
              title: '物料名称',
              key: '4'
            },
            {
              title: '含税价',
              key: '6'
            },
            {
              title: '税率',
              key: '7'
            },
            {
              title: '交货日期',
              key: 'action',
              align: 'left',
              render: (h, params) => {
                return h('div', [
                  h('Date-picker', {
                      props: {
                        type: 'date'
                      },
                      style: {
                        width: '100px',
                      }
                    }
                  )
                ])
              }
            },
            {
              title: '数量',
              key: 'action',
              render: (h, params) => {
                return h('div', [
                  h('Input', {
                      props: {},
                      style: {
                        width: '50px',
                      }
                    }
                  ),
                  h('span', {}, ' 件')
                ])
              }
            }
          ],
          data: [
            {
              name: '电脑采购合同',
              1: '文本模板',
              2: '模板',
              3: '朱磊',
              4: '采购部',
              5: '朱磊',
              6: 'J3',
              7: 'J3',
              8: '2017-06-26',
            }
          ]
        },
        serviceTable: {


          headers: [
            {
              title: '序号',
              key: '1'
            },
            {
              title: '服务名称',
              key: '2'
            },
            {
              title: '验收要求',
              key: '3'
            },
            {
              title: '备注',
              key: '4'
            },


            {
              title: '操作',
              key: 'action',
              width: 150,
              align: 'center',
              render: (h, params) => {
                return h('div', [
                  h('Button', {
                    props: {
                      type: 'primary',
                      size: 'small'
                    },
                    style: {
                      marginRight: '5px'
                    },
                    on: {
                      click: () => {
                        this.show(params.index)
                      }
                    }
                  }, '编辑'),
                  h('Button', {
                    props: {
                      type: 'error',
                      size: 'small'
                    },
                    style: {
                      marginRight: '5px'
                    },
                    on: {
                      click: () => {
                        this.show(params.index)
                      }
                    }
                  }, '删除')

                ])
              }
            }
          ],
          data: [{
            1: '1',
            2: '服务',
            3: '验收结束',
            4: '备注',

          }]


        },

      }
    },
    methods: {
      QueryTextNO(text) {
        if (!text || text === null || text === 'undefined') {
          this.$Message.warning({
            content: '请输入采购申请号！',
            duration: 3
          });
          this.purchaseType = 0;
        }
        else if (text === '2') {
          this.purchaseType = 2;
        }
        else {
          this.purchaseType = 1;
          this.prTable.data.push({
            pr: '000000001',
            1: '*',
            2: '000000000000001',
            3: '新增',
            4: '3.00',
            5: '1'
          });
        }
      },
      ok() {
        this.$Message.info('点击了确定');
      },
      cancel() {
        this.$Message.info('操作取消！');
      }
    }
  }
</script>
