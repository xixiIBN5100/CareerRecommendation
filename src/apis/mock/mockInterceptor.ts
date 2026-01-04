// Mock拦截器 - 拦截axios请求并返回mock数据
import type { AxiosRequestConfig, AxiosResponse } from 'axios';
import mockData from './mockData';

// 是否启用mock模式
// 优先级：环境变量 VITE_ENABLE_MOCK > 开发模式自动启用
// 如果环境变量未设置，开发模式下默认启用mock，生产模式下默认禁用
const ENABLE_MOCK = import.meta.env.VITE_ENABLE_MOCK !== undefined 
  ? import.meta.env.VITE_ENABLE_MOCK === 'true'
  : import.meta.env.MODE === 'development';

// 获取mock响应
const getMockResponse = async (
  url: string,
  method: string,
  params?: any,
  data?: any
): Promise<AxiosResponse> => {
  const requestParams = method.toUpperCase() === 'GET' ? params : data;
  
  // 组合 URL 和 method 作为 key（用于区分同一URL不同method的情况）
  const methodUpperCase = method.toUpperCase();
  const mockKey = `${methodUpperCase} ${url}`;
  
  // 先尝试匹配 "METHOD URL" 格式的 key
  let mockHandler = mockData[mockKey];
  
  // 如果没找到，再尝试匹配只有 URL 的 key（向后兼容）
  if (!mockHandler) {
    mockHandler = mockData[url];
  }
  
  if (mockHandler) {
    const mockResult = await mockHandler(requestParams, { method, url });
    
    return {
      data: mockResult,
      status: 200,
      statusText: 'OK',
      headers: {},
      config: {} as AxiosRequestConfig
    } as AxiosResponse;
  }
  
  // 如果没有找到对应的mock数据，返回404
  return {
    data: {
      code: 404,
      msg: `Mock数据未找到: ${methodUpperCase} ${url}`,
      data: null
    },
    status: 404,
    statusText: 'Not Found',
    headers: {},
    config: {} as AxiosRequestConfig
  } as AxiosResponse;
};

// 创建mock拦截器
export const setupMockInterceptor = (axiosInstance: any) => {
  if (!ENABLE_MOCK) {
    console.log('Mock模式已禁用');
    return;
  }

  console.log('✅ Mock模式已启用 - 所有API请求将被拦截并返回mock数据');

  // 请求拦截器
  axiosInstance.interceptors.request.use(
    async (config: AxiosRequestConfig) => {
      if (ENABLE_MOCK) {
        const url = config.url || '';
        const method = config.method || 'GET';
        const params = config.params;
        const data = config.data;

        // 拦截请求并返回mock数据
        const mockResponse = await getMockResponse(url, method, params, data);
        
        // 抛出特殊错误，在响应拦截器中处理
        const error: any = new Error('Mock拦截');
        error.isMock = true;
        error.mockResponse = mockResponse;
        throw error;
      }
      return config;
    },
    (error: any) => {
      return Promise.reject(error);
    }
  );

  // 响应拦截器
  axiosInstance.interceptors.response.use(
    (response: AxiosResponse) => {
      return response;
    },
    async (error: any) => {
      // 如果是mock拦截的错误，返回mock响应
      if (error.isMock && error.mockResponse) {
        return Promise.resolve(error.mockResponse);
      }
      
      // 其他错误正常处理
      return Promise.reject(error);
    }
  );
};

export { ENABLE_MOCK };

