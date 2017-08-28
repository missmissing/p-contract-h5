<template>
  <div>
    <Form :label-width="100" inline>
      <Form-item label="采购订单编号">
        <Input placeholder="请输入" v-model="formItem.textno">
        <Button @click="QueryTextNO(formItem.textno)" slot="append" icon="ios-search"></Button>
        </Input>
      </Form-item>
      <Form-item label-width="0">
        <Button>详情</Button>
      </Form-item>
      <br/>
      <Form-item label="业务经办人">
        <Input/>
      </Form-item>
      <Form-item label="业务部门">
        <Input disabled/>
      </Form-item>
      <Form-item label="合同编号">
        <Input disabled/>
      </Form-item>
      <Form-item label="合同模式">
        <Input disabled/>
      </Form-item>
      <Form-item label="合同版本">
        <Input disabled/>
      </Form-item>
      <Form-item label="合同类型">
        <Input disabled/>
      </Form-item>
      <Form-item label="所属项目">
        <Input disabled/>
      </Form-item>
      <Form-item label="合同生效日期">
        <Input disabled/>
      </Form-item>
      <Form-item label="合同终止日期">
        <Input disabled/>
      </Form-item>
      <Form-item label="验收责任人">
        <Input disabled/>
      </Form-item>
      <Form-item label="验收监督人">
        <Input disabled/>
      </Form-item>
      <Form-item label="合同验收日期">
        <Input/>
      </Form-item>
    </Form>
    <Form label-width="100">
      <Form-item label-width="20">
        <p style="margin-bottom:10px;">物资验收事项
          <Button type="success" style="margin-left:20px;">新增</Button>
        </p>
        <Table :columns="table.headers" :data="table.data"></Table>
      </Form-item>
      <Form-item label-width="20">
        <p style="margin-bottom:10px;">服务验收事项
          <Button type="success" style="margin-left:20px;">新增</Button>
        </p>
        <Table :columns="serviceTable.headers" :data="serviceTable.data"></Table>
      </Form-item>
      <Form-item label="验收结论">
        <Radio-group v-model="formItem.radiovalue">
          <Radio label="1">合格</Radio>
          <Radio label="2">不合格</Radio>
        </Radio-group>
      </Form-item>
      <Form-item label="备注">
        <Input v-model="formItem.textarea" type="textarea" :autosize="{minRows: 3,maxRows: 6}"
               placeholder="请输入..."/>
      </Form-item>
      <Form-item label="相关附件">
        <Attachment/>
      </Form-item>
    </Form>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        formItem: {
          textarea: '',
          selectvalue: '',
          textno: '',
          radiovalue: '',
          isValid: false
        },
        table: {
          headers: [
            {
              title: '序号',
              width: 60,
              key: '1'
            },
            {
              title: '物料编码',
              key: '2'
            },
            {
              title: '物料描述',
              key: '3'
            },
            {
              title: '数量',
              key: '4'
            },
            {
              title: '检查结果',
              key: '5'
            },
            {
              title: '备注',
              key: '6'
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
          data: [
            {
              1: '1',
              2: '模板',
              3: '朱磊',
              4: '采购部',
              5: '朱磊'

            }
          ]
        },
        serviceTable: {
          headers: [
            {
              title: '序号',
              width: 60,
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
              title: '金额',
              key: '4'
            },
            {
              title: '检查结果',
              key: '5'
            },
            {
              title: '备注',
              key: '6'
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
          data: [
            {
              1: '1',
              2: '模板',
              3: '朱磊',
              4: '采购部',
              5: '朱磊'

            }
          ]
        }
      }
    },
    methods: {
      QueryTextNO(no) {
        alert(no)
      }
    }
  }
</script>
