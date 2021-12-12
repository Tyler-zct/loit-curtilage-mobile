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
        <div class="container">
          <image-upload v-model="item.imgUrl" :fileType="item.type" @handleUploadSuccess="handleUploadSuccess"></image-upload>
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
import $localStorage from '@/utils/localStorage.js'
import { getDictData } from '@/utils/data.js'
import { Toast } from 'vant'
import { saveBuildApply } from '@/service/build-apply'
export default {
  components: {
    ImageUpload,
  },
  setup() {
    const router = useRouter()
    const state = reactive({
      materials: [
        { title: '农村宅基地使用承诺书', desc: '', imgUrl: '' },
        { title: '股权证复印件', desc: '', imgUrl: '' },
        { title: '申请人身份证复印件', desc: '', imgUrl: '' },
        { title: '家庭成员户口本复印件', desc: '', imgUrl: '' },
        { title: '个人建房用地界限申请表', desc: '（在红线图复印件四至签字盖章）', imgUrl: '' },
        { title: '住宅建设用地规划红线图', desc: '（地类不明确的需勘测定界报告、勘测定界图）', imgUrl: '' },
        { title: '无宅基地证明', desc: '（无旧宅基地的提供）', imgUrl: '' },
        { title: '房屋设计图', desc: '', imgUrl: '' },
        { title: '危房鉴定书', desc: '（原房屋为危房提供）', imgUrl: '' },
        { title: '村民小组同意书', desc: '', imgUrl: '' },
        { title: '与相邻权利人签订的书面协议或相邻权利人在房屋设计图上签字确认的材料', desc: '', imgUrl: '' },
        { title: '村协议', desc: '（传统保护村落或有特定要求的村落提供）', imgUrl: '' },
      ],
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
          }
        })
      })
      console.log(state.materials[0])
    })

    onMounted(async () => {})

    const goToPrevious = () => {
      router.push({ path: `/build-apply/build-info` })
    }
    const handleUploadSuccess = (fileRes) => {
      const fileItem = {
        name: fileRes.fileName,
        size: fileRes.fileSize,
        suffix: fileRes.fileType,
        type: fileRes.type,
        url: fileRes.filePath,
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
      $localStorage.set('attachInfoList', JSON.stringify(state.allFileList))
      Toast.success('保存成功')
    }
    const handleSubmit = () => {
      const applyMaterials = {
        attachInfoList: JSON.parse($localStorage.get('attachInfoList')),
        isSubmit: '0',
      }
      const buildInfo = JSON.parse($localStorage.get('buildInfo'))
      let params = Object.assign(applyMaterials, buildInfo)
      saveBuildApply(params).then((res) => {
        if (res.code == 100) {
          Toast(res.msg)
          router.push({ path: `/home` })
        }
      })
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
