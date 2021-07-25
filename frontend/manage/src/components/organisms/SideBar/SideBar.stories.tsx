import { Story } from "@storybook/react";
import SideBar from ".";

export default {
  title: "organisms/SideBar",
  component: SideBar,
  argTypes: { children: { control: "text" } }
};

const Template: Story = args => <SideBar {...args} />;

export const Default = Template.bind({});

Default.args = {};
