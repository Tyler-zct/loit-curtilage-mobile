<!--
 * 严肃声明：
 * 开源版本请务必保留此注释头信息，若删除我方将保留所有法律责任追究！
 * 本系统已申请软件著作权，受国家版权局知识产权以及国家计算机软件著作权保护！
 * 可正常分享和学习源码，不得用于违法犯罪活动，违者必究！
 * Copyright (c) 2020 陈尼克 all rights reserved.
 * 版权所有，侵权必究！
 *-->
<template>
  <div class="page">
    <div class="header">
      <div><span class="page-num">5</span><span class="page-title">申报材料上传</span></div>
      <div class="plan">5/5</div>
    </div>
    <div v-for="(item, index) in materials" :key="index" class="file-box">
      <div class="file-item">
        <div class="title">{{ item.title }}</div>
        <van-divider />
        <span v-if="item.desc" class="red-desc">{{ item.desc }}</span>
        <div class="container" style="display:flex">
          <van-image width="80" height="80" fit="cover" :src="item.imgUrl" style="margin-right: 5px" v-if="item.imgUrl" />
          <image-upload v-model="item.imgUrl" :fileType="item.type" :title="item.title" @handleUploadSuccess="handleUploadSuccess"></image-upload>
        </div>
      </div>
    </div>

    <div class="btn-group">
      <button type="button" class="cus-btn btn-default" @click="goToPrevious">上一步</button>
      <button type="button" class="cus-btn btn-default" @click="handleSave">保存</button>
      <button type="button" class="cus-btn btn-primary" @click="handleSubmit">提交</button>
    </div>
  </div>
</template>

<script>
import { reactive, onMounted, toRefs } from 'vue'
import ImageUpload from '@/components/ImageUpload'
import { useRouter } from 'vue-router'
// import $localStorage from '@/utils/localStorage.js'
import { getDictData } from '@/utils/data.js'
import { Toast } from 'vant'
// import { saveBuildApply } from '@/service/build-apply'
// import { getSign } from '@/service/upload'

