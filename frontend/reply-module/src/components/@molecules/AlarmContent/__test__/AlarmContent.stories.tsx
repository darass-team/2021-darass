import { alarmContents } from "@/__test__/fixture/alarmContent";
import { Story } from "@storybook/react";
import AlarmContent, { Props } from "..";

export default {
  title: "molecules/AlarmContent",
  component: AlarmContent,
  argTypes: { children: { control: "text" } }
};

const Template: Story<Props> = args => <AlarmContent {...args} />;

export const Default = Template.bind({});

Default.args = {
  alarmContents
};
