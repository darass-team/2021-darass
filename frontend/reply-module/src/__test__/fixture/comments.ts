import { Comment } from "../../types";
import { guestUser, socialLoginUser, socialLoginUser2 } from "./user";

export const comments: Comment[] = [
  {
    id: 1,
    content: "첫번째댓글",
    user: socialLoginUser,
    likingUsers: [],
    createdDate: new Date().toDateString(),
    modifiedDate: new Date().toDateString(),
    subComments: [
      {
        id: 12,
        content: "첫번째 대댓글",
        user: guestUser,
        likingUsers: [],
        createdDate: new Date().toDateString(),
        modifiedDate: new Date().toDateString(),
        subComments: []
      }
    ]
  },
  {
    id: 2,
    content: "두번째댓글",
    user: socialLoginUser,
    likingUsers: [],
    createdDate: new Date().toDateString(),
    modifiedDate: new Date().toDateString(),
    subComments: []
  },
  {
    id: 3,
    content: "세번째댓글",
    user: socialLoginUser,
    likingUsers: [],
    createdDate: new Date().toDateString(),
    modifiedDate: new Date().toDateString(),
    subComments: []
  },
  {
    id: 4,
    content: "네번째댓글",
    user: socialLoginUser,
    likingUsers: [],
    createdDate: new Date().toDateString(),
    modifiedDate: new Date().toDateString(),
    subComments: []
  },
  {
    id: 5,
    content: "다섯번째댓글",
    user: socialLoginUser,
    likingUsers: [],
    createdDate: new Date().toDateString(),
    modifiedDate: new Date().toDateString(),
    subComments: []
  },
  {
    id: 6,
    content: "여섯번째댓글",
    user: guestUser,
    likingUsers: [],
    createdDate: new Date().toDateString(),
    modifiedDate: new Date().toDateString(),
    subComments: []
  },
  {
    id: 7,
    content: "일곱번째댓글",
    user: guestUser,
    likingUsers: [],
    createdDate: new Date().toDateString(),
    modifiedDate: new Date().toDateString(),
    subComments: []
  },
  {
    id: 8,
    content: "여덟번째댓글",
    user: guestUser,
    likingUsers: [],
    createdDate: new Date().toDateString(),
    modifiedDate: new Date().toDateString(),
    subComments: []
  },
  {
    id: 9,
    content: "아홉번째댓글",
    user: guestUser,
    likingUsers: [],
    createdDate: new Date().toDateString(),
    modifiedDate: new Date().toDateString(),
    subComments: []
  },
  {
    id: 10,
    content: "열번째댓글",
    user: guestUser,
    likingUsers: [],
    createdDate: new Date().toDateString(),
    modifiedDate: new Date().toDateString(),
    subComments: []
  },
  {
    id: 11,
    content: "열한번째댓글",
    user: socialLoginUser2,
    likingUsers: [],
    createdDate: new Date().toDateString(),
    modifiedDate: new Date().toDateString(),
    subComments: []
  }
].sort(() => Math.random() - 0.5);
