import { Container } from "./styles";

export type Size = "SM" | "MD" | "LG";

export interface Props {
  imageURL: string;
  onClick?: () => void;
  size?: Size;
}

const Avatar = ({ imageURL, size = "MD", onClick }: Props) => {
  return <Container src={imageURL} size={size} onClick={onClick} />;
};

export default Avatar;
