import { PALETTE } from "../../../styles/palette";
import ScreenContainer from "../../../styles/ScreenContainer";
import MyProject from "../../templates/MyProject";
import useProject from "../../../hooks/useProject";
import { useHistory } from "react-router-dom";
import { ROUTE } from "../../../constants";

const MyProjectPage = () => {
  const { projects } = useProject();
  const history = useHistory();

  return (
    <ScreenContainer bgColor={PALETTE.WHITE}>
      <MyProject
        projects={projects}
        moveProjectDetailPage={id => history.push(`${ROUTE.PROJECT_DETAIL}/${id}`)}
        moveNewProjectPage={() => history.push(ROUTE.NEW_PROJECT)}
      />
    </ScreenContainer>
  );
};

export default MyProjectPage;
