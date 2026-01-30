<template>
  <div class="welcome-page">
    <div class="welcome-hero">
      <div class="hero-text">
        <p class="hero-eyebrow">运营总览</p>
        <p class="hero-subtitle">多维度追踪代收与代付核心指标，快速判断健康度与收益。</p>
      </div>
      <div class="hero-controls">
        <div class="dimension-toggle">
          <button
            class="dimension-btn"
            :class="{ active: dimension === 'year' }"
            type="button"
            @click="setDimension('year')"
          >
            年
          </button>
          <button
            class="dimension-btn"
            :class="{ active: dimension === 'month' }"
            type="button"
            @click="setDimension('month')"
          >
            月
          </button>
          <button
            class="dimension-btn"
            :class="{ active: dimension === 'day' }"
            type="button"
            @click="setDimension('day')"
          >
            日
          </button>
        </div>
        <el-date-picker
          v-model="selectedDate"
          :type="datePickerType"
          :format="dateFormat"
          :value-format="dateFormat"
          class="dimension-picker"
          placeholder="选择日期"
          @change="handleDateChange"
        />
      </div>
    </div>

    <div class="currency-tabs" v-if="currencyOptions.length">
      <span class="currency-tabs-label">统计币种:</span>
      <el-tabs
        v-model="currency"
        type="card"
        class="currency-tabs-control"
        @tab-click="handleCurrencyChange"
      >
        <el-tab-pane
          v-for="item in currencyOptions"
          :key="item.currencyType"
          :label="item.name || item.currencyType"
          :name="item.currencyType"
        />
      </el-tabs>
    </div>

    <div class="welcome-grid">
      <section class="stats-card card-collect">
        <header class="card-header">
          <div>
            <h2>代收</h2>
            <p>{{ dateLabel }}</p>
          </div>
          <span class="card-tag">Collection</span>
        </header>
        <div class="stats-grid">
          <div class="stat-item">
            <span>代收订单总数</span>
            <strong>{{ collectionStatsView.totalOrders }}</strong>
            <span
              class="stat-change"
              :class="collectionCompare.totalOrders.direction"
            >
              {{ collectionCompare.totalOrders.text }}
            </span>
          </div>
          <div class="stat-item">
            <span>代收订单成功数量</span>
            <strong>{{ collectionStatsView.successOrders }}</strong>
            <span
              class="stat-change"
              :class="collectionCompare.successOrders.direction"
            >
              {{ collectionCompare.successOrders.text }}
            </span>
          </div>
          <div class="stat-item">
            <span>代收订单失败数</span>
            <strong>{{ collectionStatsView.failedOrders }}</strong>
            <span
              class="stat-change"
              :class="collectionCompare.failedOrders.direction"
            >
              {{ collectionCompare.failedOrders.text }}
            </span>
          </div>
          <div class="stat-item">
            <span>代收订单成功率</span>
            <strong>{{ collectionStatsView.successRate }}</strong>
            <span
              class="stat-change"
              :class="collectionCompare.successRate.direction"
            >
              {{ collectionCompare.successRate.text }}
            </span>
          </div>
          <div class="stat-item">
            <span>代收订单代理佣金</span>
            <strong>{{ collectionStatsView.agentCommission }}</strong>
            <span
              class="stat-change"
              :class="collectionCompare.agentCommission.direction"
            >
              {{ collectionCompare.agentCommission.text }}
            </span>
          </div>
        </div>
      </section>

      <section class="stats-card card-paying">
        <header class="card-header">
          <div>
            <h2>代付</h2>
            <p>{{ dateLabel }}</p>
          </div>
          <span class="card-tag">Payout</span>
        </header>
        <div class="stats-grid">
          <div class="stat-item">
            <span>代付订单总数</span>
            <strong>{{ payingStatsView.totalOrders }}</strong>
            <span
              class="stat-change"
              :class="payingCompare.totalOrders.direction"
            >
              {{ payingCompare.totalOrders.text }}
            </span>
          </div>
          <div class="stat-item">
            <span>代付订单成功数量</span>
            <strong>{{ payingStatsView.successOrders }}</strong>
            <span
              class="stat-change"
              :class="payingCompare.successOrders.direction"
            >
              {{ payingCompare.successOrders.text }}
            </span>
          </div>
          <div class="stat-item">
            <span>代付订单失败数</span>
            <strong>{{ payingStatsView.failedOrders }}</strong>
            <span
              class="stat-change"
              :class="payingCompare.failedOrders.direction"
            >
              {{ payingCompare.failedOrders.text }}
            </span>
          </div>
          <div class="stat-item">
            <span>代付订单成功率</span>
            <strong>{{ payingStatsView.successRate }}</strong>
            <span
              class="stat-change"
              :class="payingCompare.successRate.direction"
            >
              {{ payingCompare.successRate.text }}
            </span>
          </div>
          <div class="stat-item">
            <span>代付订单代理佣金</span>
            <strong>{{ payingStatsView.agentCommission }}</strong>
            <span
              class="stat-change"
              :class="payingCompare.agentCommission.direction"
            >
              {{ payingCompare.agentCommission.text }}
            </span>
          </div>
        </div>
      </section>

      <section class="stats-card chart-card">
        <header class="card-header">
          <div>
            <h2>趋势</h2>
            <p>最近5{{ dimensionLabel }}订单总数与佣金变化</p>
          </div>
          <div class="chart-tabs">
            <button
              class="chart-tab"
              :class="{ active: trendMetric === 'orders' }"
              type="button"
              @click="trendMetric = 'orders'"
            >
              订单总数
            </button>
            <button
              class="chart-tab"
              :class="{ active: trendMetric === 'commission' }"
              type="button"
              @click="trendMetric = 'commission'"
            >
              代理佣金
            </button>
          </div>
        </header>
    <div class="chart-legend">
      <span class="legend-item legend-collect">代收</span>
      <span class="legend-item legend-paying">代付</span>
    </div>
        <div class="chart-wrapper" ref="chartWrapper">
          <svg
            class="trend-chart"
            viewBox="0 0 640 240"
            preserveAspectRatio="xMidYMid meet"
            @mouseleave="hideTooltip"
          >
            <line x1="36" y1="36" x2="36" y2="204" class="axis-line" />
            <line x1="36" y1="204" x2="604" y2="204" class="axis-line" />
            <text x="36" y="24" class="axis-unit">{{ yAxisUnit }}</text>
            <g v-for="(label, index) in trendYAxisLabels" :key="`y-${label}`">
              <text x="30" :y="trendYAxisPositions[index]" class="axis-label axis-label-y">{{ label }}</text>
              <line x1="36" :y1="trendYAxisPositions[index]" x2="604" :y2="trendYAxisPositions[index]" class="axis-grid" />
            </g>
            <g v-for="(value, index) in collectionTrendValues" :key="`c-${index}`">
              <circle
                class="trend-hit"
                :cx="trendLabelPositions[index]"
                :cy="collectionPointPositions[index]"
                r="10"
                @mousemove="showTooltip('代收', trendLabels[index], value, $event)"
                @mouseenter="showTooltip('代收', trendLabels[index], value, $event)"
              />
              <circle
                class="trend-point point-collect"
                :cx="trendLabelPositions[index]"
                :cy="collectionPointPositions[index]"
                r="4"
              />
            </g>
            <g v-for="(value, index) in payingTrendValues" :key="`p-${index}`">
              <circle
                class="trend-hit"
                :cx="trendLabelPositions[index]"
                :cy="payingPointPositions[index]"
                r="10"
                @mousemove="showTooltip('代付', trendLabels[index], value, $event)"
                @mouseenter="showTooltip('代付', trendLabels[index], value, $event)"
              />
              <circle
                class="trend-point point-paying"
                :cx="trendLabelPositions[index]"
                :cy="payingPointPositions[index]"
                r="4"
              />
            </g>
            <polyline class="trend-line line-collect" :points="collectionPoints" />
            <polyline class="trend-line line-paying" :points="payingPoints" />
            <g v-for="(label, index) in trendLabels" :key="label">
              <text :x="trendLabelPositions[index]" y="226" class="axis-label axis-label-x">{{ label }}</text>
            </g>
          </svg>
          <div
            v-if="tooltip.visible"
            class="trend-tooltip"
            :style="{ left: tooltip.x + 'px', top: tooltip.y + 'px' }"
          >
            {{ tooltip.text }}
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import { getAllCurrencyType, getOpsDailyReport, getOpsMonthlyReport, getOpsYearlyReport } from "@/api/interface/backendInterface.js";

