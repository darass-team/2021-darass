import { Story } from "@storybook/react";
import UserOption, { Props } from "..";

export default {
  title: "atoms/UserOption",
  component: UserOption,
  argTypes: { children: { control: "text" } }
};

const Template: Story<Props> = args => (
  <UserOption {...args}>
    <button>로그인</button>
    <button>로그아웃</button>
  </UserOption>
);

export const Default = Template.bind({});

Default.args = {};
