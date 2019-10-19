<template>
  <div class="login" :style="background">
    <div class="loginForm">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          请登录
        </div>
        <el-form :model="loginForm" :rules="rules" ref="loginForm" size="medium" @keyup.enter.native="login('loginForm')">
          <el-form-item prop="username">
            <el-input prefix-icon="el-icon-user" clearable placeholder="请输入用户名或邮箱"
                      v-model="loginForm.username"></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input size="medium" prefix-icon="el-icon-lock" clearable placeholder="请输入密码" type="password"
                      v-model="loginForm.password" show-password></el-input>
          </el-form-item>
          <el-form-item prop="verifyCode">
            <el-input placeholder="请输入验证码" v-model="loginForm.verifyCode" style="width:60%"></el-input>
            <a href="#"><el-image :src="verifyCodeImgUrl" @click="getVerifyCodeUrl"
                      style="vertical-align:middle;float: right"></el-image></a>
            <input v-model="loginForm.verifyCodeId" type="hidden"></input>
          </el-form-item>
          <el-form-item>
            <el-link type="success">注册账号</el-link>
            <el-link type="info"style="float:right;">忘记密码?</el-link>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" class="btn-long" @click="login('loginForm')" :loading="loading">登录</el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </div>
  </div>
</template>

<script>
    export default {
        data() {
            return {
                background: {
                    background: '',
                    backgroundSize: 'cover',
                    width: '100%',
                    position: 'fixed',
                    height: '100%'
                },
                loginForm: {
                    username: '',
                    password: '',
                    verifyCode: '',
                    verifyCodeId: ''
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
                            .then(response => {
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
                    let data = response.data.data;
                    let verifyCodeId = data.verifyCodeId;
                    this.verifyCodeImgUrl = _this.baseUrl + data.imgUrl;
                    this.loginForm.verifyCodeId = verifyCodeId;
                });
            },
            getBackgroundImage() {
                this.background.background = 'url("' + this.baseUrl + '/api/v1/files/background-image/preview' + '") no-repeat';
            }
        },
        mounted() {
            this.getBackgroundImage();
            this.getVerifyCodeUrl();
        }
    };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .login {
    background-size: cover;
    background-position: center;
    position: relative;
    width: 100%;
    height: 100%;
  }

  .loginForm {
    position: absolute;
    right: 160px;
    top: 50%;
    transform: translateY(-50%);
    width: 360px;
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