export default {
  name: "PakGoPay",
  components: {
  },
  data() {
    const now = new Date();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    const todayLabel = `${now.getFullYear()}-${month}-${day}`;
    return {
      dimension: "day",
      selectedDate: todayLabel,
      trendMetric: "orders",
      isLoading: false,
      currency: "",
      currencyOptions: [],
      currencyIcons: {},
      currencyIcon: "",
      tooltip: {
        visible: false,
        x: 0,
        y: 0,
        text: ""
      },
      opsReport: {
        collection: {},
        paying: {}
      }
    };
  },
  computed: {
    dateLabel() {
      return `日期（${this.getDimensionLabel()}）：${this.getFormattedDate()}`;
    },
    dimensionLabel() {
      return this.getDimensionLabel();
    },
    datePickerType() {
      if (this.dimension === "year") {
        return "year";
      }
      if (this.dimension === "month") {
        return "month";
      }
      return "date";
    },
    dateFormat() {
      if (this.dimension === "year") {
        return "YYYY";
      }
      if (this.dimension === "month") {
        return "YYYY-MM";
      }
      return "YYYY-MM-DD";
    },
    collectionStatsView() {
      return this.buildStats("collection", this.selectedDate);
    },
    payingStatsView() {
      return this.buildStats("paying", this.selectedDate);
    },
    collectionStatsPrev() {
      return this.buildStats("collection", this.getPreviousDateKey());
    },
    payingStatsPrev() {
      return this.buildStats("paying", this.getPreviousDateKey());
    },
    collectionCompare() {
      return this.compareStats(this.collectionStatsView, this.collectionStatsPrev);
    },
    payingCompare() {
      return this.compareStats(this.payingStatsView, this.payingStatsPrev);
    },
    trendKeys() {
      const keys = [];
      for (let i = 4; i >= 0; i -= 1) {
        keys.push(this.getPreviousDateKey(i));
      }
      return keys;
    },
    trendLabels() {
      return this.trendKeys.map((key) => this.formatTrendLabel(key));
    },
    collectionTrendValues() {
      return this.trendKeys.map((key) => {
        const stats = this.buildStats("collection", key);
        return this.trendMetric === "commission" ? stats.agentCommissionValue : stats.totalOrdersValue;
      });
    },
    payingTrendValues() {
      return this.trendKeys.map((key) => {
        const stats = this.buildStats("paying", key);
        return this.trendMetric === "commission" ? stats.agentCommissionValue : stats.totalOrdersValue;
      });
    },
    trendMax() {
      return Math.max(...this.collectionTrendValues, ...this.payingTrendValues, 1);
    },
    trendMin() {
      return Math.min(...this.collectionTrendValues, ...this.payingTrendValues, 0);
    },
    collectionPoints() {
      return this.mapValuesToPoints(this.collectionTrendValues);
    },
    payingPoints() {
      return this.mapValuesToPoints(this.payingTrendValues);
    },
    collectionPointPositions() {
      return this.mapValuesToPositions(this.collectionTrendValues);
    },
    payingPointPositions() {
      return this.mapValuesToPositions(this.payingTrendValues);
    },
    trendLabelPositions() {
      const width = 640;
      const padding = 36;
      const step = (width - padding * 2) / (this.trendKeys.length - 1 || 1);
      return this.trendKeys.map((_, index) =>
        Math.round(padding + step * index)
      );
    },
    trendYAxisLabels() {
      const max = this.trendMax;
      const min = this.trendMin;
      const steps = 4;
      const stepValue = (max - min) / steps || 1;
      const labels = [];
      for (let i = 0; i <= steps; i += 1) {
        const value = max - stepValue * i;
        labels.push(this.formatTrendValue(value));
      }
      return labels;
    },
    trendYAxisPositions() {
      const height = 240;
      const padding = 36;
      const steps = 4;
      const step = (height - padding * 2) / steps;
      return Array.from({ length: steps + 1 }, (_, index) => padding + step * index);
    },
    yAxisUnit() {
      return this.trendMetric === "commission"
        ? `单位：${this.currencyIcon || ""}`
        : "单位：笔";
    }
  },
  async mounted() {
    await this.initCurrency();
    this.fetchOpsReport();

  },
  methods: {
    setDimension(value) {
      this.dimension = value;
      this.selectedDate = this.getDefaultDateForDimension();
      this.fetchOpsReport();
    },
    handleDateChange() {
      this.fetchOpsReport();
    },
    handleCurrencyChange(tab) {
      const nextCurrency = tab?.paneName || this.currency;
      if (nextCurrency && nextCurrency !== this.currency) {
        this.currency = nextCurrency;
      }
      this.currencyIcon = this.currencyIcons[this.currency] || "";
      this.fetchOpsReport();
    },
    fetchOpsReport() {
      const payload = this.buildOpsRequest();
      if (!payload.currency) {
        this.$notify({
          title: 'Failed',
          type: 'error',
          duration: 3000,
          message: '获取币种失败，无法请求运营数据'
        });
        return;
      }
      this.isLoading = true;
      const req = this.dimension === "year"
        ? getOpsYearlyReport(payload)
        : this.dimension === "month"
          ? getOpsMonthlyReport(payload)
          : getOpsDailyReport(payload);
      req.then((res) => {
        if (res.status === 200 && res.data.code === 0) {
          const data = this.parseOpsPayload(res.data.data);
          const collectionList = data.collectionList || data.collection || data.collecting || data.ds || [];
          const payoutList = data.payoutList || data.paying || data.df || [];
          this.applyOpsData(collectionList, payoutList);
        } else if (res?.data?.code !== 0) {
          this.$notify({
            title: 'Failed',
            type: 'error',
            duration: 3000,
            message: res.data.message || '获取运营数据失败'
          })
        }
      }).finally(() => {
        this.isLoading = false;
      });
    },
    async initCurrency() {
      if (this.currency) {
        return;
      }
      try {
        const res = await getAllCurrencyType();
        if (res.status === 200 && res.data.code === 0) {
          const data = this.parseOpsPayload(res.data.data);
          const list = data.currencyTypeDTOList || [];
          this.currencyOptions = list;
          if (list.length > 0) {
            this.currency = list[0].currencyType || "";
            this.currencyIcons = {};
            list.forEach((item) => {
              if (item?.currencyType) {
                this.currencyIcons[item.currencyType] = item.icon || "";
              }
            });
            this.currencyIcon = this.currencyIcons[this.currency] || "";
          }
        }
      } catch (error) {
        this.currency = "";
      }
    },
    buildOpsRequest() {
      const { scopeType, scopeId } = this.getScopeInfo();
      return {
        recordDate: this.selectedDate,
        currency: this.currency,
        scopeType,
        scopeId
      };
    },
    getScopeInfo() {
      const roleName = localStorage.getItem("roleName");
      const userId = localStorage.getItem("userId");
      if (roleName === "merchant") {
        return { scopeType: 1, scopeId: userId || "0" };
      }
      if (roleName === "agent") {
        return { scopeType: 2, scopeId: userId || "0" };
      }
      return { scopeType: 0, scopeId: "0" };
    },
    applyOpsData(collectionList, payoutList) {
      console.log(JSON.stringify(collectionList));
      this.opsReport = {
        collection: this.buildReportMap(collectionList),
        paying: this.buildReportMap(payoutList)
      };
    },
    parseOpsPayload(payload) {
      if (!payload) {
        return {};
      }
      if (typeof payload === "string") {
        try {
          return JSON.parse(payload);
        } catch (error) {
          return {};
        }
      }
      return payload;
    },
    buildReportMap(list) {
      const map = {};
      if (!Array.isArray(list)) {
        return map;
      }
      list.forEach((item) => {
        const key = this.getReportKeyFromItem(item);
        if (!key) {
          return;
        }
        const totalOrders = Number(item?.orderQuantity ?? 0);
        const successOrders = Number(item?.successQuantity ?? 0);
        const failedOrders = Number(item?.failQuantity ?? 0);
        const commission = Number(item?.agentCommission ?? 0);
        if (!map[key]) {
          map[key] = {
            totalOrders: 0,
            successOrders: 0,
            failedOrders: 0,
            agentCommission: 0,
            successRate: undefined
          };
        }
        map[key].totalOrders += totalOrders;
        map[key].successOrders += successOrders;
        map[key].failedOrders += failedOrders;
        map[key].agentCommission += commission;
        if (map[key].successRate === undefined && item?.successRate !== undefined && item?.successRate !== null) {
          map[key].successRate = item.successRate;
        }
      });
      return map;
    },
    getReportKeyFromItem(item) {
      if (!item) {
        return "";
      }
      if (this.dimension === "month" && item.reportMonth) {
        return String(item.reportMonth).slice(0, 7);
      }
      if (this.dimension === "year" && item.reportYear) {
        return String(item.reportYear).slice(0, 4);
      }
      return this.getReportKey(item.reportDate);
    },
    getReportKey(reportDate) {
      if (!reportDate) {
        return "";
      }
      let dateString = "";
      if (typeof reportDate === "number" || (/^\d+$/.test(String(reportDate)))) {
        let ms = Number(reportDate);
        if (!Number.isNaN(ms) && ms > 0) {
          if (String(reportDate).length === 10) {
            ms *= 1000;
          }
          const useUtc = this.dimension !== "day";
          dateString = this.formatDateFromMs(ms, useUtc);
        }
      } else {
        dateString = String(reportDate).split("T")[0];
      }
      if (!dateString) {
        return "";
      }
      if (this.dimension === "year") {
        return dateString.slice(0, 4);
      }
      if (this.dimension === "month") {
        return dateString.slice(0, 7);
      }
      return dateString;
    },
    formatDateFromMs(ms, useUtc) {
      const date = new Date(ms);
      const year = useUtc ? date.getUTCFullYear() : date.getFullYear();
      const month = String((useUtc ? date.getUTCMonth() : date.getMonth()) + 1).padStart(2, "0");
      const day = String(useUtc ? date.getUTCDate() : date.getDate()).padStart(2, "0");
      return `${year}-${month}-${day}`;
    },
    normalizeRate(rate) {
      if (rate === undefined || rate === null || rate === '') {
        return 0;
      }
      const num = Number(rate);
      if (Number.isNaN(num)) {
        return 0;
      }
      return num > 1 ? num / 100 : num;
    },
    getDimensionLabel() {
      if (this.dimension === "year") {
        return "年";
      }
      if (this.dimension === "month") {
        return "月";
      }
      return "日";
  },
    getFormattedDate() {
      return this.selectedDate || "";
    },
    getDefaultDateForDimension() {
      const now = new Date();
      const month = String(now.getMonth() + 1).padStart(2, "0");
      const day = String(now.getDate()).padStart(2, "0");
      if (this.dimension === "year") {
        return String(now.getFullYear());
      }
      if (this.dimension === "month") {
        return `${now.getFullYear()}-${month}`;
      }
      return `${now.getFullYear()}-${month}-${day}`;
    },
    formatTrendValue(value) {
      if (this.trendMetric === "commission") {
        return `${this.currencyIcon || ""} ${value.toFixed(2)}`;
      }
      return Math.round(value).toLocaleString();
    },
    showTooltip(series, label, value, event) {
      const wrapper = this.$refs.chartWrapper;
      if (!wrapper) {
        return;
      }
      const rect = wrapper.getBoundingClientRect();
      this.tooltip = {
        visible: true,
        x: event.clientX - rect.left + 12,
        y: event.clientY - rect.top - 12,
        text: `${series} ${this.formatTrendValue(value)}`
      };
    },
    hideTooltip() {
      this.tooltip.visible = false;
    },
    buildStats(type, dateKey) {
      const record = (this.opsReport?.[type] || {})[dateKey] || {};
      let totalOrders = Number(record.totalOrders ?? record.orderQuantity ?? 0);
      const successOrders = Number(record.successOrders ?? record.successQuantity ?? 0);
      let failedOrders = Number(record.failedOrders ?? record.failQuantity ?? 0);
      const commission = Number(record.agentCommission ?? record.commission ?? 0);
      if (!totalOrders && (successOrders || failedOrders)) {
        totalOrders = successOrders + failedOrders;
      }
      if (!failedOrders && totalOrders && successOrders) {
        failedOrders = Math.max(0, totalOrders - successOrders);
      }
      const successRateFallback = this.normalizeRate(record.successRate) * 100;
      const successRateValue = totalOrders === 0
        ? successRateFallback
        : (successOrders / totalOrders) * 100;
      const successRate = `${successRateValue.toFixed(1)}%`;
      return {
        totalOrdersValue: totalOrders,
        successOrdersValue: successOrders,
        failedOrdersValue: failedOrders,
        successRateValue,
        agentCommissionValue: commission,
        totalOrders: totalOrders.toLocaleString(),
        successOrders: successOrders.toLocaleString(),
        failedOrders: failedOrders.toLocaleString(),
        successRate,
        agentCommission: `${this.currencyIcon || ""} ${commission.toFixed(2)}`
      };
    },
    compareStats(current, previous) {
      return {
        totalOrders: this.buildChange(current.totalOrdersValue - previous.totalOrdersValue, "count"),
        successOrders: this.buildChange(current.successOrdersValue - previous.successOrdersValue, "count"),
        failedOrders: this.buildChange(current.failedOrdersValue - previous.failedOrdersValue, "count"),
        successRate: this.buildChange(current.successRateValue - previous.successRateValue, "rate"),
        agentCommission: this.buildChange(current.agentCommissionValue - previous.agentCommissionValue, "money")
      };
    },
    buildChange(delta, type) {
      const direction = delta >= 0 ? "up" : "down";
      const sign = "";
      const absValue = Math.abs(delta);
      let textValue = "";
      if (type === "rate") {
        textValue = `${absValue.toFixed(1)}pp`;
      } else if (type === "money") {
        textValue = `${this.currencyIcon || ""} ${absValue.toFixed(2)}`;
      } else {
        textValue = `${Math.round(absValue).toLocaleString()}`;
      }
      return {
        direction,
        text: `${direction === "up" ? "↑" : "↓"} ${textValue}`
      };
    },
    getPreviousDateKey(offset = 1) {
      const selected = this.selectedDate;
      if (!selected) {
        return "";
      }
      if (this.dimension === "year") {
        const year = Number(selected);
        return Number.isNaN(year) ? "" : String(year - offset);
      }
      if (this.dimension === "month") {
        const parts = selected.split("-");
        if (parts.length < 2) {
          return "";
        }
        const year = Number(parts[0]);
        const month = Number(parts[1]);
        if (Number.isNaN(year) || Number.isNaN(month)) {
          return "";
        }
        const date = new Date(year, month - 1 - offset, 1);
        const resultMonth = String(date.getMonth() + 1).padStart(2, "0");
        return `${date.getFullYear()}-${resultMonth}`;
      }
      const dayParts = selected.split("-");
      if (dayParts.length < 3) {
        return "";
      }
      const year = Number(dayParts[0]);
      const month = Number(dayParts[1]);
      const day = Number(dayParts[2]);
      if (Number.isNaN(year) || Number.isNaN(month) || Number.isNaN(day)) {
        return "";
      }
      const date = new Date(year, month - 1, day - offset);
      const resultMonth = String(date.getMonth() + 1).padStart(2, "0");
      const resultDay = String(date.getDate()).padStart(2, "0");
      return `${date.getFullYear()}-${resultMonth}-${resultDay}`;
    },
    mapValuesToPoints(values) {
      const width = 640;
      const height = 240;
      const padding = 36;
      const step = (width - padding * 2) / (values.length - 1 || 1);
      const range = this.trendMax - this.trendMin || 1;
      return values
        .map((value, index) => {
          const x = padding + step * index;
          const y = padding + ((this.trendMax - value) / range) * (height - padding * 2);
          return `${x.toFixed(1)},${y.toFixed(1)}`;
        })
        .join(" ");
    },
    mapValuesToPositions(values) {
      const height = 240;
      const padding = 36;
      const range = this.trendMax - this.trendMin || 1;
      return values.map((value) => {
        return padding + ((this.trendMax - value) / range) * (height - padding * 2);
      });
    },
    formatTrendLabel(key) {
      if (!key) {
        return "";
      }
      if (this.dimension === "day") {
        const parts = key.split("-");
        if (parts.length >= 3) {
          return `${parts[1]}-${parts[2]}`;
        }
        return key;
      }
      if (this.dimension === "month") {
        const parts = key.split("-");
        if (parts.length >= 2) {
          return `${parts[0]}-${parts[1]}`;
        }
      }
      return key;
    }
  }
}
</script>

