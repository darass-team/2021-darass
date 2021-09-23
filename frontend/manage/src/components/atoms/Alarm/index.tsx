import alarm from "@/assets/png/alarm.png";
import { Container, Count, Img } from "./styles";

export type Size = "SM" | "MD" | "LG";

export interface Props {
  hasUnReadNotification: boolean;
  size?: Size;
}

const Alarm = ({ hasUnReadNotification, size = "SM" }: Props) => {
  return (
    <Container size={size}>
      <Img src={alarm} alt="notification" />
      {hasUnReadNotification && <Count />}
    </Container>
  );
};

export default Alarm;
