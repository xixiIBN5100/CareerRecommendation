import { request } from "@/apis/axios";

const sendEmailCodeAPI = (data: { email: string}) => {
  return request("/api/email", {
    data: data,
    method: "POST"
  });
};

export default sendEmailCodeAPI;