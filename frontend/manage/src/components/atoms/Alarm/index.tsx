import { PNG } from "@/constants/clientAssets";
import { useState } from "react";
import { Container, Dot, Img } from "./styles";

export type Size = "SM" | "MD" | "LG";

export interface Props {
  hasUnReadNotification?: boolean;
  size?: Size;
  onClick: () => void;
}

const Alarm = ({ hasUnReadNotification = false, size = "SM", onClick, ...props }: Props) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  return (
    <Container size={size} onClick={onClick} {...props}>
      <Img
        src={PNG.ALARM}
        alt="notification"
        isImageLoaded={isImageLoaded}
        onLoad={() => setIsImageLoaded(true)}
        hasUnReadNotification={hasUnReadNotification}
      />
      {hasUnReadNotification && <Dot />}
    </Container>
  );
};

export default Alarm;
