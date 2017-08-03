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
          <Col span="6">
          <Cascader trigger="hover"/>
          </Col>
          <Col span="2">
          <Button icon="plus-round" style="margin-left:10px">添加</Button>
          </Col>
        </Row>
        <Row>
          <Col span="8">
          <ul class="multiple_select">
            <li>123
              <Button type="text" icon="close" style="float:right;"/>
            </li>
            <li>123
              <Button type="text" icon="close" style="float:right;"/>
            </li>
            <li>123
              <Button type="text" icon="close" style="float:right;"/>
            </li>
          </ul>
          </Col>
        </Row>
      </Form-item>
      <Form-item label="使用说明">
        <Input v-model="formItem.textarea" type="textarea" :autosize="{minRows: 3,maxRows: 6}"
               placeholder="请输入..."/>
      </Form-item>

      <Form-item label="备注">
        <Input v-model="formItem.textarea" type="textarea" :autosize="{minRows: 3,maxRows: 6}"
               placeholder="请输入..."/>
      </Form-item>
      <Form-item>
        <Button @click="editTemplate.show=true" type="info">编辑模板</Button>
      </Form-item>
    </Form>
    <Form id="editTemplate" v-show="editTemplate.show">
      <Row>
        <Col span="10">
        <Form :label-width="0">


          <Form-item>
            <vue-html5-editor :content="editTemplate.content" :height="300"
                              @change="updateTemplateContent"/>
          </Form-item>
          <Form-item style="text-align:center">
            <Button @click="" type="primary" size="large">提交</Button>
            <Button @click="editTemplate.show=false" type="dashed">取消</Button>
          </Form-item>

        </Form>
        </Col>
        <Col span="14">

        <h3 style="padding-left:20px;"> 预览</h3>
        <div class="template-preview" v-html="editTemplate.header+editTemplate.content+editTemplate.footer">

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
