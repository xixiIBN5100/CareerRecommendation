import { request } from "@/apis/axios";

const setCommentAPI = (data:{
    job_id: number,
    parent_id: number,
    content: string
} , token: string) => {
  return request("/api/student/job/comment", {
    method: "POST",
    data: data,
    headers: { "Authorization": "Bearer " + token }
  });
};

export default setCommentAPI;