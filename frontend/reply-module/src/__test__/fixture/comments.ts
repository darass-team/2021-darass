import { Comment } from "@/types";
import { guestUser, socialLoginUser, socialLoginUser2 } from "./user";

export const comments: Comment[] = [
  {
    id: 1,
    content: "댓글1",
    user: socialLoginUser,
    likingUsers: [],
    subComments: [
      {
        id: 11,
        content: "댓글3",
        user: socialLoginUser,
        likingUsers: [],
        subComments: [],
        createdDate: "",
        modifiedDate: "",
        url: "댓글2 url"
      }
    ],
    createdDate: "",
    modifiedDate: "",
    url: "댓글1 url"
  },
  {
    id: 2,
    content: "댓글2",
    user: socialLoginUser,
    likingUsers: [],
    subComments: [],
    createdDate: "",
    modifiedDate: "",
    url: "댓글2 url"
  },
  {
    id: 3,
    content: "댓글3",
    user: socialLoginUser,
    likingUsers: [],
    subComments: [],
    createdDate: "",
    modifiedDate: "",
    url: "댓글3 url"
  }
];
