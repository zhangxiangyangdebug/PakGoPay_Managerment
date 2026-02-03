<script setup>

import SvgIcon from "@/components/SvgIcon/index.vue";
</script>

<template>
  <div class="main-title">
    {{ $t('payingTest.title') }}
  </div>

  <div class="main-views-container" style="background-color: white;height: 80%;margin-right: 5%;">
    <div class="main-views-form" style="display: flex;justify-content: center;padding-top: 5%;height: 500px;margin-right:10%;">
      <el-form style="height: 100%">
        <el-row>
          <el-col :span="24">
            <el-form-item>
              <template #label>
                <span class="form-label"><SvgIcon name="must"/>{{ $t('payingTest.label.merchant') }}</span>
              </template>
              <el-select v-model="apiTestInfo.selectedMerchant" :placeholder="$t('payingTest.placeholder.merchant')">
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
            <el-form-item>
              <template #label>
                <span class="form-label"><SvgIcon name="must"/>{{ $t('payingTest.label.currency') }}</span>
              </template>
              <el-select v-model="apiTestInfo.currencyType" :placeholder="$t('payingTest.placeholder.currency')">
                <el-option
                    v-for="item in currencyTypeInfos"
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
            <el-form-item>
              <template #label>
                <span class="form-label"><SvgIcon name="must"/>{{ $t('payingTest.label.bank') }}</span>
              </template>
              <el-select v-model="apiTestInfo.bankType" :placeholder="$t('payingTest.placeholder.bank')">
                <el-option
                    v-for="item in bankTypeInfos"
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
                  <span class="form-label"><SvgIcon name="must"/>{{ $t('payingTest.label.amount') }}</span>
                </template>
                <el-input v-model="apiTestInfo.collectingAmount" type="number" min="1" style="width: 300px;"/>
              </el-form-item>
            </el-col>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-col>
              <el-form-item>
                <template #label>
                  <span class="form-label"><SvgIcon name="must"/>{{ $t('payingTest.label.payAccount') }}</span>
                </template>
                <el-input v-model="apiTestInfo.payAccount" type="text" min="1" style="width: 300px;" :placeholder="$t('payingTest.placeholder.payAccount')"/>
              </el-form-item>
            </el-col>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-col>
              <el-form-item>
                <template #label>
                  <span class="form-label"><SvgIcon name="must"/>{{ $t('payingTest.label.payRealName') }}</span>
                </template>
                <el-input v-model="apiTestInfo.payRealName" type="text" min="1" style="width: 300px;" :placeholder="$t('payingTest.placeholder.payRealName')"/>
              </el-form-item>
            </el-col>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-col>
              <el-form-item>
                <template #label>
                  <span class="form-label">{{ $t('payingTest.label.requestIp') }}</span>
                </template>
                <el-input v-model="apiTestInfo.requestIP" type="text" min="1" style="width: 300px;" :placeholder="$t('payingTest.placeholder.requestIp')"/>
              </el-form-item>
            </el-col>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-col>
              <el-form-item>
                <template #label>
                  <span class="form-label">{{ $t('payingTest.label.callbackUrl') }}</span>
                </template>
                <el-input v-model="apiTestInfo.callbackURL" type="text" min="1" style="width: 300px;" :placeholder="$t('payingTest.placeholder.callbackUrl')">
                  <template #prefix>https://</template>
                </el-input>
              </el-form-item>
            </el-col>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div style="background-color: white; display: flex;justify-content: space-between;align-items: center;width: 100%;border-top: solid 2px gray;height: 100px;">
      <el-button style="margin-left: 30%;width: 100px;height: auto;color: dodgerblue" @click="reset">{{ $t('common.reset') }}</el-button>
      <el-button style="margin-right: 30%;width: 100px;height: auto;color: dodgerblue">{{ $t('common.submit') }}</el-button>
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
        payAccount: "",
        payRealName: "",
        bankType: "",
      },
      merchantInfos: [],
      currencyTypeInfos: [],
      bankTypeInfos: [],
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
      label: this.$t('payingTest.merchant.sample1')
    },
      {
        value: '002',
        label: this.$t('payingTest.merchant.sample2')
      }],
        this.pathChannelInfos = [{
          value: '001',
          label: this.$t('payingTest.channel.wechat')
        },
          {
            value: '002',
            label: this.$t('payingTest.channel.alipay')
          }],
        this.apiTestInfo.responseType = 2
  }
}
</script>
<style scoped>
.form-label {
  color: dodgerblue;
  font-size: larger;
  width: 400px;
}
</style>
