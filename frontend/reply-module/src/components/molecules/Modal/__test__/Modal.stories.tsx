import { Story } from "@storybook/react";
import Modal, { Props } from "..";

export default {
  title: "atoms/Modal",
  component: Modal,
  argTypes: { children: { control: "text" } }
};

const Template: Story<Props> = args => <Modal {...args}>모달입니다.</Modal>;

export const Default = Template.bind({});

Default.args = {};
