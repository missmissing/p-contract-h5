import {PAGESTATUS, PROCESSSTATUS, PROCESSROLE} from '../store/consts'

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

      if (+pageStatus === 4) {
        const {query} = this.$route
        const processData = JSON.parse(query.processData)
        const {dataType, roleName} = processData

        this.$store.commit(PROCESSSTATUS, {
          data: dataType
        })
        this.$store.commit(PROCESSROLE, {
          data: roleName
        })
      }
    }
  }
}
