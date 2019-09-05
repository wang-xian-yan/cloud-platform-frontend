<template>
  <div>
    <el-row>
      <el-button type="danger" icon="el-icon-delete" size="small">批量删除</el-button>
      <el-button type="primary" icon="el-icon-plus" size="small" @click="showCreateMenuForm">新增菜单</el-button>
    </el-row>
    <!--    新建或修改菜单 -->
    <el-dialog :title="menuFormTitle" :visible.sync="menuFormVisible" width="40%">
      <el-form :model="menuForm" label-width="120px" size="small">
        <el-form-item label="编号" prop="id" v-if="menuForm==='update'">
          <el-input v-model="menuForm.id" size="small" disabled></el-input>
        </el-form-item>
        <el-form-item label="名字" prop="name">
          <el-input v-model="menuForm.name" size="small"></el-input>
        </el-form-item>
        <el-form-item label="路径" prop="path">
          <el-input v-model="menuForm.name" size="small"></el-input>
        </el-form-item>
        <el-form-item label="图标" prop="icon">
          <el-input v-model="menuForm.icon" size="small"></el-input>
        </el-form-item>
        <el-form-item label="标题" prop="title">
          <el-input v-model="menuForm.title" size="small"></el-input>
        </el-form-item>
        <el-form-item label="权限码" prop="permissionCode">
          <el-input v-model="menuForm.permissionCode" size="small"></el-input>
        </el-form-item>
        <el-form-item label="类型" prop="type">
          <el-radio-group v-model="menuForm.type">
            <el-radio label="1">页面</el-radio>
            <el-radio label="2">按钮</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="父级菜单" prop="parentId">
          <el-select v-model="menuForm.parentId" placeholder="请选择父级菜单" size="small">
            <el-option key="0" label="顶级菜单" value="0">
            </el-option>
            <!--            <el-option-->
            <!--              v-for="enterprise in enterprises"-->
            <!--              :key="enterprise.id"-->
            <!--              :label="enterprise.name"-->
            <!--              :value="enterprise.id">-->
            <!--            </el-option>-->
          </el-select>
        </el-form-item>
        <el-form-item label="是否admin可见" prop="adminVisible">
          <el-switch v-model="menuForm.adminVisible" active-color="#13ce66"
                     inactive-color="#ff4949">
          </el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelMenuForm" size="small">取 消</el-button>
        <el-button type="primary" @click="addMenu" v-if="menuFormType==='create'" size="small">添 加</el-button>
        <el-button type="primary" @click="editMenu" v-else-if="menuFormType==='update'" size="small">修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
    export default {
        name: "Menu",
        data() {
            return {
                menuFormVisible: false,
                menuFormType: 'create',
                menuFormTitle: '创建菜单',
                menuForm: {
                    id: null,
                    name: '',
                    path: '',
                    icon: '',
                    title: '',
                    parentId: null,
                    permissionCode: '',
                    type: null,
                    adminVisible: true
                }
            }
        },
        methods: {
            showCreateMenuForm() {
                this.menuFormVisible = true;
                this.menuFormTitle = '创建菜单';
                this.menuFormType = 'create';
            },
            cancelMenuForm() {
                this.menuFormVisible = false;
            },
            addMenu() {
                const _this = this;
                const params = {
                    name: _this.menuForm.name,
                    path: _this.menuForm.path,
                    icon: _this.menuForm.icon,
                    title: _this.menuForm.title,
                    parentId: _this.menuForm.parentId,
                    permissionCode: _this.menuForm.permissionCode,
                    type: _this.menuForm.type,
                    adminVisible: _this.menuForm.adminVisible
                };
                _this.postRequest('/api/v1/menus', params).then(response => {

                }).catch(error => {

                });
            },
            editMenu() {
            }
        }
    }
</script>

<style scoped>

</style>
