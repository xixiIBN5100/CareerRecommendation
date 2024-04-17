import axios, { type AxiosRequestConfig } from "axios";

const axiosInstance = axios.create({
  baseURL:"http://phlin.top:8000",
  timeout: 80000,
});

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