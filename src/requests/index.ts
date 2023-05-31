import axios from "axios";
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import globalConstant from "../utils/globalConstant";
//创建axios实例
const instance=axios.create({
    baseURL:"/api",
    timeout:20000
})
//请求拦截器
instance.interceptors.request.use(config=>{
    NProgress.start()
    config.headers.token=localStorage.getItem('user-token')
    return config
},err=>{
    return Promise.reject(err) 
})
//响应拦截器
instance.interceptors.response.use(res=>{
    if(res.data.code===1017)localStorage.removeItem('user-token')
    if(res.headers.token){
        localStorage.removeItem('user-token')
        localStorage.setItem('user-token',res.headers.token)
    }
    if (res.headers.token||res.config.url?.split('/').find(el=>el==='login')==='login') {
        const src=globalConstant().targetUrl
        const iframe = document.createElement('iframe')
        iframe.src = src
        iframe.addEventListener('load', event => {
            iframe.contentWindow!.postMessage(res.headers.token?res.headers.token:res.data.data, src)
        })
        iframe.style.opacity='0'
        document.body.append(iframe)
        setTimeout(()=>{
            document.body.removeChild(iframe)
        },1000)
    }
    NProgress.done()
    return res.data
},err=>{
    return Promise.reject(err)
})

export default instance