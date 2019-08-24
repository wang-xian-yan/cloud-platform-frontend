<template>
  <div>
    <el-row :gutter="10">
      <el-button type="primary" size="small" @click="uploadVisible=true">上传文件</el-button>
      <el-dialog
        title="上传文件"
        :visible.sync="uploadVisible"
        width="30%">
        <el-upload
          class="upload-demo"
          style="width: 100%"
          drag
          :action="uploadUrl"
          :headers="uploadHeader"
          :on-success="handleUploadSuccess"
          multiple>
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        </el-upload>
      </el-dialog>

    </el-row>
    <el-row :gutter="10">
      <el-form ref="searchUFileResourceForm" :model="searchFileResourceForm" :inline="true">
        <el-form-item>
          <el-input v-model="searchFileResourceForm.fileName" placeholder="支持文件名模糊查询" size="small"></el-input>
        </el-form-item>
        <el-form-item label="上传用户">
          <el-select v-model="searchFileResourceForm.userId" placeholder="请选择上传用户" size="small">
            <el-option
              v-for="user in childUsers"
              :key="user.id"
              :label="user.fullName"
              :value="user.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="el-icon-search" size="small" @click="searchFileResource">搜索</el-button>
        </el-form-item>
      </el-form>
    </el-row>
    <el-row :gutter="10">
      <el-table
        :data="fileResourceTableData"
        style="width: 100%"
        border
        size="small">
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
          prop="fileName"
          label="文件名"
          :showOverflowTooltip=true
          width="180">
        </el-table-column>
        <el-table-column
          prop="location"
          label="保存位置"
          :showOverflowTooltip=true
          width="180">
        </el-table-column>
        <el-table-column
          prop="size"
          label="大小/KB"
          :showOverflowTooltip=true
          width="180">
          <template slot-scope="scope">
              <span>
                  {{Math.round(scope.row.size/1024)}}
              </span>
          </template>
        </el-table-column>
        <el-table-column
          prop="mimeType"
          label="文件类型"
          :showOverflowTooltip=true
          width="180">
        </el-table-column>
        <el-table-column
          prop="createAt"
          label="创建时间"
          width="140">
        </el-table-column>
        <el-table-column
          prop="modifiedAt"
          label="更新时间"
          width="140">
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作">
          <template slot-scope="scope">
            <el-button size="mini" @click="download(scope.row)" type="primary">下载</el-button>
            <el-button size="mini" @click="queryInfo(scope.row)">详情</el-button>
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
    <el-row :gutter="10">
      <el-dialog
        :title="fileResourceInfoTitle"
        :visible.sync="fileResourceInfoVisible"
        width="50%">
        <el-form ref="fileResourceInfoForm" :model="fileResourceInfoForm" label-width="100px" size="mini">
          <el-form-item label="文件名">
            <span>{{fileResourceInfoForm.fileName}}</span>
          </el-form-item>
          <el-form-item label="文件位置">
            <span>{{fileResourceInfoForm.location}}</span>
          </el-form-item>
          <el-form-item label="文件大小/KB">
            <span>{{fileResourceInfoForm.size}}</span>
          </el-form-item>
          <el-form-item label="文件类型">
            <span>{{fileResourceInfoForm.mimeType}}</span>
          </el-form-item>
          <el-form-item label="上传时间">
            <span>{{fileResourceInfoForm.createAt}}</span>
          </el-form-item>
          <el-form-item label="修改时间">
            <span>{{fileResourceInfoForm.modifiedAt}}</span>
          </el-form-item>
          <el-form-item label="上传人">
            <span>{{fileResourceInfoForm.author}}</span>
          </el-form-item>
          <el-form-item label="上传公司">
            <span>{{fileResourceInfoForm.enterpriseName}}</span>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="fileResourceInfoVisible = false" size="small">取 消</el-button>
            <el-button type="primary" @click="fileResourceInfoVisible = false" size="small">确 定</el-button>
          </span>
      </el-dialog>
    </el-row>
  </div>
</template>

<script>
    export default {
        name: "FileResource",
        data() {
            return {
                fileResourceTableData: [],
                currentPage: 1,
                totalElements: 0,
                pageSize: 15,
                searchFileResourceForm: {
                    fileName: '',
                    userId: null
                },
                childUsers: [],
                uploadUrl: this.baseUrl + '/api/v1/files/upload',
                uploadHeader: {
                    Authorization: this.$store.state.user.token
                },
                uploadVisible: false,
                fileResourceInfoForm: {
                    fileName: null,
                    location: null,
                    size: 0,
                    mimeType: '',
                    createAt: null,
                    modifiedAt: null,
                    author: '',
                    enterpriseName: ''
                },
                fileResourceInfoVisible: false,
                fileResourceInfoTitle: ''
            }
        },
        methods: {
            handleUploadSuccess(res, file) {
                this.searchFileResource();
            },
            queryInfo(row) {
                this.fileResourceInfoVisible = true;
                this.fileResourceInfoTitle = row.fileName;
                this.fileResourceInfoForm.fileName = row.fileName;
                this.fileResourceInfoForm.location = row.location;
                this.fileResourceInfoForm.size = (row.size / 1024);
                this.fileResourceInfoForm.mimeType = row.mimeType;
                this.fileResourceInfoForm.createAt = row.createAt;
                this.fileResourceInfoForm.modifiedAt = row.modifiedAt;
                const _this = this;
                _this.getRequest("/api/v1/users/" + row.userId).then(response => {
                    const data = response.data.data;
                    _this.fileResourceInfoForm.author = data.fullName;
                    _this.fileResourceInfoForm.enterpriseName = data.enterprise.name;
                }).catch(error => {
                    console.log(error);
                })
            },
            download(row) {
                window.location.href = this.baseUrl + "/api/v1/files/" + row.id + '/preview?userId=' + row.userId;
            },
            searchFileResource() {
                const _this = this;
                let requestUrl = "/api/v1/files/search?page=" + _this.currentPage + "&size=" + _this.pageSize;
                if (this.searchFileResourceForm.fileName !== '') {
                    requestUrl = requestUrl + '&fileName=' +
                        this.searchFileResourceForm.fileName;
                }
                if (this.searchFileResourceForm.userId !== null) {
                    requestUrl = requestUrl + '&userId=' + this.searchFileResourceForm.userId;
                }
                _this.getRequest(requestUrl)
                    .then(function (response) {
                        const data = response.data.data;
                        _this.fileResourceTableData = data.content;
                        _this.totalElements = data.totalElements;
                        _this.pageSize = data.size;
                        _this.currentPage = data.number + 1;

                    }).catch(error => {
                    console.log("search file error:" + error);
                });
            },
            handleSizeChange(val) {
                this.pageSize = val;
                this.searchFileResource();
            },
            handleCurrentChange(val) {
                this.currentPage = val;
                this.searchFileResource();
            },
            getChildUser() {
                const _this = this;
                _this.getRequest("/api/v1/users/child-users").then(response => {
                    _this.childUsers = response.data.data;
                }).catch(error => {
                    console.error(error);
                })
            }
        },
        mounted() {
            this.searchFileResource();
            this.getChildUser();
        }
    }
</script>

<style scoped>

</style>
