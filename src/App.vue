<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
    export default {
        name: 'App'
    }
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: left;
    left: 0;
    top: 0;
    position: absolute;
    width: 100%;
    height: 100%;
    color: #2c3e50;
  }

  .btn-long {
    width: 100%;
  }

  .el-row {
    margin-top: 15px;
  }
</style>
