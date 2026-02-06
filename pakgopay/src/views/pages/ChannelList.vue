<script setup>

import SvgIcon from "@/components/SvgIcon/index.vue";
import {getTimeFromTimestamp} from "@/api/common.js";
</script>

<template>
<div class="main-title">{{ $t('channelList.title') }}</div>

  <el-collapse v-model="activeTool">
    <el-collapse-item name="1">
      <template #title>
        <span class="toolbarName">{{ $t('common.toolbar') }}</span>
      </template>
      <div class="main-toolbar" style="height: 130px;">
        <el-form class="main-toolform" ref="filterboxForm" :model="filterbox">
          <el-row style="width: 100%;">
            <el-col :span="24">
              <div style="display: flex;flex-direction: row;justify-content: right;margin-right:3%">
                <el-button @click="search()"
                           class="filterButton">
                  <SvgIcon class="filterButtonSvg" name="search"/>
                  <div>{{ $t('common.query') }}</div>
                </el-button>
                <el-button @click="reset('filterboxForm')"
                           class="filterButton">
                  <SvgIcon class="filterButtonSvg" name="reset"/>
                  <div>{{ $t('common.reset') }}</div>
                </el-button>
                <el-button @click="exportPathChannelInfos"
                           class="filterButton">
                  <SvgIcon class="filterButtonSvg" name="export"/>
                  <div>{{ $t('common.export') }}</div>
                </el-button>
              </div>
            </el-col>
          </el-row>
          <el-row style="width: 100%;margin-top:10px">
            <div style="display: flex;flex-direction: row;width: 100%;justify-content: space-around">
              <el-col :span="5">
                <el-form-item :label="$t('channelList.filter.channel')" label-width="150px" prop="paymentId">
                  <el-select
                      :options="paymentOptions"
                      :props="paymentProps"
                      filterable
                      v-model="filterbox.paymentId"
                      style="height: 100%;width: 200px"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('channelList.filter.channelName')" label-width="150px" prop="channelName">
                  <el-input v-model="filterbox.channelName" :placeholder="$t('channelList.placeholder.channelName')" style="width: 200px;height: 100%" />
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('channelList.filter.status')" label-width="150px" prop="status">
                  <el-select v-model="filterbox.status" :placeholder="$t('channelList.placeholder.status')"
                             style="width: 200px;height: 100%"
                             clearable
                             :options="channelStatusOptions"
                  >
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('channelList.filter.currency')" label-width="150px" prop="currency">
                  <el-select v-model="filterbox.currency" :placeholder="$t('common.currency')"
                             style="width: 200px;height: 100%"
                             clearable
                             :options="currencyOptions"
                             :props="currencyProps"
                  />
                </el-form-item>
              </el-col>
            </div>
          </el-row>
        </el-form>
      </div>
    </el-collapse-item>
  </el-collapse>

  <div class="reportInfo">
    <div class="main-views-form" style="height: 700px">
      <div style="float: right;display: flex;">
        <el-button @click="createNewChannel"><SvgIcon name="add" style="width: 20px;height: 20px"/>{{ $t('channelList.action.add') }}</el-button>
      </div>
      <el-table
          border :data="channelTableInfo"
          class="channelTable"
          style="height: 100%"
          :key="tableKey"
      >
        <el-table-column
            prop="channelName"
            :label="$t('channelList.column.channelName')"
            v-slot="{row}"
            align="center"
            fixed="left"
        >
          <div>
            {{row.channelName}}
          </div>
        </el-table-column>
        <el-table-column
            prop="pathChannelList"
            :label="$t('channelList.column.collectionList')"
            v-slot="{row}"
            align="center"
        >
          <div>
            <el-card
              v-for="(item, index) in row.collectionSupportPayment"
              :key="item.paymentNo"
              class="merchantInfos-table channel-card"
              :class="index % 2 === 0 ? 'channel-card-collect' : 'channel-card-collect-alt'"
            >
              <div>{{ $t('channelList.card.paymentNo') }}{{ item.paymentNo }}</div>
              <div>{{ $t('channelList.card.paymentName') }}{{ item.paymentName }}</div>
            </el-card>
          </div>
        </el-table-column>
        <el-table-column
            prop="pathChannelList"
            :label="$t('channelList.column.payoutList')"
            v-slot="{row}"
            align="center"
        >
          <div>
            <el-card
              v-for="(item, index) in row.paySupportPayment"
              :key="item.paymentNo"
              class="merchantInfos-table channel-card"
              :class="index % 2 === 0 ? 'channel-card-pay' : 'channel-card-pay-alt'"
            >
              <div>{{ $t('channelList.card.paymentNo') }}{{ item.paymentNo }}</div>
              <div>{{ $t('channelList.card.paymentName') }}{{ item.paymentName }}</div>
            </el-card>
          </div>
        </el-table-column>
        <el-table-column
            prop="status"
            :label="$t('channelList.column.status')"
            v-slot="{row}"
            align="center"
        >
          <div>
            <el-switch
              v-model="row.status"
              active-color="#13ce66"
              inactive-color="#ff4949"
              :active-text="$t('common.enable')"
              :inactive-text="$t('common.disable')"
              :active-value="1"
              :inactive-value="0"
              disabled
            >
            </el-switch>
          </div>
        </el-table-column>
        <el-table-column
            prop="supportCurrencyType"
            :label="$t('channelList.column.currency')"
            v-slot="{row}"
            align="center"
        >
          <div>
            {{row.currency}}
          </div>
        </el-table-column>
        <el-table-column
            prop="channelAccountBalance"
            :label="$t('channelList.column.createTime')"
            v-slot="{row}"
            align="center"
        >
          <div>
            {{getTimeFromTimestamp(row.createTime)}}
          </div>
        </el-table-column>
        <el-table-column
            prop="operation"
            :label="$t('common.operation')"
            v-slot="{row}"
            align="center"
            fixed="right"
            width="200px"
        >
          <div>
            <el-dropdown trigger="click">
              <SvgIcon name="more" width="30" height="30" />
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item @click="editChannel(row)">{{ $t('common.edit') }}</el-dropdown-item>
                  <el-dropdown-item v-if="row.status === 1" @click="stopChannel(row)">{{ $t('common.disable') }}</el-dropdown-item>
                  <el-dropdown-item v-if="row.status === 0" @click="startChannel(row)">{{ $t('common.enable') }}</el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
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
         
          @current-change="handleCurrentPageChange"
          @size-change="handleSizeChange"
      >
      </el-pagination>
    </div>
  </div>
  <el-dialog
      :title="channelDialogTitle"
      v-model="dialogFormVisible"
      class="dialog"
      center="true"
      width="90%"
      style="height: 600px;align-content: center"
  >
    <el-form style="margin-top: 50px;width: 100%" ref="editChannelForm" :rules="editChannelRules" :model="editChannelInfo">
