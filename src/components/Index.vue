<template>
  <el-container class="home-container">
    <el-header class="home-header" style="height: 65px">
      <div>
        <span class="header-title">{{accountInfo.enterprise.name}}</span>
      </div>
      <ul class="header-operations">
        <li @click="$router.replace('/index')" class="active el-icon-s-home"></li>
        <li @click="$router.replace('/messages')" class="el-icon-message"></li>
        <li>
          <el-dropdown>
                      <span class="el-dropdown-link">
                        <el-avatar v-if="accountInfo.userFace!==''"
                                   src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
                                   style="vertical-align: middle">
                        </el-avatar>
                        <el-avatar v-else icon="el-icon-user-solid"
                                   style="vertical-align: middle"></el-avatar>
                        <i class="el-icon-caret-bottom">
                        </i>
                      </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item v-if="accountInfo.fullName!==''">
                登录用户是:{{accountInfo.fullName}}
              </el-dropdown-item>
              <el-dropdown-item v-else-if="accountInfo.username!==''">
                登录用户是:{{accountInfo.username}}
              </el-dropdown-item>
              <el-dropdown-item v-else>
                登录用户是:{{accountInfo.email}}
              </el-dropdown-item>
              <el-dropdown-item @click.native="accountSetting" divided>账户信息</el-dropdown-item>
              <el-dropdown-item @click.native="updatePassword">修改密码</el-dropdown-item>
              <el-dropdown-item @click.native="logout" divided>退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </li>
      </ul>
    </el-header>
    <el-container>
      <el-aside class="home-aside" style="width: 250px">
        <el-menu :default-active="$route.path"
                 style="height: 100%;" router>
          <el-menu-item index="/index">
            <i class="el-icon-menu"></i>
            <span slot="title">Dashboard</span>
          </el-menu-item>
          <el-submenu index="/cards">
            <template slot="title">
              <i class="el-icon-bank-card"></i>
              <span slot="title">卡片管理</span>
            </template>
            <el-menu-item index="/cards/list">卡片列表</el-menu-item>
            <el-menu-item index="/cards/transfer">划拨记录</el-menu-item>
          </el-submenu>
          <el-submenu index="/packages">
            <template slot="title">
              <i class="el-icon-document"></i>
              <span slot="title">套餐管理</span>
            </template>
            <el-menu-item index="/packages/system">系统套餐</el-menu-item>
            <el-menu-item index="/packages/list">我的套餐</el-menu-item>
            <el-menu-item index="/packages/distribution">套餐分配</el-menu-item>
          </el-submenu>
          <el-submenu index="/operators">
            <template slot="title">
              <i class="el-icon-s-platform"></i>
              <span slot="title">运营管理</span>
            </template>
            <el-menu-item index="/operators/a">营销活动</el-menu-item>
            <el-menu-item index="/operators/b">黑名单</el-menu-item>
            <el-menu-item index="/operators/c">分润</el-menu-item>
          </el-submenu>
          <el-submenu index="/orders">
            <template slot="title">
              <i class="el-icon-s-order"></i>
              <span slot="title">订单管理</span>
            </template>
            <el-menu-item index="/orders/card">卡片订单</el-menu-item>
            <el-menu-item index="/orders/card-pool">卡池订单</el-menu-item>
            <el-menu-item index="/orders/equipment">设备订单</el-menu-item>
          </el-submenu>
          <el-submenu index="/consumers">
            <template slot="title">
              <i class="el-icon-user"></i>
              <span slot="title">客户管理</span>
            </template>
            <el-menu-item index="/consumers/enterprises">企业客户</el-menu-item>
            <el-menu-item index="/consumers/users">用户档案</el-menu-item>
            <el-menu-item index="/consumers/roles">客户角色</el-menu-item>
            <el-menu-item index="/consumers/menu-authority">菜单权限</el-menu-item>
          </el-submenu>
          <el-submenu index="/reports">
            <template slot="title">
              <i class="el-icon-data-board"></i>
              <span slot="title">数据报表</span>
            </template>
            <el-menu-item index="/reports/card">卡片报表</el-menu-item>
            <el-menu-item index="/reports/user">用户报表</el-menu-item>
            <el-menu-item index="/reports/recharge">充值报表</el-menu-item>
          </el-submenu>
          <el-submenu index="/systems">
            <template slot="title">
              <i class="el-icon-setting"></i>
              <span slot="title">系统管理</span>
            </template>
            <el-menu-item index="/systems/account">账户设置</el-menu-item>
            <el-menu-item index="/systems/gzh">公众号配置</el-menu-item>
            <el-menu-item index="/systems/history">操作历史</el-menu-item>

          </el-submenu>
        </el-menu>

      </el-aside>
      <el-main>
        <div v-if="$route.path ==='/index'">
          <el-row :gutter="10">
            <el-col :span="6">
              <el-row :gutter="10">
                <el-col :span="24">
                  <el-card>
                    <div>
                      <div style="display: flex;justify-content: center">
                        <img src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" alt=""
                             style="width: 80px;height: 80px;border-radius: 80px">
                      </div>
                      <div style="margin-top:15px;font-size: 14px">
                        <el-form label-width="80px" size="mini">
                          <el-form-item label="公司名字:">
                            <span style="color: #303133;font-size: 16px">{{accountInfo.enterprise.name}}</span>
                          </el-form-item>
                          <el-form-item label="姓名:">
                            <span>{{accountInfo.fullName}}</span>
                          </el-form-item>
                          <el-form-item label="邮箱:">
                            {{accountInfo.email}}
                          </el-form-item>
                          <el-form-item label="登录名:">
                            {{accountInfo.username}}
                          </el-form-item>
                          <el-form-item label="联系号码:">
                            {{accountInfo.phone}}
                          </el-form-item>
                          <el-form-item label="公司地址:">
                            {{accountInfo.enterprise.address}}
                          </el-form-item>
                          <el-form-item label="公司法人:">
                            {{accountInfo.enterprise.legalPerson}}
                          </el-form-item>
                          <el-form-item label="公司号码:">
                            {{accountInfo.enterprise.phone}}
                          </el-form-item>
                          <el-form-item label="注册时间:">
                            {{accountInfo.createAt}}
                          </el-form-item>
                        </el-form>
                      </div>
                    </div>
                  </el-card>
                </el-col>
              </el-row>
            </el-col>
            <el-col :span="18">
              <el-row :gutter="10">
                <el-col :span="8">
                  <el-card>

                  </el-card>
                </el-col>
                <el-col :span="8">
                  <el-card>

                  </el-card>
                </el-col>
                <el-col :span="8">
                  <el-card>

                  </el-card>
                </el-col>
              </el-row>
              <el-row :gutter="10">
                <el-col :span="8">

                  <el-card>
                    <div slot="header">
                      <span>移动卡片状态</span>
                    </div>
                    <ve-pie :data="mobileCardData" :settings="chartSettings"></ve-pie>
                  </el-card>
                </el-col>
                <el-col :span="8">
                  <el-card>
                    <div slot="header">
                      <span>联通卡片状态</span>
                    </div>
                    <ve-pie :data="mobileCardData" :settings="chartSettings"></ve-pie>
                  </el-card>
                </el-col>
                <el-col :span="8">
                  <el-card>
                    <div slot="header">
                      <span>电信卡片状态</span>
                    </div>
                    <ve-pie :data="mobileCardData" :settings="chartSettings"></ve-pie>
                  </el-card>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
          <el-row :gutter="10">
            <el-col :span="24">
              <el-card>
                <div slot="header">
                  <span>卡片流量消耗</span>
                  <el-button-group style="float:right;">
                    <el-button type="primary" size="mini" @click="changeFlowChart('line')">折线</el-button>
                    <el-button type="success" size="mini" @click="changeFlowChart('histogram')">柱形</el-button>
                    <el-button type="warning" size="mini" @click="changeFlowChart('pie')">饼图</el-button>
                  </el-button-group>
                </div>
                <ve-chart :data="flowLineChartData" :settings="flowChartSetting" :extend="extend"></ve-chart>
              </el-card>
            </el-col>
          </el-row>
        </div>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
    export default {
        name: "Index",
        data() {
            this.chartSettings = {
                dataType: 'normal',
                label: '移动卡片',
                title: '移动卡片',
                text: '移动卡片'
            };
            this.extend = {
                series: {
                    label: {show: true, position: "top"}
                }
            };
            return {
                accountInfo: {
                    username: '',
                    userFace: '',
                    email: '',
                    fullName: '',
                    phone: '',
                    createAt: '',
                    enterprise: {
                        name: '',
                        address: '',
                        legalPerson: '',
                        phone: ''
                    }
                },
                usersTableData: [],
                mobileCardData: {
                    columns: ['status', 'count'],
                    rows: [
                        {'status': 'Activated', 'count': 100},
                        {'status': 'ActivateReady', 'count': 1000},
                        {'status': 'Disabled', 'count': 100}
                    ]
                },
                flowLineChartData: {
                    columns: ['日期', '移动', '联通', '电信'],
                    rows: [
                        {'日期': '08-01', '移动': 1000, '联通': 5000, '电信': 8000},
                        {'日期': '08-02', '移动': 3530, '联通': 3230, '电信': 2000},
                        {'日期': '08-03', '移动': 2923, '联通': 7000, '电信': 800},
                        {'日期': '08-04', '移动': 1723, '联通': 6000, '电信': 60000},
                        {'日期': '08-05', '移动': 3792, '联通': 36009, '电信': 890},
                        {'日期': '08-06', '移动': 4593, '联通': 80000, '电信': 8000},
                        {'日期': '08-07', '移动': 4593, '联通': 80000, '电信': 8000},
                        {'日期': '08-08', '移动': 4593, '联通': 80000, '电信': 8000},
                        {'日期': '08-09', '移动': 4593, '联通': 80000, '电信': 8000},
                        {'日期': '08-10', '移动': 4593, '联通': 80000, '电信': 8000},
                        {'日期': '08-11', '移动': 4593, '联通': 80000, '电信': 8000},
                        {'日期': '08-12', '移动': 4593, '联通': 80000, '电信': 8000},
                        {'日期': '08-13', '移动': 4593, '联通': 80000, '电信': 8000},
                        {'日期': '08-14', '移动': 4593, '联通': 80000, '电信': 8000},
                        {'日期': '08-15', '移动': 4593, '联通': 80000, '电信': 8000}
                    ]
                },
                flowChartSetting: {
                    type: 'line'
                }
            }
        },
        methods: {
            accountSetting() {
                this.$router.replace('/account-setting');
            },
            updatePassword() {
                this.$router.replace('/reset-password');
            },
            logout() {
                this.$confirm('此操作用户将退出登录, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$store.commit('logout');
                    this.$router.replace('/');
                }).catch(() => {
                });
            },
            initData() {
                const _this = this;
                _this.getRequest("/api/v1/users/current").then(response => {
                    const data = response.data.data;
                    console.log('当前用户信息:' + data);
                    _this.accountInfo.enterprise.name = data.enterprise.name;
                    _this.accountInfo.enterprise.address = data.enterprise.address;
                    _this.accountInfo.enterprise.legalPerson = data.enterprise.legalPerson;
                    _this.accountInfo.enterprise.phone = data.enterprise.phone;
                    _this.accountInfo.username = data.username;
                    _this.accountInfo.fullName = data.fullName;
                    _this.accountInfo.email = data.email;
                    _this.accountInfo.phone = data.enterprise.phone;
                    _this.accountInfo.createAt = data.enterprise.createAt;

                })
            },
            changeFlowChart(type) {
                this.flowChartSetting.type = type;
            }

        },
        mounted() {
            this.initData();
        }
    }
</script>

<style>
  .home-container {
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
  }

  .home-header {
    background-color: #20a0ff;
    /*background-color: #545c64;*/
    color: #333;
    text-align: left;
    height: 70px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    box-sizing: content-box;
  }

  .header-title {
    color: #fff;
    font-size: 22px;
    display: inline;
    margin-left: 8px;
  }

  .header-operations {
    display: inline-block;
    float: right;
    padding-right: 30px;
    height: 100%;
  }

  .header-operations li {
    color: #fff;
    display: inline-block;
    vertical-align: middle;
    /*padding: 0 10px;*/
    margin: 0 10px;
    line-height: 65px;
    cursor: pointer;
  }

  .home-aside {
    width: 200px;
  }
</style>
