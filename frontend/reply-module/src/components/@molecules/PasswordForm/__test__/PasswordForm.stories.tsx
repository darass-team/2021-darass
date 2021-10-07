import { Story } from "@storybook/react";
import PasswordForm, { Props } from "..";

export default {
  title: "molecules/PasswordForm",
  component: PasswordForm,
  argTypes: { children: { control: "text" } }
};

const Template: Story<Props> = args => <PasswordForm {...args} />;

export const Default = Template.bind({});

Default.args = {};
