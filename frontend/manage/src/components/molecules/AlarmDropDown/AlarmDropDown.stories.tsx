import { alarmContents } from "@/__test__/fixture/alarmContent";
import { Story } from "@storybook/react";
import AlarmDropDown, { Props } from ".";

export default {
  title: "molecules/AlarmDropDown",
  component: AlarmDropDown,
  argTypes: { children: { control: "text" } }
};

const Template: Story<Props> = args => <AlarmDropDown {...args} />;

export const Default = Template.bind({});

Default.args = {
  alarmContents
};