<style scoped>
.welcome-page {
  min-height: 100vh;
  padding: 36px 5vw 48px;
  background:
    radial-gradient(circle at top right, rgba(217, 119, 69, 0.18), transparent 45%),
    radial-gradient(circle at 20% 20%, rgba(15, 76, 92, 0.15), transparent 45%),
    #f7f4ef;
  font-family: "Playfair Display", "Times New Roman", serif;
  color: #1b1a17;
}

.welcome-hero {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 24px;
  margin-bottom: 32px;
  animation: rise 0.8s ease-out;
}

.hero-text {
  max-width: 640px;
}

.hero-eyebrow {
  font-size: 30px;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: #0f4c5c;
  margin-bottom: 12px;
  font-family: "IBM Plex Sans", "Helvetica Neue", sans-serif;
}

.hero-title {
  font-size: clamp(28px, 4vw, 42px);
  margin: 0 0 12px;
}

.hero-subtitle {
  font-size: 16px;
  line-height: 1.7;
  color: #5b5a57;
  font-family: "IBM Plex Sans", "Helvetica Neue", sans-serif;
}

.hero-controls {
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: flex-end;
}

.dimension-toggle {
  display: inline-flex;
  gap: 8px;
  padding: 6px;
  border-radius: 999px;
  background: #e3f2ef;
}

