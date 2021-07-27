import { ChangeEvent, useState } from "react";

const useInput = (initialState: string) => {
  const [value, setValue] = useState(initialState);

  const onChange = (event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => {
    setValue(event.target.value);
  };

  return { value, setValue, onChange };
};

export { useInput };
