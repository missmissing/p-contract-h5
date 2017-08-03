<template>
  <Card>
    <p slot="title">
      审核
    </p>
    <Form :label-width="100">
      <Form-item label="操作">
        <Radio-group v-model="phone">
          <Radio label="apple">
            <span>同意</span>
          </Radio>
          <Radio label="apple">
            <span>拒绝</span>
          </Radio>
          <Radio label="apple">
            <span>加签</span>
          </Radio>
          <Radio label="apple">
            <span>转签</span>
          </Radio>
        </Radio-group>
      </Form-item>
      <Form-item label="加/转签人员">
        <Input placeholder="请输入"/>
        <Button type="primary" icon="ios-search" @click="showSearchUserModal = true">选择人员</Button>
      </Form-item>
      <Form-item label="审批意见">
        <Input type="textarea" style="width: 280px;" placeholder="请输入" :autosize="{minRows: 4,maxRows: 8}"/>
      </Form-item>
    </Form>

    <searchuser :showSearchUserModal="showSearchUserModal"/>
  </Card>
</template>

<script>
  import searchuser from '../searchUser/SearchUser.vue'

  export default {
    data() {
      return {
        showSearchUserModal: false
      }
    },
    components: {searchuser}
  }
</script>

<style>
  .ivu-input-type,
  .ivu-select-selection {
    width: 180px;
  }
</style>
