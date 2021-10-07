import { Story } from "@storybook/react";
import Avatar, { Props } from "..";

export default {
  title: "atoms/Avatar",
  component: Avatar,
  argTypes: { children: { control: "text" } }
};

const Template: Story<Props> = args => <Avatar {...args} />;

export const Default = Template.bind({});

Default.args = {
  imageURL: "https://i1.sndcdn.com/artworks-dcFJFoFWVmO0zQ63-tDaHvg-t500x500.jpg"
};
