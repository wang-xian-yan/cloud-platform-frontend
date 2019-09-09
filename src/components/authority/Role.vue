<template>
  <div>
    <el-row>
      <el-button type="primary" size="small" icon="el-icon-plus" @click="showAddRoleForm">添加角色</el-button>
      <el-dialog
        :title="roleFormTitle"
        :visible.sync="roleFormVisible"
        width="50%">
        <el-steps :active="roleStepActive" finish-status="success" process-status="finish">
          <el-step title="角色信息" description="填写角色基本信息">
          </el-step>
          <el-step title="分配权限" description="给角色赋予权限">
          </el-step>
          <el-step title="信息确认" description="信息确认">
          </el-step>
        </el-steps>
        <el-form ref="form" :model="roleForm" label-width="80px" size="small" v-if="roleStepActive===0"
                 style="margin-top: 40px">
          <el-form-item label="角色名字">
            <el-input v-model="roleForm.name"></el-input>
          </el-form-item>
          <el-form-item label="角色描述" style="margin-top: 40px">
            <el-input v-model="roleForm.description"></el-input>
          </el-form-item>
        </el-form>
        <el-tree show-checkbox v-if="roleStepActive===1" style="margin-top: 40px"
                 :data="[{ label: '一级 1', children: [{ label: '二级 1-1', children: [{ label: '三级 1-1-1' }] }] }]"
                 :props=" { children: 'children', label: 'label' }"
                 @node-click="handleNodeClick(data)"></el-tree>
        <div v-if="roleStepActive===2">
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="cancelRoleForm" size="small">取消</el-button>
          <el-button @click="next" size="small" type="primary" icon="el-icon-next">保存并下一步</el-button>
        </span>
      </el-dialog>
    </el-row>
    <el-row>
      <el-form :inline=true :model="searchRoleForm" size="small">
        <el-form-item>
          <el-input v-model="searchRoleForm.condition" placeholder="角色名字/描述模糊查询"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="el-icon-search" @click="searchRole">搜索</el-button>
        </el-form-item>
      </el-form>
    </el-row>
    <el-row>
      <div style="display: flex;justify-content: space-around;flex-wrap: wrap;text-align: left">
        <el-card style="width: 300px;margin-bottom: 20px" v-for="role in roleTableData" :key="role.id">
          <el-form :inline="true" size="mini">
            <el-form-item label="角色名字:">
              <el-tag>{{role.name}}</el-tag>
            </el-form-item>
            <el-form-item label="角色介绍:">
              <label class="role-description">{{role.description}}</label>
            </el-form-item>
            <el-form-item label="创建时间:">
              <label class="role-description">{{role.createAt}}</label>
            </el-form-item>
            <el-form-item label="更新时间:">
              <label class="role-description">{{role.modifiedAt}}</label>
            </el-form-item>
          </el-form>
          <el-button type="info" size="mini" @click="showEditRoleForm(role)" icon="el-icon-edit">编辑</el-button>
          <el-button type="success" size="mini" @click="showRoleAuthorities(role)" icon="el-icon-s-goods">权限
          </el-button>
        </el-card>
      </div>
      <el-dialog
        :title="editRoleFormTitle"
        :visible.sync="editRoleFormVisible"
        width="30%">
        <el-form ref="editRoleForm" :model="editRoleForm" label-width="80px" size="small">
          <el-form-item label="编号:">
            <el-input v-model="editRoleForm.id" disabled=""></el-input>
          </el-form-item>
          <el-form-item label="名字:">
            <el-input v-model="editRoleForm.name"></el-input>
          </el-form-item>
          <el-form-item label="描述:">
            <el-input v-model="editRoleForm.description"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="editRoleFormVisible = false" size="small">取 消</el-button>
          <el-button type="primary" @click="editRole" size="small">确 定</el-button>
        </span>
      </el-dialog>
      <el-dialog
        :title="showRoleAuthoritiesTitle"
        :visible.sync="showRoleAuthoritiesVisible"
        width="35%">
        <el-tree
          :data="authorities"
          ref="authorities"
          show-checkbox
          node-key="id"
          default-expand-all
          :props="defaultProps">
        </el-tree>
        <span slot="footer" class="dialog-footer">
          <el-button @click="showRoleAuthoritiesVisible = false" size="small">取 消</el-button>
          <el-button type="primary" @click="roleAuthorize" size="small">确 定</el-button>
        </span>
      </el-dialog>
    </el-row>
    <el-row style="margin-top: 20px">
      <div style="text-align: center">
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
  </div>
</template>

