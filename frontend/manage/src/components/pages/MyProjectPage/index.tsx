import { useHistory } from "react-router-dom";
import { ROUTE } from "../../../constants";
import { useGetAllProjects } from "../../../hooks";
import MyProject from "../../templates/MyProject";

const MyProjectPage = () => {
  const { projects } = useGetAllProjects();
  const history = useHistory();

  return (
    <MyProject
      projects={projects}
      moveProjectDetailPage={id => history.push(ROUTE.GET_SCRIPT_PUBLISHING(id))}
      moveNewProjectPage={() => history.push(ROUTE.NEW_PROJECT)}
    />
  );
};

export default MyProjectPage;
