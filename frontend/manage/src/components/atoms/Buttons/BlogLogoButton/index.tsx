import { Logo, Button, Name } from "./styles";

export interface Props {
  name: string;
  src: string;
  isSelected: boolean;
  onClick?: () => void;
}

const BlogLogoButton = ({ name, src, isSelected, onClick }: Props) => {
  return (
    <Button onClick={onClick}>
      <Logo src={src} alt={name} isSelected={isSelected} />
      <Name>{name}</Name>
    </Button>
  );
};

export default BlogLogoButton;