.dimension-btn {
  border: none;
  background: transparent;
  color: #0f4c5c;
  font-size: 12px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  font-family: "IBM Plex Sans", "Helvetica Neue", sans-serif;
  padding: 8px 14px;
  border-radius: 999px;
  cursor: pointer;
}

.dimension-btn.active {
  background: #0f4c5c;
  color: #ffffff;
}

.dimension-picker {
  width: 180px;
}

.welcome-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(320px, 1fr));
  gap: 24px;
}

.stats-card {
  background: #fffaf3;
  border-radius: 20px;
  padding: 24px;
  box-shadow: 0 18px 40px rgba(15, 23, 42, 0.12);
  position: relative;
  overflow: hidden;
  animation: fadeInUp 0.7s ease-out both;
}

.card-collect {
  border: 1px solid rgba(15, 76, 92, 0.18);
}

.card-paying {
  border: 1px solid rgba(217, 119, 69, 0.2);
  animation-delay: 0.1s;
}

.card-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 18px;
}

.card-header h2 {
  font-size: 24px;
  margin: 0 0 6px;
}

.card-header p {
  margin: 0;
  font-size: 14px;
  color: #5b5a57;
  font-family: "IBM Plex Sans", "Helvetica Neue", sans-serif;
}

.card-tag {
  padding: 6px 12px;
  border-radius: 999px;
  font-size: 11px;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  background: #f1e7d7;
  color: #1b1a17;
  font-family: "IBM Plex Sans", "Helvetica Neue", sans-serif;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  gap: 16px 20px;
}

