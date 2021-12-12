<template>
  <div class="page">
    <!-- <header class="home-header wrap" :class="{ active: headerScroll }"></header> -->
    <nav-bar />
    <div class="banner">
      <van-image fit="cover" :src="bannerImg" />
    </div>
    <div class="category-list">
      <div v-for="(item, index) in categoryList" v-bind:key="index" @click="handleSkip(item.skipUrl)">
        <img :src="item.imgUrl" />
        <span>{{ item.name }}</span>
      </div>
    </div>
    <div class="good">
      <header class="good-header">公示栏</header>
      <van-skeleton title :row="3" :loading="loading">
        <div class="good-box">
          <div class="good-item" v-for="item in newGoodses" :key="item.goodsId"  @click="goToDetail(item)">
            <div class="good-desc">
              <div class="title">{{ item.title }}</div>
              <div class="desc">{{ item.desc }}</div>
            </div>
            <div class="good-num">
              <img :src="item.goodsCoverImg" />
              <span class="days" :style="{ marginLeft: item.days < 10 ? '-7px' : '-15px' }">{{ item.days }}</span>
            </div>
          </div>
        </div>
      </van-skeleton>
    </div>
  </div>
</template>

<script>
import { reactive, onMounted, toRefs, nextTick } from 'vue'
import { useRouter } from 'vue-router'
import navBar from '@/components/NavBar'
// import { getDictDataList } from '@/service/home'
import bannerImg from '@/assets/Images/banner.png'
import applyListImg from '@/assets/Images/apply-list.png'
import buildApplyImg from '@/assets/Images/build-apply.png'
import completedApplyImg from '@/assets/Images/completed-apply.png'
import startApplyImg from '@/assets/Images/start-apply.png'
// import noticeBlueImg from '@/assets/Images/notice_blue.png'
// import noticeCyanImg from '@/assets/Images/notice_cyan.png'
// import noticeGreenImg from '@/assets/Images/notice_green.png'
import { getLocal } from '@/common/js/utils'
import { Toast } from 'vant'
export default {
  name: 'home',
  components: {
    navBar,
  },
  setup() {
    const router = useRouter()
    const state = reactive({
      swiperList: [], // 轮播图列表
      isLogin: false, // 是否已登录
      headerScroll: false, // 滚动透明判断
      hots: [],
      bannerImg: bannerImg,
      newGoodses: [
        {
          goodsCoverImg: '',
          title: '',
          desc: '',
          days: ''
        }
        // {
        //   goodsCoverImg: noticeBlueImg,
        //   title: '张丹的建房公示',
        //   desc: '建房类型：原址翻建',
        //   days: 15,
        // },
        // {
        //   goodsCoverImg: noticeBlueImg,
        //   title: '张丹的建房公示',
        //   desc: '建房类型：原址翻建',
        //   days: 15,
        // },
        // {
        //   goodsCoverImg: noticeCyanImg,
        //   title: '张丹的建房公示',
        //   desc: '建房类型：原址翻建',
        //   days: 3,
        // },
        // {
        //   goodsCoverImg: noticeGreenImg,
        //   title: '张丹的建房公示',
        //   desc: '建房类型：原址翻建',
        //   days: 1,
        // },
      ],
      recommends: [],
      categoryList: [
        {
          name: '建房申请',
          imgUrl: buildApplyImg,
          skipUrl: '/build-apply/apply-notes',
        },
        {
          name: '开工申请',
          imgUrl: startApplyImg,
          skipUrl: '',
        },
        // /start-apply/apply-notes
        {
          name: '竣工申请',
          imgUrl: completedApplyImg,
          skipUrl: '',
        },
        {
          name: '申请记录',
          imgUrl: applyListImg,
          skipUrl: '',
        },
      ],
      loading: true,
    })
    onMounted(async () => {
      const token = getLocal('token')
      if (token) {
        state.isLogin = true
      }
      Toast.loading({
        message: '加载中...',
        forbidClick: true,
      })
      // const { data } = await getDictDataList()
      // console.log(data)
      // state.swiperList = data.carousels
      // state.newGoodses = data.newGoodses
      // state.hots = data.hotGoodses
      // state.recommends = data.recommendGoodses
      state.loading = false
      Toast.clear()
    })

    nextTick(() => {
      window.addEventListener('scroll', () => {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
        scrollTop > 100 ? (state.headerScroll = true) : (state.headerScroll = false)
      })
    })

    const goToDetail = (item) => {
      router.push({ path: `/product/${item.goodsId}` })
    }

    const handleSkip = (skipUrl) => {
      if (skipUrl) {
        router.push({ path: skipUrl })
      } else {
        Toast('敬请期待')
      }
    }

    return {
      ...toRefs(state),
      goToDetail,
      handleSkip,
    }
  },
}
</script>

