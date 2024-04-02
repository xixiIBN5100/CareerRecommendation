import { request } from "@/apis/axios";

const getNewEmailConfirmAPI = (data: {
  new_email: string,
  new_code: string
}, token: string) => {
  return request("/api/user/new_email", {
    data: data,
    method: "POST",
    headers: { "Authorization": "Bearer " + token}
  });
};

export default getNewEmailConfirmAPI;