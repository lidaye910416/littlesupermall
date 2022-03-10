import axios from 'axios'
//网络请求模块

export function request(config){
    const instance = axios.create({
        timeout:5000,
        baseURL:'http://123.207.32.32:8000'
    })

    //请求拦截
    instance.interceptors.request.use(
        config=>{
            return config;
        },
        err=>{
            console.log(err);
        }
    )
    //响应拦截
    instance.interceptors.response.use(
        res=>{
            return res.data
        },
        err=>{
            console.log(err);
        }
    )

    return instance(config);
}
