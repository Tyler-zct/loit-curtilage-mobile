<template>
  <div>
    <van-uploader
      :after-read="afterRead"
      :max-count="3"
      v-model="getFileList"
      upload-icon="plus"
      accept="image/png, image/jpeg"
      :max-size="10 * 1024 * 1024"
      @oversize="oversize"
      :disabled="disabled"
    />
  </div>
</template>
<script>
// import { policy, upload } from '@/api/oss'
import { Uploader } from 'vant'
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
  },
  data() {
    return {
      fileList: this.value,
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
        // console.log(this.fileList)
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
      var formData = new FormData()
      formData.append('file', file.file)
      
    //   upload(formData).then((res) => {
    //     // console.log(this.fileList)
    //     if (this.fileList) {
    //       var arr = this.fileList.split(',')
    //       // console.log(fileList)
    //       arr.push(res.data)
    //       this.fileList = arr.join(',')
    //       return false
    //     }
    //     this.fileList = res.data
    //   })
      // policy().then(res => {
      //   const client = new OSS({
      //     region: "oss-cn-qingdao", // 创建Bucket时会选择不同地区，根据自己的选择填入对应名称
      //     accessKeyId: res.data.accessKeyId, // 填入你的accessKeyId
      //     accessKeySecret: "J2foxqRiXz4pLVOiX15YfIVByYHCE6", // 填入你的accessKeySecret
      //     bucket: "xht-1", // 填入你的bucket名
      //     // endpoint: 'https://' // 配置 https:// 请求
      //   });

      //   const Name = file.file.name;
      //   const suffix = Name.substr(Name.indexOf(".")); // 文件后缀
      //   const filename = Date.parse(new Date()) + suffix; // 组成新文件名
      //   client
      //     .multipartUpload(filename, file.file)
      //     .then(res => {
      //     })
      //     .catch(err => {
      //     });
      // });
    },
    // 文件过大
    oversize() {
      this.$toast.fail('图片过大！')
    },
  },
}
</script>
<style scoped>
</style>