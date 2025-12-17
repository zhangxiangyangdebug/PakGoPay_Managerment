<script setup>

import SvgIcon from "@/components/SvgIcon/index.vue";
</script>

<template>
  <div class="main-title">提现记录</div>
  <div class="main-toolbar" style="height: 100px;">
    <form class="main-toolform" style="height: 100%;display:flex;margin-left:3%">
      <div class="main-toolform-item" style="height: 100%;">
        <div class="main-toolform-line">代理名称：<el-input v-model="filterbox.agentName" clearable  type="text" class="main-toolform-input" placeholder="代理名称">
          <template #append>
            <el-button style="font-size: 15px">
              <SvgIcon name="search"/>搜索
            </el-button>
          </template>
        </el-input>
        </div>
        </div>
    </form>
  </div>

  <div style="display: flex;height: 12vh;justify-content: space-between;margin-right: 10%;margin-left: 10%;">
    <el-card style="width: 30%;height: 100%;margin-top: 2%;">
      <div style="display: flex;">
        <SvgIcon name="cash" width="100px" height="100px"/>
        <div style="display: flex; flex-direction: column;width: 80%;">
          <span class="reportLabel">总账户金额:</span>
          <textarea v-model="agentTotalAmount" disabled class="cash-text-area"></textarea>
        </div>
      </div>
    </el-card>
    <el-card style="width: 30%;height: 100%;margin-top: 2%;">
      <div style="display: flex;">
        <SvgIcon name="cash-freeze" width="100px" height="100px"/>
        <div style="display: flex; flex-direction: column;width: 80%;">
          <span class="reportLabel">冻结总金额:</span>
          <textarea v-model="agentFreezeAmount" disabled class="cash-text-area"></textarea>
        </div>
      </div>
    </el-card>
    <el-card style="width: 30%;height: 100%;margin-top: 2%;">
      <div style="display: flex;">
        <SvgIcon name="tixian" width="90px" height="90px"/>
        <div style="display: flex; flex-direction: column;width: 80%;">
          <span class="reportLabel">可用余额:</span>
          <textarea v-model="agentAvailableBalance" disabled class="cash-text-area"></textarea>
        </div>
      </div>
    </el-card>
  </div>

  <div class="main-views-container" style="height:65%;margin-top: 4%;">
    <div style="display: flex;justify-content: right;margin-right:3%">
      <el-button v-on:click="exportStatements()" style="width:60px;display: flex; flex-direction: row;justify-content: center;cor: lightskyblue;cursor: pointer;align-items: center;margin:0">
        <SvgIcon name="export"/>导出
      </el-button>
      <el-button v-on:click="addWithdrawlAccount()" style="width:60px;display: flex; flex-direction: row;justify-content: center;cor: lightskyblue;cursor: pointer;align-items: center;margin:0">
        <SvgIcon name="add"/>新增
      </el-button>
      <el-button v-on:click="createWithdrawlApply" style="width:100px;display: flex; flex-direction: row;justify-content: center;cor: lightskyblue;cursor: pointer;align-items: center;margin:0;background-color: lightgreen">
        <SvgIcon name="withdrawl"/>提现申请
      </el-button>
    </div>
    <form class="main-views-form" style="height: 100%">
      <el-table
          border :data="withdrawHistoryTableData"
          class="merchantInfos-table"
          style="width: 97%;height: 100%;"
      >
        <el-table-column
          v-slot="{row}"
          label="代理名称"
          align="center"
        >
          <div>{{row.agentName}}</div>
        </el-table-column>
        <el-table-column
            v-slot="{row}"
            label="代理账号"
            align="center"
        >
          <div>{{row.agentAccount}}</div>
        </el-table-column>
        <el-table-column
            v-slot="{row}"
            label="代理提现账户"
            align="center"
        >
          <div>{{row.agentWithdrawlAccount}}</div>
        </el-table-column>
        <el-table-column
            v-slot="{row}"
            label="账号启用状态"
            align="center"
        >
          <div>
            <el-switch
              v-model="row.agentStatus"
              active-color="#13ce66"
              inactive-color="#ff4949"
              active-text="启用"
              inactive-text="停用"
              disabled
            />
          </div>
        </el-table-column>
        <el-table-column
            v-slot="{row}"
            label="录入时间"
            align="center"
        >
          <div>{{row.createTime}}</div>
        </el-table-column>
      </el-table>
      <el-pagination
          background
          layout="sizes, prev, pager, next, jumper, total"
          :total="totalCount"
          v-model:current-page="currentPage"
          v-model:page-size="pageSize"
          :page-sizes="pageSizes"
          style="float:right; margin-right: 5%; position: sticky;display: flex;"
      >
      </el-pagination>
    </form>
  </div>
</template>

<script>
export default {
  name: 'WithdrawlHistory',
  data() {
    return {
      filterbox: {
        agentName: '',
      },
      agentTotalAmount: '10',
      agentAvailableBalance: '0.1',
      agentFreezeAmount: '9.9',
      totalCount: 0,
      currentPage: 1,
      pageSize: 10,
      pageSizes: [5, 10, 15, 20],
    }
  }
}
</script>
<style scoped>
.cash-text-area {
  width: 90%;
  height: 100%;
  background-color: transparent;
  border: none;
  resize: none;
  font-size: xx-large;
}

.reportLabel {
  font-size: x-large;
  text-align: right;
}

/deep/.el-table th.is-leaf {

  background-color: lightskyblue;
  color: white;
  font-weight: bold;
  font-size: larger;
}

.main-toolform-input {
  width: 300px;
  display: flex;
  align-content: center;
}

/deep/ .el-input__inner {
  text-align: center;
}
</style>