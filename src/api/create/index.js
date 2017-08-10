import Http from '@/core/commonModel';

export default {
    //获取合同模式和合同类型
    getContractModelsAndTypes(params){
        return Http.get(`/api/createContract/getContractModelsAndTypes`, params);
    },
    //获取比价单列表数据
    getQrList(params){
        return Http.get(`/api/createContract/getQrList`, params);
    },
};
