import { Button } from "./styles";

export interface Props {
  children: string;
  onClick: () => void;
}

const SubmitButton = ({ children, onClick }: Props) => {
  return <Button onClick={onClick}>{children}</Button>;
};

export default SubmitButton;
