<template>
  <el-container class="home-container">
    <el-header class="home-header">
      <div>
        <span class="home-title">{{companies}}</span>
      </div>
      <div class="home-user">
        <el-dropdown>
          <span class="el-dropdown-link">

             <el-avatar v-if="userFace!==''" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
                        style="vertical-align: middle"></el-avatar>
            <el-avatar v-if="userFace===''" icon="el-icon-user-solid"
                       style="vertical-align: middle"></el-avatar>
            <i class="el-icon-caret-bottom">
            </i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>
              登录用户是:{{username}}
            </el-dropdown-item>
            <el-dropdown-item divided>个人中心</el-dropdown-item>
            <el-dropdown-item>设置</el-dropdown-item>
            <el-dropdown-item @click.native="logout" divided>退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </el-header>
    <el-container>
      <el-aside class="home-aside">
        <el-menu :default-active="$route.path" style="height: 100%" router>

          <el-menu-item index="/index">
            <i class="el-icon-menu"></i>
            <span slot="title">Dashboard</span>
          </el-menu-item>
          <el-submenu index="/card-manager">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span slot="title">卡片管理</span>
            </template>
            <el-menu-item index="/card-manager/card">卡片列表</el-menu-item>
            <el-menu-item index="/card-manager/transfer">划拨记录</el-menu-item>
          </el-submenu>
          <el-submenu index="/package-manager">
            <template slot="title">
              <i class="el-icon-document"></i>
              <span slot="title">套餐管理</span>
            </template>
            <el-menu-item index="/package-manager/system">系统套餐</el-menu-item>
            <el-menu-item index="/package-manager/me">我的套餐</el-menu-item>
            <el-menu-item index="/package-manager/distribution">套餐分配</el-menu-item>
          </el-submenu>
          <el-submenu index="/operator-manager">
            <template slot="title">
              <i class="el-icon-document"></i>
              <span slot="title">运营管理</span>
            </template>
            <el-menu-item index="/operator-manager/a">营销活动</el-menu-item>
            <el-menu-item index="/operator-manager/b">黑名单</el-menu-item>
            <el-menu-item index="/operator-manager/c">分润</el-menu-item>
          </el-submenu>
          <el-submenu index="/user-manager">
            <template slot="title">
              <i class="el-icon-user"></i>
              <span slot="title">客户管理</span>
            </template>
            <el-menu-item index="/user-manager/documents">用户档案</el-menu-item>
            <el-menu-item index="/user-manager/roles">客户角色</el-menu-item>
            <el-menu-item index="/user-manager/menu-authority">菜单权限</el-menu-item>
          </el-submenu>
          <el-submenu index="/system-setting">
            <template slot="title">
              <i class="el-icon-setting"></i>
              <span slot="title">系统管理</span>
            </template>
            <el-menu-item index="/system-setting/account">账户设置</el-menu-item>
            <el-menu-item index="/system-setting/gzh">公众号配置</el-menu-item>
            <el-menu-item index="/system-setting/operator-history">操作历史</el-menu-item>

          </el-submenu>
        </el-menu>

      </el-aside>
      <el-main>
        <div v-if="$route.path ==='/index'">
          <div>
            数据监控
          </div>
          <div id="line-chart">

          </div>
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
            return {
                companies: '简易科技物联网云平台',
                username: '',
                userFace: '',
                tableUser: []
            }
        },
        methods: {
            logout() {
                this.$store.commit('logout');
                this.$router.replace('/')
            },
            initData() {
                this.username = this.$store.state.user.username;
                this.userFace = this.$store.state.user.userFace;
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
    color: #333;
    text-align: left;
    line-height: 60px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    box-sizing: content-box;
  }

  .home-title {
    color: #fff;
    font-size: 22px;
    display: inline;
    margin-left: 8px;
  }

  .home-user {
    color: #fff;
    margin-right: 50px;
  }
</style>
