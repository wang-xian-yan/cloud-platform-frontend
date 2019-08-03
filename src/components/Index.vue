<template>
  <el-container class="home-container">
    <el-header class="home-header">
      <span class="home-title">{{companies}}</span>
    </el-header>
    <el-container>
      <el-aside class="home-aside">
        <el-menu style="height: 100%">
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span slot="title">卡片管理</span>
            </template>
            <el-menu-item-group>
              <span slot="title">语音卡</span>
              <el-menu-item index="1-1-1">移动</el-menu-item>
              <el-menu-item index="1-1-2">联通</el-menu-item>
              <el-menu-item index="1-1-3">电信</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group>
              <span slot="title">流量卡</span>
              <el-menu-item index="1-2-1">移动</el-menu-item>
              <el-menu-item index="1-2-2">联通</el-menu-item>
              <el-menu-item index="1-2-3">电信</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-menu-item index="2">
            <i class="el-icon-menu"></i>
            <span slot="title">套餐管理</span>
          </el-menu-item>
          <el-menu-item index="3">
            <i class="el-icon-document"></i>
            <span slot="title">运营管理</span>
          </el-menu-item>
          <el-submenu index="4">
            <template slot="title">
              <i class="el-icon-setting"></i>
              <span slot="title">系统设置</span>
            </template>

            <el-menu-item index="4-1">操作历史</el-menu-item>
            <el-menu-item index="4-2">账户设置</el-menu-item>
            <el-menu-item index="4-3">公众号配置</el-menu-item>

          </el-submenu>
        </el-menu>

      </el-aside>
      <el-main>
        <el-table
          :data="tableUser"
          border
          style="width: 100%">
          <el-table-column
            fixed
            prop="id"
            label="id"
            width="80">
          </el-table-column>
          <el-table-column
            prop="email"
            label="邮件"
            width="200">
          </el-table-column>
          <el-table-column
            prop="username"
            label="用户名"
            width="120">
          </el-table-column>
          <el-table-column
            prop="createAt"
            label="创建时间"
            width="120">
          </el-table-column>
          <el-table-column
            prop="enabled"
            label="是否启用"
            width="120">
          </el-table-column>
          <!-- <el-table-column
            fixed="right"
            label="操作"
            width="100">
            <template slot-scope="scope">
              <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
              <el-button type="text" size="small">编辑</el-button>
            </template>
          </el-table-column> -->
        </el-table>
      </el-main>
    </el-container>
  </el-container>

</template>

<script>
    export default {
        data() {
            return {
                companies: '简易科技物联网云平台',
                tableUser: []
            }
        },
        methods: {
            listUser() {
                const _this = this;
                this.getRequest('/api/v1/users')
                    .then(function (response) {
                        const data = response.data;
                        _this.tableUser = data.data;
                    }).catch(error => {
                    console.log("login failure error" + error);
                });
            },
            logout() {
                this.$store.commit('logout');
                this.$router.replace('/')
            }
        },
        created() {
            this.listUser();
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

</style>
