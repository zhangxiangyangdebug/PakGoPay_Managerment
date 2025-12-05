<script setup>

import SvgIcon from "@/components/SvgIcon/index.vue";
</script>

<template>
  <div class="main-title">代理信息管理</div>
  <div class="main-toolbar" style="height: 100px;">
    <form class="main-toolform" style="display: grid;align-items: center;">
      <div style="display: flex; align-items: center;">
        <div class="main-toolform-line" style="justify-content: left;margin-left: 3%;">
          代理名称：<input v-model="filterbox.agentName"  type="text" class="main-toolform-input" style="width: 150px;" placeholder="代理名称"/>&nbsp;
          <div v-on:click="reset()" style="background-color: red;width:60px;display: flex; flex-direction: row;justify-content: center;color: lightskyblue;cursor: pointer;align-items: center;">
            <SvgIcon height="30px" width="30px" name="reset"/>
            <div style="width: 50px;color: white;font-size: 13px;">重置</div>
          </div>&nbsp;
          <div v-on:click="search()" style="background-color: deepskyblue;width:60px;display: flex; flex-direction: row;justify-content: center;color: lightskyblue;cursor: pointer;align-items: center;">
            <SvgIcon height="30px" width="30px" name="search"/>
            <div style="width: 50px;color: white;font-size: 13px;">查询</div>
          </div>&nbsp;
        </div>
        <div class="main-toolform-line" style="justify-content: right;margin-right: 4%;">
          <div v-on:click="addFistLevelAgent" style="background-color: deepskyblue;width:100px;display: flex; flex-direction: row;justify-content: center;cursor: pointer;align-items: center;color: greenyellow;">
            <SvgIcon height="30px" width="30px" name="add"/>
            <div style="width: 120px;color: white;font-size: 13px;">新增一级代理</div>
          </div>
          <div v-on:click="exportAgentInfo" style="background-color:forestgreen;width:50px;display: flex; flex-direction: row;justify-content: center;cursor: pointer;align-items: center;color: greenyellow;">
            <SvgIcon height="30px" width="70px" name="export"/>
            <div style="width: 120px;color: white;font-size: 13px;">导出</div>
          </div>
        </div>
      </div>
    </form>
  </div>

  <div class="main-views-container">
    <form class="main-views-form">
      <el-table
          border :data="agentInfoFormData"
          class="merchantInfos-table"
          style="width: 97%;height: 500px;"
      >
        <el-table-column
            prop="agentNO"
            label="编号"
            v-slot="{row}"
            align="center"
            width="100px"
        >
          <div>
            {{row.agentNO}}
          </div>
        </el-table-column>
        <el-table-column
            prop="firstLevelAgent"
            label="一级代理"
            v-slot="{row}"
            align="center"
            style="height: 100px;"
        >
          <div style="height: auto;display: flex; justify-content: center;width: auto;">
              <el-card v-if="row.firstLevelAgent" class="box-card">
                <div style="background-color: darkgrey">账号：{{row.firstLevelAgent.agentAccount}}</div>
                <div style="background-color: lightblue">名称：{{row.firstLevelAgent.agentName}}</div>
                <div style="background-color: lightgreen">支付渠道：{{row.firstLevelAgent.payingChannel}}</div>
              </el-card>
          </div>
        </el-table-column>
        <el-table-column
            prop="secondLevelAgent"
            label="二级代理"
            v-slot="{row}"
            align="center"
        >
          <div style="height: auto;display: flex; justify-content: center;width: auto;">
            <el-card v-if="row.secondLevelAgent" class="box-card">
              <div style="background-color: darkgrey">账号：{{row.secondLevelAgent.agentAccount}}</div>
              <div style="background-color: lightblue">名称：{{row.secondLevelAgent.agentName}}</div>
              <div style="background-color: lightgreen">支付渠道：{{row.secondLevelAgent.payingChannel}}</div>
            </el-card>
          </div>
        </el-table-column>
        <el-table-column
            prop="thirdLevelAgent"
            label="三级代理"
            v-slot="{row}"
            align="center"
        >
          <div style="height: auto;display: flex; justify-content: center;width: auto;">
            <el-card v-if="row.thirdLevelAgent" class="box-card">
              <div style="background-color: darkgrey">账号：{{row.thirdLevelAgent.agentAccount}}</div>
              <div style="background-color: lightblue">名称：{{row.thirdLevelAgent.agentName}}</div>
              <div style="background-color: lightgreen">支付渠道：{{row.thirdLevelAgent.payingChannel}}</div>
            </el-card>
          </div>
        </el-table-column>
        <el-table-column
          label="操作"
          align="center"
          v-slot="{row}"
        >
          <button style="width: 110px; background-color: transparent;border:none;" v-if="!row.thirdLevelAgent">新增下一级代理</button>
        </el-table-column>
      </el-table>
      <el-pagination
          background
          layout="sizes, prev, pager, next, jumper, total"
          :total="totalCount"
          v-model:current-page="currentPage"
          v-model:page-size="pageSize"
          :page-sizes="pageSizes"
          style="float:right; margin-right: 5%;"
      >
      </el-pagination>
    </form>


    <!-- 新增一级代理弹窗内容 -->
    <el-dialog
        :title="dialogTitle"
        v-model="dialogFormVisible"
        class="dialog"
        center="true"
        width="40%"
        style="height: 600px;"
    >
      <el-form style="margin-top: 50px">
        <div class="el-form-line">
          <el-form-item label="代理名称:" label-width="150px" size="medium">
            <el-input type="text" v-model="agentInfo.agentName" style="width: 200px"></el-input>
          </el-form-item>
        </div>
        <div class="el-form-line">
          <el-form-item label="代理账号:" label-width="150px" size="medium">
            <el-input autocomplete="new-password" type="text" v-model="agentInfo.agentAccount" style="width: 200px"></el-input>
          </el-form-item>
        </div>
        <div class="el-form-line">
          <el-form-item label="代理账号密码:" label-width="150px" size="medium">
            <el-input autocomplete="new-password" type="password" v-model="agentInfo.agentPassword" style="width: 200px"></el-input>
          </el-form-item>
        </div>
        <div class="el-form-line">
          <el-form-item label="确认密码:" label-width="150px" size="medium">
            <el-input type="password" v-model="agentInfo.agentConfirmPassword" style="width: 200px"></el-input>
          </el-form-item>
        </div>
        <div class="el-form-line">
          <el-form-item label="代理状态:" label-width="150px" size="medium" style="width: 350px;">
            <el-switch
                v-model="agentInfo.agentStatus"
                active-color="#13ce66"
                inactive-color="#ff4949"
                active-text="启用"
                inactive-text="停用"
            >
            </el-switch>
          </el-form-item>
        </div>
        <div class="el-form-line">
          <el-form-item label="渠道费率:" label-width="150px" size="medium">
            <el-input type="number" v-model="agentInfo.channelRate" style="width: 200px"></el-input>
          </el-form-item>
        </div>
        <div class="el-form-line">
          <el-form-item label="渠道配置:" label-width="150px" size="medium">
            <el-select v-model="agentInfo.channelConfig" style="width: 200px" placeholder="请选择渠道">
              <el-option
                v-for="item in agentInfo.channelOptions"
                :key="item.value"
                :value="item.value"
                :label="item.label"
              />
            </el-select>
          </el-form-item>
        </div>
        <div class="el-form-line">
          <el-form-item label="代理费率:" label-width="150px" size="medium">
            <el-input type="number" v-model="agentInfo.agentRate" style="width: 200px"></el-input>
          </el-form-item>
        </div>
        <div class="el-form-line">
          <el-form-item label="谷歌验证码:" label-width="150px" size="medium">
            <el-input type="number" v-model="agentInfo.googleCode" style="width: 200px"></el-input>
          </el-form-item>
        </div>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelDialog">取 消</el-button>
        <el-button type="primary">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'ChannelList',
  data() {
    return {
      filterbox: {
        agentName: '',
      },
      dialogFormVisible: false,
      dialogTitle: '',
      agentInfo: {
        agentName: '',
        agentAccount: '',
        agentPassword: '',
        agentConfirmPassword: '',
        agentStatus: false,
        channelRate: '',
        channelConfig: '',
        channelOptions: [
          {
            value: '1',
            label: '渠道1'
          },
          {
            value: '2',
            label: '渠道2'
          }
        ],
        agentRate: '',
        googleCode: '',
      },
      agentInfoFormData: [
        {
          agentNO: '001',
          firstLevelAgent: {
            agentName: '受傻逼',
            agentAccount: 'chousabi',
            payingChannel: '支付宝',
          },
          secondLevelAgent: {
            agentName: '001-001',
            agentAccount: '嘻嘻嘻',
            payingChannel: '京东',
          },
          thirdLevelAgent: {
            agentName: '001-001-001',
            agentAccount: '哈哈哈',
            payingChannel: '抖音月付',
          },
        },
        {
          agentNO: '002',
          firstLevelAgent: {
            agentName: '花菇凉',
            agentAccount: 'bigHua',
            payingChannel: '支付宝',
          },
          secondLevelAgent: {
            agentName: '小花猪',
            agentAccount: '呦西',
            payingChannel: '京东',
          },
        },
        {
          agentNO: '002',
          firstLevelAgent: {
            agentName: '花菇凉',
            agentAccount: 'bigHua',
            payingChannel: '支付宝',
          },
          secondLevelAgent: {
            agentName: '小花猪',
            agentAccount: '呦西',
            payingChannel: '京东',
          },
        },
        {
          agentNO: '002',
          firstLevelAgent: {
            agentName: '花菇凉',
            agentAccount: 'bigHua',
            payingChannel: '支付宝',
          },
          secondLevelAgent: {
            agentName: '小花猪',
            agentAccount: '呦西',
            payingChannel: '京东',
          },
        },
        {
          agentNO: '002',
          firstLevelAgent: {
            agentName: '花菇凉',
            agentAccount: 'bigHua',
            payingChannel: '支付宝',
          },
          secondLevelAgent: {
            agentName: '小花猪',
            agentAccount: '呦西',
            payingChannel: '京东',
          },
        },
        {
          agentNO: '002',
          firstLevelAgent: {
            agentName: '花菇凉',
            agentAccount: 'bigHua',
            payingChannel: '支付宝',
          },
          secondLevelAgent: {
            agentName: '小花猪',
            agentAccount: '呦西',
            payingChannel: '京东',
          },
        }
      ],
      totalCount: 0,
      pageSize: 10,
      pageSizes: [5, 10, 15, 20],
      currentPage: 1,
    }
  },
  methods: {
    addFistLevelAgent() {
      this.dialogFormVisible = true;
      this.dialogTitle= '新增一级代理'
    },
    cancelDialog() {
      this.dialogFormVisible = false;
      this.dialogTitle = ''
    },
    handleChange() {

    }
  }
}
</script>
<style scoped>
  .dialog-footer{
    display: flex;
    justify-content: right;
  }

  .el-form-line {
    display: flex;
    justify-content: center;
  }
</style>