import { Story } from "@storybook/react";
import DeleteSection, { Props } from ".";

export default {
  title: "molecules/DeleteSection",
  component: DeleteSection,
  argTypes: { children: { control: "text" } }
};

const Template: Story<Props> = args => <DeleteSection {...args} />;

export const Default = Template.bind({});

Default.args = {
  user: {
    id: 1,
    nickName: "아이유",
    createdDate: String(Date.now()),
    modifiedDate: String(Date.now()),
    type: "SocialLoginUser",
    profileImageUrl: "https://i1.sndcdn.com/artworks-dcFJFoFWVmO0zQ63-tDaHvg-t500x500.jpg"
  },
  children: <button>로그아웃</button>
};
