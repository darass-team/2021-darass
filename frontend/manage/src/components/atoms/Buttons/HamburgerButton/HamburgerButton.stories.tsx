import { Story } from "@storybook/react";
import HamburgerButton, { Props } from ".";

export default {
  title: "atoms/HamburgerButton",
  component: HamburgerButton,
  argTypes: {}
};

const Template: Story<Props> = args => <HamburgerButton {...args} />;

export const Default = Template.bind({});

Default.args = {};
