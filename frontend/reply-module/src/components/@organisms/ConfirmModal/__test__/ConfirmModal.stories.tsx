import { Story } from "@storybook/react";
import ConfirmModal from "..";

export default {
  title: "organisms/ConfirmModal",
  component: ConfirmModal,
  argTypes: { children: { control: "text" } }
};

const Template: Story = args => <ConfirmModal {...args} />;

export const Default = Template.bind({});

Default.args = {
  message: "정말로 삭제하시겠습니까?"
};
