<template>
  <div class="login">
    <el-form :model="loginForm" :rules="rules" class="loginForm">
      <el-form-item prop="username">
        <el-input placeholder="邮箱" v-model="loginForm.username"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input placeholder="密码" type="password" v-model="loginForm.password"></el-input>
      </el-form-item>
      <el-form-item prop="verifyCode">
        <el-input placeholder="验证码" v-model="loginForm.verifyCode" style="width:70%"></el-input>
        <el-image :src="verifyCodeImgUrl" @click="getVerifyCodeUrl" style="vertical-align:middle"></el-image>
      </el-form-item>
      <el-input v-model="loginForm.verifyCodeId" type="hidden"></el-input>
      <el-form-item>
        <el-button type="primary" class="btn-long" @click="login" :loading="loading">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        loginForm: {
          username: "admin@cloud-platform.com",
          password: "admin",
          verifyCode: "",
          verifyCodeId: ""
        },
        rules: {
          username: [
            {required: true, message: "请输入用户名", trigger: "blur"}
          ],
          password: [{required: true, message: "请输入密码", trigger: "blur"}],
          verifyCode: [
            {required: true, message: "请输入验证码", trigger: "blur"}
          ]
        },
        show: true,
        test: "",
        verifyCodeImgUrl: "",
        loading: false
      };
    },
    methods: {
      login() {
        const _this = this;
        _this.loading = true;
        const params = {
          username: this.loginForm.username,
          password: this.loginForm.password,
          verifyCode: this.loginForm.verifyCode,
          verifyCodeId: this.loginForm.verifyCodeId
        };
        _this
          .postRequest("/login", params)
          .then(function (response) {
            const data = response.data;
            _this.loading = false;
            if (data.code === "200") {
              _this.$store.commit('login',data)
              _this.$router.replace("/index");
            }
          })
          .catch(error => {
            console.log("login failure error" + error);
            _this.loading = false;
          });
      },
      getVerifyCodeUrl() {
        this.getRequest("/api/v1/verify-code/url").then(response => {
          console.log(response);
          let imgUrl = response.data.data.imgUrl;
          let verifyCodeId = response.data.data.verifyCodeId;
          this.verifyCodeImgUrl = imgUrl;
          this.loginForm.verifyCodeId = verifyCodeId;
        });
      }
    },
    created() {
      this.getVerifyCodeUrl();
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .login {
    background-color: rgb(172, 41, 41);
    width: 100%;
    height: 100%;
  }

  .loginForm {
    top: 50%;
    left: 50%;
    width: 400px;
    position: absolute;
    transform: translate(-50%, -50%);
  }

  h1,
  h2 {
    font-weight: normal;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    display: inline-block;
    margin: 0 10px;
  }

  a {
    color: #42b983;
  }
</style>
