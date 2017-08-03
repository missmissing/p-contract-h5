<style>
  .width180 {
    width: 180px;
  }
</style>
<template>
  <div class="">
    <Card class="card">
      <p slot="title">合同基本信息</p>
      <Form :label-width="100" inline>
        <Form-item label="合同编号">
          <Input placeholder="请输入" class="width180"/>
        </Form-item>
        <Form-item :label-width="10">
          <Button type="primary" @click="nextStep">
            <span>查找</span>
          </Button>
        </Form-item>
        </br>
        <Form-item label="合同签署日期">
          <Input placeholder="请输入" class="width180" disabled/>
        </Form-item>
        <Form-item label="合同状态">
          <Select placeholder="请选择" class="width180" v-model="a" disabled>
            <Option value="1">框架意向合同</Option>
          </Select>
        </Form-item>
        </br>
        <Form-item label="合同生效日期">
          <Input placeholder="请输入" class="width180" disabled/>
        </Form-item>
        <Form-item label="合同截止日期">
          <Input placeholder="请输入" class="width180" disabled/>
        </Form-item>
        </br>
        <Form-item label="合同中止原因">
          <Select placeholder="请选择" class="width180">
            <Option value="template">框架意向合同</Option>
          </Select>
        </Form-item>
        <Form-item label="实际中止日期">
          <Date-picker type="date" placeholder="选择日期" class="width180"/>
        </Form-item>
        </br>
        <Form-item label="原因说明">
          <Input placeholder="请输入" type="textarea" :autosize="{minRows: 4,maxRows: 6}" style="width: 475px;"/>
        </Form-item>
      </Form>
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
        a: '1'
      }
    }
  }
</script>
