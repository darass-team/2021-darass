import { Story } from "@storybook/react";
import ErrorNotice, { Props } from "..";

export default {
  title: "molecules/ErrorNotice",
  component: ErrorNotice,
  argTypes: { children: { control: "text" } }
};

const Template: Story<Props> = args => <ErrorNotice {...args} />;

export const Default = Template.bind({});

Default.args = {};
