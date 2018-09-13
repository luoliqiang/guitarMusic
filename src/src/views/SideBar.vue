<template>
  <el-row class="tac">
    <el-col :span="24">
      <el-collapse-transition>
      <el-menu
        default-active="2"
        class="el-menu-vertical-demo" v-show="sideBarStatus">
        <el-menu-item index="2" @click="goPage('/', 0)">
          <i class="el-icon-menu"></i>
          <span slot="title">列表</span>
        </el-menu-item>
        <el-menu-item index="1" @click="goPage('add', 1)">
          <i class="el-icon-upload"></i>
          <span slot="title">添加</span>
        </el-menu-item>
      </el-menu>
      </el-collapse-transition>
    </el-col>
  </el-row>
</template>

<script>
// fade/zoom 等
import 'element-ui/lib/theme-chalk/base.css'
// collapse 展开折叠
import CollapseTransition from 'element-ui/lib/transitions/collapse-transition'

export default {
  component: {
    CollapseTransition
  },
  name: 'SideBar',
  data () {
    return {}
  },
  computed: {
    sideBarStatus () {
      return this.$store.state.sideBarCollapse
    }
  },
  methods: {
    goPage (val, idx) {
      this.$router.push({path: val})
      this.$store.commit('updateSideBarIndex', idx)
    }
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
