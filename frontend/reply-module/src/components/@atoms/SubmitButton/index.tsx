import { ButtonHTMLAttributes } from "react";
import { Button } from "./styles";

export interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: string;
  onClick?: () => void;
}

const SubmitButton = ({ children, onClick, ...props }: Props) => {
  return (
    <Button onClick={onClick} {...props}>
      {children}
    </Button>
  );
};

export default SubmitButton;
