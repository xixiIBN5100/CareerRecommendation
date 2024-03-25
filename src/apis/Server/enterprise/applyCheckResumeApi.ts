import { request } from '@/apis/axios';

const applyCheckResumeApi = async (student_id:number,token:string) => {
  return request("/api/enterprise/student/post",{
    method: "post",
    headers: {"Content-Type":"application/json",'Authorization':`Bearer ${token}`},
    data: {student_id:student_id},
  })
}

export default applyCheckResumeApi;