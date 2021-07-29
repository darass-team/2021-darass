import { Story } from "@storybook/react";
import CommentList, { Props } from ".";

export default {
  title: "organisms/CommentList",
  component: CommentList,
  argTypes: { children: { control: "text" } }
};

const Template: Story<Props> = args => <CommentList {...args} />;

export const Default = Template.bind({});

Default.args = {
  comments: [
    {
      id: 1,
      content: "Donec accumsan neque enim sodales. Neque eget vulputate viverra convallis pharetra.",
      likingUsers: [],
      user: {
        id: 2,
        profileImageUrl:
          "https://static.independent.co.uk/s3fs-public/thumbnails/image/2015/06/06/15/Chris-Pratt.jpg?width=982&height=726&auto=webp&quality=75",
        nickName: "Robert Hill",
        type: "SocialLoginUser",
        createdDate: String(Date.now()),
        modifiedDate: String(Date.now())
      },
      createdDate: "1시간 전",
      modifiedDate: "10시간 전"
    },
    {
      id: 2,
      content: "Donec accumsan neque enim sodales. Neque eget vulputate viverra convallis pharetra.",
      likingUsers: [],
      user: {
        id: 2,
        profileImageUrl:
          "https://static.independent.co.uk/s3fs-public/thumbnails/image/2015/06/06/15/Chris-Pratt.jpg?width=982&height=726&auto=webp&quality=75",
        nickName: "Robert Hill",
        type: "SocialLoginUser",
        createdDate: String(Date.now()),
        modifiedDate: String(Date.now())
      },
      createdDate: "1시간 전",
      modifiedDate: "10시간 전"
    },
    {
      id: 3,
      content: "Donec accumsan neque enim sodales. Neque eget vulputate viverra convallis pharetra.",
      likingUsers: [],
      user: {
        id: 1,
        profileImageUrl:
          "https://static.independent.co.uk/s3fs-public/thumbnails/image/2015/06/06/15/Chris-Pratt.jpg?width=982&height=726&auto=webp&quality=75",
        nickName: "Robert Hill",
        type: "GuestUser",
        createdDate: String(Date.now()),
        modifiedDate: String(Date.now())
      },
      createdDate: "1시간 전",
      modifiedDate: "10시간 전"
    }
  ]
};
