import { ChangeEvent, useState } from "react";

export const useInput = (initialState: string) => {
  const [value, setValue] = useState(initialState);

  const onChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setValue(event.target.value);
  };

  return { value, setValue, onChange };
};
