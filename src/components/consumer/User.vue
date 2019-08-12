<template>
  <div>
    <el-row>
      <el-button-group>
        <el-button type="danger" icon="el-icon-delete" size="small">删除</el-button>
        <el-button type="warning" icon="el-icon-delete" size="small">禁用</el-button>
      </el-button-group>
      <el-button type="primary" icon="el-icon-plus" size="small" @click="userFormVisible = true">新增</el-button>
    </el-row>
    <el-row>
      <el-form ref="searchUserForm" :model="searchUserForm" :inline="true">
        <el-form-item>
          <el-input v-model="searchUserForm.condition" placeholder="支持用户名/邮箱模糊查询" size="small"></el-input>
        </el-form-item>
        <el-form-item label="归属企业">
          <el-select v-model="searchUserForm.enterpriseId" placeholder="请选择归属企业" size="small">
            <el-option
              v-for="enterprise in enterprises"
              :key="enterprise.id"
              :label="enterprise.name"
              :value="enterprise.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="el-icon-search" size="small" @click="searchUser">搜索</el-button>
        </el-form-item>
      </el-form>
    </el-row>

    <el-row>
      <el-table
        :data="usersTableData"
        style="width: 100%"
        border>
        <el-table-column
          type="selection"
          width="40">
        </el-table-column>
        <el-table-column
          fixed
          prop="id"
          label="id"
          width="80">
        </el-table-column>
        <el-table-column
          prop="email"
          label="邮件"
          :showOverflowTooltip=true
          width="220">
        </el-table-column>
        <el-table-column
          prop="username"
          label="登录名"
          :showOverflowTooltip=true
          width="150">
        </el-table-column>
        <el-table-column
          prop="fullName"
          label="姓名"
          :showOverflowTooltip=true
          width="150">
        </el-table-column>
        <el-table-column
          prop="enterprise.name"
          label="所属企业"
          :showOverflowTooltip=true
          width="150">
        </el-table-column>
        <el-table-column
          prop="createAt"
          label="创建时间"
          width="180">
        </el-table-column>
        <el-table-column
          prop="modifiedAt"
          label="更新时间"
          width="180">
        </el-table-column>
        <el-table-column
          prop="isEnabled"
          :formatter="formatEnabled"
          label="是否启用"
          width="120">
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="showEditUserForm(scope.row)">编辑</el-button>
            <el-button type="warning" size="mini" @click="showResetUserPassword(scope.row)">重置密码</el-button>
            <el-button type="danger" size="mini" @click="disableUser(scope.row)" v-if="scope.row.isEnabled">禁用
            </el-button>
            <el-button type="success" size="mini" @click="enabledUser(scope.row)" v-if="scope.row.isEnabled === false">
              启用
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-row>
    <el-row style="margin-top: 20px">
      <div style="text-align: right">
        <el-pagination
          background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[15, 50, 100, 500]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="totalElements">
        </el-pagination>
      </div>
    </el-row>
    <!-- 重置用户密码-->
    <el-dialog title="重置密码" :visible.sync="resetUserPasswordVisible" width="35%">
      <el-form :model="resetUserPasswordForm" :rules="resetUserPasswordFormRule" ref="resetUserPasswordFormData"
               label-width="100px">
        <el-form-item label="id" prop="id">
          <el-input v-model="resetUserPasswordForm.id" disabled></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="resetUserPasswordForm.email" disabled></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="newPassword">
          <el-input v-model="resetUserPasswordForm.newPassword"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="confirmPassword">
          <el-input v-model="resetUserPasswordForm.confirmPassword"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="resetUserPasswordVisible = false">取 消</el-button>
        <el-button type="primary" @click="resetUserPassword">确 定</el-button>
      </div>
    </el-dialog>
    <!--    新建或修改用户 -->
    <el-dialog :title="userFormTitle" :visible.sync="userFormVisible" width="35%">
      <el-form :model="userForm" label-width="80px">
        <el-form-item label="编号" prop="id" v-if="userFormType==='update'">
          <el-input v-model="userForm.id" size="small" disabled></el-input>
        </el-form-item>
        <el-form-item label="登录名" prop="username">
          <el-input v-model="userForm.username" size="small"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="userForm.email" size="small"></el-input>
        </el-form-item>
        <el-form-item label="姓名" prop="fullName">
          <el-input v-model="userForm.fullName" size="small"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password" v-if="userFormType==='create'">
          <el-input v-model="userForm.password" size="small"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="confirmPassword" v-if="userFormType==='create'">
          <el-input v-model="userForm.confirmPassword" size="small"></el-input>
        </el-form-item>
        <el-form-item label="企业" prop="enterprise.id">
          <el-select v-model="userForm.enterprise.id" placeholder="请选择归属企业" size="small">
            <el-option
              v-for="enterprise in enterprises"
              :key="enterprise.id"
              :label="enterprise.name"
              :value="enterprise.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="是否启用" prop="isEnabled">
          <el-switch v-model="userForm.isEnabled" active-color="#13ce66"
                     inactive-color="#ff4949">
          </el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="userFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addUser" v-if="userFormType==='create'">确 定</el-button>
        <el-button type="primary" @click="editUser" v-if="userFormType==='update'">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
    export default {
        name: "UserDocument",
        data() {
            return {
                usersTableData: [],
                userFormVisible: false,
                userFormType: 'create',
                userFormTitle: '创建用户',
                userForm: {
                    id: null,
                    username: '',
                    email: '',
                    fullName: '',
                    password: '',
                    confirmPassword: '',
                    parentId: null,
                    isEnabled: false,
                    enterprise: {
                        id: null
                    },
                    enterpriseName: '',
                    createAt: '',
                    modifiedAt: ''
                },
                resetUserPasswordVisible: false,
                resetUserPasswordForm: {
                    id: null,
                    email: '',
                    password: '',
                    newPassword: '',
                    confirmPassword: ''
                },
                resetUserPasswordFormRule: {
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
                currentPage: 1,
                totalElements: 0,
                pageSize: 15,
                searchUserForm: {
                    condition: '',
                    enterpriseId: null,
                },
                enterprises: []
            }
        },
        methods: {
            showEditUserForm(row) {
                const _this = this;
                _this.userFormVisible = true;
                _this.userFormType = 'update';
                _this.userFormTitle = '修改用户';
                _this.userForm.id = row.id;
                _this.userForm.email = row.email;
                _this.userForm.username = row.username;
                _this.userForm.fullName = row.fullName;
                _this.userForm.enterprise.id = row.enterprise.id;
                _this.userForm.isEnabled = row.isEnabled;
            },
            editUser() {
                const _this = this;
                const params = {
                    id: _this.userForm.id,
                    username: _this.userForm.username,
                    email: _this.userForm.email,
                    fullName: _this.userForm.fullName,
                    password: _this.userForm.password,
                    enterprise: _this.userForm.enterprise,
                    isEnabled: _this.userForm.isEnabled
                };
                _this.putRequest("/api/v1/users", params).then(function (response) {
                    _this.userFormVisible = false;
                    _this.searchUser();
                })
            },
            addUser() {
                const _this = this;
                _this.userFormType = 'create';
                _this.userFormTitle = '创建用户';
                _this.userFormVisible = true;
                const params = {
                    username: _this.userForm.username,
                    email: _this.userForm.email,
                    fullName: _this.userForm.fullName,
                    password: _this.userForm.password,
                    enterprise: _this.userForm.enterprise,
                    isEnabled: _this.userForm.isEnabled
                };
                console.log(params);
                _this.postRequest("/api/v1/users", params).then(function (response) {
                    console.log(response.data);
                    _this.userFormVisible = false;
                    _this.searchUser();
                })
            },
            listEnterprise() {
                const _this = this;
                let requestUrl = "/api/v1/enterprises";
                _this.getRequest(requestUrl).then(function (response) {
                    _this.enterprises = response.data.data;
                })

            },
            searchUser() {
                const _this = this;
                let requestUrl = "/api/v1/users/search?page=" + _this.currentPage + "&size=" + _this.pageSize;
                if (_this.searchUserForm.condition !== '') {
                    requestUrl = requestUrl + "&condition=" + _this.searchUserForm.condition;
                }
                _this.getRequest(requestUrl)
                    .then(function (response) {
                        const data = response.data.data;
                        _this.usersTableData = data.content;
                        _this.totalElements = data.totalElements;
                        _this.pageSize = data.size;
                        _this.currentPage = data.number + 1;

                    }).catch(error => {
                    console.log("search user error:" + error);
                });
            },
            formatEnabled(row, column) {
                return row.isEnabled ? "启用" : "未启用";
            },
            showResetUserPassword(row) {
                this.resetUserPasswordVisible = true;
                this.resetUserPasswordForm.id = row.id;
                this.resetUserPasswordForm.email = row.email;
                this.resetUserPasswordForm.password = row.password;
            },
            resetUserPassword() {
                const _this = this;
                const params = {
                    userId: _this.resetUserPasswordForm.id,
                    newPassword: _this.resetUserPasswordForm.newPassword,
                    confirmPassword: _this.resetUserPasswordForm.confirmPassword
                };
                _this.putRequest("/api/v1/users/reset-child-password", params).then(function (response) {
                    _this.$notify({
                        type: 'success',
                        message: response.data.message,
                        title: '重置下级密码'
                    });
                    _this.resetUserPasswordVisible = false;
                });
            },
            enabledUser(row) {
                this.$confirm('此操作用户将有登录操作权限, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'success'
                }).then(() => {
                    const _this = this;
                    _this.putRequest("/api/v1/users/" + row.id + "/activated").then(function (response) {
                        row.isEnabled = true;
                        _this.$message({
                            type: 'success',
                            message: '启用成功!'
                        });
                    }).catch(function (error) {
                        _this.$message({
                            type: 'warning',
                            message: '启用失败!'
                        });
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消启用'
                    });
                });
            },
            disableUser(row) {
                this.$confirm('此操作用户将不能登录, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    const _this = this;
                    _this.putRequest("/api/v1/users/" + row.id + "/disabled").then(function (response) {
                        row.isEnabled = false;
                        _this.$message({
                            type: 'success',
                            message: '禁用成功!'
                        });
                    }).catch(function (error) {
                        _this.$message({
                            type: 'warning',
                            message: '禁用失败!'
                        });
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消禁用'
                    });
                });
            },
            handleSizeChange(val) {
                this.pageSize = val;
                this.searchUser();
            },
            handleCurrentChange(val) {
                this.currentPage = val;
                this.searchUser();
            }
        },
        mounted() {
            this.listEnterprise();
            this.searchUser();
        }

    }
</script>
<style>

</style>



