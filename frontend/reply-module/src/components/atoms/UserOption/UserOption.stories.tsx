import { Story } from "@storybook/react";
import UserOption, { Props } from ".";

export default {
  title: "atoms/UserOption",
  component: UserOption,
  argTypes: { children: { control: "text" } }
};

const Template: Story<Props> = args => (
  <UserOption {...args}>
    <span>로그인</span>
    <span>로그아웃</span>
  </UserOption>
);

export const Default = Template.bind({});

Default.args = {};
