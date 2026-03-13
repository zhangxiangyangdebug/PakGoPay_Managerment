<script setup>
import SvgIcon from "@/components/SvgIcon/index.vue";
import {getTimeFromTimestamp} from "@/api/common.js";
</script>

<template>
  <div class="main-title">{{ $t('agentStatement.title') }}</div>
  <el-collapse v-model="activeTool">
    <el-collapse-item name="1">
      <template #title>
        <span class="toolbarName">{{ $t('common.toolbar') }}</span>
      </template>
      <!-- 工具栏 -->
      <div class="main-toolbar">
        <el-form class="main-toolform agent-statement-toolbar-form" ref="filterboxForm" :model="filterbox">
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
          <div class="main-toolform-item">
              <el-row class="agent-statement-filter-row" :gutter="0">
                <el-col :span="5" class="agent-statement-filter-col">
                  <el-form-item :label="$t('agentStatement.filter.agentName')" label-width="90px" prop="merchantAgentId">
                    <el-select
                        :options="agentOptions"
                        :props="agentProps"
                        v-model="filterbox.merchantAgentId"
                        class="agent-statement-filter-input"
                        clearable
                        filterable
                    ></el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="5" class="agent-statement-filter-col">
                  <el-form-item :label="$t('agentStatement.filter.orderId')" label-width="90px" prop="id">
                    <el-input v-model="filterbox.id" class="agent-statement-filter-input" clearable/>
                  </el-form-item>
                </el-col>
                <el-col :span="5" class="agent-statement-filter-col">
                  <el-form-item :label="$t('agentStatement.filter.transactionType')" label-width="90px" prop="orderType">
                    <el-select
                        v-model="filterbox.orderType"
                        class="agent-statement-filter-input"
                        clearable
                    >
                      <el-option :label="$t('agentStatement.transactionType.recharge')" :value="1"></el-option>
                      <el-option :label="$t('agentStatement.transactionType.withdraw')" :value="2"></el-option>
                      <el-option :label="$t('agentStatement.transactionType.manualReconcile')" :value="3"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="9" class="agent-statement-filter-col agent-statement-time-col">
                  <el-form-item
                      :label="$t('agentStatement.filter.time')"
                      label-width="90px"
                      prop="filterDateRange"
                      class="agent-statement-time-item"
                  >
                    <DateTimeRangeSplit
                        v-model="filterbox.filterDateRange"
                        picker-type="date"
                        format="YYYY/MM/DD"
                        value-format="x"
                        :clearable="true"
                        picker-width="120px"
                    />
                  </el-form-item>
                </el-col>
              </el-row>
          </div>
        </el-form>
      </div>
    </el-collapse-item>
  </el-collapse>

  <div class="reportInfo">
    <form class="main-views-form">
      <el-table
        border :data="agentStatementsFormData"
        class="merchantInfos-table"
        style="width: 100%; height: auto"
      >
        <el-table-column
          :label="$t('agentStatement.column.orderId')"
          v-slot="{row}"
          align="center"
        >
          <div>
            {{row.id}}
          </div>
        </el-table-column>
        <el-table-column
          prop="agentName"
          :label="$t('agentStatement.column.agentName')"
          v-slot="{row}"
          align="center"
        >
          <div>
            {{row.name}}
          </div>
        </el-table-column>
        <el-table-column
          prop="transactionType"
          :label="$t('agentStatement.column.transactionType')"
          v-slot="{row}"
          align="center"
        >
          <div>
            {{transactionTypeLabel(row.orderType)}}
          </div>
        </el-table-column>
        <el-table-column
          prop="transactionCurrencyType"
          :label="$t('agentStatement.column.currency')"
          v-slot="{row}"
          align="center"
        >
          <div>
            {{row.currency}}
          </div>
        </el-table-column>
        <el-table-column
          prop="transactionCashAmount"
          :label="$t('agentStatement.column.amount')"
          v-slot="{row}"
          align="center"
        >
          <div>
            {{row.amount}}
          </div>
        </el-table-column>
        <el-table-column
            prop="beforeTransactionAccountBalance"
            :label="$t('agentStatement.column.balanceBefore')"
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
            :label="$t('agentStatement.column.balanceAfter')"
            v-slot="{row}"
            align="center"
        >
          <div>
            {{row.totalBalanceAfter}}
          </div>
        </el-table-column>
        <el-table-column
          prop="transactionTime"
          :label="$t('agentStatement.column.transactionTime')"
          v-slot="{row}"
          align="center"
        >
          <div>
            {{getTimeFromTimestamp(row.createTime)}}
          </div>
        </el-table-column>
        <el-table-column
          prop="requestIp"
          :label="$t('agentStatement.column.requestIp')"
          v-slot="{row}"
          align="center"
        >
          <div>
            {{row.requestIp}}
          </div>
        </el-table-column>
        <el-table-column
          :label="$t('agentStatement.column.remark')"
          v-slot="{row}"
          align="center"
        >
          <div>
            {{row.remark}}
          </div>
        </el-table-column>
        <el-table-column
          :label="$t('agentStatement.column.operator')"
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
import {getAgentInfo, getWithdrawStatementeOrder} from "@/api/interface/backendInterface.js";
import {getTodayStartTimestamp} from "@/api/common.js";

