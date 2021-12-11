<template>
  <div class="page">
    <!-- <header class="home-header wrap" :class="{ active: headerScroll }"></header> -->
    <nav-bar />
    <div class="banner">
      <van-image fit="cover" src="https://img01.yzcdn.cn/vant/cat.jpeg" />
    </div>
    <div class="category-list">
      <div v-for="item in categoryList" v-bind:key="item.categoryId" @click="tips">
        <img :src="item.imgUrl" />
        <span>{{ item.name }}</span>
      </div>
    </div>
    <div class="good">
      <header class="good-header">公示栏</header>
      <van-skeleton title :row="3" :loading="loading" >
        <div class="good-box">
          <!-- @click="goToDetail(item)" -->
          <div class="good-item" v-for="item in newGoodses" :key="item.goodsId">
            <div class="good-desc">
              <div class="title">{{ item.title }}</div>
              <div class="desc">{{ item.desc }}</div>
            </div>
            <img :src="$filters.prefix(item.goodsCoverImg)" alt="" />
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
      newGoodses: [
        {
          goodsCoverImg: 'https://img01.yzcdn.cn/vant/cat.jpeg',
          title: '张丹的建房公示',
          desc: '建房类型：原址翻建',
        },
        {
          goodsCoverImg: 'https://img01.yzcdn.cn/vant/cat.jpeg',
          title: '张丹的建房公示',
          desc: '建房类型：原址翻建',
        },
        {
          goodsCoverImg: 'https://img01.yzcdn.cn/vant/cat.jpeg',
          title: '张丹的建房公示',
          desc: '建房类型：原址翻建',
        },
        {
          goodsCoverImg: 'https://img01.yzcdn.cn/vant/cat.jpeg',
          title: '张丹的建房公示',
          desc: '建房类型：原址翻建',
        },
      ],
      recommends: [],
      categoryList: [
        {
          name: '建房申请',
          imgUrl: 'https://s.yezgea02.com/1604041127880/%E8%B6%85%E5%B8%82%402x.png',
          categoryId: 100001,
        },
        {
          name: '开工申请',
          imgUrl: 'https://s.yezgea02.com/1604041127880/%E6%9C%8D%E9%A5%B0%402x.png',
          categoryId: 100003,
        },
        {
          name: '竣工申请',
          imgUrl: 'https://s.yezgea02.com/1604041127880/%E5%85%A8%E7%90%83%E8%B4%AD%402x.png',
          categoryId: 100002,
        },
        {
          name: '申请记录',
          imgUrl: 'https://s.yezgea02.com/1604041127880/%E7%94%9F%E9%B2%9C%402x.png',
          categoryId: 100004,
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

    const tips = () => {
      Toast('敬请期待')
    }

    return {
      ...toRefs(state),
      goToDetail,
      tips,
    }
  },
}
</script>

<style lang="less" scoped >
@import '../common/style/mixin';
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
      &:nth-child(2n + 1) {
        border-right: 1px solid #e9e9e9;
      }
    }
  }
}
</style>