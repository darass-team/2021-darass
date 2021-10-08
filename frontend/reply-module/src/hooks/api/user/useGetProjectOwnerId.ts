import { REACT_QUERY_KEY } from "@/constants/reactQueryKey";
import { Project } from "@/types/project";
import { User } from "@/types/user";
import { getProjectOwnerId } from "@/utils/api";
import { useQuery } from "react-query";

export const useGetProjectOwnerId = (projectSecretKey: Project["secretKey"]) => {
  const {
    data: projectOwnerId,
    isLoading,
    error
  } = useQuery<User["id"], Error>(
    [REACT_QUERY_KEY.PROJECT_OWNER_ID, projectSecretKey],
    () => getProjectOwnerId(projectSecretKey),
    {
      enabled: projectSecretKey.length > 0
    }
  );

  return { projectOwnerId, isLoading, error };
};
