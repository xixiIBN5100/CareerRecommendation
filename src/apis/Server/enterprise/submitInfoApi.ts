import { request } from '@/apis/axios'

export interface enterpriseInfo{
  name: string,
  introduction: string,
  location: string,
  industry: string,
  website: string,
  email: string,
}

const submitInfoApi = (data:enterpriseInfo,token:string) => {
  return request("/api/enterprise/info",{
    data: data,
    method: "post",
    headers: {"Content-Type":"application/json","Authorization": 'Bearer ' + token},
  })
}

export default submitInfoApi;