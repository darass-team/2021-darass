import { Story } from "@storybook/react";
import LikeButton, { Props } from ".";

export default {
  title: "atoms/LikeButton",
  component: LikeButton,
  argTypes: { children: { control: "text" } }
};

const Template: Story<Props> = args => <LikeButton {...args} />;

export const Default = Template.bind({});

Default.args = {
  numOfLikes: 912,
  isLiked: true,
  onClick: () => {}
};
