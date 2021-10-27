import { PNG } from "@/constants/clientAssets";
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
      <Img src={PNG.ALARM} alt="notification" hasUnReadNotification={hasUnReadNotification} />
      {hasUnReadNotification && <Dot data-testid="alarm-red-dot" />}
    </Container>
  );
};

export default Alarm;
