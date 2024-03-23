import { request } from '@/apis/axios'

const getInfoApi = (token:string) => {
  return request("/api/enterprise/info",{
    method: "get",
    headers: {"Authorization": 'Bearer ' + token},
  })
}

export default getInfoApi;