<!--      <el-row style="width: 100%">-->
        <el-col :span="24">
          <div class="el-form-line" style="display: flex;justify-content: center;">
            <el-form-item :label="$t('channelList.filter.channelName')" label-width="150px" prop="channelName">
              <el-input type="text" v-model="editChannelInfo.channelName" style="width: 200px"></el-input>
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="24">
          <div class="el-form-line" style="display: flex;justify-content: center;">
            <el-form-item :label="$t('channelList.filter.channel')" label-width="150px" prop="paymentIds">
              <el-select
                  v-model="editChannelInfo.paymentIds"
                  :options="paymentOptions"
                  :props="paymentProps"
                  @change="handleChange"
                  multiple
                  style="width: 200px"
                  filterable
              />
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="24">
          <div class="el-form-line" style="display: flex;justify-content: center;">
            <el-form-item :label="$t('channelList.filter.status')" label-width="150px" prop="status">
              <el-switch
                  v-model="editChannelInfo.status"
                  active-color="#13ce66"
                  inactive-color="#ff4949"
                  :active-text="$t('common.enable')"
                  :inactive-text="$t('common.disable')"
                  :inactive-value="0"
                  :active-value="1"
                  style="width: 200px"
              ></el-switch>
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="24">
          <div class="el-form-line" style="display: flex;justify-content: center;">
            <el-form-item :label="$t('common.googleCode')" label-width="150px" prop="googleCode">
              <el-input type="text" v-model="editChannelInfo.googleCode" style="width: 200px" :placeholder="$t('common.placeholder.googleCode')"/>
            </el-form-item>
          </div>
        </el-col>
    </el-form>
    <div slot="footer" class="dialog-footer" style="float: right;">
      <el-button @click="cancelDialog">{{ $t('common.cancel') }}</el-button>
      <el-button type="primary" @click="submitForm('editChannelForm', this.submitType)">{{ $t('common.confirm') }}</el-button>
    </div>
  </el-dialog>
  <el-dialog
      :title="stopDialogTitle"
      v-model="stopDialogVisible"
      class="dialog"
      center="true"
      width="50%"
      style="height: auto;align-content: center;position: absolute;
      top: 50%;
      left: 50%;
      margin: 0 !important;
      transform: translate(-50%, -50%)"
  >
   <el-form
     ref="stopForm"
     :rules = 'editChannelRules'
     :model = 'editChannelInfo'
     style="margin-top: 50px;width: 100%"
   >
     <el-col :span="24">
       <div class="el-form-line" style="display: flex;justify-content: center;">
         <el-form-item :label="$t('common.googleCode')" label-width="150px" prop="googleCode">
           <el-input type="text" v-model="editChannelInfo.googleCode" style="width: 200px" :placeholder="$t('common.placeholder.googleCode')"/>
         </el-form-item>
       </div>
     </el-col>
   </el-form>
    <div slot="footer" class="dialog-footer" style="float: right;">
      <el-button @click="cancelStopDialog('stopForm')">{{ $t('common.cancel') }}</el-button>
      <el-button type="primary" @click="submitForm('stopForm', 'edit')">{{ $t('common.confirm') }}</el-button>
    </div>
  </el-dialog>
