import { FormEvent } from "react";
import { useHistory } from "react-router-dom";
import { ROUTE } from "../../../constants";
import { useCreateProject, useInput } from "../../../hooks";
import NewProject from "../../templates/NewProject";

const NewProjectPage = () => {
  const history = useHistory();
  const { createProject } = useCreateProject();
  const [projectName, onChangeProjectName] = useInput("");

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const project = await createProject(projectName);

    history.push(ROUTE.GET_SCRIPT_PUBLISHING(project.id));
  };

  return <NewProject onSubmit={onSubmit} projectName={projectName} onChangeProjectName={onChangeProjectName} />;
};

export default NewProjectPage;
