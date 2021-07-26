import { useRouteMatch } from "react-router-dom";
import ScreenContainer from "../../../styles/ScreenContainer";
import ProjectSideBar from "../../organisms/ProjectSideBar";
import SideBarTemplate from "../SideBarTemplate";
import { Container, Section, Title, SubTitle } from "./styles";

const ProjectDetail = () => {
  const match = useRouteMatch<{ id?: string }>();
  const projectId = Number(match.params.id);

  return (
    <ScreenContainer>
      <SideBarTemplate SideBar={() => <ProjectSideBar projectId={123} />}>
        <Container>
          <Title>프로젝트 정보</Title>
          <Section>
            <label>이름</label>
            <p>이름내용</p>
          </Section>
        </Container>
      </SideBarTemplate>
    </ScreenContainer>
  );
};

export default ProjectDetail;
