<template>
  <div>
    <template v-for="item in items">
      <mt-cell :title="item.labelName" :value="item.value" :label="item.labelDesc"></mt-cell>
    </template>
  </div>
</template>

<script>
  export default {
    name: 'custom-label-info',
    props: {
      items: Array
    }
  };
</script>

<style type="text/scss" lang="scss" scoped>

</style>
