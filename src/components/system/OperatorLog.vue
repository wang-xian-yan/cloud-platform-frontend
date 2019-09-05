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
          <template slot-scope="scope">
            <el-tag type="danger" size="mini">{{scope.row.ipAddress}}</el-tag>
          </template>
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
          prop="operatorSystem"
          label="操作系统"
          :show-overflow-tooltip=true
          width="150">
        </el-table-column>
        <el-table-column
          prop="useTime"
          label="耗时"
          width="85">
          <template slot-scope="scope">
            <el-tag type="success" size="mini">{{scope.row.useTime}}ms</el-tag>
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
            <el-button size="mini" @click="queryDetail(scope.row)" type="info" icon="el-icon-document">详情</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-dialog
        title="操作详情"
        :visible.sync="infoVisible"
        width="40%">
        <el-form ref="operatorLogForm" :model="operatorLogForm" label-width="100px" size="mini">
          <el-form-item label="名称:">
            {{operatorLogForm.title}}
          </el-form-item>
          <el-form-item label="操作人:">
            {{operatorLogForm.username}}
          </el-form-item>
          <el-form-item label="请求方式:">
            <el-tag size="mini"> {{operatorLogForm.requestMethod}}
            </el-tag>
          </el-form-item>
          <el-form-item label="请求地址:">
            {{operatorLogForm.requestUri}}
          </el-form-item>
          <el-form-item label="请求参数:">
            {{operatorLogForm.queryString}}
          </el-form-item>
          <el-form-item label="请求负载:">
            {{operatorLogForm.requestPayload}}
          </el-form-item>
          <el-form-item label="IP地址:">
            <el-tag type="danger" size="mini"> {{operatorLogForm.ipAddress}}
            </el-tag>
          </el-form-item>
          <el-form-item label="操作系统:">
            {{operatorLogForm.operatorSystem}}
          </el-form-item>
          <el-form-item label="浏览器:">
            {{operatorLogForm.browser}}
          </el-form-item>
          <el-form-item label="用户代理:">
            {{operatorLogForm.userAgent}}
          </el-form-item>
          <el-form-item label="请求时间:">
            {{operatorLogForm.createAt}}
          </el-form-item>
          <el-form-item label="请求耗时:">
            <el-tag type="success" size="small">{{operatorLogForm.useTime}}ms</el-tag>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="infoVisible = false" size="small">关 闭</el-button>
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
                operatorLogForm: {
                    createAt: '',
                    modifiedAt: '',
                    id: '',
                    username: '',
                    idAddress: '',
                    requestMethod: '',
                    userAgent: '',
                    operatorSystem: '',
                    browser: '',
                    requestUri: '',
                    queryString: '',
                    requestPayload: '',
                    title: '',
                    useTime: ''
                },
                infoVisible: false,
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
            queryDetail(row) {
                this.infoVisible = true;
                this.operatorLogForm.title = row.title;
                this.operatorLogForm.username = row.username;
                this.operatorLogForm.requestMethod = row.requestMethod;
                this.operatorLogForm.requestUri = row.requestUri;
                this.operatorLogForm.queryString = row.queryString;
                this.operatorLogForm.requestPayload = row.requestPayload;
                this.operatorLogForm.operatorSystem = row.operatorSystem;
                this.operatorLogForm.browser = row.browser;
                this.operatorLogForm.userAgent = row.userAgent;
                this.operatorLogForm.createAt = row.createAt;
                this.operatorLogForm.useTime = row.useTime;
                this.operatorLogForm.ipAddress = row.ipAddress;
            },
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
