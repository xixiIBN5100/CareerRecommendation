import { request } from "@/apis/axios";

const deleteResumeAPI = (params: {
  resume_id: number
},token: string) => {
  return request("/api/student/resume", {
    params: params,
    method: "DELETE",
    headers: { "Authorization": 'Bearer ' + token}
  });
};

export default deleteResumeAPI;