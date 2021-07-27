import { Story } from "@storybook/react";
import DeleteButton, { Props } from ".";

export default {
  title: "atoms/DeleteButton",
  component: DeleteButton,
  argTypes: { children: { control: "text" } }
};

const Template: Story<Props> = args => <DeleteButton {...args}>삭제하기</DeleteButton>;

export const Default = Template.bind({});

Default.args = {};
