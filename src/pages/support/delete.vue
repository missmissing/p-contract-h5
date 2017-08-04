<style scoped>

  .multiple_select {
    margin-top: 10px;
    border: solid 1px #dddee1;
    border-radius: 4px;
  }

  .multiple_select li {
    margin: 0;
    padding-left: 10px;
    border-bottom: solid 1px #dddee1;
  }

  select {
    width: 150px;
  }

  .template-preview {
    border: solid 1px #dddee1;
    padding: 10px;
    margin-left: 20px;
  }
</style>
<template>
  <div>
    <Form :label-width="100" inline v-show="!editTemplate.show">
      <Form-item label="文本编号">
        <Input placeholder="请输入" v-model="formItem.textno">
        <Button @click="QueryTextNO(formItem.textno)" slot="append" icon="ios-search"></Button>
        </Input>

      </Form-item>

      <Form-item label="文本名称">
        <Input placeholder="请输入" disabled/>
      </Form-item>
      <Form-item label="文本类型">
        <Select placeholder="合同模板" v-model="formItem.selectvalue" disabled style="width:162px;">
          <Option value="template" selected>合同模板</Option>
          <Option value="text">文本</Option>
        </Select>
      </Form-item>
      <Form-item label="创建人">
        <Input placeholder="请输入" disabled/>
      </Form-item>
      <Form-item label="最近更新人">
        <Input placeholder="请输入" disabled/>
      </Form-item>
      <Form-item label="最近修改时间">
        <Input placeholder="请输入" disabled/>
      </Form-item>
    </Form>
    <Form :label-width="100" v-show="!editTemplate.show">
      <Form-item label="业务类型">

        <Row>
          <Col span="8">
          <ul class="multiple_select">
            <li>123
              <Button type="text" icon="close" style="float:right;"></Button>
            </li>
            <li>123
              <Button type="text" icon="close" style="float:right;"></Button>
            </li>
            <li>123
              <Button type="text" icon="close" style="float:right;"></Button>
            </li>
          </ul>
          </Col>
        </Row>
      </Form-item>
      <Form-item label="使用说明">
        <Input v-model="formItem.textarea" type="textarea" :autosize="{minRows: 3,maxRows: 6}" disabled/>
      </Form-item>

      <Form-item label="备注">
        <Input v-model="formItem.textarea" type="textarea" :autosize="{minRows: 3,maxRows: 6}" disabled/>
      </Form-item>
    </Form>
    <Form id="editTemplate" v-show="editTemplate.show">
      <Row>
        <Col span="14">
        <h3 style="padding-left:20px;"> 预览</h3>
        <div class="template-preview" v-html="editTemplate.header+editTemplate.content+editTemplate.footer">
          test
        </div>
        </Col>
      </Row>
    </Form>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        formItem: {
          textarea: "",
          selectvalue: 'template',
          textno: ""
        },
        editTemplate: {
          show: false,
          header: '<h2>固定头部</h2>',
          content: '',
          footer: '<h2>固定尾部</h2>'
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
