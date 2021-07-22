import { Story } from "@storybook/react";
import Home, { Props } from ".";

export default {
  title: "templates/Home",
  component: Home,
  argTypes: {}
};

const Template: Story<Props> = args => <Home {...args} />;

export const Default = Template.bind({});

Default.args = {};
