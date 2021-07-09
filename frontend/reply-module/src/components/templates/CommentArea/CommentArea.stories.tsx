import { Story } from "@storybook/react";
import CommentArea from ".";

export default {
  title: "templates/CommentArea",
  component: CommentArea,
  argTypes: { children: { control: "text" } }
};

const Template: Story = args => <CommentArea {...args} />;

export const Default = Template.bind({});

Default.args = {};
