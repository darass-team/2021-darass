import { Story } from "@storybook/react";
import Logo, { Props } from ".";

export default {
  title: "atoms/Logo",
  component: Logo,
  argTypes: { children: { control: "text" } }
};

const Template: Story<Props> = args => <Logo {...args} />;

export const Default = Template.bind({});

Default.args = {};
