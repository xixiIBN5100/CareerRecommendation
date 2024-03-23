import { request } from "@/apis/axios";

const setPublicResumeAPI = (params: {
  open_public: number
}, token: string) => {
  return request("/api/student/resume/open", {
    params: params,
    method: "POST",
    headers: { "Authorization": 'Bearer ' + token}
  });
};

export default setPublicResumeAPI;