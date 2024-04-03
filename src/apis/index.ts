import passwordLoginAPI from "./Server/account/passwordLoginAPI";
import emailLoginAPI from "./Server/account/emailLoginAPI";
import sendEmailCodeAPI from "./Server/account/sendEmailCodeAPI";
import registerAPI from "./Server/account/registerAPI";
import findPasswordAPI from "@/apis/Server/account/findPassword";
import addResumeAPI from "./Server/resume/addResumeAPI";
import submitInfoApi from "@/apis/Server/enterprise/submitInfoApi";
import getInfoApi from "@/apis/Server/enterprise/getInfoApi";
import getResumeListAPI from "./Server/resume/getResumeListAPI";
import setDefaultResumeAPI from "./Server/resume/setDefaultResumeAPI";
import getStudentsListApi from "@/apis/Server/enterprise/getStudentsList";
import deleteResumeAPI from "./Server/resume/deleteResumeAPI";
import getResumeInfoAPI from "./Server/resume/getResumeInfoAPI";
import editResumeAPI from "./Server/resume/editResumeAPI";
import setPublicResumeAPI from "./Server/resume/setPublicResumeAPI";
import checkJobDatabaseAPI from "./Server/jobDatabase/checkJobDatabaseAPI";
import checkResumeApi from "@/apis/Server/enterprise/checkResumeApi";
import applyCheckResumeApi from "@/apis/Server/enterprise/applyCheckResumeApi";
import getApplyListApi from "@/apis/Server/enterprise/getApplyListApi";
import setAvatarAPI from "./Server/user/setAvatarAPI";
import setPasswordAPI from "./Server/user/setPasswordAPI";
import getResumeRequestAPI from "./Server/resume/getResumeRequestAPI";
import setPostStatusAPI from "./Server/resume/setPostStatusAPI";
import resetPostStatusAPI from "./Server/resume/resetPostStatusAPI";
import getHotSkillAPI from "@/apis/Server/hot/getHotSkill";
import getHotWorkAPI from "@/apis/Server/hot/getHotWork";
import getHotAddressAPI from "@/apis/Server/hot/getHotAddress";
import jobRequireMatchApi from "@/apis/Server/enterprise/jobRequireMatchApi";
import getCommentAPI from "@/apis/Server/jobDatabase/getComment";
import setCommentAPI from "@/apis/Server/jobDatabase/setComment";
import getOldEmailConfirmAPI from "./Server/account/getOldEmailConfirmAPI";
import getNewEmailConfirmAPI from "./Server/account/getNewEmailConfirmAPI";
import clearMsgApi from "@/apis/Server/robot/clearMsgApi";
import addResumeDocAPI from "./Server/resume/addResumeDocAPI";

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
  applyCheckResumeApi,
  getApplyListApi,
  setAvatarAPI,
  setPasswordAPI,
  getResumeRequestAPI,
  setPostStatusAPI,
  resetPostStatusAPI,
  getHotSkillAPI,
  getHotWorkAPI,
  getHotAddressAPI,
  jobRequireMatchApi,
  getCommentAPI,
  setCommentAPI,
  getOldEmailConfirmAPI,
  getNewEmailConfirmAPI,
  clearMsgApi,
  addResumeDocAPI,
};
