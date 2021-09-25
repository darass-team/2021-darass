import { MenuType } from "@/types/menu";

export const PROJECT_MENU = {
  getByProjectId: (projectId: number) => {
    const menus: MenuType[] = [
      { name: "프로젝트 정보", route: `/projects/${projectId}` },
      {
        name: "통계",
        route: `/projects/${projectId}/statistics`
      },
      { name: "댓글 관리", route: `/projects/${projectId}/manage` },
      { name: "설치 가이드", route: `/projects/${projectId}/guide` }
    ];

    return menus;
  }
} as const;
