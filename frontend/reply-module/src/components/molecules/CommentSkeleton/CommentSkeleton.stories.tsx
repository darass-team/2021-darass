import { Story } from "@storybook/react";
import CommentSkeleton from ".";

export default {
  title: "molecules/CommentSkeleton",
  component: CommentSkeleton,
  argTypes: { children: { control: "text" } }
};

const Template: Story = args => <CommentSkeleton {...args} />;

export const Default = Template.bind({});

Default.args = {};
