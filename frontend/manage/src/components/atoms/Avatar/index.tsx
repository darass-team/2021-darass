import { Container } from "./styles";

export type Size = "SM" | "MD" | "LG";

export interface Props {
  imageURL?: string;
  size?: Size;
  onClick?: () => void;
}

const Avatar = ({ imageURL, size = "MD", onClick }: Props) => {
  return <Container src={imageURL} size={size} alt="프로필 사진" onClick={onClick} />;
};

export default Avatar;
