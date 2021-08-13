import { ReactNode, useState } from "react";
import { Container, Content } from "./styles";

export interface Props {
  text: ReactNode;
  className?: string;
}

const Tooltip = ({ text, className }: Props) => {
  const [isTooltipContentVisible, setIsTooltipContentVisible] = useState(false);

  return (
    <Container className={className} onClick={() => setIsTooltipContentVisible(state => !state)}>
      {isTooltipContentVisible && <Content>{text}</Content>}
    </Container>
  );
};

export default Tooltip;
