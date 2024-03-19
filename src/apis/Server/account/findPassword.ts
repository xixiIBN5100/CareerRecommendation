import { request } from "@/apis/axios";

const emailLoginAPI = (data: { user_name: string; email: string; code: string ; password:string}) => {
    return request("/api/reset/code", {
        data: data,
        method: "POST"
    });
};

export default emailLoginAPI;