import axios from "axios";
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

//创建axios实例
const instance=axios.create({
    baseURL:"/api",
    timeout:20000
})
//请求拦截器
instance.interceptors.request.use(config=>{
    NProgress.start()
    return config
},err=>{
    return Promise.reject(err)
})
//响应拦截器
instance.interceptors.response.use(res=>{
    NProgress.done()
    return res.data
},err=>{
    return Promise.reject(err)
})

export default instance