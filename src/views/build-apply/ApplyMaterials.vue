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
    <div class="file-box">
      <div class="file-item">
        <div class="title">农村宅基地使用承诺书</div>
        <van-divider />
        <div class="container">
          <van-uploader v-model="letterList" multiple  />
          <ImageUpload />
        </div>
      </div>
    </div>
    <div class="file-box">
      <div class="file-item">
        <div class="title">股权证复印件</div>
        <van-divider />
        <div class="container">
          <van-uploader v-model="capitalList" multiple upload-icon="plus" />
        </div>
      </div>
    </div>
    <div class="file-box">
      <div class="file-item">
        <div class="title">申请人身份证复印件</div>
        <van-divider />
        <div class="container">
          <van-uploader v-model="idCardList" multiple upload-icon="plus" />
        </div>
      </div>
    </div>
    <div class="file-box">
      <div class="file-item">
        <div class="title">个人建房用地界限申请表</div>
        <van-divider />
        <span class="red-desc">（在红线图复印件四至签字盖章）</span>
        <div class="container">
          <van-uploader v-model="limitList" multiple upload-icon="plus" />
        </div>
      </div>
    </div>
    <div class="btn-group">
      <button type="button" class="cus-btn btn-default" @click="goToPrevious">上一步</button>
      <button type="button" class="cus-btn btn-default">保存</button>
      <button type="button" class="cus-btn btn-primary">提交</button>
    </div>
  </div>
</template>

<script>
import { reactive, onMounted, toRefs } from 'vue'
import ImageUpload from '@/components/SimpleHeader'
import { useRouter } from 'vue-router'
export default {
  components: {
    ImageUpload
  },
  setup() {
    const router = useRouter()
    const state = reactive({
      letterList: [],
      capitalList: [],
      idCardList: [],
      limitList: []
    })
    onMounted(async () => {})

    const goToPrevious = () => {
      router.push({ path: `/build-apply/build-info` })
    }

    return {
      ...toRefs(state),
      goToPrevious,
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
