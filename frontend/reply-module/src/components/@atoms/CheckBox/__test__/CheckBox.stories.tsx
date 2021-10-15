import { Story } from "@storybook/react";
import CheckBox, { Props } from "..";

export default {
  title: "atoms/CheckBox",
  component: CheckBox,
  argTypes: { children: { control: "text" } }
};

const Template: Story<Props> = args => <CheckBox {...args} />;

export const Default = Template.bind({});

Default.args = {};
