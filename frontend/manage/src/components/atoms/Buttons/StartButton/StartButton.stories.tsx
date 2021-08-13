import { Story } from "@storybook/react";
import StartButton, { Props } from ".";

export default {
  title: "atoms/StartButton",
  component: StartButton,
  argTypes: { children: { control: "text" } }
};

const Template: Story<Props> = args => <StartButton {...args} />;

export const Default = Template.bind({});

Default.args = {};
