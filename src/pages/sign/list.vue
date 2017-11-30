<style type="text/scss" lang="scss" scoped>

</style>

<template>
  <div class="pt20 pb20">
    <el-form ref="form" :model="form" label-width="100px">
      <el-row>
        <el-col :span="21">
          <el-form-item label="查询条件">
            <el-input
              placeholder="请输入供应商名称，物料名称"
              v-model="form.fuzzySearch">
            </el-input>
          </el-form-item>
        </el-col>
        <el-button type="primary" @click="search" class="ml20">搜 索</el-button>
      </el-row>
      <el-row>
        <el-col :span="6">
          <el-form-item label="订单类型">
            <el-select v-model="form.category" clearable>
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="发起人">
            <SelectPerson @change="selectPerson"></SelectPerson>
          </el-form-item>
        </el-col>
        <el-col :span="9">
          <el-form-item label="创建时间">
            <el-date-picker
              style="width:100%;"
              v-model="daterange"
              type="daterange"
              placeholder="选择日期范围"
              @change="formatDateRange"
              :picker-options="pickerOptions">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="公司编码">
            <el-autocomplete
              class="wp100"
              :fetch-suggestions="querySearch"
              v-model="form.companyCode"
              :props="{value:'value',label:'label'}"
              :trigger-on-focus="false">
            </el-autocomplete>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="合同编码">
            <el-input
              class="wp100"
              v-model="form.contractNo">
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <el-table
      :data="tableData"
      border
      highlight-current-row
      class="wp100">
      <el-table-column
        prop="pr"
        width="130"
        label="采购订单号">
        <template scope="scope">
          <router-link class="router-link" :to="see(scope.row)">
            {{scope.row.purchaseOrderNo}}
          </router-link>
        </template>
      </el-table-column>
      <el-table-column
        prop="category"
        min-width="100"
        label="订单类型"
        :formatter="formatType">
      </el-table-column>
      <el-table-column
        prop="sapItemNo"
        width="80"
        label="行项目">
      </el-table-column>
      <el-table-column
        prop="materialCode"
        width="130"
        label="物料编码">
        <template scope="scope">
          {{scope.row.materialCode | cutZero}}
        </template>
      </el-table-column>
      <el-table-column
        prop="materialName"
        min-width="300"
        label="物料描述">
      </el-table-column>
      <el-table-column
        prop="total"
        width="80"
        label="数量">
      </el-table-column>
      <el-table-column
        prop="price"
        width="100"
        label="含税单价">
      </el-table-column>
      <el-table-column
        prop="taxRate"
        width="70"
        label="税率">
        <template scope="scope">
          {{scope.row.taxRate ? `${scope.row.taxRate}%` : ''}}
        </template>
      </el-table-column>
      <el-table-column
        prop="creatorName"
        width="80"
        label="发起人">
      </el-table-column>
      <el-table-column
        prop="createTime"
        width="120"
        label="创建日期">
        <template scope="scope">
          {{scope.row.createTime | formatDate}}
        </template>
      </el-table-column>
    </el-table>
    <div class="mt20">
      <el-pagination
        class="fr"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="form.pageNo"
        :page-size="form.pageSize"
        :page-sizes="[10, 20, 30, 50]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalPage">
      </el-pagination>
    </div>
  </div>
</template>

<script>
  import Api from '../../api/sign';
  import ContractApi from '../../api/manageContract';
  import { routerNames, prTypeMap } from '../../core/consts';
  import comLoading from '../../mixins/comLoading';
  import { formatDate } from '../../filters/moment';
  import SelectPerson from '../../components/selectPerson.vue';
  import cutZero from '../../util/cutZero';

  export default {
    mixins: [comLoading],
    data() {
      return {
        form: {
          fuzzySearch: '',
          category: '',
          companyCode: '',
          contractNo: '',
          createDateStart: '',
          createDateEnd: '',
          initiator: '',
          orderSource: '',
          pageNo: 1,
          pageSize: 10
        },
        options: [{
          label: '一般物资',
          value: 1
        }, {
          label: '服务',
          value: 2
        }],
        totalPage: 0,
        daterange: [],
        pickerOptions: {
          disabledDate(time) {
            return time.getTime() > Date.now();
          }
        },
        tableData: []
      };
    },
    methods: {
      search() {
        console.log(JSON.stringify(this.form));
        this.getList();
      },
      selectPerson(val) {
        this.form.initiator = val;
      },
      formatType(row, column, cellValue) {
        return [1, 3].indexOf(cellValue) > -1 ? prTypeMap[1] : prTypeMap[2];
      },
      getList() {
        this.comLoading();
        Api.query(this.form).then((res) => {
          console.log(res);
          this.comLoading(false);
          const { total, data } = res.data.dataMap;
          this.tableData = data;
          this.totalPage = total;
        }).catch(() => {
          this.comLoading(false);
        });
      },
      see(row) {
        console.log(row);
        const id = row.purchaseOrderId;
        return {
          name: routerNames.con_purchase_see,
          query: { id }
        };
      },
      formatDateRange(value) {
        const daterange = value.split(' ');
        this.daterange = [daterange[0], daterange[2]];
        this.form.createDateStart = daterange[0];
        this.form.createDateEnd = daterange[2];
      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
        this.form.pageSize = val;
        this.getList();
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        this.form.pageNo = val;
        this.getList();
      },
      select(row, val) {
        console.log(row, val);
      },
      createFilter(result) {
        return result.map((item) => ({ value: item.companyCode, label: `${item.companyCode} ${item.company}` }));
      },
      querySearch(queryString, cb) {
        if (!queryString) {
          return cb([]);
        }
        return ContractApi.getRemoteSubjectsByKeyWord({
          key: queryString
        }).then((res) => {
          const result = res.data.dataMap || [];
          cb(this.createFilter(result));
        }, () => cb([]));
      }
    },
    created() {
      this.getList();
    },
    filters: {
      formatDate,
      cutZero
    },
    components: {
      SelectPerson
    }
  };
</script>
