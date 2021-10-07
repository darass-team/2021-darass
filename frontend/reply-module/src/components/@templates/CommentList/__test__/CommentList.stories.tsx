import { Story } from "@storybook/react";
import CommentList, { Props } from "..";

export default {
  title: "templates/CommentList",
  component: CommentList,
  argTypes: { children: { control: "text" } }
};

const Template: Story<Props> = args => <CommentList {...args} />;

export const Default = Template.bind({});

Default.args = {};
