import { Story } from "@storybook/react";
import Footer from ".";

export default {
  title: "organisms/Footer",
  component: Footer,
  argTypes: { children: { control: "text" } }
};

const Template: Story = args => <Footer {...args} />;

export const Default = Template.bind({});

Default.args = {};
