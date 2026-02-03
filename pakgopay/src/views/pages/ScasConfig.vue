<script setup>

import SvgIcon from "@/components/SvgIcon/index.vue";
</script>

<template>
  <div class="main-views-container" style="overflow:auto;height: 100%;">
    <div class="main-title" style="width:95%;margin-left:0; border-radius: 0;margin-right: 0;padding-left:20px;padding-top:20px;">
      {{ $t('scasConfig.title') }}
    </div>

    <div class="main-views-form" style="background-color: white;height: 500px;margin-top: 0;width: 96%;display: flex;justify-content: center;">
      <el-form style="margin-top: 100px;height: 80%;">
        <div class="el-form-line">
          <el-form-item >
            <template #label>
              <div style="width: 250px;font-size: 16px;color: dodgerblue;">{{ $t('scasConfig.label.orderLimit') }}</div>
            </template>
            <el-input :min="1" :step="1" class="center-input" type="number" v-model="merchantEachOrderTimes" style="width: 400px">
            </el-input>
          </el-form-item>
          <el-form-item  style="height: 300px;margin-top: 50px;">
            <template #label>
                <div style="width: 250px;font-size: 16px;color: dodgerblue;">{{ $t('scasConfig.label.fixedIpQps') }}</div>
            </template>
            <el-input type="textarea" :autosize="{minRows: 1, maxRows:100}" v-model="qpsForIP" :placeholder="$t('scasConfig.placeholder.qpsFormat')" style="min-height: 300px !important; max-height: 400px;width: 400px;"></el-input>
          </el-form-item>
        </div>
      </el-form>
    </div>
    <div style="background-color: white; display: flex;justify-content: space-between;align-items: center;width: 96%;border-top: solid 2px gray;height: 10%;">
      <el-button style="margin-left: 30%;width: 100px;height: auto;color: dodgerblue" @click="reset">{{ $t('common.reset') }}</el-button>
      <el-button style="margin-right: 30%;width: 100px;height: auto;color: dodgerblue" @click="submit">{{ $t('common.submit') }}</el-button>
    </div>
  </div>
</template>
<script>
export default {
  name: 'ScasConfig',
  data() {
    return {
      merchantEachOrderTimes: '',
      qpsForIP: '',
    }
  }
}
</script>
<style scoped>

</style>
