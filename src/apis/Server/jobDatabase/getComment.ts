import { request } from "@/apis/axios";

const getCommentAPI = (params:{
    job_id: number,
    page_num: number,
    page_size: number
} , token: string) => {
  return request("/api/student/job/comments", {
    method: "GET",
    params: params,
    headers: { "Authorization": "Bearer " + token }
  });
};

export default getCommentAPI;