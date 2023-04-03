import axios, { type AxiosRequestConfig }  from 'axios'

interface IRequest {
  get<T>(url: string, params?: unknown): Promise<T>;

/*   post<T>(url: string, params?: unknown): Promise<T>;

  upload<T>(url: string, params: unknown): Promise<T>;

  put<T>(url: string, params: unknown): Promise<T>;

  delete<T>(url: string, params: unknown): Promise<T>;

  download(url: string): void; */
}

let loadingInstance: any;

const request = axios.create({
  baseURL: 'http://127.0.0.1:3000/',
  timeout: 20000,
  withCredentials: true
})

request.interceptors.request.use(
  (config: AxiosRequestConfig | any) => {
    loadingInstance = ElLoading.service({
      lock: true,
      text: 'Loading',
      // spinner: 'el-icon-loading',
      background: 'rgba(0, 0, 0, 0.7)'
    });
    config.params = { ...config.params, timestamp: Date.now() };
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

request.interceptors.response.use(
  response => {
    console.log('响应拦截器数据', response);
    loadingInstance.close();
    if (response.data.code === 503) {
      // console.log('验证码错误');
      return Promise.reject(response.data.message);
    }
    return response.data;
  },
  error => {
    // console.log('响应报错', );
    loadingInstance.close();
    return Promise.reject(error.response.data.message);
  }
);

/* const request: IRequest = {
  get(url, params) {
    return new Promise((resolve, reject) => {
      axios.get(url, { params })
        .then((res) => { 
          resolve(res.data);
        })
        .catch((err) => {
            reject(err.data);
        });
    });
  },
} */

export default request
