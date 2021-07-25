import { useGetAllProjects } from "../../../hooks";
import MyProject from "../../templates/MyProject";

const MyProjectPage = () => {
  const { projects } = useGetAllProjects();

  return <MyProject projects={projects} />;
};

export default MyProjectPage;