export default {
  name: "AgentStatement",
  data() {
    return {
      activeTool: '1',
      filterbox: {},
      agentOptions: [],
      agentProps: {
        value: "userId",
        label: "agentName"
      },
      filterForm: {},
      agentStatementsFormData: [],
      currentPage: 1,
      pageSize: 10,
      pageSizes: [10, 20, 30, 50],
      totalCount: 0
    };
  },
  methods: {
    transactionTypeLabel(type) {
      if (type === 1 || type === '1') {
        return this.$t('agentStatement.transactionType.recharge')
      }
      if (type === 2 || type === '2') {
        return this.$t('agentStatement.transactionType.withdraw')
      }
      if (type === 3 || type === '3') {
        return this.$t('agentStatement.transactionType.manualReconcile')
      }
      return '-'
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
    },
    search() {
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
      this.filterbox.userRole = 2
      getWithdrawStatementeOrder(this.filterbox).then(response => {
        this.agentStatementsFormData = [];
        let result = JSON.parse(response.data.data);
        this.agentStatementsFormData = result.accountStatementsDtoList;
        this.totalCount = result.totalNumber
        this.currentPage = result.pageNo;
        this.pageSize = result.pageSize;
      })
    },
    exportStatements() {}
  },
  mounted() {
    getAgentInfo({ pageSize: 1000 }).then(response => {
      if (response.status === 200 && response.data.code === 0) {
        this.agentOptions = JSON.parse(response.data.data).agentInfoDtoList || [];
        this.search()
      }
    })
  }
}
</script>

<style scoped>
@import "@/api/common.css";
@import "@/assets/base.css";

.agent-statement-toolbar-form{
  width: 100%;
}

.agent-statement-filter-row{
  width: 100%;
  margin: 0;
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-between;
}

.agent-statement-filter-col{
  display: flex;
  justify-content: center;
  flex: 0 0 auto !important;
  width: 230px;
}

.agent-statement-filter-col .el-form-item{
  width: 100%;
}

.agent-statement-time-col{
  justify-content: center;
  flex: 0 0 auto !important;
  width: 360px;
}

.agent-statement-time-item{
  width: 100% !important;
}

.agent-statement-filter-input{
  width: 200px !important;
}

.main-toolform-line {
  margin-right: 0;
}

.main-toolform-line input{
  width: 200px;
}

.main-toolbar{
  overflow-x: hidden;
}

.agent-statement-filter-col :deep(.el-form-item__label){
  white-space: nowrap;
}

.agent-statement-toolbar-form .main-toolform-item:last-child{
  display: flex;
  justify-content: center;
}
</style>
