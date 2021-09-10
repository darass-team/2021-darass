import { Story } from "@storybook/react";
import MobileNav, { Props } from ".";

export default {
  title: "organisms/MobileNav",
  component: MobileNav,
  argTypes: { children: { control: "text" } }
};

const Template: Story<Props> = args => <MobileNav {...args} />;

export const Default = Template.bind({});

Default.args = {};
