<script setup>

import SvgIcon from "@/components/SvgIcon/index.vue";
</script>

<template>
  <div class="main-title">
    {{ $t('log.login.title') }}
  </div>

  <div class="main-views-container">
    <el-collapse class="main-toolbar-collapse" v-model="activeToolbars" style="width: 97%;">
      <el-collapse-item name="toolbar">
        <template #title>
          <span class="toolbarName">
            {{ $t('common.toolbar') }}
          </span>
        </template>
        <div class="main-toolbar" style="height: auto; width: 97%; margin-left: 0;">
          <el-form class="main-toolform" ref="filterboxForm" :model="filterbox">
            <el-row style="display: flex;justify-content: space-between;">
              <el-col :span="12" style="display: flex;justify-content: center;">
                <el-form-item style="width: 300px;" prop="filterDateRange">
                  <template #label>
                    <span>{{ $t('common.timeRange') }}</span>
                  </template>
                  <DateTimeRangeSplit
                      v-model="filterbox.filterDateRange"
                      picker-type="date"
                      format="YYYY/MM/DD"
                      value-format="x"
                      :clearable="true"
                      picker-width="140px"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="12" style="display: flex;justify-content: center;">
                <el-form-item style="display: flex;justify-content: center;color: deepskyblue" prop="loginName">
                  <template #label>
                    <span>{{ $t('log.login.filter.userName') }}</span>
                  </template>
                  <el-input v-model="filterbox.loginName" :placeholder="$t('common.placeholder.userName')" clearable/>
                </el-form-item>
              </el-col>
            </el-row>
            <div class="toolbar-action-row">
              <el-button class="filterButton" @click="reset('filterboxForm')">
                <SvgIcon class="filterButtonSvg" name="reset"/>
                <div>{{ $t('common.reset') }}</div>
              </el-button>
              <el-button class="filterButton" @click="searchData">
                <SvgIcon class="filterButtonSvg" name="search"/>
                <div>{{ $t('common.search') }}</div>
              </el-button>
            </div>
          </el-form>
        </div>
      </el-collapse-item>
    </el-collapse>

    <div class="main-views-form">
      <el-table
          border :data="loginLogInfo"
          class="login-log-table"
          style="width: 97%;"
          height="auto"
          :key="tablekey"
      >
        <el-table-column
            :label="$t('log.login.column.account')"
            v-slot="{row}"
            align="center"
        >
          <div>{{ row.loginName || '-' }}</div>
        </el-table-column>
        <el-table-column
            :label="$t('log.login.column.role')"
            v-slot="{row}"
            align="center"
        >
          <div>{{ row.loginRole || '-' }}</div>
        </el-table-column>
        <el-table-column
            :label="$t('log.login.column.ip')"
            v-slot="{row}"
            align="center"
        >
          <div>{{ row.loginIp || '-' }}</div>
        </el-table-column>
        <el-table-column
            :label="$t('log.login.column.eventType')"
            v-slot="{row}"
            align="center"
        >
          <div>{{ getEventTypeLabel(row.eventType) }}</div>
        </el-table-column>
        <el-table-column
            :label="$t('log.login.column.time')"
            v-slot="{row}"
            align="center"
        >
          <div>{{ getTimeFromTimestamp(row.eventTime) }}</div>
        </el-table-column>
        <el-table-column
            :label="$t('log.login.column.reason')"
            v-slot="{row}"
            align="center"
        >
          <div>{{ getLogoutReasonLabel(row.logoutReason) }}</div>
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
import {getTimeFromTimestamp, loadingBody} from "@/api/common.js";
import {loginLogList, refreshAccessToken} from "@/api/interface/backendInterface.js";

