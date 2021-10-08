import { Story } from "@storybook/react";
import LikingUsersButton, { Props } from "..";

export default {
  title: "atoms/LikingUsersButton",
  component: LikingUsersButton,
  argTypes: { children: { control: "text" } }
};

const Template: Story<Props> = args => <LikingUsersButton {...args} />;

export const Default = Template.bind({});

Default.args = {};
