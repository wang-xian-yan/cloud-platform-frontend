<template>
  <div>
    <el-row>
      <el-form ref="searchLogForm" :inline="true" :model="searchLogForm" label-width="80px" size="small">
        <el-form-item>
          <el-input v-model="searchLogForm.title" placeholder="支持标题模糊查询"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="searchLogForm.requestPayload" placeholder="支持负载模糊查询"></el-input>
        </el-form-item>
        <el-form-item>
          <el-date-picker
            v-model="searchLogForm.startTime"
            type="datetime"
            placeholder="选择开始时间"
            value-format="yyyy-MM-dd HH:mm:ss"
            align="right"
            :picker-options="pickerOptions">
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-date-picker
            v-model="searchLogForm.endTime"
            type="datetime"
            placeholder="选择结束时间"
            value-format="yyyy-MM-dd HH:mm:ss"
            align="right"
            :picker-options="pickerOptions">
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="el-icon-search" @click="searchLog">搜索</el-button>
        </el-form-item>
      </el-form>
    </el-row>
    <el-row>
      <el-table
        v-loading="loading"
        :data="operatorLogTable"
        border
        size="small"
        style="width: 100%">
        <el-table-column
          prop="id"
          label="编号"
          width="60">
        </el-table-column>
        <el-table-column
          prop="title"
          label="标题"
          :show-overflow-tooltip=true
          width="120">
        </el-table-column>
        <el-table-column
          prop="ipAddress"
          label="IP"
          width="130">
        </el-table-column>
        <el-table-column
          prop="requestMethod"
          label="请求方式"
          width="90">
        </el-table-column>
        <el-table-column
          prop="requestUri"
          label="请求路径"
          :show-overflow-tooltip=true
          width="200">
        </el-table-column>
        <el-table-column
          prop="queryString"
          label="请求参数"
          :show-overflow-tooltip=true
          width="180">
        </el-table-column>
        <el-table-column
          prop="requestPayload"
          label="请求负载"
          :show-overflow-tooltip=true
          width="180">
        </el-table-column>
        <el-table-column
          prop="useTime"
          label="耗时"
          width="85">
          <template slot-scope="scope">
            <el-tag type="success" size="small">{{scope.row.useTime}}ms</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          prop="createAt"
          label="操作时间"
          width="140">
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作">
          <template slot-scope="scope">
            <el-button size="mini" @click="queryInfo(scope.row)" type="primary">详情</el-button>
          </template>
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
        name: "OperatorLog",
        data() {
            return {
                loading: false,
                operatorLogTable: [],
                currentPage: 1,
                totalElements: 0,
                pageSize: 15,
                searchLogForm: {
                    requestPayload: '',
                    title: '',
                    startTime: '',
                    endTime: ''
                },
                pickerOptions: {
                    shortcuts: [{
                        text: '今天',
                        onClick(picker) {
                            picker.$emit('pick', new Date());
                        }
                    }, {
                        text: '昨天',
                        onClick(picker) {
                            const date = new Date();
                            date.setTime(date.getTime() - 3600 * 1000 * 24);
                            picker.$emit('pick', date);
                        }
                    }, {
                        text: '一周前',
                        onClick(picker) {
                            const date = new Date();
                            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
                            picker.$emit('pick', date);
                        }
                    }]
                }

            }
        },
        methods: {
            searchLog() {
                const _this = this;
                _this.loading = true;
                let requestUrl = '/api/v1/operator/logs/search?page=' + _this.currentPage + '&size=' + _this.pageSize;
                if (_this.searchLogForm.title !== '') {
                    requestUrl = requestUrl + '&title=' + _this.searchLogForm.title;
                }
                if (_this.searchLogForm.requestPayload !== '') {
                    requestUrl = requestUrl + '&requestPayload=' + _this.searchLogForm.requestPayload;
                }
                if (_this.searchLogForm.startTime !== '' && _this.searchLogForm.startTime !== null) {
                    requestUrl = requestUrl + '&startTime=' + _this.searchLogForm.startTime;
                }
                if (_this.searchLogForm.endTime !== '' && _this.searchLogForm.endTime !== null) {
                    requestUrl = requestUrl + '&endTime=' + _this.searchLogForm.endTime;
                }
                _this.getRequest(requestUrl).then(response => {
                    const data = response.data.data;
                    _this.operatorLogTable = data.content;
                    _this.totalElements = data.totalElements;
                    _this.pageSize = data.size;
                    _this.currentPage = data.number + 1;
                    _this.loading = false;
                }).catch(error => {
                    _this.loading = false;
                })
            }, handleSizeChange(val) {
                this.pageSize = val;
                this.searchLog();
            },
            handleCurrentChange(val) {
                this.currentPage = val;
                this.searchLog();
            }
        },
        mounted() {
            this.searchLog();
        }
    }
</script>

<style scoped>

</style>
