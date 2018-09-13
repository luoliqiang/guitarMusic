<template>
  <div>
    <ul class="music-list">
      <li v-for="item in list" :key="item.id">
        <div class="content" @click="viewDetail(item.id)">
          <el-button type="danger" icon="el-icon-delete" circle @click.stop="deleteMusic(item.id)"></el-button>
          <div class="bottom" @click.stop>
            <div class="name">{{ item.musicName }}</div>
            <div class="star">熟悉度：
              <el-rate
                v-model="item.star"
                :colors="['#99A9BF', '#F7BA2A', '#FF9900']"
                @change="starChangeHandler(item.id, $event)"> <!-- 实参直接写出，形参通过$event获得-->
                <!-- @change="(value) => starChangeHandler(value, item.id)"> 这样写也可以-->
              </el-rate>
            </div>
          </div>
          <img :src="item.poster" style="width: 100%;height: 100%;">
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import api from '../service/api.js'
export default {
  name: 'MusicList',
  data () {
    return {
      list: []
    }
  },
  created () {
    this.getList()
  },
  methods: {
    getList () {
      api.getMusicList().then((response) => {
        this.list = response.data.data
      })
    },
    viewDetail (id) {
      this.$router.push({path: 'detail', query: {id: id}})
    },
    starChangeHandler (id, val) {
      api.setStar({id: id, star: val}).then((response) => {
        if (response.data.code === 0) {
          this.$message({
            message: '更新成功',
            type: 'success'
          })
        }
      })
    },
    deleteMusic (id) {
      api.deleteMusic({id: id}).then((response) => {
        if (response.data.code === 0) {
          this.$message({
            message: '删除成功',
            type: 'success'
          })
          this.getList()
        }
      })
    }
  }
}
</script>
<style scoped lang="scss">
  .music-list {
    li {
      margin: 10px;
      float: left;
      width: 260px;
      height: 200px;
      position: relative;
      .content {
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,.5);
        &:hover {
          .is-circle {
            display: block;
          }
        }
        .is-circle {
          display: none;
          position: absolute;
          top: 10px;
          right: 10px;
          padding: 6px;
        }
      }
      .bottom {
        position: absolute;
        bottom: 0;
        left: 0;
        height: 36%;
        width: 100%;
        padding-left: 20px;
        box-sizing: border-box;
        font-size: 14px;
        color: #fff;
        text-align: left;
        background: -moz-linear-gradient(top, rgba(30,87,153,0) 0%, rgba(30,86,151,0) 1%, rgba(0,0,0,1) 100%); /* FF3.6-15 */
        background: -webkit-linear-gradient(top, rgba(30,87,153,0) 0%,rgba(30,86,151,0) 1%,rgba(0,0,0,1) 100%); /* Chrome10-25,Safari5.1-6 */
        background: linear-gradient(to bottom, rgba(30,87,153,0) 0%,rgba(30,86,151,0) 1%,rgba(0,0,0,1) 100%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
        filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#001e5799', endColorstr='#000000',GradientType=0 ); /* IE6-9 */
        .name {
          padding-top: 20px;
          font-size: 18px;
        }
        .star {
          padding: 5px 0 0 0;
          overflow: hidden;
          i {
            margin: 0 3px;
            font-size: 15px;
            text-indent: 0;
            vertical-align: -1px;
            color: #20ec99;
          }
        }
      }
      .el-rate {
        display: inline-block;
        vertical-align: 1px;
      }
      &:hover {
        transition: all ease .3s;
        box-shadow: 0 8px 15px rgba(0,0,0,.5);
        cursor: pointer;
      }
      .star /deep/ .el-rate__icon {
        font-size: 15px;
      }
    }
  }
</style>
