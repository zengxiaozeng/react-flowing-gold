import axios from 'axios'
import { getToken, removeToken } from '@/utils/auth'
import { Modal } from 'antd'
import { push } from 'react-router-redux';

const baseURL = process.env.NODE_ENV === 'development' ? 'http://10.200.1.37:8072' : 'https://gateway.yingxinxin.cn'
// 创建axios实例
const service = axios.create({
    baseURL: baseURL, // api的base_url
    timeout: 90000, // 请求超时时间
    withCredentials: true
})

// request拦截器
service.interceptors.request.use(config => {
    // config.headers['Authorization'] = 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJtYzI2NzM5NjQzNDMyNzc2NDk5MiIsImF1dGgiOiJST0xFX09SR19BRE1JTixST0xFX09SR19VU0VSLFJPTEVfT1JHX1ZJUF9VU0VSIiwiZXhwIjoxNTcxMzg2MDIwfQ.krBRukzxeS0vL6t9uCu0AjBobi2cSvJCOqWNlhl6S1ZDyOm_KDERtRTjMpaPQ7Xjw12M2gkIbB0HWSa51QbJwQ'
    if (getToken()) {
        config.headers['Authorization'] = 'Bearer ' + getToken()
    }
    return config
}, error => {
    console.log(error)
    Promise.reject(error)
})

function logout() {
    removeToken()
    location.reload();
}

// respone拦截器
service.interceptors.response.use(
    response => {
        return Promise.resolve(response)
    },
    (error) => {
        var message = (error.response && error.response.data.message) || (error.message.indexOf('timeout') > -1 ? '请求超时' : error.message)

        if (error.response.data.code === '0000005') {
            Modal.error({
                title: '请求错误',
                content: message,
                onOk() { logout() }
            })
        } else {
            Modal.error({
                title: '请求错误',
                content: message
            })
        }
        return Promise.reject(error)
    }
)

export default service
