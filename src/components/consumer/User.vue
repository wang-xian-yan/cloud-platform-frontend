<template>
  <el-container>
    <el-header>
      <el-button-group>
        <el-button type="danger" icon="el-icon-delete" size="medium">删除</el-button>
        <el-button type="primary" icon="el-icon-delete" size="medium">禁用</el-button>
      </el-button-group>
    </el-header>
    <el-main>
      <el-table
        :data="tableUser"
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
          label="用户名"
          :showOverflowTooltip=true
          width="150">
        </el-table-column>
        <el-table-column
          prop="password"
          label="密码"
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
            <el-button type="primary" size="small">查看</el-button>
            <el-button type="success" size="small" @click="editUserForm = true">编辑</el-button>
            <el-button type="danger" size="small" @click="disableUser">禁用</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-dialog title="修改用户" :visible.sync="editUserForm">
        <div slot="footer" class="dialog-footer">
          <el-button @click="editUserForm = false">取 消</el-button>
          <el-button type="primary" @click="editUserForm = false">确 定</el-button>
        </div>
      </el-dialog>
      <div>
        <el-pagination
          background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[1, 50, 100, 500]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="totalElements">
        </el-pagination>
      </div>
    </el-main>
  </el-container>
</template>

<script>
    export default {
        name: "UserDocument",
        data() {
            return {
                tableUser: [],
                editUserForm: false,
                currentPage: 1,
                totalElements: 0,
                pageSize: 1

            }
        },
        methods: {
            searchUser() {
                const _this = this;
                const requestUrl = "/api/v1/users/search?page=" + _this.currentPage + "&size=" + _this.pageSize;
                this.getRequest(requestUrl)
                    .then(function (response) {
                        const data = response.data.data;
                        _this.tableUser = data.content;
                        _this.totalElements = data.totalElements;
                        _this.pageSize = data.size;
                        _this.currentPage = data.number + 1;

                    }).catch(error => {
                    console.log("login failure error" + error);
                });
            },
            formatEnabled(row, column) {
                return row.isEnabled ? "启用" : "未启用";
            },
            disableUser() {
                this.$confirm('此操作用户将不能登录, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$message({
                        type: 'success',
                        message: '禁用成功!'
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
            this.searchUser();
        }

    }
</script>



