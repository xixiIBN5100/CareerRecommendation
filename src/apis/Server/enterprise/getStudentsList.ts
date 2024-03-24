import { request } from '@/apis/axios'

interface pageData{
  page_num?: number,
  page_size?: number,
  education?: string,
  open_public?: number,
}

const getStudentsListApi = async (param:pageData,token:string) => {
  return request("/api/enterprise/students",{
    method: "get",
    headers: {'Authorization':`Bearer ${token}`},
    params: param,
  })
}

export default getStudentsListApi;