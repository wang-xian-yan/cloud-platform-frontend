<template>
  <div>
    <el-row>
      <el-button type="primary" size="small" @click="enterpriseFormVisible = true">新增企业</el-button>
    </el-row>
    <el-row>
      <el-table
        :data="enterpriseTable"
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
          prop="name"
          label="企业名字"
          :showOverflowTooltip=true
          width="220">
        </el-table-column>
        <el-table-column
          prop="address"
          label="地址"
          :showOverflowTooltip=true
          width="150">
        </el-table-column>
        <el-table-column
          prop="legalPerson"
          label="法人"
          :showOverflowTooltip=true
          width="150">
        </el-table-column>
        <el-table-column
          prop="phone"
          label="联系人电话"
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
          fixed="right"
          label="操作">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="userFormVisible = true">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-row>

    <el-dialog :title="enterpriseFormTitle" :visible.sync="enterpriseFormVisible" width="30%">
      <el-form :model="enterpriseForm" label-width="80px">
        <el-form-item label="企业名字" prop="name">
          <el-input v-model="enterpriseForm.name" size="small"></el-input>
        </el-form-item>
        <el-form-item label="企业地址" prop="address">
          <el-input v-model="enterpriseForm.address" size="small"></el-input>
        </el-form-item>
        <el-form-item label="法人代表" prop="legalPerson">
          <el-input v-model="enterpriseForm.legalPerson" size="small"></el-input>
        </el-form-item>
        <el-form-item label="联系电话" prop="phone">
          <el-input v-model="enterpriseForm.phone" size="small"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="enterpriseFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addEnterprise">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
    export default {
        name: "Enterprise",
        data() {
            return {
                enterpriseTable: [],
                enterpriseFormVisible: false,
                enterpriseFormTitle: '添加企业',
                enterpriseForm: {
                    id: null,
                    name: '',
                    address: '',
                    legalPerson: '',
                    phone: '',
                }
            }
        },
        methods: {
            searchEnterprise() {
                const _this = this;
                _this.getRequest("/api/v1/enterprises").then(function (response) {
                    _this.enterpriseTable = response.data.data;
                })
            },
            addEnterprise() {
                const _this = this;
                const params = {
                    name: _this.enterpriseForm.name,
                    address: _this.enterpriseForm.address,
                    legalPerson: _this.enterpriseForm.legalPerson,
                    phone: _this.enterpriseForm.phone,
                };
                _this.postRequest("/api/v1/enterprises", params).then(function (response) {
                    _this.$notify({
                        type: "success",
                        title: '',
                        message: response.data.message
                    });
                    _this.enterpriseFormVisible = false;
                    _this.searchEnterprise();

                })
            }
        },
        mounted() {
            this.searchEnterprise();
        }

    }
</script>
