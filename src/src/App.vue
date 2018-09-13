<style>
html, body {
  margin: 0;
  padding: 0;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
ul,li {
  margin: 0;
  padding: 0;
  list-style: none;
}
</style>

<style scoped lang="scss">
.el-header,
.el-footer {
  background-color: #B3C0D1;
  color: #333;
  text-align: center;
  line-height: 60px;
}
.el-container {
  height: 100vh;
  .el-menu-item {
    border-bottom: 1px solid #ddd;
  }
}
.el-aside {
  color: #333;
  text-align: center;
  border-right: 1px solid #ddd;
}
.el-menu {
  border-right: none;
}
.el-main {
  text-align: center;
  padding: 0;
}
</style>

<template>
  <div id="app">
    <div class="music">
      <el-container>
        <el-container>
          <el-aside width="auto">
            <side-bar></side-bar>
          </el-aside>
          <el-main>
            <router-view></router-view>
          </el-main>
        </el-container>
      </el-container>
    </div>
  </div>
</template>

<script>
import SideBar from './views/SideBar.vue'
export default {
  name: 'App',
  components: {SideBar},
  data () {
    return {}
  }
}
</script>
