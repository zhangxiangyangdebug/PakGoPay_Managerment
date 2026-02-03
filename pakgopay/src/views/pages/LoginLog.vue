<script setup>

import SvgIcon from "@/components/SvgIcon/index.vue";
</script>

<template>
  <div class="main-title">
    {{ $t('log.login.title') }}
  </div>

  <div class="main-views-container">
    <div class="toolbar" style="width: 96%">
      <el-row style="display: flex;justify-content: space-between;">
        <el-col :span="8" style="display: flex;justify-content: center;">
          <el-form-item style="width: 300px;">
            <template #label>
              <span>{{ $t('common.startTime') }}</span>
            </template>
            <el-input v-model="filterbox.startTime" type="date" :placeholder="$t('common.placeholder.startTime')"/>
          </el-form-item>
        </el-col>
        <el-col :span="8" style="display: flex;justify-content: center;">
          <el-form-item style="width: 300px;">
            <template #label>
              <span>{{ $t('common.endTime') }}</span>
            </template>
            <el-input v-model="filterbox.endTime" type="date" :placeholder="$t('common.placeholder.endTime')"/>
          </el-form-item>
        </el-col>
        <el-col :span="8" style="display: flex;justify-content: center;">
          <el-form-item style="display: flex;justify-content: center;color: deepskyblue">
            <template #label>
              <span>{{ $t('log.login.filter.userName') }}</span>
            </template>
            <el-input :placeholder="$t('common.placeholder.userName')">
              <template #append>
                <el-button @click="createUser">
                  <SvgIcon name="search"/>{{ $t('common.search') }}
                </el-button>
              </template>
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>

    </div>

    <div class="main-views-form">
      <el-table
          border :data="loginLogInfo"
          class="login-log-table"
          style="width: 97%;height: 100%;"
          :key="tablekey"
      >
        <el-table-column
            :label="$t('log.login.column.account')"
            v-slot="{row}"
            align="center"
        >
          <div>{{row.userAccount}}</div>
        </el-table-column>
        <el-table-column
            :label="$t('log.login.column.name')"
            v-slot="{row}"
            align="center"
        >
          <div>{{row.userName}}</div>
        </el-table-column>
        <el-table-column
            :label="$t('log.login.column.time')"
            v-slot="{row}"
            align="center"
        >
          <div>{{row.loginTime}}</div>
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
    </div>
  </div>
</template>

<script>
export default {
  name: 'OperationLog',
  data() {
    return {
      totalCount: 0,
      pageSize: 10,
      currentPage: 1,
      pageSizes: [5, 10, 15, 20],
      tablekey: '',
      loginLogInfo: [],
      timeout: null,
      operators: [],
      operationTypeOptions: [
        {
          operate: 'add',
        },
        {
          operate: 'edit',
        },
        {
          operate: 'delete',
        }
      ],
      filterbox: {
        operateType: '',
        operator: '',
        startTime: '',
        endTime: '',
        operatorName: '',
      }
    }
  },
  methods: {
    loadAllOperators() {
      return [
        {
          "value": "User A", 'id': '001'
        },
        {
          "value": 'User B', 'id': '002'
        },
        {
          'value': 'User C', 'id': '003'
        }
      ]
    },
    getOperators(queryString, cb) {
      const operators = this.operators
      const result = queryString ? operators.filter(this.createNameFilter(queryString)) : operators
      clearTimeout(this.timeout)
      this.timeout = setTimeout(() => {
        cb(result)
      }, 3000*Math.random())
    },
    createNameFilter(queryString) {
      return (operatorName) => {
        return (operatorName.value.toLowerCase().indexOf(queryString.toLowerCase())===0)
      }
    },
    handleSelect() {

    },
    handleSizeChange(val) {

    },
    handleCurrentChange(val) {

    }
  },
  mounted() {
    this.operators = this.loadAllOperators()
  }
}
</script>
<style scoped>

</style>
