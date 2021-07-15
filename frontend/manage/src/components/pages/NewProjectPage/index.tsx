import { FormEvent } from "react";
import { useHistory } from "react-router-dom";
import { ROUTE } from "../../../constants";
import { useInput } from "../../../hooks";
import useProject from "../../../hooks/useProject";
import { PALETTE } from "../../../styles/palette";
import ScreenContainer from "../../../styles/ScreenContainer";
import NewProject from "../../templates/NewProject";

const NewProjectPage = () => {
  const history = useHistory();
  const { addProject } = useProject();
  const [projectName, onChangeProjectName] = useInput("");

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const project = await addProject(projectName);
    history.push(ROUTE.GET_SCRIPT_PUBLISHING(project.id));
  };

  return (
    <ScreenContainer bgColor={PALETTE.WHITE}>
      <NewProject onSubmit={onSubmit} projectName={projectName} onChangeProjectName={onChangeProjectName} />
    </ScreenContainer>
  );
};

export default NewProjectPage;
