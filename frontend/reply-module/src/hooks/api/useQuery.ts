import { useEffect, useState } from "react";

interface Props {
  enabled: boolean;
  query: (props?: any) => Promise<any>;
  onSuccess?: () => void;
}

export const useQuery = <T>({ enabled, query, onSuccess }: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [data, setData] = useState<T>();

  const refetch = async () => {
    try {
      setIsLoading(true);
      setIsError(false);
      const data = await query();

      setData(data);
      await onSuccess?.();
    } catch (error) {
      if (!(error instanceof Error)) return;

      setIsError(true);
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (enabled) refetch();
  }, []);

  return { refetch, isLoading, isError, data, error, setData };
};
