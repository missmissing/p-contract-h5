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
        <Input disabled/>
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
      <Form-item label="合同验收日期">
        <Input disabled/>
      </Form-item>
    </Form>
    <Form label-width="100">
      <Form-item label-width="20">
        <p style="margin-bottom:10px;">不合格事项
          <Button type="success" style="margin-left:20px;">新增</Button>
        </p>
        <Table :columns="table.headers" :data="table.data"></Table>
      </Form-item>
      <Form-item label="处理结论">
        <Radio-group v-model="formItem.radiovalue">
          <Radio label="1">继续履行</Radio>
          <Radio label="2">变更合同</Radio>
          <Radio label="3">按验收实际结果履行合同</Radio>
          <Radio label="4">转合同违约处理</Radio>
        </Radio-group>
      </Form-item>
      <Form-item label="不合格原因">
        <Input v-model="formItem.textarea" type="textarea" :autosize="{minRows: 3,maxRows: 6}" placeholder="请输入..."/>
      </Form-item>
      <Form-item label="处理方案">
        <Input v-model="formItem.textarea" type="textarea" :autosize="{minRows: 3,maxRows: 6}" placeholder="请输入..."/>
      </Form-item>
      <Form-item label="相关附件">
        <Upload action="//jsonplaceholder.typicode.com/posts/">
          <Button type="ghost" icon="ios-cloud-upload-outline">上传文件</Button>
        </Upload>
      </Form-item>
    </Form>


  </div>
</template>

<script>
  export default {
    data() {
      return {
        formItem: {
          textarea: "",
          selectvalue: '',
          textno: "",
          radiovalue: '1',
          isValid: false
        },
        table: {
          headers: [
            {
              title: '序号',
              key: '1'
            },
            {
              title: '验收要素',
              key: '2'
            },
            {
              title: '参考标准',
              key: '3'
            },
            {
              title: '检查结果',
              key: '4'
            },
            {
              title: '备注',
              key: '5'
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
              name: '电脑采购合同',
              1: '文本模板',
              2: '模板',
              3: '朱磊',
              4: '采购部',
              5: '朱磊',


            }
          ]
        }
      }
    },
    methods: {
      QueryTextNO(no) {
        alert(no);
      },
      updateTemplateContent(data) {
        this.editTemplate.content = data;
      }
    }
  }
</script>
