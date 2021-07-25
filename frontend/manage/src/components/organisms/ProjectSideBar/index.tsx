import { useHistory } from "react-router-dom";
import { ROUTE } from "../../../constants";
import { Project } from "../../../types/project";
import MenuDropDown from "../../atoms/MenuDropDown";
import { Container } from "./styles";

export interface Props {
  projectId: Project["id"];
}

const ProjectSideBar = ({ projectId }: Props) => {
  const history = useHistory();

  return (
    <Container>
      <MenuDropDown title="프로젝트 정보" />
      <MenuDropDown
        title="통계"
        menu={[
          { title: "전체", onClick: () => {} },
          { title: "페이지 별", onClick: () => {} }
        ]}
      />
      <MenuDropDown title="관리" menu={[{ title: "전체", onClick: () => {} }]} />
      <MenuDropDown title="설치 가이드" onClick={() => history.push(ROUTE.GET_SCRIPT_PUBLISHING(projectId))} />
    </Container>
  );
};

export default ProjectSideBar;
