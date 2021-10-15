import { REACT_QUERY_KEY } from "@/constants/reactQueryKey";
import { Project } from "@/types/project";
import { User } from "@/types/user";
import { getProjectOwnerId } from "@/utils/api";
import { useQuery } from "../useQuery";

export const useGetProjectOwnerId = (projectSecretKey: Project["secretKey"]) => {
  const {
    data: projectOwnerId,
    isLoading,
    error
  } = useQuery<number>({
    query: () => getProjectOwnerId(projectSecretKey),
    enabled: projectSecretKey.length > 0
  });

  return { projectOwnerId, isLoading, error };
};
