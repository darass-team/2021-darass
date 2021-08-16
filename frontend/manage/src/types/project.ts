export interface Project {
  id: number;
  name: string;
  secretKey: string;
  userId: number;
  description: string;
}

export type EditProjectRequest = Pick<Project, "id" | "name" | "description">;
export type CreateProjectRequest = Pick<Project, "name" | "description">;
