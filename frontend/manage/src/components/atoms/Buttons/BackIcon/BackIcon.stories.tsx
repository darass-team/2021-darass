import { Story } from "@storybook/react";
import BackIcon from ".";

export default {
  title: "atoms/BackIcon",
  component: BackIcon,
  argTypes: { children: { control: "text" } }
};

const Template: Story = args => <BackIcon {...args} />;

export const Default = Template.bind({});

Default.args = {};