<style lang="less" scoped >
@import '../common/style/mixin';
.page {
  position: absolute;
  top: 0;
  bottom: 0;
  .home-header {
    position: fixed;
    left: 0;
    top: 0;
    .wh(100%, 50px);
    .fj();
    line-height: 50px;
    padding: 0 15px;
    .boxSizing();
    font-size: 15px;
    color: #fff;
    z-index: 10000;
    .nbmenu2 {
      color: @primary;
    }
    &.active {
      background: @primary;
      .nbmenu2 {
        color: #fff;
      }
      .login {
        color: #fff;
      }
    }

    .header-search {
      display: flex;
      .wh(74%, 20px);
      line-height: 20px;
      margin: 10px 0;
      padding: 5px 0;
      color: #232326;
      background: rgba(255, 255, 255, 0.7);
      .borderRadius(20px);
      .app-name {
        padding: 0 10px;
        color: @primary;
        font-size: 20px;
        font-weight: bold;
        border-right: 1px solid #666;
      }
      .icon-search {
        padding: 0 10px;
        font-size: 17px;
      }
      .search-title {
        font-size: 12px;
        color: #666;
        line-height: 21px;
      }
    }
    .icon-iconyonghu {
      color: #fff;
      font-size: 22px;
    }
    .login {
      color: @primary;
      line-height: 52px;
      .van-icon-manager-o {
        font-size: 20px;
        vertical-align: -3px;
      }
    }
  }
  .banner {
    width: 100%;
    height: 150px;
    margin-top: 15px;
    overflow: hidden;
    .borderRadius(10px);
  }
  .category-list {
    // display: flex;
    // flex-shrink: 0;
    // flex-wrap: wrap;
    .fj();
    width: 100%;
    padding-bottom: 13px;
    div {
      display: flex;
      flex-direction: column;
      width: 20%;
      text-align: center;
      img {
        .wh(34px, 31px);
        margin: 13px auto 8px auto;
      }
    }
  }
  .good {
    padding-bottom: 100px;
    .good-header {
      font-size: 16px;
      font-weight: bold;
      margin: 10px 0 8px;
    }
    .good-box {
      display: flex;
      justify-content: flex-start;
      flex-wrap: wrap;
      .good-item {
        box-sizing: border-box;
        width: 100%;
        padding: 10px 12px;
        background-color: #ffffff;
        box-shadow: 0px 2px 5px 0px rgba(127, 139, 168, 0.12);
        .borderRadius(10px);
        .fj();
        margin-bottom: 12px;
        img {
          display: block;
          width: 67px;
          .borderRadius(50%);
        }
        .good-desc {
          font-size: 16px;
          padding: 10px 0;
          .title {
            font-weight: bold;
          }
          .desc {
            font-size: 14px;
            color: #9297ae;
            margin-top: 8px;
          }
        }
        .good-num {
          position: relative;
          .days {
            position: absolute;
            top: 50%;
            left: 50%;
            margin-left: -15px;
            margin-top: -15px;
            font-size: 25px;
            font-weight: bold;
            color: #000000;
          }
        }
        &:nth-child(2n + 1) {
          border-right: 1px solid #e9e9e9;
        }
      }
    }
  }
}
</style>