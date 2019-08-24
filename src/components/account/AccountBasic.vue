<template>
  <el-row :gutter="30">
    <el-col :span="8">
      <el-card>
        <div slot="header">
          <span style="color: #3a8ee6; font-size: 18px">信息预览</span>
        </div>
        <div>
          <div style="display: flex;justify-content: center">
            <img :src="accountInfo.userFace" alt=""
                 style="width: 120px;height: 120px;">
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
    <el-col :span="16">
      <el-card class="box-card">
        <div slot="header">
          <span style="color: #3a8ee6; font-size: 18px">基本信息</span>
        </div>

        <el-form ref="accountInfo" :model="accountInfo" :rules="accountInfoRule" label-width="120px" size="small">
          <el-form-item label="头像">
            <el-upload
              class="avatar-uploader"
              :action="uploadUrl"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :headers="uploadHeader"
              :before-upload="beforeAvatarUpload">
              <img v-if="accountInfo.userFace" :src="accountInfo.userFace" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <el-form-item label="公司名称" prop="enterpriseName">
            <el-input v-model="accountInfo.enterprise.name"></el-input>
          </el-form-item>
          <el-form-item label="姓名" prop="fullName">
            <el-input v-model="accountInfo.fullName"></el-input>
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
            <el-input v-model="accountInfo.email"></el-input>
          </el-form-item>
          <el-form-item label="用户名" prop="username">
            <el-input v-model="accountInfo.username"></el-input>
          </el-form-item>
          <el-form-item label="联系电话" prop="phone">
            <el-input v-model="accountInfo.phone"></el-input>
          </el-form-item>
          <el-form-item label="公司地址" prop="enterpriseAddress">
            <el-input v-model="accountInfo.enterprise.address"></el-input>
          </el-form-item>
          <el-form-item label="公司法人" prop="enterpriseLegalPerson">
            <el-input v-model="accountInfo.enterprise.legalPerson"></el-input>
          </el-form-item>
          <el-form-item label="公司联系电话" prop="enterprisePhone">
            <el-input v-model="accountInfo.enterprise.phone"></el-input>
          </el-form-item>
          <el-form-item label="注册时间" prop="createAt">
            <el-input v-model="accountInfo.createAt" disabled=""></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary">更新信息</el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </el-col>
  </el-row>

</template>

<script>
    export default {
        name: "AccountSetting",
        data() {
            return {
                uploadUrl: '',
                uploadHeader: {
                    Authorization: this.$store.state.user.token
                },
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
                },
                accountInfoRule: {
                    username: [
                        {required: true, message: '请输入用户名', trigger: 'blur'},
                    ],
                    email: [
                        {required: true, message: '请输入邮箱', trigger: 'blur'},
                    ],
                    fullName: [
                        {required: true, message: '请输入真实姓名', trigger: 'blur'},
                    ],
                    phone: [
                        {required: true, message: '请输入电话号码', trigger: 'blur'},
                    ],
                    enterpriseName: [
                        {required: true, message: '请输入公司名', trigger: 'blur'},
                    ],
                    enterpriseAddress: [
                        {required: true, message: '请输入公司地址', trigger: 'blur'},
                    ],
                    enterpriseLegalPerson: [
                        {required: true, message: '请输入公司法人', trigger: 'blur'},
                    ],
                    enterprisePhone: [
                        {required: true, message: '请输入公司联系号码', trigger: 'blur'},
                    ]
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
                    _this.accountInfo.userFace = _this.baseUrl + data.userFace;

                });
                this.uploadUrl = this.baseUrl + '/api/v1/users/upload-face';
            },
            handleAvatarSuccess(res, file) {
                console.log("res" + res);
                console.log("file" + file);
                this.accountInfo.userFace = URL.createObjectURL(file.raw);
            },
            beforeAvatarUpload(file) {
                const isJPG = file.type === 'image/jpeg';
                const isLt2M = file.size / 1024 / 1024 < 2;

                if (!isJPG) {
                    this.$message.error('上传头像图片只能是 JPG 格式!');
                }
                if (!isLt2M) {
                    this.$message.error('上传头像图片大小不能超过 2MB!');
                }
                return isJPG && isLt2M;
            }
        },
        mounted() {
            this.initData();
        }
    }
</script>

<style scoped>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }

  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }

  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 150px;
    height: 150px;
    line-height: 150px;
    text-align: center;
  }

  .avatar {
    width: 150px;
    height: 150px;
    display: block;
  }
</style>
