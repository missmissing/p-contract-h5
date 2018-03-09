<style type="text/scss" lang="scss" scoped>

</style>

<template>
  <div>
    <template v-for="item in fileList">
      <div><a :download="item.fileName"
              @click="openFile(item.fileId)">{item.fileName}}</a>{
      </div>
    </template>
  </div>
</template>

<script>
  import download from '../../../filters/download'

  export default {
    props: {
      fileList: {
        type: Array,
        default () {
          return []
        }
      }
    },
    data () {
      return {}
    },
    methods: {
      openFile (id) {
        const path = download(id)
        window._____processCenterPageAction('opennewwindow', {path})
      }
    },
    filters: {
      download
    }
  }
</script>
