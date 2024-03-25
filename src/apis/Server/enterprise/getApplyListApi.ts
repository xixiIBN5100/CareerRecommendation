import {request} from '@/apis/axios';

interface paramsData{
  page_num?: number,
  page_size?: number,
  name?: string,
  status?: number,
  education?: string,
}

const getApplyApi = async (params:paramsData,token:string) => {
  return request("/api/enterprise/student/post",{
    method: "get",
    params: params,
    headers: {"Authorization": 'Bearer ' + token},
  })
}

export default getApplyApi;