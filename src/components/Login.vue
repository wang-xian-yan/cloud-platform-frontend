<template>
  <div class="login">

    <div class="loginForm">
      <div style="text-align: center;font-size: 22px;color: white ">
        <span>平台登录</span>
      </div>

      <el-form :model="loginForm" :rules="rules" ref="loginForm">
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
          <el-button type="primary" class="btn-long" @click="login('loginForm')" :loading="loading">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
    export default {
        data() {
            return {
                loginForm: {
                    username: "admin@cloud-platform.com",
                    password: "admin123",
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
                verifyCodeImgUrl: "",
                loading: false
            };
        },
        methods: {
            login(loginForm) {
                this.$refs[loginForm].validate((valid) => {
                    if (valid) {
                        const _this = this;
                        _this.loading = true;
                        const params = {
                            username: this.loginForm.username,
                            password: this.loginForm.password,
                            verifyCode: this.loginForm.verifyCode,
                            verifyCodeId: this.loginForm.verifyCodeId
                        };
                        _this.postRequest("/login", params)
                            .then(function (response) {
                                const data = response.data;
                                _this.loading = false;
                                if (data.code === "200") {
                                    _this.$store.commit('login', data);
                                    const path = _this.$route.query.redirect;
                                    _this.$router.replace({path: path === '/' || path === undefined ? '/index' : path});
                                }
                            })
                            .catch(error => {
                                console.log("login failure error:" + error);
                                _this.loading = false;
                            });
                    } else {
                        return false;
                    }
                });

            },
            getVerifyCodeUrl() {
                const _this = this;
                _this.getRequest("/api/v1/verify-code/url").then(response => {
                    console.log(response);
                    let imgUrl = response.data.data.imgUrl;
                    let verifyCodeId = response.data.data.verifyCodeId;
                    this.verifyCodeImgUrl = _this.baseUrl + imgUrl;
                    this.loginForm.verifyCodeId = verifyCodeId;
                });
            }
        },
        mounted() {
            this.getVerifyCodeUrl();
        }
    };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .login {
    left: 0;
    background: url("../assets/bg.jpg") no-repeat;
    background-size: cover;
    width: 100%;
    position: fixed;
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
