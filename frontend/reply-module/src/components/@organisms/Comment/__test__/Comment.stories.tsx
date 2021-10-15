import { Story } from "@storybook/react";
import Comment, { Props } from "..";

export default {
  title: "organism/Comment",
  component: Comment,
  argTypes: { children: { control: "text" } }
};

const Template: Story<Props> = args => <Comment {...args} />;

export const Default = Template.bind({});

Default.args = {};
