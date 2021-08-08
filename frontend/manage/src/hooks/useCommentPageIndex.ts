import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { ROUTE } from "../constants";
import { Project } from "../types/project";
import { getPagesOfLength5 } from "../utils/pagination";

interface Props {
  initialPageIndex: number;
  projectId: Project["id"];
}

export const useCommentPageIndex = ({ initialPageIndex, projectId }: Props) => {
  const history = useHistory();
  const [currentPageIndex, setCurrentPageIndex] = useState<number>(initialPageIndex);

  useEffect(() => {
    history.push(`${ROUTE.GET_PROJECT_MANAGE(projectId)}?pageIndex=${currentPageIndex}`);
  }, [currentPageIndex]);

  return {
    currentPageIndex,
    setCurrentPageIndex
  };
};
