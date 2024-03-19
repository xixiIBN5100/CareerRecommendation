import { request } from "@/apis/axios";

const emailLoginAPI = (data: { email: string; code: string}) => {
  return request("/api/login/code", {
    data: data,
    method: "POST"
  });
};

export default emailLoginAPI;