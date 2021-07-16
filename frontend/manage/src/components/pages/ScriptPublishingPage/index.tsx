import { useRouteMatch } from "react-router-dom";
import { useGetProject } from "../../../hooks";
import ScriptPublishing from "../../templates/ScriptPublishing";

const ScriptPublishingPage = () => {
  const match = useRouteMatch<{ id: string }>();
  const projectId = Number(match.params.id);

  const { project, isLoading, error } = useGetProject(projectId);
  const projectSecretKey = project?.secretKey;

  return <ScriptPublishing projectSecretKey={projectSecretKey} />;
};

export default ScriptPublishingPage;
