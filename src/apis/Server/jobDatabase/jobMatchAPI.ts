import axios, { type AxiosRequestConfig } from "axios";
import { setupMockInterceptor } from "@/apis/mock/mockInterceptor";

const axiosInstance = axios.create({
  baseURL:"http://phlin.top:8000",
  timeout: 80000,
});

// 设置mock拦截器
setupMockInterceptor(axiosInstance);

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
        resolve(res.data);
      })
      .catch(err => reject(err));
  });
};

const jobMatchAPI = (params:{
  keyword: string,
  skills: string
}) => {
  return request("/api/job", {
    method: "GET",
    params: params
  });
};

export default jobMatchAPI;