import { request } from "@/apis/axios";

export type editResumeData = {
  resume_id: number;
  /**
   * 能力特长
   */
  ability: string;
  /**
   * 住址
   */
  address: string;
  /**
   * 年龄
   */
  age: number | null;
  /**
   * 学历，某某学校+某某科或专
   */
  education: string;
  /**
   * 邮箱地址
   */
  email: string;
  /**
   * 所获荣誉
   */
  honor: string;
  /**
   * 身份证号码
   */
  id_no: string;
  /**
   * 求职意向岗位
   */
  job_intention: string;
  /**
   * 姓名
   */
  name: string;
  /**
   * 手机号
   */
  phone: string;
  /**
   * 自我评价
   */
  self_evaluation: string;
  /**
   * 性别，1为男性，2为女性
   */
  sex: number;
  /**
   * 工作经历
   */
  work_experience: string;
  remark: string;
}

const editResumeAPI = (data: editResumeData,token: string) => {
  return request("/api/student/resume", {
    data: data,
    method: "PUT",
    headers: { "Authorization": 'Bearer ' + token}
  });
};

export default editResumeAPI;