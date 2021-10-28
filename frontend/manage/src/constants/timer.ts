import { BUILD_MODE_TABLE } from "../types/buildMode";

const TOKEN_REFETCH_TIMER_TABLE = {
  localhost: 60 * 10 * 1000,
  development: 60 * 10 * 1000,
  production: 60 * 10 * 1000
} as const;

export const TOKEN_REFETCH_TIMER = TOKEN_REFETCH_TIMER_TABLE[process.env.BUILD_MODE as keyof BUILD_MODE_TABLE];
