<style type="text/scss" lang="scss" scoped>

</style>

<template>
  <div>
    <template v-for="item in fileList">
      <div><a :href="item.fileId | download" target="_blank">{item.fileName}}</a>{</div>
    </template>
  </div>
</template>

<script>
  import download from '../../../filters/download';

  export default {
    props: {
      fileList: {
        type: Array,
        default() {
          return [];
        }
      }
    },
    data() {
      return {};
    },
    filters: {
      download
    }
  };
</script>
