import { Story } from "@storybook/react";
import MobileNav, { Props } from ".";
import { socialLoginUser } from "../../../__test__/fixture/user";

export default {
  title: "organisms/MobileNav",
  component: MobileNav,
  argTypes: { children: { control: "text" } }
};

const Template: Story<Props> = args => <MobileNav {...args} />;

export const Default = Template.bind({});

Default.args = {};