.stat-item {
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: 12px 14px;
  border-radius: 14px;
  background: #ffffff;
  border: 1px solid rgba(27, 26, 23, 0.08);
  font-family: "IBM Plex Sans", "Helvetica Neue", sans-serif;
}

.stat-item span {
  font-size: 12px;
  color: #5b5a57;
}

.stat-item strong {
  font-size: 18px;
  color: #1b1a17;
}

.stat-change {
  font-size: 12px;
  font-family: "IBM Plex Sans", "Helvetica Neue", sans-serif;
}

.stat-change.up {
  color: #0f766e;
}

.stat-change.down {
  color: #b45309;
}

.chart-card {
  grid-column: span 1;
}

.chart-tabs {
  display: inline-flex;
  gap: 8px;
  padding: 4px;
  border-radius: 999px;
  background: #f1e7d7;
}

.chart-tab {
  border: none;
  background: transparent;
  color: #1b1a17;
  font-size: 12px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  font-family: "IBM Plex Sans", "Helvetica Neue", sans-serif;
  padding: 6px 12px;
  border-radius: 999px;
  cursor: pointer;
}

.chart-tab.active {
  background: #1b1a17;
  color: #ffffff;
}

.chart-legend {
  display: flex;
  gap: 12px;
  font-size: 12px;
  color: #5b5a57;
  font-family: "IBM Plex Sans", "Helvetica Neue", sans-serif;
  margin-bottom: 8px;
}

