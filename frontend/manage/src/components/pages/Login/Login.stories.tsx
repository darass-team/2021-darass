import { Story } from "@storybook/react";
import Login from ".";

export default {
  title: "pages/Login",
  component: Login,
  argTypes: {}
};

const Template: Story = args => <Login {...args} />;

export const Default = Template.bind({});

Default.args = {};
