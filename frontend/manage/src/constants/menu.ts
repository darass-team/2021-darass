import { MenuType } from "../types/menu";
import { ROUTE } from "./route";

export const PROJECT_MENU = {
  get: (projectId: number) => {
    const menus: MenuType[] = [
      { name: "프로젝트 정보", route: ROUTE.GET_PROJECT_DETAIL(projectId) },
      {
        name: "통계",
        route: ROUTE.GET_STATISTICS(projectId)
      },
      { name: "댓글 관리", route: ROUTE.GET_PROJECT_MANAGE(projectId) },
      { name: "설치 가이드", route: ROUTE.GET_SCRIPT_PUBLISHING(projectId) }
    ];

    return menus;
  }
};
