import { ChangeEvent, useState } from "react";

const useInput = (initialState: string, maxLength = Infinity) => {
  const [value, setValue] = useState(initialState);

  const onChange = (event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => {
    setValue(event.target.value);
  };

  const onChangeWithMaxLength = (event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => {
    if (event.target.value.length > maxLength) {
      return;
    }

    onChange(event);
  };

  return { value, setValue, onChange, onChangeWithMaxLength };
};

export { useInput };
