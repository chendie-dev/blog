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
    config.headers.token=localStorage.getItem('token')
    return config
},err=>{
    return Promise.reject(err) 
})
//响应拦截器
instance.interceptors.response.use(res=>{
    if(res.data.code===1017)localStorage.removeItem('token')
    if(res.headers.token){
        localStorage.removeItem('token')
        localStorage.setItem('token',res.headers.token)
    }
    NProgress.done()
    return res.data
},err=>{
    return Promise.reject(err)
})

export default instance