import { Story } from "@storybook/react";
import Alarm, { Props } from "..";

export default {
  title: "atoms/Alarm",
  component: Alarm,
  argTypes: { children: { control: "text" } }
};

const Template: Story<Props> = args => <Alarm {...args} />;

export const Default = Template.bind({});

Default.args = {
  hasUnReadNotification: true
};
