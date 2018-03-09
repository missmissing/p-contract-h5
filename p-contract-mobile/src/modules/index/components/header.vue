<template>
  <mt-header fixed :title="title">
    <mt-button icon="back" slot="left" @click="back"></mt-button>
  </mt-header>
</template>

<script>
  export default {
    props: {
      title: {
        type: String,
        default: ''
      }
    },
    data () {
      return {}
    },
    methods: {
      back () {
        window._____processCenterPageAction('pageback') // 依赖crossdomainpage.min.js
      }
    }
  }
</script>
