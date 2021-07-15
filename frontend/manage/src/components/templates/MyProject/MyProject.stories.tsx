import { Story } from "@storybook/react";
import MyProject, { Props } from ".";

export default {
  title: "templates/MyProject",
  component: MyProject,
  argTypes: {}
};

const Template: Story<Props> = args => <MyProject {...args} />;

export const Default = Template.bind({});

Default.args = {
  projects: [
    { id: 1, name: "Github" },
    { id: 2, name: "Tistory" }
  ],
  moveNewProjectPage: () => {},
  moveProjectDetailPage: id => {
    alert(`id: ${id}`);
  }
};
