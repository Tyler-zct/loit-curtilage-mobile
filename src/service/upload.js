import {
    post,
    get
} from '@/utils/axios.js'
var api = '/api/v1'

// 文件上传
export function fileUpload(data) {
    return post(api + '/file/upload', data)
}

// 获取配置信息 
export function getSign() {
    return get(api + '/common/getConfig')
}