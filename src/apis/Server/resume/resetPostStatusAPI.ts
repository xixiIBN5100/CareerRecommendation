import { request } from "@/apis/axios";

const resetPostStatusAPI = (data: {
  post_id: number
}, token: string) => {
  return request("/api/student/post", {
    data: data,
    method: "PUT",
    headers: { "Authorization": "Bearer " + token}
  });
};

export default resetPostStatusAPI;