import { AlarmContentType } from "@/components/molecules/AlarmContent";
import { socialLoginUser2 } from "./user";

export const alarmContents: AlarmContentType[] = [
  {
    sender: socialLoginUser2.nickName,
    url: "www.naver.com",
    content: "안녕하세요",
    createDate: new Date().toDateString(),
    alarmMessageType: "CREATE_COMMENT",
    hasBeenRead: true
  },
  {
    sender: socialLoginUser2.nickName,
    url: "www.naver.com",
    content:
      "안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요",
    createDate: new Date().toDateString(),
    alarmMessageType: "CREATE_SUB_COMMENT",
    hasBeenRead: false
  },
  {
    sender: socialLoginUser2.nickName,
    url: "www.naver.com",
    content:
      "안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요",
    createDate: new Date().toDateString(),
    alarmMessageType: "CREATE_COMMENT_LIKE",
    hasBeenRead: false
  }
];
