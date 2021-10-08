import { Story } from "@storybook/react";
import AlertModal from "..";

export default {
  title: "organisms/AlertModal",
  component: AlertModal,
  argTypes: { children: { control: "text" } }
};

const Template: Story = args => <AlertModal {...args} />;

export const Default = Template.bind({});

Default.args = {};
