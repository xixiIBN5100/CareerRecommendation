import axios, { type AxiosRequestConfig } from 'axios'
import { setupMockInterceptor } from './mock/mockInterceptor'

const axiosInstance = axios.create({
  baseURL:"https://phlin.top/",
  timeout: 10000,
})

// 设置mock拦截器
setupMockInterceptor(axiosInstance)

const request = <ResponseType = unknown>(
  url: string,
  options?: AxiosRequestConfig<unknown>,
): Promise<ResponseType> => {
  return new Promise((resolve, reject) => {
    axiosInstance({
      url,
      ...options,
    })
      .then(res => {
        resolve(res.data)
      })
      .catch(err => reject(err))
  })
}
export { axiosInstance, request }
