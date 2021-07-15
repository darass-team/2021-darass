import { ChangeEvent, useState } from "react";

const useInput = (initialState: string) => {
  const [value, setValue] = useState(initialState);

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  return [value, onChange] as const;
};

export default useInput;
