import { Story } from "@storybook/react";
import Calendar, { Props } from ".";

export default {
  title: "molecules/Calendar",
  component: Calendar,
  argTypes: { children: { control: "text" } }
};

const Template: Story<Props> = args => <Calendar {...args} />;

export const Default = Template.bind({});

Default.args = {};
