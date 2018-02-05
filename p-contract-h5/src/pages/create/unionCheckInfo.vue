<template>
  <div>
    <el-button
      v-if="isVisibleAddBtn"
      @click="visible=true"
      size="small"
      icon="plus"
      type="primary"
      class="mb10">添加
    </el-button>
    <el-table class="mb20" :data="items">
      <el-table-column prop="personName" label="联合验收人"></el-table-column>
      <el-table-column prop="personDept" label="联合验收人部门"></el-table-column>
      <el-table-column
        label="操作"
        width="100"
        v-if="isVisibleBtns">
        <template slot-scope="scope">
          <el-button
            v-if="scope.row.addNew"
            @click="handleRemove(scope.$index,items)"
            type="danger" size="small">移除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="新增联合验收人" :visible.sync="visible">
      <el-form
        :model="form"
        ref="form"
        label-width="120px"
        :rules="rules">
        <el-form-item label="联合验收人" prop="personName">
          <el-select
            style="width:300px"
            v-model="form.personName"
            filterable
            remote
            placeholder="请输入联合验收人"
            :remote-method="getRemoteCheckPersonsByKeyWord"
            :loading="loading"
            @change="handleCheckPersonsChange">
            <el-option
              v-for="item in checkPersons"
              :key="item.userId"
              :label="item.userName"
              :value="item.userId">
              <span class="fl">{{ item.deptName }}</span>
              <span class="fr">{{ item.userName }}</span>
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="personDept" label="联合验收人部门">
          <el-input style="width:300px" :disabled="true" v-model="form.personDept"
                    placeholder="请输入联合验收人部门"></el-input>
        </el-form-item>
      </el-form>
      <footer slot="footer">
        <el-button @click="handleCancelAddUnionCheck('form')">取消</el-button>
        <el-button type="primary" @click="handleAddUnionCheckItem('form')">确定</el-button>
      </footer>
    </el-dialog>
  </div>
</template>

<script>
  import Api from '../../api/manageContract';

  export default {
    name: 'union-check-info',
    props: {
      items: Array
    },
    data() {
      return {
        visible: false,
        loading: false,
        checkPersons: [],
        form: {
          personId: '',
          personName: '',
          personDeptId: '',
          personDept: ''
        },
        rules: {
          personName: [
            {required: true, message: '请输入验收人'}
          ]
        }
      };
    },
    computed: {
      isVisibleAddBtn() {
        const {isCreate} = this.$store.getters;
        let visible = false;
        if (isCreate) {
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
      getRemoteCheckPersonsByKeyWord(keyword) {
        if (keyword !== '') {
          this.loading = true;
          Api.getRemoteCreatePersonsByKeyWord({keyword})
            .then((data) => {
              this.loading = false;
              this.checkPersons = data.data.dataMap;
            });
        } else {
          this.checkPersons = [];
        }
      },
      handleCheckPersonsChange(val) {
        this.checkPersons.some((item) => {
          if (item.userId === val) {
            this.form.personDept = item.deptName;
            this.form.personDeptId = item.deptCode;
            this.form.personId = item.userId;
            this.form.personName = item.userName;
            return true;
          }
          return false;
        });
      },
      handleAddUnionCheckItem(formName) {
        const curForm = this.$refs[formName];
        curForm.validate((valid) => {
          if (valid) {
            const exist = this.items.some(chr => chr.personId === this.form.personId);
            if (exist) {
              this.$message.error('这条数据已存在咯！');
              return;
            }

            this.items.push({
              personId: this.form.personId,
              personName: this.form.personName,
              personDeptId: this.form.personDeptId,
              personDept: this.form.personDept,
              addNew: true
            });
            curForm.resetFields();
            this.visible = false;
          }
        });
      },
      handleCancelAddUnionCheck(formName) {
        this.$refs[formName].resetFields();
        this.visible = false;
      }
    }
  };
</script>

<style type="text/scss" lang="scss" scoped>

</style>
