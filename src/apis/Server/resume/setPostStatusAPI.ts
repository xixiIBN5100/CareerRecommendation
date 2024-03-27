import { request } from "@/apis/axios";

const setPostStatusAPI = (data: {
  post_id: number,
  status: number
}, token: string) => {
  return request("/api/student/post", {
    data: data,
    method: "POST",
    headers: { "Authorization": "Bearer " + token}
  });
};

export default setPostStatusAPI;