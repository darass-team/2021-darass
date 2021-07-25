import { Story } from "@storybook/react";
import SideBar, { Props } from ".";

export default {
  title: "organisms/SideBar",
  component: SideBar,
  argTypes: { children: { control: "text" } }
};

const Template: Story<Props> = args => <SideBar {...args} />;

export const Default = Template.bind({});

Default.args = {};
