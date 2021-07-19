import { ButtonHTMLAttributes } from "react";
import { Button } from "./styles";

export interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: string;
}

const SubmitButton = ({ children, ...props }: Props) => {
  return <Button {...props}>{children}</Button>;
};

export default SubmitButton;
