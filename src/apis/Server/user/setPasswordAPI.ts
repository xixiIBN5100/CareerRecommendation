import { request } from "@/apis/axios";

const setPasswordAPI = (data: {
  old_password: string,
  new_password: string
},token: string) => {
  return request("/api/user/reset/password", {
    data: data,
    method: "POST",
    headers: { "Authorization": "Bearer " + token }
  });
};

export default setPasswordAPI;