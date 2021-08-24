import { Story } from "@storybook/react";
import ProjectButton, { Props } from ".";

export default {
  title: "atoms/ProjectButton",
  component: ProjectButton,
  argTypes: { children: { control: "text" } }
};

const Template: Story<Props> = args => <ProjectButton {...args} />;

export const Default = Template.bind({});

Default.args = {};
