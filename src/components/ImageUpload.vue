<template>
  <div>
    <van-uploader
      :after-read="afterRead"
      :max-count="3"
      v-model="getFileList"
      upload-icon="plus"
      multiple
      accept="image/png, image/jpeg"
      :max-size="10 * 1024 * 1024"
      @oversize="oversize"
      :disabled="disabled"
    />
  </div>
</template>
<script>
// import { policy, upload } from '@/api/oss'
import { fileUpload, getSign } from '@/service/upload'
import { lookFile } from '@/config/env.js'
import { Uploader } from 'vant'
import $localStorage from '@/utils/localStorage.js'
// const OSS = require("ali-oss");
// import OSS from "ail-oss"

export default {
  name: 'ImageUpload',
  components: {
    [Uploader.name]: Uploader,
  },
  props: {
    value: {
      type: String,
      default: '',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    fileType: {
      type: String,
      default: '',
    },
    title: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      fileList: this.value,
      lookFile: lookFile,
      fileServerPrefix: '',
    }
  },
  model: {
    prop: 'value',
    event: 'valChange',
  },
  watch: {
    value(newValue) {
      this.fileList = newValue
    },
    fileList(newValue) {
      this.$emit('valChange', newValue)
    },
  },
  computed: {
    getFileList: {
      get() {
        if (this.fileList) {
          return this.fileList.split(',').map((item) => {
            return {
              url: item,
            }
          })
        }
        return []
      },
      set(newValue) {
        var fileList = []
        newValue.forEach((item) => {
          if (item.url) {
            fileList.push(item.url)
          }
        })
        this.fileList = fileList.join(',')
        console.log(this.fileList)
      },
    },
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {},
    // 上传图片
    afterRead(file) {
      // 获取配置信息
      if ($localStorage.get('fileServerPrefix')) {
        this.fileServerPrefix = $localStorage.get('fileServerPrefix')
      } else {
        getSign().then((res) => {
          this.fileServerPrefix = res.data.fileServerPrefix + '/'
          $localStorage.set('fileServerPrefix', this.fileServerPrefix)
        })
      }
      var formData = new FormData()
      formData.append('file', file.file)
      fileUpload(formData).then((res) => {
        let fileRes = res.body.fileResponseData
        fileRes.type = this.fileType
        fileRes.title = this.title
        this.fileList = this.fileServerPrefix + fileRes.filePath
        console.log(this.fileList)
        this.$emit('handleUploadSuccess', fileRes)
      })
    },
    // 文件过大
    oversize() {
      this.$toast.fail('图片大小不能超过 10 MB！')
    },
  },
}
</script>
<style scoped>
</style>