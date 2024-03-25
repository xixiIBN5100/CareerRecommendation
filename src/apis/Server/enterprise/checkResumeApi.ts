import { request } from '@/apis/axios';

const checkResumeApi = (student_id:number,token:string) => {
  return request("/api/enterprise/student/resume",{
    params: {student_id:student_id},
    method: "get",
    headers: {"Authorization": 'Bearer ' + token},
  })
}

export default checkResumeApi;