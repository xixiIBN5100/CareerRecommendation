import { request } from "@/apis/axios";

const setDefaultResumeAPI = (data: {
  resume_id: number
},token: string) => {
  return request("/api/student/resume/default", {
    data: data,
    method: "POST",
    headers: { "Authorization": 'Bearer ' + token}
  });
};

export default setDefaultResumeAPI;