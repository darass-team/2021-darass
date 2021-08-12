import { ReactNode } from "react";
import { Section, SubTitle, P } from "./styles";

export interface Props {
  title: string;
  description?: string;
  children?: ReactNode;
}

const GuideStep = ({ title, description, children }: Props) => {
  return (
    <Section>
      <SubTitle>{title}</SubTitle>
      <P>{description}</P>
      {children}
    </Section>
  );
};

export default GuideStep;
