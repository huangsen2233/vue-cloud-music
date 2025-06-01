import axios from 'axios';
import qs from 'qs';
import { ElMessage } from 'element-plus';
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse, CancelTokenSource } from 'axios';
import { startLoading, endLoading } from '@/global/loading';

const baseURL = import.meta.env.VITE_APP_BASE_API;

// 映射关系: url -> axios.CancelToken.source()
const urlMap: { [key: string]: CancelTokenSource } = {}

const config = {
  baseURL,
  timeout: 20 * 1000,
  withCredentials: true
}

class HttpRequest {
  request: AxiosInstance
  loadingTimer: NodeJS.Timer | null

  constructor(config: AxiosRequestConfig) {
    this.request = axios.create(config)
    this.loadingTimer = null

    this.request.interceptors.request.use(
      (config: AxiosRequestConfig | any) => {
        // console.log('请求拦截器 -----', config);
        const key = config.url + '&' + qs.stringify(config.params)
        if (urlMap[key]) {
          urlMap[key].cancel('正在请求当前数据,请勿重复请求!');
        }
        const source = axios.CancelToken.source()
        urlMap[key] = source
        config.cancelToken = source.token
        config.params = { ...config.params, timestamp: Date.now() }; // 参数需要添加一个时间戳
        return config;
      },
      error => {
        return Promise.reject(error);
      }
    );
    
    this.request.interceptors.response.use(
      (response: AxiosResponse) => {
        // console.log('响应拦截器 - response', response);
        const key = response.config.url + '&' + qs.stringify(response.config.params)
        if (urlMap[key]) {
          delete urlMap[key]
        }
        if (response.data.code === 503) {
          // 验证码错误
          return Promise.reject(response.data.message);
        }
        return response;
      },
      error => {
        if (axios.isCancel(error)) {
          ElMessage.warning(`${error.message}`);
        }
        return Promise.reject(error);
      }
    );
  }

  get<T = any>(url: string, query?: object): Promise<T> {
    // startLoading({ text: 'loading......' })
    // this.loadingTimer = setTimeout(() => {
    //   endLoading()
    // }, 1000)
    return this.request.get<T>(url, query).then((response: AxiosResponse<T>) => {
      return response.data
    })
  }

  upload<T = any>(url: string, params?: any, config?: any): Promise<T> {
    return this.request.post<T>(url, params.formData, config).then((response: AxiosResponse<T>) => {
      return response.data
    })
  }

  post<T = any>(url: string, params?: any, headerConfig?: any): Promise<T> {
    return this.request({
      method: 'post',
      url,
      data: params.formData,
      headers: headerConfig,
    }).then((response: AxiosResponse<T>) => {
      return response.data
    })
  }
}
const request = new HttpRequest(config)
export default request
