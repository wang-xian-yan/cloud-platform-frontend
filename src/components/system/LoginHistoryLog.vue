<template>
  <div>
    <el-row>
      <el-table
        :data="loginHistoryTable"
        style="width: 100%"
        size="small"
        border>
        <el-table-column
          prop="username"
          label="登录名"
          width="120">
        </el-table-column>
        <el-table-column
          prop="token"
          label="登录token"
          :showOverflowTooltip=true
          width="180">
        </el-table-column>
        <el-table-column
          prop="ipAddress"
          label="登录IP"
          width="150">
        </el-table-column>
        <el-table-column
          prop="ipAddressInfo"
          label="IP地址信息"
          width="150">
        </el-table-column>
        <el-table-column
          prop="createAt"
          label="登录时间"
          width="140">
        </el-table-column>
      </el-table>
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
        name: "LoginHistories",
        data() {
            return {
                loginHistoryTable: [],
                currentPage: 1,
                totalElements: 0,
                pageSize: 15
            };
        },
        methods: {
            searchHistory() {
                const _this = this;
                const requestUrl =
                    "/api/v1/users/login-histories?page=" +
                    this.currentPage +
                    "&size=" +
                    this.pageSize;
                _this.getRequest(requestUrl).then(response => {
                    const data = response.data.data;
                    _this.loginHistoryTable = data.content;
                    _this.totalElements = data.totalElements;
                    _this.pageSize = data.size;
                    _this.currentPage = data.number + 1;
                });
            }, handleSizeChange(val) {
                this.pageSize = val;
                this.searchHistory();
            },
            handleCurrentChange(val) {
                this.currentPage = val;
                this.searchHistory();
            }
        },
        mounted() {
            this.searchHistory();
        }
    };
</script>

<style scoped>
</style>