.legend-item::before {
  content: "";
  display: inline-block;
  width: 10px;
  height: 10px;
  border-radius: 999px;
  margin-right: 6px;
}

.legend-collect::before {
  background: #0f4c5c;
}

.legend-paying::before {
  background: #d97745;
}

.chart-wrapper {
  padding-top: 8px;
  position: relative;
}

.trend-chart {
  width: 100%;
  height: 300px;
}

.trend-line {
  fill: none;
  stroke-width: 3;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.line-collect {
  stroke: #0f4c5c;
}

.line-paying {
  stroke: #d97745;
}

.axis-label {
  font-size: 10px;
  fill: #5b5a57;
  font-family: "IBM Plex Sans", "Helvetica Neue", sans-serif;
  text-anchor: middle;
}

.axis-label-y {
  text-anchor: end;
}

.axis-label-x {
  text-anchor: middle;
}

.axis-line {
  stroke: rgba(91, 90, 87, 0.4);
  stroke-width: 1;
}

.axis-grid {
  stroke: rgba(91, 90, 87, 0.15);
  stroke-width: 1;
}

.axis-unit {
  font-size: 11px;
  fill: #5b5a57;
  font-family: "IBM Plex Sans", "Helvetica Neue", sans-serif;
}

.trend-point {
  stroke: #f7f4ef;
  stroke-width: 2;
}

.trend-hit {
  fill: transparent;
  pointer-events: all;
}

.trend-tooltip {
  position: absolute;
  z-index: 2;
  padding: 6px 10px;
  border-radius: 8px;
  background: rgba(27, 26, 23, 0.9);
  color: #fffaf3;
  font-size: 12px;
  font-family: "IBM Plex Sans", "Helvetica Neue", sans-serif;
  pointer-events: none;
  white-space: nowrap;
}

.point-collect {
  fill: #0f4c5c;
}

.point-paying {
  fill: #d97745;
}


@keyframes rise {
  from {
    opacity: 0;
    transform: translateY(12px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(16px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 768px) {
  .welcome-hero {
    flex-direction: column;
    align-items: flex-start;
  }

  .hero-controls {
    align-self: flex-start;
  }

  .welcome-grid {
    grid-template-columns: 1fr;
  }
}
</style>
