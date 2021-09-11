import { MenuType } from "@/types/menu";
import { ROUTE } from "./route";

export const PROJECT_MENU = {
  get: (projectId: number) => {
    const menus: MenuType[] = [
      { name: "프로젝트 정보", route: `${ROUTE.AUTHORIZED}/projects/${projectId}` },
      {
        name: "통계",
        route: `${ROUTE.AUTHORIZED}/projects/${projectId}/statistics`
      },
      { name: "댓글 관리", route: `${ROUTE.AUTHORIZED}/projects/${projectId}/manage` },
      { name: "설치 가이드", route: `${ROUTE.AUTHORIZED}/projects/${projectId}/guide` }
    ];

    return menus;
  }
};
