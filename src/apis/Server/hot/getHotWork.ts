import { request } from "@/apis/axios";

const getHotWorkAPI = (token: string) => {
  return request("/api/student/trend/title", {
    method: "GET",
    headers: { "Authorization": "Bearer " + token }
  });
};

export default getHotWorkAPI;