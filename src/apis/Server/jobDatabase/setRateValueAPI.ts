import { request } from "@/apis/axios";

const setRateValueAPI = (data:{
  score: number,
  job_id: number
} , token: string) => {
  return request("/api/student/evaluate/ability/scoring", {
    method: "POST",
    data: data,
    headers: { "Authorization": "Bearer " + token }
  });
};

export default setRateValueAPI;