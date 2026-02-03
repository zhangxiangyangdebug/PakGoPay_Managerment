<script setup>

import SvgIcon from "@/components/SvgIcon/index.vue";
import {getTimeFromTimestamp} from "@/api/common.js";
</script>

<template>
  <div class="main-title">{{ $t('merchantStatement.title') }}</div>
  <!-- 工具栏 -->
  <el-collapse v-model="activeTool">
    <el-collapse-item name="1">
      <template #title>
        <span class="toolbarName">
          {{ $t('common.toolbar') }}
        </span>
      </template>
      <div class="main-toolbar">
        <el-form class="main-toolform" ref="filterboxForm" :model="filterbox">
          <div class="main-toolform-item">
            <div class="main-toolform-line" style="justify-content: right;">
              <el-button @click="reset('filterboxForm')" class="filterButton">
                <SvgIcon class="filterButtonSvg" name="reset"/>
                <div>{{ $t('common.reset') }}</div>
              </el-button>
              <el-button @click="search()" class="filterButton">
                <SvgIcon class="filterButtonSvg" name="search"/>
                <div>{{ $t('common.query') }}</div>
              </el-button>
              <el-button @click="exportStatements()" class="filterButton">
                <SvgIcon class="filterButtonSvg" name="export"/>
                <div>{{ $t('common.export') }}</div>
              </el-button>
            </div>
          </div>
          <div class="main-toolform-item" style="margin-right: 3%;">
<!--            <el-form
                ref="filterboxForm" class="form" :model="filterbox"
                style="width: 100%"
            >-->
              <el-row>
                <el-col :span="6">
                  <el-form-item :label="$t('merchantStatement.filter.merchantName')" label-width="150px" prop="merchantAgentId">
                    <el-select
                        :options="merchantAccountOptions"
                        :props="merchantAccountProps"
                        v-model="filterbox.merchantAgentId"
                        style="width: 200px"
                        clearable
                        filterable
                    ></el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item :label="$t('merchantStatement.filter.orderId')" label-width="150px" prop="id">
                    <el-input v-model="filterbox.id" style="width: 200px" clearable/>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item :label="$t('merchantStatement.filter.transactionType')" label-width="150px" prop="orderType">
                    <el-select
                        v-model="filterbox.orderType"
                        style="width: 200px"
                        clearable
                    >
                      <el-option :label="$t('merchantStatement.transactionType.recharge')" :value="1"></el-option>
                      <el-option :label="$t('merchantStatement.transactionType.withdraw')" :value="2"></el-option>
                      <el-option :label="$t('merchantStatement.transactionType.manualReconcile')" :value="3"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item :label="$t('merchantStatement.filter.time')" label-width="150px" prop="filterDateRange">
                    <el-date-picker
                        v-model="filterbox.filterDateRange"
                        type="daterange"
                        :range-separator="$t('common.rangeSeparator')"
                        :start-placeholder="$t('common.startDate')"
                        :end-placeholder="$t('common.endDate')"
                        format="YYYY/MM/DD"
                        value-format="x"
                        clearable
                    >
                    </el-date-picker>
                  </el-form-item>
                </el-col>
              </el-row>
