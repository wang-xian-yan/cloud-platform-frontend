<template>
  <div>
      <el-button @click.native="logout">Sign Out</el-button>
  </div>
</template>

<script>
export default {
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  methods:{
    logout (){
      this.$router.replace('/')
    }
  }
}
</script>
