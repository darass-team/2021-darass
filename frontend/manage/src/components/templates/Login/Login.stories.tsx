import { Story } from "@storybook/react";
import Login, { Props } from ".";

export default {
  title: "templates/Login",
  component: Login,
  argTypes: {}
};

const Template: Story<Props> = args => <Login {...args} />;

export const Default = Template.bind({});

Default.args = {};
