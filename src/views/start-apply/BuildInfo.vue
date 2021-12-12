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
          <van-radio-group v-model="buildInfo.buildType" direction="horizontal" class="radio-group">
            <van-radio v-for="(item, index) in buildListDict" :key="index" :name="item.dictionaryValue" icon-size="15px" class="radio-item">
              {{ item.dictionaryName }}
            </van-radio>
          </van-radio-group>
        </div>
      </div>
    </div>
    <div class="file-box">
      <div class="file-item">
        <div class="title">申请理由</div>
        <van-divider />
        <div class="container">
          <van-radio-group v-model="buildInfo.applyReasonsType" direction="horizontal" class="radio-group">
            <van-radio
              v-for="(item, index) in reasonListDict"
              :key="index"
              :name="item.dictionaryValue"
              icon-size="15px"
              class="radio-item raido3item"
            >
              {{ item.dictionaryName }}
            </van-radio>
          </van-radio-group>
        </div>
      </div>
    </div>

    <div class="btn-group">
      <button type="button" class="cus-btn btn-default" @click="goToPrevious">上一步</button>
      <button type="button" class="cus-btn btn-default" @click="handleSave">保存</button>
      <button type="button" class="cus-btn btn-primary" @click="goToNext">下一步</button>
    </div>
  </div>
</template>

<script>
// import sHeader from '@/components/SimpleHeader'
import { reactive, onMounted, toRefs } from 'vue'
import { useRouter } from 'vue-router'
// import $localStorage from '@/utils/localStorage.js'
// import { getDictData } from '@/utils/data.js'
export default {
  components: {
    // sHeader
  },
  setup() {
    const router = useRouter()
    const state = reactive({
      buildInfo: {
        buildType: '1',
        applyReasonsType: "5",
      },
      buildListDict: [
        { dictionaryName: '原址翻建', dictionaryValue: '1' },
        { dictionaryName: '改扩建', dictionaryValue: '2' },
        { dictionaryName: '异地新建', dictionaryValue: '3' },
      ],
      reasonListDict: [
        { dictionaryName: '无房户', dictionaryValue: '1' },
        { dictionaryName: '危房户', dictionaryValue: '2' },
        { dictionaryName: '住房困难户', dictionaryValue: '3' },
        { dictionaryName: '五保户', dictionaryValue: '4' },
        { dictionaryName: '其他', dictionaryValue: '5' },
      ],
    })
    // getDictData('BUILD_TYPE').then((list) => {
    //   state.buildListDict = list
    // })
    // getDictData('APPLY_REASONS_TYPE').then((list) => {
    //   state.reasonListDict = list
    // })
    onMounted(async () => {
      // if ($localStorage.get('buildInfo')) {
      //   state.buildInfo = JSON.parse($localStorage.get('buildInfo'))
      // }
    })
    // 上一步
    const goToPrevious = () => {
      // $localStorage.set('buildInfo', JSON.stringify(state.buildInfo))
      router.push({ path: `/start-apply/apply-base` })
    }
    // 下一步
    const goToNext = () => {
      // $localStorage.set('buildInfo', JSON.stringify(state.buildInfo))
      router.push({ path: `/start-apply/apply-materials` })
    }
    // 保存
    const handleSave = () => {
      // $localStorage.set('buildInfo', JSON.stringify(state.buildInfo))
    }

    return {
      ...toRefs(state),
      goToNext,
      goToPrevious,
      handleSave,
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
