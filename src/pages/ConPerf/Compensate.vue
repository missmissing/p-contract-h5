<template>
  <div>
    <Form :label-width="100" inline>
      <Form-item label="合同编号">
        <Input placeholder="请输入" v-model="formItem.textno">
        <Button @click="QueryTextNO(formItem.textno)" slot="append" icon="ios-search"></Button>
        </Input>

      </Form-item>
      <Form-item label-width="15">
        <Button>详情</Button>
      </Form-item>
      <br/>
      <Form-item label="合同名称">
        <Input disabled/>
      </Form-item>
      <Form-item label="合同签署日期">
        <Input disabled/>
      </Form-item>
      <Form-item label="合同生效日期">
        <Input disabled/>
      </Form-item>
      <Form-item label="合同终止日期">
        <Input disabled/>
      </Form-item>
      <Form-item label="申请人">
        <Input disabled/>
      </Form-item>
      <Form-item label="所属部门">
        <Input disabled/>
      </Form-item>
      <br/>
      <Form-item label="违约方">
        <Radio-group v-model="formItem.radiovalue">
          <Radio label="1">
            <span>我方</span>
          </Radio>
          <Radio label="2">
            <span>对方</span>
          </Radio>
          <Radio label="3">
            <span>双方</span>
          </Radio>
        </Radio-group>
      </Form-item>
      <br/>
      <Form-item label="是否涉及赔付">
        <i-switch v-model="formItem.isCompensate" @on-change="formItem.selectvalue=!formItem.selectvalue"></i-switch>
      </Form-item>
      <Form-item label="赔付类型" v-show="formItem.isCompensate">
        <Select placeholder="请选择" style="width:152px;" v-model="formItem.selectvalue">
          <Option value="1">供应商向我方赔付</Option>
          <Option value="2">我方向供应商赔付</Option>
        </Select>
      </Form-item>
      <Form-item label="赔付金额" v-show="formItem.isCompensate">
        <Input/>
      </Form-item>
      <br/>
      <Form-item label="处理结论">
        <Select placeholder="请选择" style="width:152px;" v-model="formItem.selectvalue">
          <Option value="1">继续履行</Option>
          <Option value="2">变更合同</Option>
          <Option value="3">终止合同</Option>
        </Select>
      </Form-item>
    </Form>
    <Form label-width="100">
      <Form-item label="违约/赔付原因">
        <Input v-model="formItem.textarea" type="textarea" :autosize="{minRows: 3,maxRows: 6}"
               placeholder="请输入..."/>
      </Form-item>
      <Form-item label="处理方案">
        <Input v-model="formItem.textarea" type="textarea" :autosize="{minRows: 3,maxRows: 6}"
               placeholder="请输入..."/>
      </Form-item>
      <Form-item label="相关附件">
        <Attachment/>
      </Form-item>
      {{fullname}}
      {{formItem.textno}}
    </Form>


  </div>
</template>

<script>
  export default {
    data() {
      return {
        firstname: "aaa",
        lastname: 'bbb',
        currentview: 'Test',
        formItem: {
          textarea: "",
          selectvalue: '',
          textno: "123",
          radiovalue: '1',

          isCompensate: false,
        },

      }
    },
    computed: {
      fullname() {
        return this.firstname + this.lastname;
      }
    },
    methods: {
      QueryTextNO(no) {
        alert(no);
      }
    }
  }
</script>
