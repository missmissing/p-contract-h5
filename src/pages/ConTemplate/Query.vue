<template>
  <div>
    <Form :label-width="80" inline>
      <Form-item label="合同模式">
        <Select placeholder="请选择" style="width:162px;">
          <Option value="1">全部</Option>
          <Option value="2">框架合同</Option>
          <Option value="3">框架-单个合同</Option>
          <Option value="4">框架-外发订单</Option>
          <Option value="5">单一合同</Option>
          <Option value="6">简易合同</Option>
        </Select>
      </Form-item>
      <Form-item label="合同类型">
        <Select placeholder="请选择" style="width:162px;">
        </Select>
      </Form-item>
      <Form-item label="业务类型">
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
            title: '合同名称',
            key: 'name'
          },
            {
              title: '合同类型',
              key: '1'
            },
            {
              title: '合同模式',
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
              title: '经办人',
              key: '5'
            },
            {
              title: '创建日期',
              key: '6'
            },
            {
              title: '批准日期',
              key: '7'
            },
            {
              title: '盖章日期',
              key: '8'
            },
            {
              title: '生效日期',
              key: '9'
            },
            {
              title: '终止日期',
              key: '10'
            },
            {
              title: '是否有从协议',
              key: '11'
            }],
          data: [
            {
              name: '电脑采购合同',
              1: '文本模板',
              2: '模板',
              3: '朱磊',
              4: '采购部',
              5: '朱磊',
              6: '2017-06-26',
              7: '2017-06-26',
              8: '2017-06-26',
              9: '2017-06-26',
              10: '2017-06-26',
              11: '是',

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
