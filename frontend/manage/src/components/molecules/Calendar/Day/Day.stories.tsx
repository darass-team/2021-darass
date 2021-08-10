import dayjs from "dayjs";
import { Story } from "@storybook/react";
import Day, { Props } from ".";

export default {
  title: "molecules/Day",
  component: Day,
  argTypes: { children: { control: "text" } }
};

const Template: Story<Props> = args => <Day {...args} />;

export const Default = Template.bind({});

Default.args = {
  date: dayjs()
};
