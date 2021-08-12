import { Story } from "@storybook/react";
import styled from "styled-components";
import MenuDropDown, { Props } from ".";

export default {
  title: "atoms/MenuDropDown",
  component: MenuDropDown,
  argTypes: { children: { control: "text" } }
};

const Container = styled.div`
  width: 15rem;
`;

const Template: Story<Props> = args => (
  <Container>
    <MenuDropDown {...args} />
  </Container>
);

export const Default = Template.bind({});

Default.args = {};
