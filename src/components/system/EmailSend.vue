<template>
  <div>
    <el-row :gutter="10">
      <el-form ref="emailForm" :model="emailForm" label-width="80px" size="medium">
        <el-form-item label="主题">
          <el-input v-model="emailForm.subject" placeholder="请输入主题" clearable></el-input>
        </el-form-item>
        <el-form-item label="收件人">
          <el-input v-model="emailForm.to" placeholder="请输入收件人" clearable></el-input>
        </el-form-item>
        <el-form-item label="抄送">
          <el-input v-model="emailForm.cc" placeholder="请输入抄送" clearable></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="sendEmail">发送</el-button>
          <el-button v-on:click="getContent">查看内容</el-button>
        </el-form-item>
      </el-form>
    </el-row>
    <el-row :gutter="10">
      <el-col :span="24">
        <div ref="content" style="text-align:left"></div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
    import E from 'wangeditor'

    export default {

        name: "EmailSend",
        data() {
            return {
                emailForm: {
                    subject: '',
                    to: '',
                    cc: '',
                    content: ''
                },
                content: ''
            }
        },
        methods: {
            getContent: function () {
                alert(this.emailForm.content)
            },
            sendEmail() {
                const _this = this;
                const subject = _this.emailForm.subject;
                const to = _this.emailForm.to;
                const tos = to.split(",");
                const content = _this.emailForm.content;
                console.log('subject:' + subject + ";tos:" + tos);
                const params = {
                    subject: subject,
                    to: tos,
                    content: content
                };
                _this.postRequest("/api/v1/mails/send", params).then(response => {
                    _this.$message({
                        showClose: true,
                        type: 'success',
                        message: '发送成功'
                    })
                })

            }
        },
        mounted() {
            const editor = new E(this.$refs.content);
            editor.customConfig.onchange = (html) => {
                this.emailForm.content = html
            };
            editor.create()
        }
    }
</script>

<style scoped>

</style>
