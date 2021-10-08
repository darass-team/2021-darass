import { Project } from "@/types/project";
import { socialLoginUser } from "./user";

export const myProject: Project = {
  id: 1,
  name: "내 프로젝트",
  userId: socialLoginUser.id,
  secretKey: "1312321"
};

export const otherProject: Project = {
  id: 2,
  name: "다른 사람 프로젝트",
  userId: 999,
  secretKey: "asdasd"
};
