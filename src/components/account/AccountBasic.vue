<template>
  <el-row :gutter="10">
    <el-col :span="8">
      <el-card>
        <div>
          <div style="display: flex;justify-content: center">
            <img src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" alt=""
                 style="width: 120px;height: 120px;border-radius: 120px">
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

</template>

<script>
    export default {
        name: "AccountSetting",
        data() {
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
                }
            }
        },
        methods: {
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
            }
        },
        mounted() {
            this.initData();
        }
    }
</script>

<style scoped>

</style>
