<template>
  <div>
    <el-tabs v-model="activeName">
      <el-tab-pane label="中国移动" name="mobile">中国移动</el-tab-pane>
      <el-tab-pane label="中国联通" name="unicom">中国联通</el-tab-pane>
      <el-tab-pane label="中国电信" name="telecom">中国电信</el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
    export default {
        name: "CardList",
        data() {
            return {
                activeName: 'mobile'
            }
        }
    }
</script>

<style scoped>

</style>
