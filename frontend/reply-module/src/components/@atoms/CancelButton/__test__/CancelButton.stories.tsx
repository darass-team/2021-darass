import { Story } from "@storybook/react";
import CancelButton, { Props } from "..";

export default {
  title: "atoms/CancelButton",
  component: CancelButton,
  argTypes: { children: { control: "text" } }
};

const Template: Story<Props> = args => <CancelButton {...args} />;

export const Default = Template.bind({});

Default.args = {};
