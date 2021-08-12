import { Story } from "@storybook/react";
import CommentStatistics, { Props } from ".";

export default {
  title: "organisms/CommentStatistics",
  component: CommentStatistics,
  argTypes: { children: { control: "text" } }
};

const Template: Story<Props> = args => <CommentStatistics {...args} />;

export const Default = Template.bind({});

Default.args = {};
