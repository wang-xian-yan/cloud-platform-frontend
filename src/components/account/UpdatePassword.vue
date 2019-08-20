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
            <el-form-item label="当前密码" prop="oldPassword">
              <el-input v-model="updatePasswordForm.oldPassword" type="password" autocomplete="off" show-password></el-input>
            </el-form-item>
            <el-form-item label="新密码" prop="newPassword">
              <el-input v-model="updatePasswordForm.newPassword" type="password" autocomplete="off" show-password></el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="confirmPassword">
              <el-input v-model="updatePasswordForm.confirmPassword" type="password" autocomplete="off" show-password></el-input>
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
                    oldPassword: '',
                    newPassword: '',
                    confirmPassword: ''
                },
                updatePasswordFormRule: {
                    oldPassword: [
                        {
                            required: true, message: '请输入新密码', trigger: 'blur'
                        },
                        {
                            min: 6, max: 20, message: '密码长度为6到20个字符', trigger: 'blur'
                        }
                    ],
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
                this.$refs.updatePasswordForm.validate(valid=>{
                    if (valid){
                        const _this = this;
                        const params = {
                            oldPassword: _this.updatePasswordForm.oldPassword,
                            newPassword: _this.updatePasswordForm.newPassword,
                            confirmPassword: _this.updatePasswordForm.confirmPassword
                        };
                        _this.putRequest("/api/v1/users/reset-password", params).then(function (response) {
                            console.log("response data" + response.data);
                            _this.$store.commit('logout');
                            _this.$router.replace('/');
                        }).catch(error => {
                            console.log("error:" + error.response);
                        })
                    }else {
                        return false;
                    }
                });

            }
        }
    }
</script>

<style scoped>
</style>
