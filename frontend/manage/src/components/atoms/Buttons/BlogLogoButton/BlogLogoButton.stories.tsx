import { Story } from "@storybook/react";
import BlogLogoButton, { Props } from ".";

export default {
  title: "atoms/BlogLogoButton",
  component: BlogLogoButton,
  argTypes: {}
};

const Template: Story<Props> = args => <BlogLogoButton {...args} />;

export const Default = Template.bind({});

Default.args = {};
