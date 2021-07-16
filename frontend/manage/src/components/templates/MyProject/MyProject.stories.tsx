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
    { id: 1, name: "Github", secretKey: "123" },
    { id: 2, name: "Tistory", secretKey: "456" }
  ],
  moveNewProjectPage: () => {},
  moveProjectDetailPage: id => {
    alert(`id: ${id}`);
  }
};
