import { Story } from "@storybook/react";
import ConfirmModal, { Props } from ".";

export default {
  title: "atoms/ConfirmModal",
  component: ConfirmModal,
  argTypes: { children: { control: "text" } }
};

const Template: Story<Props> = args => <ConfirmModal {...args} />;

export const Default = Template.bind({});

Default.args = {
  message: "정말로 삭제하시겠습니까?"
};
