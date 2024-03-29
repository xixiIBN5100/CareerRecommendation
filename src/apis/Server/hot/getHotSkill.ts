import { request } from "@/apis/axios";

const getHotSkillAPI = (token: string) => {
  return request("/api/student/trend/skill", {
    method: "GET",
    headers: { "Authorization": "Bearer " + token }
  });
};

export default getHotSkillAPI;