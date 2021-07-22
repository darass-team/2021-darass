import { useEffect } from "react";
import { useGetAllComments, useProject, useUser } from "../../../hooks";
import { postScrollHeightToParentWindow } from "../../../utils/iframePostMessage";
import CommentArea from "../../templates/CommentArea";

const CommentPage = () => {
  const urlParams = new URLSearchParams(window.location.search);

  const url = urlParams.get("url");
  const projectSecretKey = urlParams.get("projectKey");

  const { user, login, logout } = useUser();
  const { comments } = useGetAllComments({ url, projectSecretKey });

  const { project } = useProject({ projectSecretKey });

  useEffect(() => {
    postScrollHeightToParentWindow();
  }, [comments]);

  return (
    <CommentArea
      user={user}
      comments={comments}
      onLogin={login}
      onLogout={logout}
      url={url}
      projectSecretKey={projectSecretKey}
      project={project}
    />
  );
};

export default CommentPage;
