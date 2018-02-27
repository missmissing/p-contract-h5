import {PAGESTATUS} from '../store/consts'

export default {
  created () {
    this.getPageStatus()
  },
  watch: {
    $route () {
      this.getPageStatus()
    }
  },
  methods: {
    getPageStatus () {
      const {pageStatus} = this.$route.query
      this.$store.commit(PAGESTATUS, {
        data: +pageStatus || 1
      })
    }
  }
}
