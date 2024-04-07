import { request } from "@/apis/axios";

const getIntentionEvaluate = (token: string) => {
  return request("/api/student/evaluate/intention", {
    method: "GET",
    params: {},
    headers: { "Authorization": "Bearer " + token }
  });
};

export default getIntentionEvaluate;