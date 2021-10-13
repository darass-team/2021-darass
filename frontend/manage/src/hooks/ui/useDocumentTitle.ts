import { useEffect } from "react";

export const useDocumentTitle = (keyword: string) => {
  useEffect(() => {
    document.title = `${keyword} | Darass`;
  }, []);
};
