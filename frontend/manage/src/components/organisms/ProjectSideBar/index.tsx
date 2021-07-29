import { useHistory } from "react-router-dom";
import { ROUTE } from "../../../constants";
import { Project } from "../../../types/project";
import MenuDropDown from "../../atoms/MenuDropDown";
import { Container } from "./styles";

export interface Props {
  projectId: Project["id"];
  className?: string;
}

const ProjectSideBar = ({ projectId, className }: Props) => {
  const history = useHistory();

  return (
    <Container className={className}>
      <MenuDropDown name="프로젝트 정보" route={ROUTE.GET_PROJECT_DETAIL(projectId)} />
      <MenuDropDown name="통계" subMenus={[{ name: "전체" }, { name: "페이지 별" }]} />
      <MenuDropDown name="관리" subMenus={[{ name: "전체", route: ROUTE.HOME }]} />
      <MenuDropDown name="설치 가이드" route={ROUTE.GET_SCRIPT_PUBLISHING(projectId)} />
    </Container>
  );
};

export default ProjectSideBar;
