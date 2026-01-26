<script setup>
import SvgIcon from "@/components/SvgIcon/index.vue";
</script>

<template>
  <div class="main-title">代理流水</div>
  <el-collapse v-model="activeTool">
    <el-collapse-item name="1">
      <template #title>
        <span class="toolbarName">工具栏</span>
      </template>
      <!-- 工具栏 -->
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
                ref="filterboxForm"
                class="form"
                :model="filterbox"
                style="width: 100%"
            >
              <el-row>
                <el-col :span="6">
                  <el-form-item label="代理名称:" label-width="150px">
                    <el-select
                        :options="agentOptions"
                        :props="agentProps"
                        v-model="filterbox.agentUserId"
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
        border :data="agentStatementsFormData"
        class="merchantInfos-table"
        style="width: 100%; height: auto"
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
          prop="agentName"
          label="代理名称"
          v-slot="{row}"
          align="center"
        >
          <div>
            {{row.agentName}}
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
import { getAgentInfo } from "@/api/interface/backendInterface.js";

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
    handleCurrentChange() {},
    reset(form) {
      this.$refs[form].resetFields();
    },
    search() {},
    exportStatements() {}
  },
  mounted() {
    getAgentInfo({ pageSize: 1000 }).then(response => {
      if (response.status === 200 && response.data.code === 0) {
        this.agentOptions = JSON.parse(response.data.data).agentDtoList || [];
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
