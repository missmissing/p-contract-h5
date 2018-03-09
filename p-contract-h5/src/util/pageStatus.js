import {CURRENTSTATUS} from '../store/consts'

export default (vueInstance, status) => {
  vueInstance.$store.commit(CURRENTSTATUS, {
    data: status
  })
}
