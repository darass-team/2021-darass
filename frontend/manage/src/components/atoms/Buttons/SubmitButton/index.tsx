import { HTMLAttributes } from "react";
import { Button } from "./styles";

export interface Props extends HTMLAttributes<HTMLButtonElement> {
  children: string;
  className?: string;
  onClick?: () => void;
}

const SubmitButton = ({ children, className, onClick }: Props) => {
  return (
    <Button className={className} onClick={onClick}>
      {children}
    </Button>
  );
};

export default SubmitButton;
