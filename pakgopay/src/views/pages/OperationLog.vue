<script setup>

import SvgIcon from "@/components/SvgIcon/index.vue";
</script>

<template>
  <div class="main-title">
    {{ $t('log.operation.title') }}
  </div>

  <div class="main-views-container">
    <div class="toolbar" style="width: 96%">
      <el-form>
        <el-row>
          <el-col :span="24" style="display: flex;justify-content: right;justify-items: center;">
            <el-form-item style="display: flex;justify-items: center;height: 100%;margin-right: 4%">
              <el-button><SvgIcon name="search"/>{{ $t('common.query') }}</el-button>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row style="display: flex;justify-content: space-between;">
          <el-col :span="6">
            <el-form-item style="width: 300px;">
              <template #label>
                <span>{{ $t('log.operation.operator') }}</span>
              </template>
              <el-autocomplete
                  v-model="filterbox.operatorName"
                  :placeholder="$t('common.placeholder.userName')"
                  :fetch-suggestions="getOperators"
                  @select="handleSelect"
              />
            </el-form-item>
          </el-col>
          <el-col :span="6" style="display: flex;justify-content: center;">
            <el-form-item style="width: 300px;">
              <template #label>
                <span>{{ $t('log.operation.typeSelect') }}</span>
              </template>
              <el-select
                  v-model="filterbox.operateType"
              >
                <el-option
                    v-for="item in operationTypeOptions"
                    :key="item.operate"
                    :value="item.operate"
                    :label="$t(`common.operate.${item.operate}`)"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6" style="display: flex;justify-content: center;">
            <el-form-item style="width: 300px;">
              <template #label>
                <span>{{ $t('common.startTime') }}</span>
              </template>
              <el-input v-model="filterbox.startTime" type="date" :placeholder="$t('common.placeholder.startTime')"/>
            </el-form-item>
          </el-col>
          <el-col :span="6" style="display: flex;justify-content: center;">
            <el-form-item style="width: 300px;">
              <template #label>
                <span>{{ $t('common.endTime') }}</span>
              </template>
              <el-input v-model="filterbox.endTime" type="date" :placeholder="$t('common.placeholder.endTime')"/>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>

    </div>

    <div class="main-views-form">
      <el-table
          border :data="operationLogInfo"
          class="operation-log-table"
          style="width: 97%;height: 100%;"
          :key="tablekey"
      >
        <el-table-column
            :label="$t('log.operation.column.operator')"
            v-slot="{row}"
            align="center"
        >
          <div>{{row.operator}}</div>
        </el-table-column>
        <el-table-column
            :label="$t('log.operation.column.type')"
            v-slot="{row}"
            align="center"
        >
          <div>{{row.operateType}}</div>
        </el-table-column>
        <el-table-column
            :label="$t('log.operation.column.content')"
            v-slot="{row}"
            align="center"
        >
          <div>{{row.operateInfo}}</div>
        </el-table-column>
        <el-table-column
            :label="$t('log.operation.column.time')"
            v-slot="{row}"
            align="center"
        >
          <div>{{row.operateTime}}</div>
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
      operationLogInfo: [],
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
