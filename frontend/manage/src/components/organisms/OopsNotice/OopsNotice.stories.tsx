import { Story } from "@storybook/react";
import OopsNotice, { Props } from ".";

export default {
  title: "organisms/OopsNotice",
  component: OopsNotice,
  argTypes: { children: { control: "text" } }
};

const Template: Story<Props> = args => <OopsNotice {...args} />;

export const Default = Template.bind({});

Default.args = {};
