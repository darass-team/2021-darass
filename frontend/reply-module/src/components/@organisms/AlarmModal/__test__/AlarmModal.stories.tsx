import { alarmContents } from "@/__test__/fixture/alarmContent";
import { Story } from "@storybook/react";
import AlarmModal from "..";

export default {
  title: "organisms/AlarmModal",
  component: AlarmModal,
  argTypes: { children: { control: "text" } }
};

const Template: Story = args => <AlarmModal {...args} />;

export const Default = Template.bind({});

Default.args = {};
