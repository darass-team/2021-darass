import { Story } from "@storybook/react";
import styled from "styled-components";
import PageNationBar, { Props } from ".";

export default {
  title: "atoms/PageNationBar",
  component: PageNationBar,
  argTypes: { children: { control: "text" } }
};

const Container = styled.div`
  width: 15rem;
`;

const Template: Story<Props> = args => (
  <Container>
    <PageNationBar {...args} />
  </Container>
);

export const Default = Template.bind({});

Default.args = {
  title: "통계",
  menu: [
    { title: "전체", onClick: () => {} },
    { title: "페이지 별", onClick: () => {} }
  ]
};