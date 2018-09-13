<template>
  <div class="add-wrap">
    <div class="preview-box">
      <div v-for="(data,index) in imageDataList" class="img-uploader-preview" v-bind:key="index">
        <div class="preview-img">
          <img :src="data"/>
        </div>
      </div>
    </div>
    <div class="add-inner">
      <div class="add-inner-txt">
        <el-form label-width="80px" style="width: 300px;">
          <el-form-item label="名称">
            <el-input v-model="musicName"></el-input>
          </el-form-item>
          <el-form-item label="封面图片">
            <el-button type="primary">
              <input class="inp-file" type="file" name="file" multiple accept="image/png,image/gif,image/jpg,image/jpeg" @change="handleFileChange('poster')" ref="inputPoster" />
              上传图片
              <i class="el-icon-upload el-icon--right"></i>
            </el-button>
          </el-form-item>
          <el-form-item label="图片">
            <el-button type="primary">
              <input class="inp-file" type="file" name="file" multiple accept="image/png,image/gif,image/jpg,image/jpeg" @change="handleFileChange" ref="input" />
              上传图片
              <i class="el-icon-upload el-icon--right"></i>
            </el-button>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="saveMusic">保存设置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import api from '../service/api.js'
import resizeImage from '@/components/uploadImage/resize.js'

export default {
  name: 'Add',
  data () {
    return {
      musicName: '',
      maxSize: 1000,
      fileList: [],
      filePoster: '',
      fileNameList: [],
      imageDataList: []
    }
  },
  methods: {
    handleFileChange (type) {
      let $ele = type === 'poster' ? this.$refs.inputPoster : this.$refs.input
      this.handleFile($ele.files, type)
    },
    handleFile (files, type) {
      for (let i = 0; i < files.length; i++) {
        let file = files[i]
        let size = Math.floor(file.size / 1024)
        if (size > this.maxSize) {
          this.$message.error(`文件大小不能超过${this.maxSize}KB`)
        }

        if (type === 'poster') {
          this.filePoster = files[i]
        } else {
          this.fileList.push(file)
          this.fileNameList.push(file.name)
        }
      }

      if (type !== 'poster') {
        this.preview(files)
      }
    },
    preview (files) {
      if (!files || !window.FileReader) {
        return
      }

      for (let i = 0; i < files.length; i++) {
        let file = files[i]
        let reader = new FileReader()

        reader.onload = (e) => {
          resizeImage(e.target.result, 150, 150, (result) => {
            this.imageDataList.push(result)
          })
        }
        reader.readAsDataURL(file)
      }
    },
    saveMusic () {
      let formData = new FormData()

      for (var i = 0; i < this.fileList.length; i++) {
        formData.append('pic-' + i, this.fileList[i], this.fileList[i].name)
      }

      formData.append('filePoster', this.filePoster, this.filePoster.name)
      formData.append('musicName', this.musicName)

      api.saveMusic(formData)
        .then((response) => {
          if (response.data.code === 0) {
            this.$message('保存成功！')
            this.$router.push({path: '/'})
          }
        })
    }
  }
}
</script>

<style scoped lang="scss">
  .add-wrap {
    position: relative;
    width: 100%;
    height: 100%;
    .add-inner {
      position: absolute;
      top: 40%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 500px;
      height: 300px;
      border: 3px dashed #ddd;
      border-radius: 10px;
    }
    .add-inner-txt {
      margin-left: 50px;
      padding-top: 50px;
    }
  }
  .el-button--primary {
    position: relative;
    float: left;
  }
  .inp-file {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height:100%;
    opacity: 0;
  }
  .preview-box {
    text-align: left;
    .preview-img {
      float: left;
      height: 200px;
      margin: 5px;
    }
  }
</style>
