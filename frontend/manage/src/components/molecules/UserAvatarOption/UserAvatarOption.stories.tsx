import { Story } from "@storybook/react";
import UserAvatarOption, { Props } from ".";

export default {
  title: "molecules/UserAvatarOption",
  component: UserAvatarOption,
  argTypes: { children: { control: "text" } }
};

const Template: Story<Props> = args => <UserAvatarOption {...args} />;

export const Default = Template.bind({});

Default.args = {};
