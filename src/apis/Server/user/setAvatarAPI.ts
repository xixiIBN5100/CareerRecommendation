import { request } from "@/apis/axios";

const setAvatarAPI = (data: FormData | null,token: string) => {
  return request("/api/user/avatar", {
    data: data,
    method: "POST",
    headers: {
      "Authorization": "Bearer " + token,
      "Content-Type": "multipart/form-data"
    }
  });
};

export default setAvatarAPI;