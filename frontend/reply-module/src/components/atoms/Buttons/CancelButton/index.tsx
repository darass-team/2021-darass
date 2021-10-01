import { Button } from "./styles";

export interface Props {
  className?: string;
  children: string;
  onClick: () => void;
}

const CancelButton = ({ className, children, onClick }: Props) => {
  return (
    <Button className={className} type="button" onClick={onClick}>
      {children}
    </Button>
  );
};

export default CancelButton;
