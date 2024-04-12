import { request } from '@/apis/axios';

const upvoteJobAPI = (jobId:number,token:string) => {
  return request("/api/student/job/upvote",{
    method: "post",
    headers: {"Content-Type":"application/json","Authorization": "Bearer " + token},
    data: {id:jobId},
  })
}

export default upvoteJobAPI;