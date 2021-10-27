import { useState } from "react";
import { Logo, Button, Name } from "./styles";

export interface Props {
  name: string;
  src: string;
  isSelected: boolean;
  onClick?: () => void;
}

const BlogLogoButton = ({ name, src, isSelected, onClick }: Props) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  return (
    <Button onClick={onClick}>
      <Logo
        isImageLoaded={isImageLoaded}
        src={src}
        alt={name}
        isSelected={isSelected}
        onLoad={() => {
          setIsImageLoaded(true);
        }}
      />
      <Name>{name}</Name>
    </Button>
  );
};

export default BlogLogoButton;