<!--            </el-form>-->
          </div>
        </el-form>
      </div>
    </el-collapse-item>
  </el-collapse>

  <div class="reportInfo">
    <form class="main-views-form" style="height: 62%">
      <el-table
          border :data="merchantStatementsFormData"
          class="merchantInfos-table"
          style="width: 100%;height: 100%"
      >
        <el-table-column
            :label="$t('merchantStatement.column.orderId')"
            v-slot="{row}"
            width="200px"
            align="center"
        >
          <div>
            {{row.id}}
          </div>
        </el-table-column>
        <el-table-column
            prop="商户名称"
            :label="$t('merchantStatement.column.merchantName')"
            v-slot="{row}"
            align="center"
        >
          <div>
            {{row.name}}
          </div>
        </el-table-column>
        <el-table-column
            prop="transactionType"
            :label="$t('merchantStatement.column.transactionType')"
            v-slot="{row}"
            align="center"
        >
          <div>
            {{transactionTypeLabel(row.orderType)}}
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
            :label="$t('merchantStatement.column.currency')"
            v-slot="{row}"
            align="center"
        >
          <div>
            {{row.currency}}
          </div>
        </el-table-column>
        <el-table-column
            prop="transactionCashAmount"
            :label="$t('merchantStatement.column.amount')"
            v-slot="{row}"
            align="center"
        >
          <div>
            {{row.amount}}
          </div>
        </el-table-column>
        <el-table-column
            prop="beforeTransactionAccountBalance"
            :label="$t('merchantStatement.column.balanceBefore')"
            v-slot="{row}"
            align="center"
            width="200px;"
        >
          <div style="width: 100%;">
            {{row.totalBalanceBefore}}
          </div>
        </el-table-column>
        <el-table-column
            prop="afterTransactionAccountBalance"
            :label="$t('merchantStatement.column.balanceAfter')"
            v-slot="{row}"
            align="center"
        >
          <div>
            {{row.totalBalanceAfter}}
          </div>
        </el-table-column>
        <el-table-column
            prop="transactionTime"
            :label="$t('merchantStatement.column.transactionTime')"
            v-slot="{row}"
            align="center"
        >
          <div>
            {{getTimeFromTimestamp(row.createTime)}}
          </div>
        </el-table-column>
        <el-table-column
            :label="$t('merchantStatement.column.remark')"
            v-slot="{row}"
            align="center"
        >
          <div>
            {{row.remark}}
          </div>
        </el-table-column>
        <el-table-column
            :label="$t('merchantStatement.column.operator')"
            v-slot="{row}"
            align="center"
        >
          <div>
            {{row.createBy}}
          </div>
        </el-table-column>
      </el-table>
      <el-pagination class="pageTool"
          background
          layout="sizes, prev, pager, next, jumper, total"
          :total="totalCount"
          v-model:current-page="currentPage"
          v-model:page-size="pageSize"
          :page-sizes="pageSizes"
          @current-change="handleCurrentChange"
          @size-change="handleSizeChange"
      >
      </el-pagination>
    </form>
  </div>
</template>
<script>
import {ElPopconfirm} from "element-plus";
import 'element-plus/theme-chalk/el-popconfirm.css'
import {
  filterSearchMerchantStatement,
  getMerchantInfo,
  getWithdrawStatementeOrder
} from "@/api/interface/backendInterface.js";
import {getTodayStartTimestamp} from "@/api/common.js";
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
      pageSizes: [10,20,50, 100, 200],
      totalCount: 1,

    }
  },
  methods: {
    transactionTypeLabel(type) {
      if (type === 1 || type === '1') {
        return this.$t('merchantStatement.transactionType.recharge')
      }
      if (type === 2 || type === '2') {
        return this.$t('merchantStatement.transactionType.withdraw')
      }
      if (type === 3 || type === '3') {
        return this.$t('merchantStatement.transactionType.manualReconcile')
      }
      return '-'
    },
    handleConfirm() {

    },
    handleCancel() {

    },
    handleCurrentChange(val) {
        this.filterbox.pageNo = val;
        this.currentPage = val;
        this.filterbox.pageSize = this.pageSize;
        this.search()
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.filterbox.pageSize = this.pageSize;
      this.filterbox.pageNo = 1
      this.currentPage = 1
      this.search()
    },
    reset(form) {
      this.$refs[form].resetFields();
      this.filterbox.startTime = null
      this.filterbox.endTime = null
    },
    async search() {
      /*this.filterForm.orderNO = this.filterbox.orderNO;
      this.filterForm.selectedTransactionType = this.filterbox.transactionStatus;
      this.filterForm.transactionStatus = this.filterbox.transactionStatus;
      this.filterForm.merchantName = this.filterbox.merchantName;
      this.filterForm.createStartTime = this.filterbox.createStartTime;
      this.filterForm.createEndTime = this.filterbox.createEndTime;*/
      let timeRange = null
      if (this.filterbox.filterDateRange) {
        timeRange = new String(this.filterbox.filterDateRange)
        this.filterbox.startTime = timeRange.split(',')[0] / 1000
        this.filterbox.endTime = timeRange.split(',')[1] / 1000 + 86399
      } else {
        this.filterbox.filterDateRange = [getTodayStartTimestamp()*1000,getTodayStartTimestamp()*1000],
        this.filterbox.startTime = getTodayStartTimestamp()
        this.filterbox.endTime = getTodayStartTimestamp() + 86399
      }
      await getWithdrawStatementeOrder(this.filterbox).then(response => {
        this.merchantStatementsFormData = [];
        let result = JSON.parse(response.data.data);
        this.merchantStatementsFormData = result.accountStatementsDtoList;
        this.totalCount = result.totalNumber
        this.currentPage = result.pageNo;
        this.pageSize = result.pageSize;
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
