import { request } from "@/apis/axios";

const getInfoAPI = (params:{
    id: number,
} , token: string) => {
  return request("/api/student/job", {
    method: "GET",
    params: params,
    headers: { "Authorization": "Bearer " + token }
  });
};

export default getInfoAPI;