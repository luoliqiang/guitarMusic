<template>
  <div class="detail-wrapper">
    <control @autoSrcoll="autoScroll"></control>
    <div class="music-images-wrap" ref="wrap">
      <ul class="music-images" ref="ul">
        <li v-for="item in data.imgSrc" :key="item.star">
          <img :src="item">
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import api from '../service/api.js'
import control from './control.vue'
export default {
  name: 'MusicDetail',
  components: {control},
  data () {
    return {
      data: ''
    }
  },
  created () {
    this.getDetail()
  },
  methods: {
    getDetail () {
      const id = this.$route.query.id
      api.getMusicDetail({id: id}).then((response) => {
        this.data = response.data.data
      })
    },
    autoScroll (status, rateNum) {
      const num = rateNum || 80
      const $wrap = this.$refs.wrap
      const $ul = this.$refs.ul
      const canScroll = $ul.scrollHeight - $wrap.offsetHeight

      clearInterval(this.slideTimer)
      if (status === false) {
        return
      }

      const slideFn = () => {
        if ($wrap.scrollTop < canScroll) {
          $wrap.scrollTop = $wrap.scrollTop + 1
        } else {
          clearInterval(slideFn)
        }
      }
      this.slideTimer = setInterval(slideFn, (num * 1000) / canScroll)
    }
  }
}
</script>

<style scoped lang="scss">
  .detail-wrapper {
    position: relative;
    height: 100%;
  }
  .music-images-wrap {
    position: relative;
    height: 100%;
    overflow: auto;
    .music-images {
      li {
        img {
          margin-bottom: 10px;
          max-width: 100%;
          display: block;
        }
      }
    }
  }
</style>
