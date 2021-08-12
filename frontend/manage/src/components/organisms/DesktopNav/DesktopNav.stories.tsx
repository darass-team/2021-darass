import { Story } from "@storybook/react";
import DesktopNav, { Props } from ".";

export default {
  title: "organisms/DesktopNav",
  component: DesktopNav,
  argTypes: { children: { control: "text" } }
};

const Template: Story<Props> = args => <DesktopNav {...args} />;

export const Default = Template.bind({});

Default.args = {};
