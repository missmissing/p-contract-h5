<style type="text/scss" lang="scss" scoped>

</style>

<template>
  <el-table :data="items" :show-header="showHeader">
    <el-table-column type="expand" v-if="items[0].haveSale">
      <template scope="scope">
        <div v-if="items[0].haveSale">
          <el-table :data="scope.row.filesSealed" class="mb20"
                    v-if="scope.row.filesSealed&&scope.row.filesSealed.length">
            <el-table-column label="文件名" prop="sealFileName">
              <template scope="scope1">
                <a :href="scope1.row.sealFileUrl" :download="scope1.row.sealFileName">{{scope1.row.sealFileName}}</a>
              </template>
            </el-table-column>
            <el-table-column label="上传人" prop="sealFileCreatorName" width="130"></el-table-column>
            <el-table-column label="上传时间" prop="sealFileCreateTime" width="130">
              <template scope="scope1">
                {{scope1.row.sealFileCreateTime | formatDate}}
              </template>
            </el-table-column>
          </el-table>
          <mt-cell title="用章次数" :value="scope.row.saleTime"></mt-cell>
          <mt-cell title="打印份数" :value="scope.row.printTime"></mt-cell>
          <mt-cell title="留存份数" :value="scope.row.remainTime"></mt-cell>
          <mt-cell title="选择用章" :value="scope.row.saleInfos | printChapter"></mt-cell>
        </div>
      </template>
    </el-table-column>
    <el-table-column prop="attachType" label="附件类型" width="100px">
      <template scope="scope">
        {{scope.row.attachType | attachmentType}}
      </template>
    </el-table-column>
    <el-table-column prop="fileName" label="文件名称" min-width="200px">
      <template scope="scope">
        <a :href="scope.row.fileUrl" target="_blank" class="file-item"
           :download="scope.row.fileName">{{scope.row.fileName}}</a>
      </template>
    </el-table-column>
    <el-table-column prop="haveSale" label="是否盖章" width="100px">
      <template scope="scope">
        {{scope.row.haveSale | yesOrNo}}
      </template>
    </el-table-column>
    <el-table-column prop="remark" label="备注"></el-table-column>
  </el-table>
</template>

<script>
  import {formatDate} from '../../../filters/moment';
  import attachmentType from '../../../filters/attachmentType';
  import printChapter from '../../../filters/printChapter';
  import yesOrNo from '../../../filters/yesOrNo';

  export default {
    props: {
      items: {
        type: Array,
        default() {
          return [];
        }
      },
      showHeader: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {};
    },
    methods: {},
    filters: {
      formatDate,
      attachmentType,
      printChapter,
      yesOrNo
    }
  };
</script>
