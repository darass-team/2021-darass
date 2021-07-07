import { Story } from "@storybook/react";
import Home from ".";

export default {
  title: "templates/Home",
  component: Home,
  argTypes: {}
};

const Template: Story = args => <Home {...args} />;

export const Default = Template.bind({});

Default.args = {};
