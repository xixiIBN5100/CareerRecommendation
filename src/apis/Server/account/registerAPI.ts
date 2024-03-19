import { request } from "@/apis/axios";

const registerAPI = (data: {
  user_name: string,
  password: string,
  email: string,
  code: number,
  type: number
}) => {
  return request("/api/register", {
    data: data,
    method: "POST"
  });
};

export default registerAPI;