import { Redirect, useRouteMatch } from "react-router-dom";
import { ROUTE } from "../../../constants";
import { useGetProject } from "../../../hooks";
import ScriptPublishing from "../../templates/ScriptPublishing";

const ScriptPublishingPage = () => {
  const match = useRouteMatch<{ id: string }>();
  const projectId = Number(match.params.id);

  const { project, error } = useGetProject(projectId);
  const projectSecretKey = project?.secretKey;

  if (error) {
    return <Redirect to={ROUTE.MY_PROJECT} />;
  }

  return <ScriptPublishing projectId={projectId} projectSecretKey={projectSecretKey} />;
};

export default ScriptPublishingPage;
