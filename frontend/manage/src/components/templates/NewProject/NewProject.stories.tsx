import { Story } from "@storybook/react";
import NewProject, { Props } from ".";

export default {
  title: "templates/NewProject",
  component: NewProject,
  argTypes: {}
};

const Template: Story<Props> = args => <NewProject {...args} />;

export const Default = Template.bind({});

Default.args = {};
