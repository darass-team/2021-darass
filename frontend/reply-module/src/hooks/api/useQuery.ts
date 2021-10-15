import { useEffect, useRef, useState } from "react";

interface Props {
  enabled: boolean;
  query: (props?: any) => Promise<any>;
  onSuccess?: () => void;
  refetchInterval?: number;
}

export const useQuery = <T>({ enabled, query, onSuccess, refetchInterval }: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [data, setData] = useState<T>();
  const timeIdRef = useRef<NodeJS.Timer | null>(null);

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

  useEffect(() => {
    if (refetchInterval === undefined) {
      if (timeIdRef.current) clearInterval(timeIdRef.current);

      return;
    }

    timeIdRef.current = setInterval(refetch, refetchInterval);

    return () => {
      if (timeIdRef.current) clearInterval(timeIdRef.current);
    };
  }, []);

  return { refetch, isLoading, isError, data, error, setData, isSuccess: !isError };
};
