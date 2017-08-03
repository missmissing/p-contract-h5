/**
 * Created by lenovo on 2017-07-05.
 */
export default{
    template_preview(templateStr){
       return templateStr
         .replace(/&红星公司名称&/,'红星美凯龙家居集团股份有限公司')
         .replace(/&红星公司地址&/,'怒江北路598号')
         .replace(/&红星法人代表人&/,'车建兴')
         .replace(/&红星联系电话&/,'021-12345678')
         .replace(/&乙方公司名称&/,'********')
         .replace(/&乙方公司地址&/,'********')
         .replace(/&乙方法人代表人&/,'张三')
         .replace(/&乙方联系人&/,'李四')
         .replace(/&乙方联系电话&/,'010-87654321')
    }
};
