import { request } from "@/apis/axios";

const getResumeRequestAPI = (params: {
  check: number
},token: string) => {
  return request("/api/student/post", {
    params: params,
    method: "GET",
    headers: { "Authorization": "Bearer " + token}
  });
};

export default getResumeRequestAPI;