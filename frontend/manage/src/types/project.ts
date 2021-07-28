export interface Project {
  id: number;
  name: string;
  secretKey: string;
  userId: number;
}

export type EditProjectRequest = Pick<Project, "id" | "name">;
