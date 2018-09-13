<template>
  <el-row class="tac">
    <el-col :span="24">
      <el-menu
        default-active="2"
        class="el-menu-vertical-demo">
        <router-link to="/">
          <el-menu-item index="2">
            <i class="el-icon-menu"></i>
            <span slot="title">列表</span>
          </el-menu-item>
        </router-link>
        <router-link to="/add">
          <el-menu-item index="1">
            <i class="el-icon-upload"></i>
            <span slot="title">添加</span>
          </el-menu-item>
        </router-link>
      </el-menu>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: 'SideBar',
  data () {
    return {}
  }
}
</script>

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
  }
  .el-menu-vertical-demo a {
    text-decoration: none;
  }
</style>
