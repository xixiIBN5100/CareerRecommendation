import { request } from "@/apis/axios";

const getResumeListAPI = (token: string) => {
  return request("/api/student/resume/list", {
    params: {},
    method: "GET",
    headers: { "Authorization": 'Bearer ' + token}
  });
};

export default getResumeListAPI;