import { request } from "@/apis/axios";

const addResumeDocAPI = (data: FormData | null,token: string) => {
  return request("/api/student/resume/upload", {
    data: data,
    method: "POST",
    headers: {
      "Authorization": "Bearer " + token,
      "Content-Type": "multipart/form-data"
    }
  });
};

export default addResumeDocAPI;