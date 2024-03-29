import { request } from "@/apis/axios";

const getHotAddressAPI = (token: string) => {
  return request("/api/student/trend/address", {
    method: "GET",
    headers: { "Authorization": "Bearer " + token }
  });
};

export default getHotAddressAPI;