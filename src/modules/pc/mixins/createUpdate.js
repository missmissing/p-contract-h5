import _ from 'lodash';
import { routerNames } from '../core/consts';

export default {
  methods: {
    back() { // 返回列表页
      this.$router.push({
        name: routerNames.con_index
      });
    },
    check(result) {
      if (result.templateType === 'TEXT') {
        if (!result.files.length) {
          this.$message.warning('请上传附件！');
          return false;
        }
      } else {
        if (!_.trim(result.content)) {
          this.$message.error('请输入模板信息内容！');
          return false;
        }

        if (!result.contentModule.length) {
          this.$message.error('请选择模板信息模块！');
          return false;
        }
      }
      return true;
    }
  }
};
