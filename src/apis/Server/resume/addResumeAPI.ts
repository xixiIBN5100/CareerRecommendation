import { request } from "@/apis/axios";

export type ResumeData = {
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
  age: number;
  /**
   * 求职意向城市
   */
  city_intention: string;
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
   * 备注
   */
  remark: string;
  /**
   * 求职意向薪资
   */
  salary_intention: string;
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
}

const addResumeAPI = (data: ResumeData, token: string) => {
  return request("/api/student/resume", {
    data: data,
    method: "POST",
    headers: { "Authorization": "Bearer " + token}
  });
};

export default addResumeAPI;