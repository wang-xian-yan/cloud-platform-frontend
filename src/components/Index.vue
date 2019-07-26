<template>
  <el-container class="home-container">
    <el-header class="home-header">
      <span class="home-title">云平台</span>
    </el-header>
    <el-container>
      <el-aside class="home-aside">
        <el-menu default-active="1-4-1" style="height: 100%">
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span slot="title">导航一</span>
            </template>
            <el-menu-item-group>
              <span slot="title">分组一</span>
              <el-menu-item index="1-1">选项1</el-menu-item>
              <el-menu-item index="1-2">选项2</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="分组2">
              <el-menu-item index="1-3">选项3</el-menu-item>
            </el-menu-item-group>
            <el-submenu index="1-4">
              <span slot="title">选项4</span>
              <el-menu-item index="1-4-1">选项1</el-menu-item>
            </el-submenu>
          </el-submenu>
          <el-menu-item index="2">
            <i class="el-icon-menu"></i>
            <span slot="title">导航二</span>
          </el-menu-item>
          <el-menu-item index="3">
            <i class="el-icon-document"></i>
            <span slot="title">导航三</span>
          </el-menu-item>
          <el-menu-item index="4">
            <i class="el-icon-setting"></i>
            <span slot="title">导航四</span>
          </el-menu-item>
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
        msg: 'Welcome to Your Vue.js App',
        tableUser: []
      }
    },
    methods: {
      listUser(){
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
