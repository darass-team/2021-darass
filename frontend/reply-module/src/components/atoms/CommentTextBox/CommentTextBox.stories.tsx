import { Story } from "@storybook/react";
import CommentTextBox, { Props } from ".";

export default {
  title: "atoms/CommentTextBox",
  component: CommentTextBox,
  argTypes: { children: { control: "text" } }
};

const Template: Story<Props> = args => <CommentTextBox {...args} />;

export const Default = Template.bind({});

Default.args = {
  name: "곤이",
  contentEditable: true
};
