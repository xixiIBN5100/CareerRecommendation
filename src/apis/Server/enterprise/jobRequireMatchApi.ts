import { request } from '@/apis/axios'

interface params{
  education?: string,
  ability?: string,
  address?: string,
}

const jobRequireMatchApi = async (params:params,token:string) => {
  return request("/api/enterprise/requirement",{
    method: "get",
    headers: {"Authorization": "Bearer " + token},
    params: params,
  })
}

export default jobRequireMatchApi;