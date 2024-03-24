import { request } from "@/apis/axios";

const getResumeInfoAPI = (params: {
  resume_id: number
},token: string) => {
  return request("/api/student/resume", {
    params: params,
    method: "GET",
    headers: { "Authorization": 'Bearer ' + token}
  });
};

export default getResumeInfoAPI;