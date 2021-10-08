import { Button } from "./styles";

export interface Props {
  children: string;
  onClick: () => void;
}

const CancelButton = ({ children, onClick, ...props }: Props) => {
  return (
    <Button type="button" onClick={onClick} {...props}>
      {children}
    </Button>
  );
};

export default CancelButton;
