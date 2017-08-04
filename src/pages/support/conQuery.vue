<template>
  <div>
    <Form :label-width="80" inline>
      <Form-item label="文本类型">
        <Select placeholder="请选择" style="width:162px;">
        </Select>
      </Form-item>
      <Form-item label="业务部门">
        <Select placeholder="请选择" style="width:162px;">
        </Select>
      </Form-item>
      <Form-item label="有效性">
        <i-switch v-model="formItem.isValid"/>
      </Form-item>
      <br/>
      <Form-item label="创建时间">
        <Row>
          <Col span="11">
          <Date-picker type="date" placeholder="选择日期" v-model="formItem.date"/>
          </Col>
          <Col span="2" style="text-align:center;">
          至
          </Col>
          <Col span="11">
          <Date-picker type="date" placeholder="选择日期" v-model="formItem.date"/>
          </Col>
        </Row>
      </Form-item>
      <Form-item label="搜索">
        <Input placeholder="请输入关键字" v-model="formItem.textno"/>
      </Form-item>
      <Form-item label-width="0">
        <Button type="info" @click="QueryTextNO(formItem.textno)" icon="ios-search">查询</Button>
      </Form-item>
    </Form>

    <Table :columns="table.headers" :data="table.data"></Table>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        formItem: {
          textarea: "",
          selectvalue: 'template',
          textno: "",
          isValid: true,
        },
        table: {
          headers: [{
            title: '文本类型',
            key: 'name'
          },
            {
              title: '模板名称',
              key: '1'
            },
            {
              title: '模板编号',
              key: '2'
            },
            {
              title: '发起人',
              key: '3'
            },
            {
              title: '业务部门',
              key: '4'
            },
            {
              title: '创建日期',
              key: '5'
            },
            {
              title: '生效日期',
              key: '6'
            },
            {
              title: '终止日期',
              key: '7'
            },
            {
              title: '使用次数',
              key: '8'
            },
            {
              title: '操作',
              key: 'action',
              width: 100,
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
                  }, '详情')

                ]);
              }
            }],
          data: [
            {
              name: '电脑采购合同',
              1: '文本模板',
              2: '采购合同',
              3: '12345678',
              4: '朱磊',
              5: '2017-06-26',
              6: '2017-06-26',
              7: '2017-06-26',
              8: '1',

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
