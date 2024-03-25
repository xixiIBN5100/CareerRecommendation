import passwordLoginAPI from "./Server/account/passwordLoginAPI";
import emailLoginAPI from "./Server/account/emailLoginAPI";
import sendEmailCodeAPI from "./Server/account/sendEmailCodeAPI";
import registerAPI from "./Server/account/registerAPI";
import findPasswordAPI from "@/apis/Server/account/findPassword";
import addResumeAPI from "./Server/resume/addResumeAPI";
import submitInfoApi from '@/apis/Server/enterprise/submitInfoApi';
import getInfoApi from '@/apis/Server/enterprise/getInfoApi';
import getResumeListAPI from './Server/resume/getResumeListAPI';
import setDefaultResumeAPI from "./Server/resume/setDefaultResumeAPI";
import getStudentsListApi from '@/apis/Server/enterprise/getStudentsList';
import deleteResumeAPI from "./Server/resume/deleteResumeAPI";
import getResumeInfoAPI from "./Server/resume/getResumeInfoAPI";
import editResumeAPI from "./Server/resume/editResumeAPI";
import setPublicResumeAPI from "./Server/resume/setPublicResumeAPI";
import checkJobDatabaseAPI from "./Server/jobDatabase/checkJobDatabaseAPI";
import checkResumeApi from '@/apis/Server/enterprise/checkResumeApi';

export {
  passwordLoginAPI,
  emailLoginAPI,
  sendEmailCodeAPI,
  registerAPI,
  findPasswordAPI,
  addResumeAPI,
  submitInfoApi,
  getInfoApi,
  getResumeListAPI,
  setDefaultResumeAPI,
  getStudentsListApi,
  deleteResumeAPI,
  getResumeInfoAPI,
  editResumeAPI,
  setPublicResumeAPI,
  checkJobDatabaseAPI,
  checkResumeApi,
};
