import { useGetAllProjects } from "../../../hooks";
import NewProject from "../../templates/NewProject";

const NewProjectPage = () => {
  const { projects } = useGetAllProjects();

  return <NewProject projects={projects} />;
};

export default NewProjectPage;
