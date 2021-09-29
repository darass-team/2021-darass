import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { ROUTE } from "@/constants";
import { Project } from "@/types/project";

interface Props {
  initialPageIndex: number;
  projectId: Project["id"];
}

export const useCommentPageIndex = ({ initialPageIndex, projectId }: Props) => {
  const history = useHistory();
  const [currentPageIndex, setCurrentPageIndex] = useState<number>(initialPageIndex);

  useEffect(() => {
    if (Number.isNaN(projectId)) return;

    history.push(`/projects/${projectId}/manage?pageIndex=${currentPageIndex}`);
  }, [currentPageIndex]);

  return {
    currentPageIndex,
    setCurrentPageIndex
  };
};
