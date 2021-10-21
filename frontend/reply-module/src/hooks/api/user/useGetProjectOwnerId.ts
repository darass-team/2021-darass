import { Project } from "@/types/project";
import { getProjectOwnerId } from "@/utils/api";
import { useQuery } from "simple-react-query";

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
