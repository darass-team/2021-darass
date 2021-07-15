import { Container } from "./styles";

export type Size = "SM" | "MD" | "LG";

export interface Props {
  imageURL: string;
  size?: Size;
}

const Avatar = ({ imageURL, size = "MD" }: Props) => {
  return <Container src={imageURL} size={size} alt="프로필 사진" />;
};

export default Avatar;