export default {
  name: 'LoginLog',
  data() {
    return {
      totalCount: 0,
      pageSize: 10,
      currentPage: 1,
      pageSizes: [10, 20, 50, 100, 200],
      activeToolbars: ['toolbar'],
      tablekey: 0,
      loginLogInfo: [],
      filterbox: {
        filterDateRange: null,
        loginName: '',
        pageNo: 1,
        pageSize: 10,
      }
    }
  },
  methods: {
    getTimeFromTimestamp,
    getEventTypeLabel(eventType) {
      if (eventType === 1) {
        return this.$t('log.login.eventType.login');
      }
      if (eventType === 2) {
        return this.$t('log.login.eventType.logout');
      }
      return this.$t('log.login.eventType.unknown');
    },
    getLogoutReasonLabel(reason) {
      if (!reason) {
        return '-';
      }
      const normalized = String(reason).toLowerCase();
      if (normalized.includes('manual')) {
        return this.$t('log.login.reason.manual');
      }
      if (normalized.includes('expired')) {
        return this.$t('log.login.reason.expired');
      }
      if (normalized.includes('kicked')) {
        return this.$t('log.login.reason.kicked');
      }
      return reason || this.$t('log.login.reason.unknown');
    },
    resolveDateRangeToSeconds(range) {
      if (!range) {
        return { startTime: null, endTime: null };
      }
      let startMs;
      let endMs;
      if (Array.isArray(range) && range.length === 2) {
        [startMs, endMs] = range;
      } else {
        const arr = String(range).split(',');
        if (arr.length !== 2) {
          return { startTime: null, endTime: null };
        }
        [startMs, endMs] = arr;
      }
      const start = Math.floor(Number(startMs) / 1000);
      const end = Math.floor(Number(endMs) / 1000) + 86399;
      if (!Number.isFinite(start) || !Number.isFinite(end)) {
        return { startTime: null, endTime: null };
      }
      return { startTime: start, endTime: end };
    },
    buildQuery() {
      const { startTime, endTime } = this.resolveDateRangeToSeconds(this.filterbox.filterDateRange);
      return {
        loginName: this.filterbox.loginName || null,
        startTime,
        endTime,
        pageNo: this.currentPage,
        pageSize: this.pageSize,
      };
    },
    parsePayload(payload) {
      if (!payload) {
        return null;
      }
      return typeof payload === 'string' ? JSON.parse(payload) : payload;
    },
    async loadData() {
      const loadingInstance = loadingBody(this, 'login-log-table');
      try {
        const response = await loginLogList(this.buildQuery());
        if (response.status === 401) {
          await refreshAccessToken(localStorage.getItem("refreshToken"));
          return;
        }
        if (response.status !== 200) {
          this.$notify({
            title: this.$t('common.error'),
            message: this.$t('common.requestFailed'),
            type: 'error',
            position: 'top-right',
          });
          return;
        }
        if (response.data.code !== 0) {
          this.$notify({
            title: this.$t('common.error'),
            message: response.data.message || this.$t('common.requestFailed'),
            type: 'error',
            position: 'top-right',
          });
          return;
        }
        const payload = this.parsePayload(response.data.data);
        this.loginLogInfo = payload?.loginLogs || [];
        this.totalCount = payload?.totalNumber || 0;
        this.currentPage = payload?.pageNo || this.currentPage;
        this.pageSize = payload?.pageSize || this.pageSize;
      } catch (e) {
        this.$notify({
          title: this.$t('common.error'),
          message: this.$t('common.requestFailed'),
          type: 'error',
          position: 'top-right',
        });
      } finally {
        loadingInstance.close();
      }
    },
    async searchData() {
      this.currentPage = 1;
      await this.loadData();
    },
    async reset(form) {
      if (this.$refs[form] && this.$refs[form].resetFields) {
        this.$refs[form].resetFields();
      }
      this.filterbox.filterDateRange = null;
      this.filterbox.loginName = '';
      this.currentPage = 1;
      this.pageSize = 10;
      await this.loadData();
    },
    async handleSizeChange(val) {
      this.pageSize = val;
      this.currentPage = 1;
      await this.loadData();
    },
    async handleCurrentChange(val) {
      this.currentPage = val;
      await this.loadData();
    }
  },
  async mounted() {
    await this.loadData();
  }
}
</script>
<style scoped>
.main-toolbar-collapse {
  margin-bottom: 12px;
}

.main-views-form {
  margin-top: 0;
}

:deep(.pageTool) {
  margin-right: 90px !important;
}
</style>