</template>


<script>
import {
  createChannelInfo, exportChannelList, exportPayment,
  getAllCurrencyType,
  getChannelInfo,
  getPaymentInfo,
  modifyChannelInfo
} from "@/api/interface/backendInterface.js";
import {
  exportExcel,
  getChannelListTitle,
  getFormateTime,
  loadingBody
} from "@/api/common.js";

export default {
  name: 'ChannelList',
  data() {
    return {
      activeTool: '1',
      submitType: "",
      currency: '',
      currencyIcon: '',
      currencyIcons: [],
      currencyOptions: [],
      currencyProps: {
        value: 'currencyType',
        label: 'name'
      },
      currencyMaps: {},
      paymentOptions: [],
      channelStatusOptions: [],
      paymentProps: {
        value: 'paymentId',
        label: 'paymentName'
      },
      totalCount: 0,
      pageSize: 10,
      currentPage: 1,
      pageSizes: [10, 20, 50, 100, 200],
      filterbox: {
        channelName: '',
        channelID: '',
        channelStatus: '',
      },
      /** 此下拉菜单选项需要调用接口从后端实时获取 */
      pathChannelListOptions: [

      ],
      channelTableInfo: [
      ],
      channelFormInfo: [],
      createChannelInfo: {},
      editChannelInfo: {},
      tableKey: 0,
      timeZoneKey: localStorage.getItem("timeZone") || "UTC+8",
      dialogFormVisible: false,
      channelDialogTitle: '',
      stopDialogVisible: false,
      stopDialogTitle: '',
      editChannelRules: {
        googleCode: {
          required: true,
          messages: this.$t('common.googleCodeRequired'),
          trigger: 'blur',
        }
      }
    }
  },
  methods: {
    exportPathChannelInfos() {
      this.filterbox.columns = getChannelListTitle(this)
      exportChannelList(this.filterbox).then(async res => {
        /*const fileName = this.$t('exportPaymentListName') + getFormateTime()*/
        const fileName = this.$t('channelList.exportName') + getFormateTime()
        await exportExcel(res, fileName, this)
        /*if (res.status === 200) {
          if (res.data.type === 'application/json') {
            const blobData = res.data;
            const jsonData = JSON.parse(await blobData.text())
            if (jsonData.code !== 0) {
              this.$notify({
                title: 'Failed',
                message: jsonData.message,
                duration: 3000,
                type: 'error',
                position: 'bottom-right',
              })
            }
          } else {
            const blob = new Blob([res.data], {type: "application/vnd.ms-excel;charset=UTF-8"});
            console.log('blob---'+ blob.size)
            if (window.navigator && window.navigator.msSaveOrOpenBlob) {
              window.navigator.msSaveOrOpenBlob(blob, fileName)
            } else {
              const downLoadElement = document.createElement('a');
              const href = window.URL.createObjectURL(blob);
              downLoadElement.href = href;
              downLoadElement.download = fileName;
              document.body.appendChild(downLoadElement);
              downLoadElement.click();
              document.body.removeChild(downLoadElement);
              window.URL.revokeObjectURL(href);
            }
            this.$notify({
              title: 'Success',
              message: 'export data success',
              duration: 3000,
              type: 'success',
              position: 'bottom-right',
            })
          }
        } else {
          if (res.data.type === 'application/json') {
            const blobData = res.data;
            const jsonData = JSON.parse(await blobData.text())
            this.$notify({
              title: 'Error',
              message: jsonData.message,
              duration: 3000,
              type: 'error',
              position: 'bottom-right',
            })
          }

        }
        this.filterbox.orderType = '0'*/
      }).catch(err => {
        console.log(err)
      })
    },
    reset(form) {
      this.$refs[form].resetFields();
    },
    search() {
      const loadingInstance = loadingBody(this, 'channelTable')
      getChannelInfo(this.filterbox).then(response => {
        if (response.status === 200 && response.data.code === 0) {
          const allData = JSON.parse(response.data.data)
          this.totalCount = allData.totalNumber
          this.channelTableInfo = allData.channelDtoList
          this.channelTableInfo.forEach(item => {
            let currencyList = []
            let collectionSupportPamentList = []
            let paySupportPamentList = []
            let paymentIds = []
            item.paymentDtoList.forEach(paymentItem => {
              paymentIds.push(paymentItem.paymentId)
              if (!currencyList.includes(paymentItem.currency)) {
                currencyList.push(this.currencyMaps[paymentItem.currency])
              }
              if (paymentItem.supportType === 0 ) {
                collectionSupportPamentList.push(paymentItem)
              } else if (paymentItem.supportType === 1) {
                paySupportPamentList.push(paymentItem)
              } else if (paymentItem.supportType === 2) {
                collectionSupportPamentList.push(paymentItem)
                paySupportPamentList.push(paymentItem)
              }
            })
            item.currency = currencyList.toLocaleString()
            item.collectionSupportPayment = collectionSupportPamentList
            item.paySupportPayment = paySupportPamentList
            item.paymentIds = paymentIds
          })
          loadingInstance.close()
        }
      }).catch(error => {
        loadingInstance.close()
        this.$notify({
          title: this.$t('common.error'),
          message: error.message,
          duration: 5000,
          type: 'error',
          position: 'bottom-right'
        })
      })
    },
    submitForm(form, submitType) {
      this.$refs[form].validate(valid => {
        if (valid) {
            if(submitType === 'edit') {
              modifyChannelInfo(this.editChannelInfo).then(res => {
                if (res.status === 200 && res.data.code === 0) {
                  this.$notify({
                    title: this.$t('common.success'),
                    message: this.$t('channelList.notify.modifySuccess', { name: this.editChannelInfo.channelName }),
                    duration: 3000,
                    type: 'success',
                    position:'bottom-right'
                  })
                } else if (res.status === 200 && res.data.code !== 0) {
                  this.$notify({
                    title: this.$t('common.error'),
                    message:res.data.message,
                    duration: 3000,
                    type: 'error',
                    position: 'bottom-right'
                  })
                } else {
                  this.$notify({
                    title: this.$t('common.error'),
                    message: this.$t('common.requestFailed'),
                    duration: 3000,
                    type: 'error',
                    position: 'bottom-right'
                  })
                }
                this.dialogFormVisible = false;
                this.channelDialogTitle = ''
                this.stopDialogTitle = ''
                this.stopDialogVisible = false
                this.search()
              }).catch( err => {
                this.$notify({
                  title: this.$t('common.error'),
                  message:err.message,
                  duration: 3000,
                  type: 'error',
                  position: 'bottom-right'
                })
                this.dialogFormVisible = false;
                this.channelDialogTitle = ''
                this.search()
              })
            } else if (submitType === 'create') {
              createChannelInfo(this.editChannelInfo).then(res => {
                if (res.status === 200 && res.data.code === 0) {
                  this.$notify({
                    title: this.$t('common.success'),
                    message: this.$t('channelList.notify.createSuccess'),
                    duration: 3000,
                    type: 'success',
                    position:'bottom-right'
                  })
                  this.search()
                } else if (res.status === 200 && res.data.code !== 0) {
                  this.$notify({
                    title: this.$t('common.error'),
                    message:res.data.message,
                    duration: 3000,
                    type: 'error',
                    position: 'bottom-right'
                  })
                } else {
                  this.$notify({
                    title: this.$t('common.error'),
                    message: this.$t('common.requestFailed'),
                    duration: 3000,
                    type: 'error',
                    position: 'bottom-right'
                  })
                }
                this.dialogFormVisible = false;
                this.channelDialogTitle = ''
              }).catch( err => {
                this.$notify({
                  title: this.$t('common.error'),
                  message:err.message,
                  duration: 3000,
                  type: 'error',
                  position: 'bottom-right'
                })
                this.dialogFormVisible = false;
                this.channelDialogTitle = ''
              })
            }

        }
      })
    },
    createNewChannel() {
      this.editChannelInfo = {}
      this.dialogFormVisible = true
      this.channelDialogTitle = this.$t('channelList.dialog.add')
      this.submitType = 'create'
    },
    handleCurrentPageChange(currentPage) {
      this.filterbox.pageNo = currentPage;
      this.filterbox.pageSize = this.pageSize;
      this.PathChannelTableInfo = []
      this.search()

    },
    handleSizeChange(pageSize) {
      this.currentPage = 1
      this.pageSize = pageSize
      this.handleCurrentPageChange(1)
    },
    editChannel(row) {
      //this.editChannelInfo = row;
      this.editChannelInfo.channelName = row.channelName;
      this.editChannelInfo.channelId = row.channelId;
      this.editChannelInfo.paymentIds = row.paymentIds;
      this.editChannelInfo.status = row.status;
      this.dialogFormVisible = true;
      this.channelDialogTitle = this.$t('channelList.dialog.edit')
      this.submitType = 'edit'
      this.tableKey++
    },
    stopChannel(row) {
      this.stopDialogVisible = true
      this.channelDialogTitle = this.$t('channelList.dialog.disable')
      this.editChannelInfo = row
      this.editChannelInfo.status = 0;
    },
    startChannel(row) {
      this.stopDialogVisible = true
      this.stopDialogTitle = this.$t('channelList.dialog.enable')
      this.editChannelInfo = row
      this.editChannelInfo.status = 1;
    },
    cancelDialog() {
      this.dialogFormVisible = false;
      this.createChannelInfo = {}
      this.channelDialogTitle = ''
    },
    cancelStopDialog(form) {
      this.stopDialogVisible = false
      this.stopDialogTitle = ''
      this.$refs[form].resetFields()
    },
    applyChannelNameFromRoute() {
      let channelName = this.$route?.query?.["filterbox.channelName"]
      if (Array.isArray(channelName)) {
        channelName = channelName[0]
      }
      if (typeof channelName === "string" && channelName.trim() !== "") {
        this.filterbox.channelName = channelName
      }
    }
  },
  watch: {
    "$route.query"(newQuery, oldQuery) {
      if (newQuery?.["filterbox.channelName"] === oldQuery?.["filterbox.channelName"]) {
        return
      }
      this.applyChannelNameFromRoute()
      this.search()
    }
  },
  async mounted() {
    this.channelStatusOptions = [
      { value: 1, label: this.$t('common.enable') },
      { value: 0, label: this.$t('common.disable') }
    ];
    this._timeZoneListener = (event) => {
      this.timeZoneKey = event.detail || localStorage.getItem("timeZone") || "UTC+8";
      this.tableKey++;
    };
    window.addEventListener("timezone-change", this._timeZoneListener);

    this.applyChannelNameFromRoute()

    await getAllCurrencyType().then(res => {
      if (res.status === 200 && res.data.code === 0) {
        this.currencyOptions = JSON.parse(res.data.data).currencyTypeDTOList
        if (this.currencyOptions.length > 0) {
          this.currency = this.currencyOptions[0].currencyType
          //this.filterbox.currency = this.currencyOptions[0].currencyType
          this.currencyIcons = {};
          this.currencyMaps = {};
          this.currencyOptions.forEach(currency => {
            this.currencyIcons[currency.currencyType] = currency.icon
            this.currencyMaps[currency.currencyType] = currency.name
          })
          let iconKey = this.currency;
          this.currencyIcon = this.currencyIcons[iconKey]
        }
        return;
      }
      if (res.status !== 200 || res.data.code !== 0) {
        this.$notify({
          title: this.$t('common.failed'),
          message: this.$t('currencyTypeList.message.getFailed'),
          duration: 3000,
          type: 'error',
          position: 'bottom-right'
        })
      }
    })

    await getPaymentInfo({pageSize: 1000}).then(res => {
      if (res.status === 200) {
        if (res.data.code === 0) {
          const allData = JSON.parse(res.data.data);
          this.paymentOptions = allData.paymentDtoList
        }
      }
    })

    this.search()
  },
  beforeUnmount() {
    if (this._timeZoneListener) {
      window.removeEventListener("timezone-change", this._timeZoneListener);
    }
  }
}
</script>
<style scoped>
@import "@/assets/base.css";

.channel-card {
  margin-bottom: 8px;
}

.channel-card-collect {
  background-color: #e8f2ff;
}

.channel-card-collect-alt {
  background-color: #f0f6ff;
}

.channel-card-pay {
  background-color: #e9f6ee;
}

.channel-card-pay-alt {
  background-color: #f1faf4;
}
</style>
