import { useState } from "react";

interface Props {
  query: (props?: any) => Promise<any>;
  onSuccess?: () => void;
}

export const useMutation = <PARAM, RESPONSE>({ query, onSuccess }: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [data, setData] = useState<RESPONSE>();

  const mutation = async (_data: PARAM) => {
    try {
      const data = await query(_data);

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

  return { isLoading, isError, error, data, mutation };
};
