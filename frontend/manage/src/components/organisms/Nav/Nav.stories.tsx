import { Story } from "@storybook/react";
import Nav, { Props } from ".";
import { socialLoginUser } from "../../../__test__/fixture/user";

export default {
  title: "organisms/Nav",
  component: Nav,
  argTypes: { children: { control: "text" } }
};

const Template: Story<Props> = args => <Nav {...args} />;

export const Default = Template.bind({});

Default.args = {
  user: socialLoginUser
};
