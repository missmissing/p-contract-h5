<template>
  <Modal
    v-model="showSearchUserModal"
    title="用户搜索" @on-cancel="cancel" @on-ok="ok">
    <div style="text-align: center;padding-bottom: 15px;">
      <Input placeholder="请输入..." style="width: 260px;margin-right: 5px;"/>
      <Button type="primary" icon="ios-search">搜索</Button>
    </div>

    <Transfer
      :data="data"
      :target-keys="targetKeys"
      :list-style="listStyle"
      filterable
      :filter-method="filterMethod"
      @on-change="handleChange">
    </Transfer>
  </Modal>
</template>

<script>
  export default {
    created() {
    },
    data() {
      return {
        data: this.getMockData(),
        targetKeys: this.getTargetKeys(),
        listStyle: {
          width: '200px',
          height: '250px'
        }
      }
    },
    props: ['showSearchUserModal'],
    methods: {
      getMockData() {
        let mockData = [];
        for (let i = 1; i <= 3; i++) {
          mockData.push({
            key: i.toString(),
            label: '内容' + i,
            description: '内容' + i + '的描述信息',
            disabled: false
          });
        }
        return mockData;
      },
      getTargetKeys() {
//          	this.getMockData();
        return [];
      },
      handleChange(newTargetKeys) {
        this.targetKeys = newTargetKeys;
      },
      filterMethod(data, query) {
        return data.label.indexOf(query) > -1;
      },
      cancel() {
        this.showSearchUserModal = false;
//          	this.$emit('on-cancel',false);
      },
      ok() {
        this.showSearchUserModal = false;
//          	this.$emit('on-cancel',false);
      }
    }
  }
</script>

<style>
</style>
