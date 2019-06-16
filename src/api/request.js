
import Vue from 'vue'
import axios from 'axios'
import store from '@/store'
import {cookieGetToken} from '@/tools/Cookie'
Vue.prototype.$axios = axios; // 特殊情况下可以使用this.$axios，一般使用自定义的
var root = process.env.BASE_API;// 会根据环境不同自动获取对应环境的接口
// 自定义封装的 request,
const request = axios.create({
  baseURL : root,//所有接口主域名，
  timeout: 10000, // 请求超时时间
});
// 请求时前的拦截器
request.interceptors.request.use(
  // 配置信息
  (config)=>{
      console.log(store,'src\\api\\request.js中——打印store');
    // 可以在此处为请求设置请求头
      if (store.state.data.token) {
          config.headers['X-Token'] = store.state.data.token// 让每个请求携带自定义token 请根据实际情况自行修改
      }
    return config
  },
  // 请求出错
  (error)=>{
      Promise.reject(error)
  }
);
// 返回前的拦截器
request.interceptors.response.use(
  // 请求成功返回的数据
  (response)=>{
    return response
  },
  // 返回数据出错
  (error)=>{
      Promise.reject(error)
  }
);
export default request
