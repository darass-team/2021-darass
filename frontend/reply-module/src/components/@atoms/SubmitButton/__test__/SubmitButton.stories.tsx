import { Story } from "@storybook/react";
import SubmitButton, { Props } from "..";

export default {
  title: "atoms/SubmitButton",
  component: SubmitButton,
  argTypes: { children: { control: "text" } }
};

const Template: Story<Props> = args => <SubmitButton {...args} />;

export const Default = Template.bind({});

Default.args = {};
