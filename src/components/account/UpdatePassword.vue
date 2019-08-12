<template>
  <el-row>
    <el-col :span="8">
      <el-card>
        <div slot="header">
          <span>修改密码</span>
        </div>
        <div>
          <el-form ref="updatePasswordForm" :model="updatePasswordForm" :rules="updatePasswordFormRule"
                   label-width="80px">
            <el-form-item label="新密码" prop="newPassword">
              <el-input v-model="updatePasswordForm.newPassword" type="password"></el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="confirmPassword">
              <el-input v-model="updatePasswordForm.confirmPassword" type="password"></el-input>
            </el-form-item>
            <el-button type="primary" @click="resetPassword">修改密码</el-button>
          </el-form>
        </div>
      </el-card>
    </el-col>

  </el-row>
</template>

<script>
    export default {
        name: "UpdatePassword",
        data() {
            return {
                updatePasswordForm: {
                    newPassword: '',
                    confirmPassword: ''
                },
                updatePasswordFormRule: {
                    newPassword: [
                        {
                            required: true, message: '请输入新密码', trigger: 'blur'
                        },
                        {
                            min: 6, max: 20, message: '密码长度为6到20个字符', trigger: 'blur'
                        }
                    ],
                    confirmPassword: [
                        {
                            required: true, message: '请输入确认密码', trigger: 'blur'
                        },
                        {
                            min: 6, max: 20, message: '密码长度为6到20个字符', trigger: 'blur'
                        }
                    ]
                },
            }
        },
        methods: {
            resetPassword() {
                const _this = this;
                const params = {
                    newPassword: _this.updatePasswordForm.newPassword,
                    confirmPassword: _this.updatePasswordForm.confirmPassword
                };
                _this.putRequest("/api/v1/users/reset-password", params).then(function (reponse) {
                    console.log("response data" + reponse.data);
                    _this.$store.commit('logout');
                    _this.$router.replace('/');
                })
            }
        }
    }
</script>

<style scoped>
</style>
