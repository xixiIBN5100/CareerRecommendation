import { request } from "@/apis/axios";

const passwordLoginAPI = (data: { user_name: string; password: string}) => {
  return request("/api/login/password", {
    data: data,
    method: "POST"
  });
};

export default passwordLoginAPI;