<script>
    export default {
        name: "RoleIndex",
        data() {
            return {
                editRoleForm: {
                    id: '',
                    name: '',
                    description: ''
                },
                editRoleFormVisible: false,
                editRoleFormTitle: '',
                roleAuthorizeForm: {
                    roleId: null
                },
                haveAuthority: [],
                defaultProps: {
                    children: 'children',
                    label: 'label'
                },
                authorities: [],
                showRoleAuthoritiesTitle: '',
                showRoleAuthoritiesVisible: false,
                roleFormVisible: false,
                roleFormTitle: '新增角色',
                roleForm: {
                    name: '',
                    description: ''
                },
                roleStepActive: 0,
                roleTableData: [],
                loading: false,
                searchRoleForm: {
                    condition: ''
                },
                currentPage: 1,
                totalElements: 0,
                pageSize: 15,
            }
        },
        methods: {
            editRole() {
                const _this = this;
                const params = {
                    id: _this.editRoleForm.id,
                    name: _this.editRoleForm.name,
                    description: _this.editRoleForm.description
                };
                _this.putRequest('/api/v1/roles', params).then(response => {
                    _this.$message({
                        type: 'success',
                        showClose: true,
                        message: response.data.message
                    });
                    _this.editRoleFormVisible = false;
                    _this.searchRole();
                });
            },
            //展示修改角色表单
            showEditRoleForm(role) {
                this.editRoleFormTitle = '修改' + role.name + '';
                this.editRoleForm.id = role.id;
                this.editRoleForm.name = role.name;
                this.editRoleForm.description = role.description;
                this.editRoleFormVisible = true;
            },
            //角色授权
            roleAuthorize() {
                const authorities = this.$refs.authorities.getCheckedKeys().concat(this.$refs.authorities.getHalfCheckedKeys());
                const params = {
                    roleId: this.roleAuthorizeForm.roleId,
                    authorities: authorities
                };
                const _this = this;
                _this.postRequest('/api/v1/menus/role-authorize', params).then(response => {
                    _this.$message({
                        type: 'success',
                        message: '角色授权成功',
                        showClose: true
                    });
                    _this.showRoleAuthoritiesVisible = false;
                });
            },
            //展示角色权限
            showRoleAuthorities(row) {
                this.roleAuthorizeForm.roleId = row.id;
                this.authorities = [];
                this.showRoleAuthoritiesTitle = row.name;
                const _this = this;
                _this.getRequest('/api/v1/menus/have?roleId=' + row.id).then(response => {
                    let haveAuthority = response.data.data;
                    if (haveAuthority === null) {
                        haveAuthority = [];
                    }
                    _this.$refs.authorities.setCheckedKeys(haveAuthority);
                });
                _this.getRequest('/api/v1/menus/show-menus').then(response => {
                    _this.authorities = response.data.data;
                });
                this.showRoleAuthoritiesVisible = true;
            },
            showAddRoleForm() {
                this.roleFormVisible = true;
            },
            cancelRoleForm() {
                this.roleFormVisible = false;
            },
            next() {
                if (this.roleStepActive === 0) {
                    const params = {
                        name: this.roleForm.name,
                        description: this.roleForm.description
                    };
                    const _this = this;
                    this.postRequest('/api/v1/roles', params).then(response => {
                        const data = response.data;
                        console.info(data);
                        _this.$message({
                            message: '角色保存成功',
                            type: 'success'
                        });
                        _this.roleStepActive++;
                    }).catch(error => {
                        console.log(error);
                    });
                } else if (this.roleStepActive === 1) {
                }

            },
            searchRole() {
                const _this = this;
                _this.loading = true;
                let requestUrl = "/api/v1/roles/search?page=" + _this.currentPage + "&size=" + _this.pageSize;
                if (_this.searchRoleForm.condition !== '') {
                    requestUrl = requestUrl + "&condition=" + _this.searchRoleForm.condition;
                }
                _this.getRequest(requestUrl).then(function (response) {
                    const data = response.data.data;
                    _this.roleTableData = data.content;
                    _this.totalElements = data.totalElements;
                    _this.pageSize = data.size;
                    _this.currentPage = data.number + 1;
                    _this.loading = false;
                }).catch(error => {
                    console.error(error);
                    _this.loading = false;
                })
            },
            handleSizeChange(val) {
                this.pageSize = val;
                this.searchRole();
            },
            handleCurrentChange(val) {
                this.currentPage = val;
                this.searchRole();
            }
        },
        mounted() {
            this.searchRole();
        }
    }
</script>

<style scoped>
  .role-description {
    font-size: 13px;
    color: #999;
  }

  .bottom {
    margin-bottom: 15px;
    line-height: 12px;
  }
</style>
