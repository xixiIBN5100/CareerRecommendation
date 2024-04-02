import { request } from "@/apis/axios";

const getOldEmailConfirmAPI = (data: {
  old_code: string
}, token: string) => {
  return request("/api/user/old_email", {
    data: data,
    method: "POST",
    headers: { "Authorization": "Bearer " + token}
  });
};

export default getOldEmailConfirmAPI;