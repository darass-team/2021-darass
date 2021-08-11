import { Story } from "@storybook/react";
import DeleteSection, { Props } from ".";

export default {
  title: "molecules/DeleteSection",
  component: DeleteSection,
  argTypes: { children: { control: "text" } }
};

const Template: Story<Props> = args => <DeleteSection {...args} />;

export const Default = Template.bind({});

Default.args = {};
