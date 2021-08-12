import { HTMLAttributes } from "react";
import { Button } from "./styles";

export interface Props extends HTMLAttributes<HTMLButtonElement> {
  children: string;
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
}

const SubmitButton = ({ children, className, onClick, disabled }: Props) => {
  return (
    <Button className={className} onClick={onClick} disabled={disabled}>
      {children}
    </Button>
  );
};

export default SubmitButton;
