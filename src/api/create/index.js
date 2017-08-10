import Http from '@/core/commonModel';

export default {
  getModuleList(params){
    return Http.get(`api/moduleLists/`, {params});
  }
};
