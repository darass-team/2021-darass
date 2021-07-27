import { useMutation, useQueryClient } from "react-query";
import { REACT_QUERY_KEY } from "../constants/reactQueryKey";
import { EditProjectRequest, Project } from "../types/project";

const _editProject = async (editedProject: Project) => {
  try {
    // TODO: 프로젝트 수정 API 나오면 반영
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const useEditProject = () => {
  const queryClient = useQueryClient();

  const editMutation = useMutation<void, Error, Project>(project => _editProject(project), {
    onSuccess: (_, editedProject) => {
      queryClient.setQueryData<Project[] | undefined>(REACT_QUERY_KEY.PROJECTS, projects => {
        return projects?.map(project => {
          if (project.id === editedProject.id) {
            return { ...project, name: editedProject.name };
          }

          return project;
        });
      });
    }
  });

  const isLoading = editMutation.isLoading;
  const error = editMutation.error;

  const editProject = async (_project: Project) => {
    return await editMutation.mutateAsync(_project);
  };

  return { editProject, isLoading, error };
};
