<template>
  <el-container style="height: 100%;">
    <el-aside width="auto">
      <el-scrollbar class="default-scrollbar" wrap-class="default-scrollbar__wrap" view-class="default-scrollbar__view">
        <div class="app-logo">
          <a href="/">
            <span class="app-logo-icon"></span>
            <span
              class="app-logo-text" v-if="!isCollapse">{{accountInfo.enterprise.name}}
            </span>
          </a>
        </div>
        <el-menu :default-active="$route.path"
                 style="border-right: 0"
                 :collapse="isCollapse"
                 background-color="#304156"
                 text-color="#bfcbd9"
                 active-text-color="#409EFF"
                 class="el-menu-vertical-demo"
                 :collapse-transition=false
                 :unique-opened=false
                 router>
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
            <el-menu-item index="/consumers/on-line">在线用户</el-menu-item>
          </el-submenu>
          <el-submenu index="/authorities">
            <template slot="title">
              <i class="el-icon-s-goods"></i>
              <span slot="title">权限管理</span>
            </template>
            <el-menu-item index="/authorities/menus">菜单配置</el-menu-item>
            <el-menu-item index="/authorities/roles">角色管理</el-menu-item>
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
            <el-menu-item index="/systems/gzh">公众号配置</el-menu-item>
            <el-menu-item index="/systems/login-history">登录历史</el-menu-item>
            <el-menu-item index="/systems/property-setting">属性设置</el-menu-item>
            <el-menu-item index="/systems/email-send">邮件发送</el-menu-item>
          </el-submenu>
        </el-menu>
      </el-scrollbar>

    </el-aside>
    <el-container>
      <el-header style="height: 50px;" class="navbar">
        <div class="home-header">
          <el-button :icon="isCollapseIcon" @click="handlerIsCollapse" size="small"></el-button>
          <div class="right-menu">
            <router-link to="/"><i class="active el-icon-s-home"></i></router-link>
            <router-link to="/messages"><i class="el-icon-message-solid"></i></router-link>
            <div>
              <el-dropdown class="avatar-container" trigger="click">
                <div class="avatar-wrapper">
                  <img src="../assets/face_image_1.jpeg" class="user-avatar">
                  <i class="el-icon-caret-bottom"/>
                </div>

                <el-dropdown-menu slot="dropdown" class="user-dropdown">
                  <el-dropdown-item v-if="accountInfo.fullName!==''">
                    登录用户是:{{accountInfo.fullName}}
                  </el-dropdown-item>
                  <el-dropdown-item v-else-if="accountInfo.username!==''">
                    登录用户是:{{accountInfo.username}}
                  </el-dropdown-item>
                  <el-dropdown-item v-else>
                    登录用户是:{{accountInfo.email}}
                  </el-dropdown-item>
                  <router-link to="/account-basic">
                    <el-dropdown-item>
                      账户信息
                    </el-dropdown-item>
                  </router-link>
                  <router-link to="/reset-password">
                    <el-dropdown-item>修改密码</el-dropdown-item>
                  </router-link>
                  <a target="_blank" href="https://panjiachen.github.io/vue-element-admin-site/#/">
                    <el-dropdown-item>Docs</el-dropdown-item>
                  </a>
                  <el-dropdown-item divided>
                    <span style="display:block;" @click="logout">退出登录</span>
                  </el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>

            </div>
          </div>
        </div>
      </el-header>
      <el-scrollbar class="default-scrollbar" wrap-class="default-scrollbar__wrap" view-class="default-scrollbar__view">
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
        <el-footer>
          Footer
        </el-footer>
      </el-scrollbar>
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
                isCollapse: false,
                isCollapseIcon: 'el-icon-s-fold',
                accountInfo: {
                    username: '',
                    userFace: '../assets/face_image_1.jpeg',
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
            handlerIsCollapse() {
                let flag = true;
                flag = !this.isCollapse;
                if (flag) {
                    this.isCollapse = true;
                    this.isCollapseIcon = 'el-icon-s-unfold';
                } else {
                    this.isCollapse = false;
                    this.isCollapseIcon = 'el-icon-s-fold';
                }
            },
            accountBasic() {
                this.$router.replace('/account-basic');
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
  .default-scrollbar {
    width: 100%;
    height: 100%;
  }

  .flex-scrollbar {
    width: auto;
    height: auto;
    -webkit-box-flex: 1;
    -ms-flex: 1;
    flex: 1;
  }

  .el-scrollbar__wrap.default-scrollbar__wrap {
    overflow-x: auto;
  }

  .el-scrollbar__view.p20-scrollbar__view {
    padding: 20px;
    box-sizing: border-box;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    -o-box-sizing: border-box;
    -ms-box-sizing: border-box;
  }

  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 210px;
    height: 100%;
  }

  .el-aside {
    background-color: #304156;
    color: #333;
  }

  .el-header {
    background-color: #fff;
    color: black;
  }

  .navbar {
    height: 50px;
    line-height: 50px;
    box-shadow: 0 1px 4px rgba(0, 21, 41, .08);
  }

  .right-menu {
    margin-right: 40px;
    display: flex;
    float: right;
    font-family: Futura, Helvetica Neue For Number, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, PingFang SC, Hiragino Sans GB, Microsoft YaHei, Helvetica Neue, Helvetica, Arial, sans-serif;
    white-space: nowrap;
    -webkit-transition: padding .3s;
    transition: padding .3s;
  }

  .right-menu a {
    text-align: center;
    margin: 0 20px;
    cursor: pointer;
    text-decoration: none;
    outline: none;
    -webkit-transition: color .2s ease;
    transition: color .2s ease;
  }

  a {
    color: black;
    cursor: pointer;
    text-decoration: none;
    outline: none;
    -webkit-transition: color .2s ease;
    transition: color .2s ease;
  }

  .avatar-wrapper {
    margin-left: 10px;
    margin-top: 5px;
    position: relative;
  }

  .user-avatar {
    cursor: pointer;
    width: 40px;
    height: 40px;
    border-radius: 10px;
  }

  .el-icon-caret-bottom {
    cursor: pointer;
    position: absolute;
    right: -20px;
    top: 25px;
    font-size: 12px;
  }

  .app-logo {
    font-family: Futura, Helvetica Neue For Number, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, PingFang SC, Hiragino Sans GB, Microsoft YaHei, Helvetica Neue, Helvetica, Arial, sans-serif;
    padding-left: 24px;
    line-height: 50px;
    height: 50px;
    overflow: hidden;
    white-space: nowrap;
    -webkit-transition: padding .3s;
    transition: padding .3s;
  }

  .app-logo .app-logo-icon {
    background-image: url("../assets/logo.png");
    background-size: contain;
    height: 20px;
    width: 20px;
    display: inline-block;
    margin-right: 0;
    -webkit-transition: .3s;
    transition: .3s;
    vertical-align: middle;
  }

  .app-logo .app-logo-text {
    font-size: 20px;
    vertical-align: middle;
  }

  .app-logo a {
    color: white;
    cursor: pointer;
    text-decoration: none;
    outline: none;
    -webkit-transition: color .2s ease;
    transition: color .2s ease;
  }
</style>
