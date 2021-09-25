import { alarmContents } from "@/__test__/fixture/alarmContent";
import { Story } from "@storybook/react";
import AlarmModal, { Props } from ".";

export default {
  title: "molecules/AlarmModal",
  component: AlarmModal,
  argTypes: { children: { control: "text" } }
};

const Template: Story<Props> = args => <AlarmModal {...args} />;

export const Default = Template.bind({});

Default.args = {
  alarmContents
};
