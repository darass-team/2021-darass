import { MenuType } from "../types/menu";
import { ROUTE } from "./route";

export const PROJECT_MENU = {
  get: (projectId: number) => {
    const menus: MenuType[] = [
      { name: "프로젝트 정보", route: ROUTE.GET_PROJECT_DETAIL(projectId) },
      {
        name: "통계",
        subMenus: [
          { name: "전체", route: ROUTE.MY_PROJECT },
          { name: "페이지 별", route: ROUTE.MY_PROJECT },
          { name: "테스트 메뉴", subMenus: [{ name: "테스트 서브메뉴", route: ROUTE.MY_PROJECT }] }
        ]
      },
      { name: "관리", subMenus: [{ name: "전체", route: ROUTE.MY_PROJECT }] },
      { name: "설치 가이드", route: ROUTE.GET_SCRIPT_PUBLISHING(projectId) }
    ];

    return menus;
  }
};
