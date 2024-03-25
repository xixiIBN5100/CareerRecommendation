import { request } from "@/apis/axios";

export type Params = {
  /**
   * 地址
   */
  address?: string;
  /**
   * 公司
   */
  company?: string;
  /**
   * 最低学历要求
   */
  education?: string;
  page_num: number;
  page_size: number;
  /**
   * 岗位名
   */
  title?: string;
}

const checkJobDatabaseAPI = (params: Params, token: string) => {
  return request("/api/student/jobs", {
    params: params,
    method: "GET",
    headers: { "Authorization": 'Bearer ' + token}
  });
};

export default checkJobDatabaseAPI;