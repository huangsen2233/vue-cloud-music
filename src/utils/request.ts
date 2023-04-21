import axios from 'axios'
import type { AxiosRequestConfig } from 'axios';
import { startLoading, endLoading } from '@/global/loading';

// 解决 类型AxiosResponse<any, any>上不存在某属性的问题
declare module "axios" {
  interface AxiosResponse<T = any> {
    code: number
    cookie: string
    message: string
    profile: any
    account: any
    banners: any
    result: any
  }
  export function create(config?: AxiosRequestConfig): AxiosInstance;
}

const request = axios.create({
  baseURL: 'http://127.0.0.1:3000/',
  timeout: 20 * 1000,
  withCredentials: true
})

request.interceptors.request.use(
  (config: AxiosRequestConfig | any) => {
    /* if (config.url !== '/login/qr/check' && config.url !== '/user/account') {
      startLoading({});
    } */
    config.params = { ...config.params, timestamp: Date.now() }; // 添加一个时间戳的参数
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

request.interceptors.response.use(
  response => {
    // console.log('响应拦截器response', response);
    // endLoading();
    if (response.data.code === 503) {
      // console.log('验证码错误');
      return Promise.reject(response.data.message);
    }
    return response.data;
  },
  error => {
    console.log('响应拦截器error', error);
    if (error.response.data.message === '亲爱的,暂无版权') {
      return error.response.data
    }
    // endLoading();
    return Promise.reject(error);
  }
);

export default request
