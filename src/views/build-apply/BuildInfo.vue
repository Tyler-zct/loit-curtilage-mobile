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
      <div><span class="page-num">4</span><span class="page-title">建房信息</span></div>
      <div class="plan">4/5</div>
    </div>
    <div class="file-box">
      <div class="file-item">
        <div class="title">建房类型</div>
        <van-divider />
        <div class="container">
          <van-radio-group v-model="buildType" direction="horizontal" class="radio-group">
            <van-radio :name="1" icon-size="15px" class="radio-item">保留</van-radio>
            <van-radio :name="2" icon-size="15px" class="radio-item">退还村集体</van-radio>
            <van-radio :name="3" icon-size="15px" class="radio-item">其他</van-radio>
          </van-radio-group>
        </div>
      </div>
    </div>
    <div class="file-box">
      <div class="file-item">
        <div class="title">申请理由</div>
        <van-divider />
        <div class="container">
          <van-radio-group v-model="reason" direction="horizontal" class="radio-group">
            <van-radio v-for="(item, index) in reasonList" :key="index" :name="item.value" icon-size="15px" class="radio-item raido3item">{{
              item.label
            }}</van-radio>
          </van-radio-group>
        </div>
      </div>
    </div>

    <div class="btn-group">
      <button type="button" class="cus-btn btn-default">上一步</button>
      <button type="button" class="cus-btn btn-default">保存</button>
      <button type="button" class="cus-btn btn-primary" @click="goToNext">下一步</button>
    </div>
  </div>
</template>

<script>
// import sHeader from '@/components/SimpleHeader'
import { reactive, onMounted, toRefs } from 'vue'
import { useRouter } from 'vue-router'
export default {
  components: {
    // sHeader
  },
  setup() {
    const router = useRouter()
    const state = reactive({
      buildType: 1,
      reason: 1,
      reasonList: [
        { label: '无房户', value: 1 },
        { label: '危房户', value: 2 },
        { label: '住房困难户', value: 3 },
        { label: '五保户', value: 4 },
        { label: '其他', value: 5 },
      ],
    })
    onMounted(async () => {})

    const goToNext = () => {
      router.push({ path: `/build-apply/apply-materials` })
    }

    return {
      ...toRefs(state),
      goToNext,
    }
  },
}
</script>

<style lang="less" scoped>
@import '@/common/style/mixin';
.page {
  position: absolute;
  top: 0;
  bottom: 0;
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
        .radio-group {
          display: flex;
          flex-wrap: wrap;
          .radio-item {
            width: 28%;
            margin-bottom: 10px;
          }
        }
      }
    }
  }
  .btn-group {
    margin: 50px 0 20px;
    position: fixed;
    bottom: 0;
    .cus-btn {
      .btn();
      margin-right: 10px;
    }
    .btn-primary {
      color: @fc;
      background: linear-gradient(90deg, #206dec, #359eff);
    }
  }
}
</style>
