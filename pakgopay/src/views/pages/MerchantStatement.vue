<script setup>

import SvgIcon from "@/components/SvgIcon/index.vue";
</script>

<template>
  <div class="main-title">商户流水</div>
  <!-- 工具栏 -->
  <el-collapse v-model="activeTool">
    <el-collapse-item name="1">
      <template #title>
        <span class="toolbarName">
          工具栏
        </span>
      </template>
      <div class="main-toolbar">
        <form class="main-toolform">
          <div class="main-toolform-item">
            <div class="main-toolform-line" style="justify-content: right;margin-right: 4%;">
              <el-button @click="reset('filterboxForm')" class="filterButton">
                <SvgIcon class="filterButtonSvg" name="reset"/>
                <div>重置</div>
              </el-button>
              <el-button @click="search()" class="filterButton">
                <SvgIcon class="filterButtonSvg" name="search"/>
                <div>查询</div>
              </el-button>
              <el-button @click="exportStatements()" class="filterButton">
                <SvgIcon class="filterButtonSvg" name="export"/>
                <div>导出</div>
              </el-button>
            </div>
          </div>
          <div class="main-toolform-item" style="margin-right: 3%;">
            <el-form
                ref="filterboxForm" class="form" :model="filterbox"
                style="width: 100%"
            >
              <el-row>
                <el-col :span="6">
                  <el-form-item label="商户名称:" label-width="150px">
                    <el-select
                        :options="merchantAccountOptions"
                        :props="merchantAccountProps"
                        v-model="filterbox.merchantUserId"
                        style="width: 200px"
                    ></el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="交易订单号:" label-width="150px">
                    <el-input v-model="filterbox.orderNO" style="width: 200px"/>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="交易类型:" label-width="150px">
                    <el-select
                        v-model="filterbox.type"
                        style="width: 200px"
                    >
                      <el-option label="充值" :value="0"></el-option>
                      <el-option label="提现" :value="1"></el-option>
                      <el-option label="手工调账" :value="2"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="时间:" label-width="150px">
                    <el-date-picker
                        v-model="filterbox.filterDateRange"
                        type="daterange"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        format="YYYY/MM/DD"
                        value-format="x"
                    >
                    </el-date-picker>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </div>
        </form>
      </div>
    </el-collapse-item>
  </el-collapse>

  <div class="reportInfo">
    <form class="main-views-form">
      <el-table
          border :data="merchantStatementsFormData"
          class="merchantInfos-table"
          style="width: 100%;height: auto"
      >
        <el-table-column
            label="交易订单号"
            v-slot="{row}"
            align="center"
        >
          <div>
            {{row.orderNO}}
          </div>
        </el-table-column>
        <el-table-column
            prop="商户名称"
            label="商户名称"
            v-slot="{row}"
            align="center"
        >
          <div>
            {{row.merchantName}}
          </div>
        </el-table-column>
        <el-table-column
            prop="transactionType"
            label="交易类型"
            v-slot="{row}"
            align="center"
        >
          <div>
            {{row.transactionType}}
          </div>
        </el-table-column>
<!--        <el-table-column
            prop="transactionStatus"
            label="交易状态"
            v-slot="{row}"
            align="center"
        >
          <div>
            {{row.transactionStatus}}
          </div>
        </el-table-column>-->
        <el-table-column
            prop="transactionCurrencyType"
            label="交易币种"
            v-slot="{row}"
            align="center"
        >
          <div>
            {{row.transactionCurrencyType}}
          </div>
        </el-table-column>
        <el-table-column
            prop="transactionCashAmount"
            label="交易金额"
            v-slot="{row}"
            align="center"
        >
          <div>
            {{row.transactionCashAmount}}
          </div>
        </el-table-column>
<!--        <el-table-column
            prop="transactionCommission"
            label="手续费"
            v-slot="{row}"
            align="center"
        >
          <div>
            {{row.transactionCommission}}
          </div>
        </el-table-column>-->
<!--        <el-table-column
            prop="beforeTransactionAccountBalance"
            label="交易前账户金额"
            v-slot="{row}"
            align="center"
            width="200px;"
        >
          <div style="width: 100%;">
            {{row.beforeTransactionAccountBalance}}
          </div>
        </el-table-column>-->
<!--        <el-table-column
            prop="afterTransactionAccountBalance"
            label="交易后账户余额"
            v-slot="{row}"
            align="center"
        >
          <div>
            {{row.afterTransactionAccountBalance}}
          </div>
        </el-table-column>-->
        <el-table-column
            prop="transactionTime"
            label="交易时间"
            v-slot="{row}"
            align="center"
        >
          <div>
            {{row.transactionTime}}
          </div>
        </el-table-column>
        <el-table-column
            label="备注"
            v-slot="{row}"
            align="center"
        >
          <div>
            {{row.transactionReason}}
          </div>
        </el-table-column>
        <el-table-column
            label="操作人"
            v-slot="{row}"
            align="center"
        >
          <div>
            {{row.operator}}
          </div>
        </el-table-column>
      </el-table>
      <el-pagination
          background
          layout="sizes, prev, pager, next, jumper, total"
          :total="totalCount"
          v-model:current-page="currentPage"
          v-model:page-size="pageSize"
          :page-sizes="pageSizes"
          @current-change="handleCurrentChange"
          style="float:right; margin-right: 5%;"
      >
      </el-pagination>
    </form>
  </div>
</template>
<script>
import {ElPopconfirm} from "element-plus";
import 'element-plus/theme-chalk/el-popconfirm.css'
import {filterSearchMerchantStatement, getMerchantInfo} from "@/api/interface/backendInterface.js";
export default {
  name: 'MerchantStatement',
  components: {
    'el-popconfirm': ElPopconfirm
  },
  data() {
    return {
      activeTool: '1',
      filterbox: {
      },
      merchantAccountOptions: [],
      merchantAccountProps: {
        value: 'userId',
        label: 'accountName'
      },
      filterForm: {

      },
      merchantStatementsFormData:[

      ],
      currentPage: 1,
      pageSize: 10,
      pageSizes: [1,10,20,30,50],
      totalCount: 1,

    }
  },
  methods: {
    handleConfirm() {

    },
    handleCancel() {

    },
    handleCurrentChange(val) {

    },
    reset(form) {
      this.$refs[form].resetFields();
    },
    async search() {
      this.filterForm.orderNO = this.filterbox.orderNO;
      this.filterForm.selectedTransactionType = this.filterbox.transactionStatus;
      this.filterForm.transactionStatus = this.filterbox.transactionStatus;
      this.filterForm.merchantName = this.filterbox.merchantName;
      this.filterForm.createStartTime = this.filterbox.createStartTime;
      this.filterForm.createEndTime = this.filterbox.createEndTime;
      await filterSearchMerchantStatement(this.filterForm).then(response => {
        this.merchantStatementsFormData = [];
        let result = JSON.parse(response.data.data);
        this.merchantStatementsFormData = result;
        this.totalCount = this.merchantStatementsFormData.length;
        this.currentPage = 1;
        this.pageSize = 1;
      })
    }
  },
  mounted() {
    getMerchantInfo({pageSize: 1000}).then(response => {
      if (response.status === 200 && response.data.code === 0) {
         this.merchantAccountOptions = JSON.parse(response.data.data).merchantInfoDtoList;
         this.search()
      }
    })
  }

}
</script>
<style scoped>
@import "@/assets/base.css";
.main-toolform-line {
  margin-right: 3%;
}

.main-toolform-line input{
  width: 200px;
}
</style>