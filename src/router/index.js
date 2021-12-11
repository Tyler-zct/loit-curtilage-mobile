import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(), // hash模式：createWebHashHistory，history模式：createWebHistory
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      name: 'home',
      component: () => import(/* webpackChunkName: "home" */ '@/views/Home.vue'),
      meta: {
        index: 1
      }
    },
    {
      path: '/login',
      name: 'login',
      component: () => import(/* webpackChunkName: "login" */ '@/views/Login.vue'),
      meta: {
        index: 1
      }
    },
    {
      path: '/about',
      name: 'about',
      component: () => import(/* webpackChunkName: "about" */ '@/views/About.vue'),
      meta: {
        index: 2
      }
    },
    // 申报材料上传
    {
      path: '/build-apply/apply-materials',
      name: 'ApplyMaterials',
      component: () => import('@/views/build-apply/ApplyMaterials.vue')
    },
    // 建房信息
    {
      path: '/build-apply/build-info',
      name: 'BuildInfo',
      component: () => import('@/views/build-apply/BuildInfo.vue')
    },
    {
      path: '/category',
      name: 'category',
      component: () => import(/* webpackChunkName: "category" */ '@/views/Category.vue'),
      meta: {
        index: 1
      }
    },
    {
      path: '/product-list',
      name: 'product-list',
      component: () => import(/* webpackChunkName: "product-list" */ '@/views/ProductList.vue'),
      meta: {
        index: 2
      }
    },
    {
      path: '/product/:id',
      name: 'product',
      component: () => import(/* webpackChunkName: "product" */ '@/views/ProductDetail.vue'),
      meta: {
        index: 3
      }
    },
    {
      path: '/cart',
      name: 'cart',
      component: () => import(/* webpackChunkName: "cart" */ '@/views/Cart.vue'),
      meta: {
        index: 1
      }
    },
    {
      path: '/create-order',
      name: 'create-order',
      component: () => import(/* webpackChunkName: "create-order" */ '@/views/CreateOrder.vue'),
      meta: {
        index: 2
      }
    },
    {
      path: '/order',
      name: 'order',
      component: () => import(/* webpackChunkName: "order" */ '@/views/Order.vue'),
      meta: {
        index: 2
      }
    },
    {
      path: '/order-detail',
      name: 'order-detail',
      component: () => import(/* webpackChunkName: "order-detail" */ '@/views/OrderDetail.vue'),
      meta: {
        index: 3
      }
    },
    {
      path: '/user',
      name: 'user',
      component: () => import(/* webpackChunkName: "user" */ '@/views/User.vue'),
      meta: {
        index: 1
      }
    },
    {
      path: '/setting',
      name: 'setting',
      component: () => import(/* webpackChunkName: "setting" */ '@/views/Setting.vue'),
      meta: {
        index: 2
      }
    },
    {
      path: '/address',
      name: 'address',
      component: () => import(/* webpackChunkName: "address" */ '@/views/Address.vue'),
      meta: {
        index: 2
      }
    },
    {
      path: '/address-edit',
      name: 'address-edit',
      component: () => import(/* webpackChunkName: "address-edit" */ '@/views/AddressEdit.vue'),
      meta: {
        index: 3
      }
    },
  ]
})

export default router