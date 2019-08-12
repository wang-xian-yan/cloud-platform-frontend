<template>
  <el-card>
    <div slot="header">
      <span>账户信息</span>
    </div>
    <div>
      <el-row>
        <el-col :span="8">
          <el-form ref="accountForm" :model="accountForm" label-width="80px" size="mini">
            <el-form-item label="公司名字:">
              <span style="color: #303133;font-size: 16px">{{accountForm.enterprise.name}}</span>
            </el-form-item>
            <el-form-item label="姓名:">
              <span>{{accountForm.fullName}}</span>
            </el-form-item>
            <el-form-item label="邮箱:">
              {{accountForm.email}}
            </el-form-item>
            <el-form-item label="登录名:">
              {{accountForm.username}}
            </el-form-item>
            <el-form-item label="联系号码:">
              {{accountForm.phone}}
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :span="8">

        </el-col>
        <el-col :span="8">

        </el-col>

      </el-row>
    </div>
  </el-card>
</template>

<script>
    export default {
        name: "AccountInfo",
        data() {
            return {
                accountForm: {
                    enterprise: {
                        name: '长沙蜜獾信息科技有限公司'
                    },
                    username: 'admin',
                    fullName: '丁亮',
                    email: 'wangxian@wuxingkj.cn',
                    phone: '15802560356'
                }
            }
        }
    }
</script>

<style scoped>

</style>
