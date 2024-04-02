import { request } from '@/apis/axios';

const clearMsgApi = (token:string) => {
  return request("/api/student/bot/clean",{
    method: "post",
    headers: {"Authorization": 'Bearer ' + token},
  })
}

export default clearMsgApi;