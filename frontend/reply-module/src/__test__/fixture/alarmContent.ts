import { GetAlarmResponse } from "@/types/comment";
import { comments } from "./comments";
import { socialLoginUser, socialLoginUser2 } from "./user";

export const alarmContents: GetAlarmResponse[] = [
  {
    id: 1,
    commentAlarmType: "CREATE_COMMENT",
    sender: socialLoginUser2,
    receiver: socialLoginUser,
    comment: comments[0],
    createdDate: ""
  },
  {
    id: 2,
    commentAlarmType: "CREATE_COMMENT_LIKE",
    sender: socialLoginUser2,
    receiver: socialLoginUser,
    comment: comments[1],
    createdDate: ""
  },
  {
    id: 3,
    commentAlarmType: "CREATE_SUB_COMMENT",
    sender: socialLoginUser2,
    receiver: socialLoginUser,
    comment: comments[2],
    createdDate: ""
  }
];
