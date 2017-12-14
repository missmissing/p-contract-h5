<style type="text/scss" lang="scss" scoped>
  .title {
    padding: 5px 10px;
    border-bottom: 1px solid #dedede;
    font-size: 16px;
  }

  .main {
    padding: 20px;
  }

  .item {
    margin-bottom: 10px;
    border: 1px solid #ddd;
    border-radius: 10px;
  }

  .header {
    padding: 10px;
    border-bottom: 1px solid #ccc;
  }

  .content {
    padding: 10px;
  }
</style>

<template>
  <div>
    <div class="title">审批意见</div>
    <div class="main">
      <div class="item" v-for="list in lists" :key="list.commentId">
        <div class="header">
          <span>{{list.activityName}}</span>
          <span>{{list.approverName}}:</span>
          <span>{{list.actionName}}</span>
          <span class="fr">{{list.approveTime | formatTime}}</span>
        </div>
        <div class="content">{{list.comment}}</div>
      </div>
    </div>
  </div>
</template>

<script>
  import Api from '../../../api/process';

  export default {
    props: {
      lists: {
        type: Array
      }
    },
    data() {
      return {};
    },
    created() {
      Api.getStartedProcNodes({
        procInstId,
        procCode
      }).then((res) => {
        this.lists = res.data.dataMap.nodes;
      });
    }
  };
</script>
