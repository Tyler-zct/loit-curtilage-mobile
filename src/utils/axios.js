/**
 * 严肃声明：
 * 开源版本请务必保留此注释头信息，若删除我方将保留所有法律责任追究！
 * 本系统已申请软件著作权，受国家版权局知识产权以及国家计算机软件著作权保护！
 * 可正常分享和学习源码，不得用于违法犯罪活动，违者必究！
 * Copyright (c) 2020 陈尼克 all rights reserved.
 * 版权所有，侵权必究！
 */
import axios from 'axios'
import { Toast } from 'vant'
// import router from '../router'
import { aes } from './crypto'
import {
  baseUrl,
  baseUrlFile,
  mhbaseUrl,
} from '../config/env.js'

// axios.defaults.baseURL = process.env.NODE_ENV == 'development' ? '//backend-api-01.newbee.ltd/api/v1' : '//backend-api-01.newbee.ltd/api/v1'
// axios.defaults.withCredentials = true
// axios.defaults.headers['X-Requested-With'] = 'XMLHttpRequest'
// axios.defaults.headers['token'] = localStorage.getItem('token') || ''
// axios.defaults.headers.post['Content-Type'] = 'application/json'

// 创建axios实例
const service = axios.create({
  //   baseURL: process.env.BASE_API, // api的base_url
  timeout: 30000, // 请求超时时间
  withCredentials: true,
  cache: true,
  headers: {
    common: {
      'X-Requested-With': 'XMLHttpRequest'
    }
  }
})

let loadingInstance

// 请求拦截
service.interceptors.request.use(config => {
  // 对于post请求，且请求中需要时间较长的数据提交接口展示loading
  if (config.data && config.data.showLoading) {
    loadingInstance =  Toast.loading({
      message: '加载中...',
      forbidClick: true,
      loadingType: 'spinner',
    });
    delete config.data.showLoading
  }
  return config
})

// 响应拦截
service.interceptors.response.use(res => {
  if (loadingInstance){
    setTimeout(() => {
      loadingInstance.close()
    }, 1000)
  }
  if (typeof res.data !== 'object') {
    Toast.fail('服务端异常！')
    return Promise.reject(res)
  }
  if (res.data.resultCode != 200) {
    if (res.data.message) Toast.fail(res.data.message)
    // if (res.data.resultCode == 416) {
    //   router.push({ path: '/login' })
    // }
    return Promise.reject(res.data)
  }
  return res.data
})

/* 参数配置 */
const getConfig = (params, level = 0) => {
  const paramsTemp = params || {}
  const config_ = {
    emulateJSON: true,
    params: paramsTemp,
    timeout: 200000,
    headers: {
      token: localStorage.getItem('token') || ''
    }
  }
  if (level === 1) { // 加密
    params.password = aes.en(params.password)
    config_.params = params
  } else if (level === 2) { // 修改密码加密
    params.newPassword = aes.en(params.newPassword)
    params.oldPassword = aes.en(params.oldPassword)
    config_.params = params
  }
  return config_
}

const getPostConfig = (params, level = 0) => {
  if (level === 1) { // 加密
    params.password = aes.en(params.password)
  }
  return params
}

/** ******************** [baseUrl] ********************/
/* get请求 */
const get = (url, params) => service.get(baseUrl + url, { params })
const getAse = (url, params, level) => service.get(baseUrl + url, getConfig(params, level))
/*  post请求 */
const post = (url, params) => service.post(baseUrl + url, params)
const postAse = (url, params, level) => service.post(baseUrl + url, getPostConfig(params, level)) // 选择性加密
/* delete请求 */
const DELETE = (url, params) => service.delete(baseUrl + url, { params })
/* put请求 */
const put = (url, params) => service.put(baseUrl + url, params)
/* put请求 */
const patch = (url, params) => service.patch(baseUrl + url, params)

/** ******************** [mhbaseUrl] ********************/
/* get门户请求 */
const getmh = (url, params) => service.get(mhbaseUrl + url, { params })
/* 门户请求post */
const postmh = (url, params) => service.post(mhbaseUrl + url, params)
/* 门户请求post */
const DELETEMH = (url, params) => service.delete(mhbaseUrl + url, params)

/** ******************** [baseUrlFile] ********************/
/* get请求 */
const getfile = (url, params, level) => service.get(baseUrlFile + url, getConfig(params, level))
/* delete请求 */
const DELETEFILE = (url, params) => service.delete(baseUrlFile + url, params)
/* post请求 */
const postfile = (url, params) => service.post(baseUrlFile + url, params)
/* post文件下载请求 */
const postBlob = (url, params) => service.post(baseUrl + url, params, {responseType:'blob'})

export {
  service,
  get,
  getfile,
  getAse,
  getmh,
  postmh,
  DELETEMH,
  post,
  postAse,
  postBlob,
  DELETE,
  DELETEFILE,
  postfile,
  put,
  patch
}
