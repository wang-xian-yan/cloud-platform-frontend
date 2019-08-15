<template>
  <div>
    <el-row :gutter="10">
      <el-button-group>
        <el-button type="success" size="small" icon="el-icon-success">批量启用</el-button>
        <el-button type="warning" size="small" icon="el-icon-error">批量禁用</el-button>
      </el-button-group>
      <el-button type="primary" size="small" @click="showCreatePropertyForm"><i class="el-icon-plus"></i>新增属性
      </el-button>
    </el-row>
    <el-row :gutter="10">
      <el-table
        :data="systemPropertiesTable"
        border
        size="small"
        style="width: 100%">
        <el-table-column
          type="selection"
          width="40">
        </el-table-column>
        <el-table-column
          prop="id"
          label="#"
          width="180">
        </el-table-column>
        <el-table-column
          prop="propertyKey"
          label="属性名"
          width="180">
        </el-table-column>
        <el-table-column
          prop="propertyValue"
          label="属性值">
        </el-table-column>
        <el-table-column
          prop="isEnabled"
          label="是否启用">
          <template slot-scope="scope">
            <el-tag type="success" size="mini" v-if="scope.row.isEnabled">启用
            </el-tag>
            <el-tag type="danger" size="mini" v-if="!scope.row.isEnabled">
              禁用
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column
          prop="description"
          label="备注">
        </el-table-column>
        <el-table-column
          prop="createAt"
          label="创建时间">
        </el-table-column>
        <el-table-column
          prop="modifiedAt"
          label="修改时间">
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="showEditPropertyForm(scope.row)">编辑</el-button>
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
    <!-- 新增或修改属性配置-->
    <el-dialog :title="propertyFormTitle" :visible.sync="propertyFormVisible" width="35%">
      <el-form :model="propertyForm" :rules="propertyFormRule" ref="propertyForm"
               label-width="100px">
        <el-form-item label="编号" prop="id" v-if="propertyFormType==='update'">
          <el-input v-model="propertyForm.id" size="small" disabled></el-input>
        </el-form-item>
        <el-form-item label="属性名" prop="propertyKey">
          <el-input v-model="propertyForm.propertyKey" size="small"></el-input>
        </el-form-item>
        <el-form-item label="属性值" prop="propertyValue">
          <el-input v-model="propertyForm.propertyValue" size="small"></el-input>
        </el-form-item>
        <el-form-item label="是否启用" prop="isEnabled">
          <el-switch v-model="propertyForm.isEnabled" active-color="#13ce66"
                     inactive-color="#ff4949">
          </el-switch>
        </el-form-item>
        <el-form-item label="备注" prop="description">
          <el-input v-model="propertyForm.description" size="small"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelPropertyForm" size="small">取 消</el-button>
        <el-button type="primary" @click="addProperty" v-if="propertyFormType==='create'" size="small">添 加</el-button>
        <el-button type="primary" @click="editProperty" v-if="propertyFormType==='update'" size="small">修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
    export default {
        name: "SystemPropertySetting",
        data() {
            return {
                systemPropertiesTable: [],
                currentPage: 1,
                totalElements: 0,
                pageSize: 15,
                propertyForm: {
                    id: null,
                    propertyKey: '',
                    propertyValue: '',
                    isEnabled: false,
                    description: '',
                    userId: null,
                    enterpriseId: null,
                    createAt: null
                },
                propertyFormType: 'create',
                propertyFormTitle: '新增配置属性',
                propertyFormVisible: false,
                propertyFormRule: {}
            }

        },
        methods: {
            showCreatePropertyForm() {
                this.propertyFormVisible = true;
                this.propertyFormTitle = '新建属性配置';
                this.propertyFormType = 'create'
            },
            addProperty() {
                const params = {
                    propertyKey: this.propertyForm.propertyKey,
                    propertyValue: this.propertyForm.propertyValue,
                    isEnabled: this.propertyForm.isEnabled,
                    description: this.propertyForm.description
                };
                const _this = this;
                _this.postRequest("/api/v1/system-properties", params).then(response => {
                    _this.propertyFormVisible = false;
                    _this.$message({
                        type: 'success',
                        message: response.data.message,
                        showClose: true
                    });
                    _this.searchProperties();
                })
            },
            editProperty() {
                const params = {
                    id: this.propertyForm.id,
                    propertyKey: this.propertyForm.propertyKey,
                    propertyValue: this.propertyForm.propertyValue,
                    isEnabled: this.propertyForm.isEnabled,
                    description: this.propertyForm.description,
                    userId: this.propertyForm.userId,
                    enterpriseId: this.propertyForm.enterpriseId,
                    createAt: this.propertyForm.createAt
                };
                const _this = this;
                _this.putRequest("/api/v1/system-properties", params).then(response => {
                    _this.propertyFormVisible = false;
                    _this.$message({
                        type: 'success',
                        message: response.data.message,
                        showClose: true
                    });
                    _this.searchProperties();
                })
            },
            showEditPropertyForm(row) {
                this.propertyFormVisible = true;
                this.propertyFormType = 'update';
                this.propertyFormTitle = '修改系统属性';
                this.propertyForm.id = row.id;
                this.propertyForm.propertyKey = row.propertyKey;
                this.propertyForm.propertyValue = row.propertyValue;
                this.propertyForm.isEnabled = row.isEnabled;
                this.propertyForm.description = row.description;
                this.propertyForm.userId = row.userId;
                this.propertyForm.enterpriseId = row.enterpriseId;
                this.propertyForm.createAt = row.createAt;
            },
            cancelPropertyForm() {
                this.propertyForm.id = null;
                this.propertyForm.propertyKey = '';
                this.propertyForm.proerptyValue = '';
                this.propertyForm.isEnabled = false;
                this.propertyForm.description = '';
                this.propertyForm.userId = null;
                this.propertyForm.enterpriseId = null;
                this.propertyForm.createAt = null;
                this.propertyFormVisible = false;

            },
            searchProperties() {
                const _this = this;
                const requestUrl = "/api/v1/system-properties/search?page=" + _this.currentPage + "&size=" + _this.pageSize;
                _this.getRequest(requestUrl).then(response => {
                    const data = response.data.data;
                    _this.systemPropertiesTable = data.content;
                    _this.totalElements = data.totalElements;
                    _this.pageSize = data.size;
                    _this.currentPage = data.number + 1;
                });

            },
            handleSizeChange(val) {
                this.pageSize = val;
                this.searchProperties();
            },
            handleCurrentChange(val) {
                this.currentPage = val;
                this.searchProperties();
            }
        },
        mounted() {
            this.searchProperties();
        }
    }
</script>

<style scoped>

</style>
