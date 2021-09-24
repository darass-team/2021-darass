import alarm from "@/assets/png/alarm.png";
import { ReactNode } from "react";
import { Container, Dot, Img } from "./styles";

export type Size = "SM" | "MD" | "LG";

export interface Props {
  hasUnReadNotification?: boolean;
  size?: Size;
  onClick: () => void;
}

const Alarm = ({ hasUnReadNotification = false, size = "SM", onClick, ...props }: Props) => {
  return (
    <Container size={size} onClick={onClick} {...props}>
      <Img src={alarm} alt="notification" />
      {hasUnReadNotification && <Dot />}
    </Container>
  );
};

export default Alarm;
