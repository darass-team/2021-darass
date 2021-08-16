import { Story } from "@storybook/react";
import BackIcon, { Props } from ".";

export default {
  title: "atoms/BackIcon",
  component: BackIcon,
  argTypes: {}
};

const Template: Story<Props> = args => <BackIcon {...args} />;

export const Default = Template.bind({});

Default.args = {};
