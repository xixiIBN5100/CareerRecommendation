import { request } from "@/apis/axios";

const getAbilityEvaluate = (token: string) => {
  return request("/api/student/evaluate/ability", {
    method: "GET",
    params: {},
    headers: { "Authorization": "Bearer " + token }
  });
};

export default getAbilityEvaluate;