<template>
  <div class="control-pannel">
    <el-form size="mini" label-width="90px" style="margin: 20px;max-width: 240px;text-align: left;">
      <el-form-item label="全屏：">
      <!-- <el-form-item label="二维码："> -->
        <el-switch
          v-model="openFull"
          active-color="#13ce66"
          inactive-color="#b7b7b7"
          @change="changeFull"
          >
        </el-switch>
      </el-form-item>
      <el-form-item label="节拍器：">
      <!-- <el-form-item label="二维码："> -->
        <el-switch
          v-model="openMetronome"
          active-color="#13ce66"
          inactive-color="#b7b7b7"
          @change="changeMetronome"
          >
        </el-switch>
        <el-slider
          v-show="openMetronome"
          v-model="rate"
          style="width: 100px;"
          :max="200">
        </el-slider>
      </el-form-item>
      <el-form-item label="自动滚动：">
        <el-switch
          v-model="autoScroll"
          active-color="#13ce66"
          @change="changeScrollStatus"
          inactive-color="#b7b7b7">
        </el-switch>
        <el-slider
          v-show="autoScroll"
          v-model="scrollNum"
          @change="changeScrollTimer"
          style="width: 100px;"
          :max="200">
        </el-slider>
      </el-form-item>
      <audio ref="media" src="/media/da.mp3" controls="controls" preload="true" style="display: none;"></audio>
      <!-- <el-form-item label="速率：">
        <el-input v-model="rate" style="width: 60px;"></el-input>
      </el-form-item> -->
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'control',
  data () {
    return {
      rate: 80,
      openMetronome: false,
      openFull: false,
      metronomeNum: 80,
      autoScroll: false,
      scrollNum: 80
    }
  },
  created () {
    // this.changeMetronome()
  },
  methods: {
    changeFull (val) {
      if (val === true) {
        this.$store.commit('hideSideBar')
      } else {
        this.$store.commit('showSideBar')
      }
    },
    changeMetronome (val) {
      if (val === true) {
        this.$refs.media.play()
        setTimeout(() => {
          this.$refs.media.play()
        }, this.metronomeNum * 50)
      } else {
        this.$refs.media.pause()
      }
    },
    changeScrollStatus (val) {
      this.$emit('autoSrcoll', val, this.scrollNum)
    },
    changeScrollTimer () {
      this.$emit('autoSrcoll', true, this.scrollNum)
    }
  }
}
</script>
<style scoped lang="scss">
  .control-pannel {
    position: absolute;
    top: 10px;
    right: 16px;
    z-index: 2;
    border-radius: 10px;
    background: rgba(0,0,0,.5);
  }
  .control-pannel /deep/ .el-form-item__label {
    color: #2fe81a;
  }
  .control-pannel /deep/ .el-form-item--mini.el-form-item {
    margin-bottom: 10px;
  }
  .control-pannel /deep/ .el-slider__runway {
    margin: 12px 0;
  }
  .el-form-item__content {
    text-align: left;
  }
</style>
