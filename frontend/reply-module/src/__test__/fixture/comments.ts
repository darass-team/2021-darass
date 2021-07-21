import { Comment } from "../../types";
import { guestUser, socialLoginUser } from "./user";

export const comments: Comment[] = [
  {
    id: 1,
    content: "a",
    user: socialLoginUser,
    createdDate: new Date().toDateString(),
    modifiedDate: new Date().toDateString()
  },
  {
    id: 2,
    content: "a",
    user: socialLoginUser,
    createdDate: new Date().toDateString(),
    modifiedDate: new Date().toDateString()
  },
  {
    id: 3,
    content: "a",
    user: socialLoginUser,
    createdDate: new Date().toDateString(),
    modifiedDate: new Date().toDateString()
  },
  {
    id: 4,
    content: "a",
    user: socialLoginUser,
    createdDate: new Date().toDateString(),
    modifiedDate: new Date().toDateString()
  },
  {
    id: 5,
    content: "a",
    user: socialLoginUser,
    createdDate: new Date().toDateString(),
    modifiedDate: new Date().toDateString()
  },
  {
    id: 6,
    content: "a",
    user: guestUser,
    createdDate: new Date().toDateString(),
    modifiedDate: new Date().toDateString()
  },
  {
    id: 7,
    content: "a",
    user: guestUser,
    createdDate: new Date().toDateString(),
    modifiedDate: new Date().toDateString()
  },
  {
    id: 8,
    content: "a",
    user: guestUser,
    createdDate: new Date().toDateString(),
    modifiedDate: new Date().toDateString()
  },
  {
    id: 9,
    content: "a",
    user: guestUser,
    createdDate: new Date().toDateString(),
    modifiedDate: new Date().toDateString()
  },
  {
    id: 10,
    content: "a",
    user: guestUser,
    createdDate: new Date().toDateString(),
    modifiedDate: new Date().toDateString()
  }
].sort(() => Math.random() - 0.5);
