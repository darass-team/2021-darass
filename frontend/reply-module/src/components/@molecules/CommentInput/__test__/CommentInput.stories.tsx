import { Story } from "@storybook/react";
import CommentInput, { Props } from "..";

export default {
  title: "molecules/CommentInput",
  component: CommentInput,
  argTypes: { children: { control: "text" } }
};

const Template: Story<Props> = args => <CommentInput {...args} />;

export const Default = Template.bind({});

Default.args = {};
