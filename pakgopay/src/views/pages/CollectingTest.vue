<script setup>

import SvgIcon from "@/components/SvgIcon/index.vue";
</script>

<template>
<div class="main-title">
  {{ $t('collectingTest.title') }}
</div>

  <div class="main-views-container" style="background-color: white;height: 80%;">
    <div class="main-views-form" style="display: flex;justify-content: center;padding-top: 5%;height: 500px;">
      <el-form style="height: 100%">
        <el-row>
          <el-col :span="24">
            <el-form-item>
              <template #label>
                <span class="form-label" style="width: 150px;"><SvgIcon name="must"/>{{ $t('collectingTest.label.merchant') }}</span>
              </template>
                <el-select v-model="apiTestInfo.selectedMerchant" :placeholder="$t('collectingTest.placeholder.merchant')">
                  <el-option
                      v-for="item in merchantInfos"
                      :value="item.value"
                      :key="item.value"
                      :label="item.label"
                    />
                </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-col>
              <el-form-item>
                <template #label>
                  <span class="form-label" style="width: 150px;"><SvgIcon name="must"/>{{ $t('collectingTest.label.amount') }}</span>
                </template>
                <el-input v-model="apiTestInfo.collectingAmount" type="number" min="1" style="width: 300px;"/>
              </el-form-item>
            </el-col>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item>
              <template #label>
                <span class="form-label" style="width: 150px;"><SvgIcon name="must"/>{{ $t('collectingTest.label.channel') }}</span>
              </template>
              <el-select v-model="apiTestInfo.selectedPathChannel" :placeholder="$t('collectingTest.placeholder.channel')">
                <el-option
                    v-for="item in pathChannelInfos"
                    :value="item.value"
                    :key="item.value"
                    :label="item.label"
                />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-col>
              <el-form-item>
                <template #label>
                  <span class="form-label" style="width: 150px;"><SvgIcon name="must"/>{{ $t('collectingTest.label.payerName') }}</span>
                </template>
                <el-input v-model="apiTestInfo.payerName" type="text" min="1" style="width: 300px;" :placeholder="$t('collectingTest.placeholder.payerName')"/>
              </el-form-item>
            </el-col>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-col>
              <el-form-item>
                <template #label>
                  <span class="form-label" style="width: 150px;">{{ $t('collectingTest.label.callbackUrl') }}</span>
                </template>
                <el-input v-model="apiTestInfo.callbackURL" type="text" min="1" style="width: 300px;" :placeholder="$t('collectingTest.placeholder.callbackUrl')">
                  <template #prefix>https://</template>
                </el-input>
              </el-form-item>
            </el-col>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-col>
              <el-form-item>
                <template #label>
                  <span class="form-label" style="width: 150px;">{{ $t('collectingTest.label.requestIp') }}</span>
                </template>
                <el-input v-model="apiTestInfo.requestIP" type="text" min="1" style="width: 300px;" :placeholder="$t('collectingTest.placeholder.requestIp')"/>
              </el-form-item>
            </el-col>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item>
              <template #label>
                <span class="form-label" style="width: 150px;">{{ $t('collectingTest.label.responseType') }}</span>
              </template>
              <el-radio-group v-model="apiTestInfo.responseType" style="width: 300px;">
                <el-radio :label="1">{{ $t('collectingTest.option.redirect') }}</el-radio>
                <el-radio :label="2">{{ $t('collectingTest.option.json') }}</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div style="background-color: white; display: flex;justify-content: space-between;align-items: center;width: 100%;border-top: solid 2px gray;height: 100px;">
      <el-button style="margin-left: 30%;color: dodgerblue;display: flex" @click="reset">{{ $t('common.reset') }}</el-button>
      <el-button style="margin-right: 30%;color: dodgerblue;display: flex">{{ $t('common.submit') }}</el-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      apiTestInfo: {
        selectedMerchant: "",
        selectedPathChannel: "",
        payerName: "",
        payerId: "",
        responseType: '',
        callbackURL: "",
        requestIP: "",
        collectingAmount: '',
      },
      pathChannelInfos: [],
      merchantInfos: [],
    }
  },
  methods: {
    reset() {
      this.apiTestInfo = {}
    },
    submit(){

    }
  },
  mounted() {
    //加载商户信息/通道信息
    this.merchantInfos = [{
      value: '001',
      label: this.$t('collectingTest.merchant.sample1')
    },
      {
        value: '002',
        label: this.$t('collectingTest.merchant.sample2')
      }],
    this.pathChannelInfos = [{
      value: '001',
      label: this.$t('collectingTest.channel.wechat')
    },
      {
        value: '002',
        label: this.$t('collectingTest.channel.alipay')
      }],
    this.apiTestInfo.responseType = 2
  }
}
</script>
<style scoped>
@import "@/assets/base.css";
.form-label {
  color: dodgerblue;
  font-size: larger;
}
</style>