import fileImage1 from '@/assets/fileImage/宅基地使用承诺书.jpg'
import fileImage2 from '@/assets/fileImage/股权证复印件.png'
import fileImage3 from '@/assets/fileImage/身份证复印件.png'
import fileImage4 from '@/assets/fileImage/户口本复印件.png'
import fileImage5 from '@/assets/fileImage/用地界限申请表.jpg'
import fileImage6 from '@/assets/fileImage/黄武汉红线图.jpg'
import fileImage7 from '@/assets/fileImage/土地证明03.jpg'
import fileImage10 from '@/assets/fileImage/村民小组同意书.jpg'
import fileImage11 from '@/assets/fileImage/村民小组同意书.jpg'
export default {
  components: {
    ImageUpload,
  },
  setup() {
    const router = useRouter()
    const state = reactive({
      materials: [
        { title: '农村宅基地使用承诺书', desc: '', imgUrl: fileImage1 },
        { title: '股权证复印件', desc: '', imgUrl: fileImage2 },
        { title: '申请人身份证复印件', desc: '', imgUrl: fileImage3 },
        { title: '家庭成员户口本复印件', desc: '', imgUrl: fileImage4 },
        { title: '个人建房用地界限申请表', desc: '（在红线图复印件四至签字盖章）', imgUrl: fileImage5 },
        { title: '住宅建设用地规划红线图', desc: '（地类不明确的需勘测定界报告、勘测定界图）', imgUrl: fileImage6 },
        { title: '无宅基地证明', desc: '（无旧宅基地的提供）', imgUrl: fileImage7 },
        { title: '房屋设计图', desc: '', imgUrl: '' },
        { title: '危房鉴定书', desc: '（原房屋为危房提供）', imgUrl: '' },
        { title: '村民小组同意书', desc: '', imgUrl: fileImage10 },
        { title: '与相邻权利人签订的书面协议或相邻权利人在房屋设计图上签字确认的材料', desc: '', imgUrl: fileImage11 },
        { title: '村协议', desc: '（传统保护村落或有特定要求的村落提供）', imgUrl: '' },
      ],
      fileServerPrefix: '',
      allFileList: [],
      fileTypeDict: [],
    })
    // 获取字段数据
    getDictData('FILE_TYPE').then((list) => {
      state.fileTypeDict = list
      list.forEach((dict) => {
        state.materials.forEach((file) => {
          if (dict.dictionaryName.includes(file.title)) {
            file.type = dict.dictionaryValue
            if (file.title === '房屋设计图') {
              file.type = 'A09'
            }
          }
        })
      })
    })

    onMounted(async () => {
      // if ($localStorage.get('attachInfoList')) {
      //   // 获取配置信息
      //   if ($localStorage.get('fileServerPrefix')) {
      //     state.fileServerPrefix = $localStorage.get('fileServerPrefix')
      //   } else {
      //     getSign().then((res) => {
      //       state.fileServerPrefix = res.data.fileServerPrefix + '/'
      //       $localStorage.set('fileServerPrefix', state.fileServerPrefix)
      //     })
      //   }
      //   let attachInfoList = JSON.parse($localStorage.get('attachInfoList'))
      //   attachInfoList.forEach((atta) => {
      //     state.materials.forEach((mater) => {
      //       if (atta.type === mater.type) {
      //         mater.imgUrl = state.fileServerPrefix + atta.url
      //       }
      //     })
      //   })
      //   // console.log(attachInfoList)
      //   // console.log(state.materials)
      // }
    })

    const goToPrevious = () => {
      // $localStorage.set('attachInfoList', JSON.stringify(state.allFileList))
      router.push({ path: `/start-apply/build-info` })
    }
    const handleUploadSuccess = (fileRes) => {
      const fileItem = {
        name: fileRes.fileName,
        size: fileRes.fileSize,
        suffix: fileRes.fileType,
        type: fileRes.type,
        url: fileRes.filePath,
        title: fileRes.title,
      }
      const result = state.allFileList.findIndex((v) => {
        return v.type === fileRes.type
      })
      if (result === -1) {
        state.allFileList.push(fileItem)
      } else {
        state.allFileList[result] = fileItem
      }
    }

    const handleSave = () => {
      state.allFileList.forEach((item, index) => {
        item.sort = index
      })
      // $localStorage.set('attachInfoList', JSON.stringify(state.allFileList))
      Toast.success('保存成功')
    }
    // 提交数据
    const handleSubmit = () => {
      // const applyMaterials = {
      // attachInfoList: JSON.parse($localStorage.get('attachInfoList')),
      // familyMemberList: JSON.parse($localStorage.get('familyMemberList')),
      //   isSubmit: '1',
      // }
      // const homesteadForm = JSON.parse($localStorage.get('homesteadForm'))
      // const applyUserInfo = JSON.parse($localStorage.get('applyUserInfo'))
      // const buildInfo = JSON.parse($localStorage.get('buildInfo'))
      // let params = Object.assign(applyMaterials, buildInfo, homesteadForm, applyUserInfo)
      // let params = {Object.assign(applyMaterials, buildInfo, homesteadForm, applyUserInfo)}
      // let params = {}
      // saveBuildApply(params).then((res) => {
      //   if (res.code == 100) {
      //     Toast(res.msg)
      //     router.push({ path: `/home` })
      //   }
      // })
      Toast.success('提交成功')
      setTimeout(() => {
        router.push({ path: `/home` })
      }, 1500)
    }

    return {
      ...toRefs(state),
      goToPrevious,
      handleUploadSuccess,
      handleSave,
      handleSubmit,
    }
  },
}
</script>

<style lang="less" scoped>
@import '@/common/style/mixin';
.header {
  .fj();
  padding: 12px 0;
  .page-num {
    display: inline-block;
    width: 30px;
    height: 30px;
    text-align: center;
    line-height: 30px;
    background-color: #3487f6;
    color: @fc;
    font-weight: bold;
    font-size: 18px;
    margin-right: 10px;
    .borderRadius(50%);
  }
  .page-title {
    font-size: 17px;
    font-weight: bold;
  }
  .plan {
    font-size: 13px;
    font-weight: 400;
    line-height: 30px;
  }
}
.file-box {
  .file-item {
    background-color: @fc;
    margin-bottom: 12px;
    .borderRadius(10px);
    .title {
      font-size: 16px;
      font-weight: bold;
      padding: 13px 14px 0;
    }
    .red-desc {
      font-size: 14px;
      font-weight: 400;
      color: #ff0000;
    }
    .container {
      padding: 8px 14px 13px;
    }
  }
}
.btn-group {
  margin: 50px 0 20px;
  .fj();
  .cus-btn {
    .btn();
  }
  .btn-primary {
    color: @fc;
    background: linear-gradient(90deg, #206dec, #359eff);
  }
}
</style>
