<template>
  <div>
    <el-row :gutter="10">
      <el-upload
        class="upload-demo"
        drag
        :action="uploadUrl"
        :headers="uploadHeader"
        :on-success="handleUploadSuccess"
        multiple>
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
      </el-upload>
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
          label="大小"
          :showOverflowTooltip=true
          width="180">
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
                uploadUrl: this.baseUrl + '/api/v1/files/upload',
                uploadHeader: {
                    Authorization: this.$store.state.user.token
                }
            }
        },
        methods: {
            handleUploadSuccess(res, file) {
                this.searchFileResource();
            },
            queryInfo(row) {
            },
            download(row) {
            },
            searchFileResource() {
                const _this = this;
                let requestUrl = "/api/v1/files/search?page=" + _this.currentPage + "&size=" + _this.pageSize;
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
            }
        },
        mounted() {
            this.searchFileResource();
        }
    }
</script>

<style scoped>

</style>
