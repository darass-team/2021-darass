import { HTMLAttributes } from "react";
import { Button } from "./styles";

export interface Props extends HTMLAttributes<HTMLButtonElement> {
  children: string;
  className?: string;
  onClick?: () => void;
}

const SubmitButton = ({ children, className, onClick, ...props }: Props) => {
  return (
    <Button className={className} onClick={onClick} {...props}>
      {children}
    </Button>
  );
};

export default SubmitButton;
