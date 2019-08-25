<template>
  <div>
    <el-tabs v-model="activeTab">
      <el-tab-pane label="收到的消息" name="message">
        <el-row :gutter="10">
          <el-button-group>
            <el-button type="success" size="small">标记为已读</el-button>
            <el-button type="danger" size="small">标记为未读</el-button>
          </el-button-group>
          <el-button type="warning" size="small">全部标记为已读</el-button>
        </el-row>
        <el-row :gutter="10">
        </el-row>
        <el-row :gutter="10">
          <el-table
            :data="receiveMessageTableData"
            tooltip-effect="dark"
            size="small"
            border
            style="width: 100%">
            <el-table-column
              type="selection"
              width="55">
            </el-table-column>
            <el-table-column
              prop="id"
              label="id"
              width="80">
            </el-table-column>
            <el-table-column
              prop="messageContent.title"
              label="标题"
              width="120">
            </el-table-column>
            <el-table-column
              prop="messageContent.message"
              label="消息内容"
              show-overflow-tooltip
              width="180">
            </el-table-column>
            <el-table-column
              prop="messageContent.level"
              label="消息级别"
              width="100">
            </el-table-column>
            <el-table-column
              prop="messageContent.level"
              label="消息类型"
              width="100">
            </el-table-column>
            <el-table-column
              prop="createAt"
              label="接收时间"
              width="140">
            </el-table-column>
            <el-table-column
              prop="modifiedAt"
              label="状态改变时间"
              width="140">
            </el-table-column>
            <el-table-column
              fixed="right"
              label="操作">
              <template slot-scope="scope">
                <el-button size="mini" @click="queryInfo(scope.row)">详情</el-button>
                <el-button size="mini" @click="queryInfo(scope.row)" v-if="scope.row.status" type="warning">标记为未读
                </el-button>
                <el-button size="mini" @click="queryInfo(scope.row)" v-if="!scope.row.status" type="primary">标记为已读
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-row>
        <el-row :gutter="10">
          <el-row style="margin-top: 20px">
            <div style="text-align: center">
              <el-pagination
                background
                @size-change="receiveMessageHandleSizeChange"
                @current-change="receiveMessageHandleCurrentChange"
                :current-page="receiveCurrentPage"
                :page-sizes="[15, 50, 100, 500]"
                :page-size="receivePageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="receiveTotalElements">
              </el-pagination>
            </div>
          </el-row>
        </el-row>
      </el-tab-pane>
      <el-tab-pane label="消息管理" name="message-manager">
        <el-row :gutter="10">
          <el-button-group>
            <el-button type="danger" icon="el-icon-delete" size="small">批量删除</el-button>
            <el-button type="primary" size="small" icon="el-icon-plus" @click="showPublishMessageContentForm">发布消息
            </el-button>
          </el-button-group>
        </el-row>
        <el-row :gutter="10">
        </el-row>
        <el-dialog
          :title="messageContentFormTitle"
          :visible.sync="messageContentFormVisible"
          width="50%">
          <el-form ref="messageContentForm" :model="messageContentForm" :rules="messageContentFormRule"
                   label-width="100px" size="small">
            <el-form-item label="消息标题" prop="title">
              <el-input v-model="messageContentForm.title"></el-input>
            </el-form-item>
            <el-form-item label="消息内容" prop="message">
              <el-input type="textarea" v-model="messageContentForm.message"></el-input>
            </el-form-item>
            <el-form-item label="消息级别" prop="level">
              <el-select v-model="messageContentForm.level" placeholder="请选择消息级别">
                <el-option
                  v-for="level in messageLevels"
                  :key="level"
                  :label="level"
                  :value="level">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="收件人类型" prop="targetType">
              <el-radio-group v-model="messageContentForm.targetType" @change="targetTypeChange">
                <el-radio label="all">所有人</el-radio>
                <el-radio label="part">部分人</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="收件人" v-if="messageContentForm.targetType==='part'">
              <el-checkbox-group v-model="messageContentForm.targetUserIdList">
                <el-checkbox v-for="user in childUsers" :label="user.id" :key="user.id">{{user.fullName}}
                </el-checkbox>
              </el-checkbox-group>
            </el-form-item>
          </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button @click="messageContentFormVisible = false" size="small">取 消</el-button>
            <el-button type="primary" @click="publishMessage" size="small">发 布</el-button>
          </span>
        </el-dialog>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
    export default {
        name: "MessageCenter",
        data() {
            return {
                childUsers: [],
                messageLevels: [
                    'high',
                    'middle',
                    'low'
                ],
                messageContentFormTitle: '发布消息',
                messageContentFormVisible: false,
                messageContentForm: {
                    title: '',
                    message: '',
                    level: '',
                    targetType: 'all',
                    targetUserId: null,
                    targetUserIdList: [],

                },
                messageContentFormRule: {
                    title: [
                        {required: true, message: "请输入标题", trigger: "blur"}
                    ],
                    message: [
                        {required: true, message: "请输入消息内容", trigger: "blur"}
                    ],
                    level: [
                        {required: true, message: "请选择消息级别", trigger: "blur"}
                    ],
                    targetType: [
                        {required: true, message: "请选择收件人类型", trigger: "blur"}
                    ]
                },
                activeTab: 'message',
                receiveMessageTableData: [],
                receiveCurrentPage: 1,
                receiveTotalElements: 0,
                receivePageSize: 15,
                searchMessageForm: {
                    title: '',
                    message: '',
                    level: ''
                }
            }
        },
        methods: {
            targetTypeChange() {
                const targetType = this.messageContentForm.targetType;
                if (targetType === 'part') {
                    this.getChildUser();
                }
            },
            showPublishMessageContentForm() {
                this.messageContentFormVisible = true;
            },
            publishMessage() {
                this.$refs.messageContentForm.validate(valid => {
                    if (valid) {
                        const _this = this;
                        const targetType = _this.messageContentForm.targetType;
                        const params = {
                            title: _this.messageContentForm.title,
                            message: _this.messageContentForm.message,
                            level: _this.messageContentForm.level,
                            targetType: targetType,
                            targetUserIdList: _this.messageContentForm.targetUserIdList
                        };
                        _this.postRequest("/api/v1/messages/send", params).then(function (response) {
                            _this.$notify({
                                type: 'success',
                                message: '发送成功',
                                showClose: true
                            })
                        }).catch(error => {
                            console.log("error:" + error.response);
                        })
                    } else {
                        return false;
                    }
                });

            },
            receiveMessageHandleSizeChange(val) {
                this.receivePageSize = val;
                this.searchReceiveMessage();
            },
            receiveMessageHandleCurrentChange(val) {
                this.receiveCurrentPage = val;
                this.searchReceiveMessage();
            },
            getChildUser() {
                const _this = this;
                _this.getRequest("/api/v1/users/child-users").then(response => {
                    _this.childUsers = response.data.data;
                }).catch(error => {
                    console.error(error);
                })
            },
            searchReceiveMessage() {
                const _this = this;
                let requestUrl = "/api/v1/messages/search?page=" + _this.receiveCurrentPage + "&size=" + _this.receivePageSize;
                if (this.searchMessageForm.title !== '') {
                    requestUrl = requestUrl + '&title=' +
                        this.searchMessageForm.title;
                }
                if (this.searchMessageForm.message !== '') {
                    requestUrl = requestUrl + '&message=' +
                        this.searchMessageForm.message;
                }
                if (this.searchMessageForm.level !== '') {
                    requestUrl = requestUrl + '&level=' +
                        this.searchMessageForm.level;
                }
                _this.getRequest(requestUrl)
                    .then(function (response) {
                        const data = response.data.data;
                        _this.receiveMessageTableData = data.content;
                        _this.receiveTotalElements = data.totalElements;
                        _this.receivePageSize = data.size;
                        _this.receiveCurrentPage = data.number + 1;

                    }).catch(error => {
                    console.log("search file error:" + error);
                });
            }
        },
        mounted() {
            this.searchReceiveMessage();
        }
    }
</script>

<style scoped>

</style>
