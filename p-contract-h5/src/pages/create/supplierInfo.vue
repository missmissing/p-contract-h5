<template>
  <div>
    <el-button
      v-show="isVisibleNewSupplierBtn"
      size="small"
      @click="visible=true"
      prefix-icon="plus"
      class="mb10" type="primary">
      新增
    </el-button>
    <el-table :data="items">
      <el-table-column type="index" label="序号" width="80">
        <template slot-scope="scope">
          {{scope.$index + 1}}
        </template>
      </el-table-column>
      <el-table-column prop="code" label="供应商编号"></el-table-column>
      <el-table-column prop="name" label="供应商名称"></el-table-column>
      <el-table-column
        label="操作"
        width="100"
        v-if="isVisibleBtns">
        <template slot-scope="scope">
          <el-button
            v-if="scope.row.addNew"
            @click="handleRemove(scope.$index, items)"
            type="danger"
            size="small">移除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="新增合同供应商信息" :visible.sync="visible">
      <el-form :model="form" label-width="100px" ref="form"
               :rules="rules">
        <el-form-item label="供应商名称/编码" prop="search" label-width="150px">
          <el-select
            style="width:300px"
            size="small"
            v-model="form.search"
            filterable
            remote
            placeholder="请输入关键词搜索"
            :remote-method="getRemoteSuppliersByKeyWord"
            :loading="loading">
            <el-option
              v-for="item in suppliers"
              :key="item.companyCode"
              :label="item.company"
              :value="item.companyCode">
              <span class="fl">{{ item.companyCode }}</span>
              <span class="fr">{{ item.company }}</span>
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <footer slot="footer">
        <el-button @click="handleNewContractSupplierCancel('form')">取消</el-button>
        <el-button type="primary" @click="handleNewContractSupplier('form')">确定</el-button>
      </footer>
    </el-dialog>
  </div>
</template>

<script>
  import Api from '../../api/manageContract';

  export default {
    name: 'supplier-info',
    props: {
      items: Array
    },
    data() {
      return {
        visible: false,
        suppliers: [],
        loading: false,
        form: {
          search: ''
        },
        rules: {
          search: [
            {required: true, message: '请输入搜索关键字', trigger: 'blur'}
          ]
        }
      };
    },
    computed: {
      isVisibleNewSupplierBtn() {
        let visible = false;
        if (!this.items.length) {
          visible = true;
        }
        return visible;
      },
      isVisibleBtns() {
        const {isSee, isProcess} = this.$store.getters;
        return !(isSee && isProcess);
      }
    },
    methods: {
      handleRemove(index, rows) {
        rows.splice(index, 1);
      },
      getRemoteSuppliersByKeyWord(key) {
        if (key !== '') {
          this.loading = true;
          Api.getRemoteSuppliersByKeyWord({key})
            .then((data) => {
              this.loading = false;
              this.suppliers = data.data.dataMap;
            });
        } else {
          this.suppliers = [];
        }
      },
      handleNewContractSupplier(formName) {
        const curForm = this.$refs[formName];
        curForm.validate((valid) => {
          if (valid) {
            const key = this.form.search;
            this.suppliers.some((item) => {
              if (key === item.companyCode) {
                this.items.push({
                  code: item.companyCode,
                  name: item.company,
                  addNew: true
                });
                this.$emit('getYiBillingInfo', item);
                return true;
              }
              return false;
            });

            curForm.resetFields();
            this.visible = false;
          }
        });
      },
      handleNewContractSupplierCancel(formName) {
        this.$refs[formName].resetFields();
        this.visible = false;
      }
    }
  };
</script>

<style type="text/scss" lang="scss" scoped>

</style>
