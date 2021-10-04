import { Story } from "@storybook/react";
import CommentOption, { Props } from "..";

export default {
  title: "molecules/CommentOption",
  component: CommentOption,
  argTypes: { children: { control: "text" } }
};

const Template: Story<Props> = args => <CommentOption {...args} />;

export const Default = Template.bind({});

Default.args = {};
