import { Story } from "@storybook/react";
import LikingUsersModal from "..";

export default {
  title: "organisms/LikingUsersModal",
  component: LikingUsersModal,
  argTypes: { children: { control: "text" } }
};

const Template: Story = args => <LikingUsersModal {...args} />;

export const Default = Template.bind({});

Default.args = {
  users: [
    {
      id: 1,
      profileImageUrl: "",
      nickName: "Robert Hill",
      type: "GuestUser",
      createdDate: String(Date.now()),
      modifiedDate: String(Date.now())
    },
    {
      id: 2,
      profileImageUrl:
        "https://static.independent.co.uk/s3fs-public/thumbnails/image/2015/06/06/15/Chris-Pratt.jpg?width=982&height=726&auto=webp&quality=75",
      nickName: "Robert Hill",
      type: "SocialLoginUser",
      createdDate: String(Date.now()),
      modifiedDate: String(Date.now())
    },
    {
      id: 2,
      profileImageUrl:
        "https://static.independent.co.uk/s3fs-public/thumbnails/image/2015/06/06/15/Chris-Pratt.jpg?width=982&height=726&auto=webp&quality=75",
      nickName: "Robert Hill",
      type: "SocialLoginUser",
      createdDate: String(Date.now()),
      modifiedDate: String(Date.now())
    },
    {
      id: 2,
      profileImageUrl:
        "https://static.independent.co.uk/s3fs-public/thumbnails/image/2015/06/06/15/Chris-Pratt.jpg?width=982&height=726&auto=webp&quality=75",
      nickName: "Robert Hill",
      type: "SocialLoginUser",
      createdDate: String(Date.now()),
      modifiedDate: String(Date.now())
    },
    {
      id: 2,
      profileImageUrl:
        "https://static.independent.co.uk/s3fs-public/thumbnails/image/2015/06/06/15/Chris-Pratt.jpg?width=982&height=726&auto=webp&quality=75",
      nickName: "Robert Hill",
      type: "SocialLoginUser",
      createdDate: String(Date.now()),
      modifiedDate: String(Date.now())
    },
    {
      id: 2,
      profileImageUrl:
        "https://static.independent.co.uk/s3fs-public/thumbnails/image/2015/06/06/15/Chris-Pratt.jpg?width=982&height=726&auto=webp&quality=75",
      nickName: "Robert Hill",
      type: "SocialLoginUser",
      createdDate: String(Date.now()),
      modifiedDate: String(Date.now())
    },
    {
      id: 2,
      profileImageUrl:
        "https://static.independent.co.uk/s3fs-public/thumbnails/image/2015/06/06/15/Chris-Pratt.jpg?width=982&height=726&auto=webp&quality=75",
      nickName: "Robert Hill",
      type: "SocialLoginUser",
      createdDate: String(Date.now()),
      modifiedDate: String(Date.now())
    },
    {
      id: 2,
      profileImageUrl:
        "https://static.independent.co.uk/s3fs-public/thumbnails/image/2015/06/06/15/Chris-Pratt.jpg?width=982&height=726&auto=webp&quality=75",
      nickName: "Robert Hill",
      type: "SocialLoginUser",
      createdDate: String(Date.now()),
      modifiedDate: String(Date.now())
    },
    {
      id: 2,
      profileImageUrl:
        "https://static.independent.co.uk/s3fs-public/thumbnails/image/2015/06/06/15/Chris-Pratt.jpg?width=982&height=726&auto=webp&quality=75",
      nickName: "Robert Hill",
      type: "SocialLoginUser",
      createdDate: String(Date.now()),
      modifiedDate: String(Date.now())
    },
    {
      id: 2,
      profileImageUrl:
        "https://static.independent.co.uk/s3fs-public/thumbnails/image/2015/06/06/15/Chris-Pratt.jpg?width=982&height=726&auto=webp&quality=75",
      nickName: "Robert Hill",
      type: "SocialLoginUser",
      createdDate: String(Date.now()),
      modifiedDate: String(Date.now())
    },
    {
      id: 2,
      profileImageUrl:
        "https://static.independent.co.uk/s3fs-public/thumbnails/image/2015/06/06/15/Chris-Pratt.jpg?width=982&height=726&auto=webp&quality=75",
      nickName: "Robert Hill",
      type: "SocialLoginUser",
      createdDate: String(Date.now()),
      modifiedDate: String(Date.now())
    },
    {
      id: 2,
      profileImageUrl:
        "https://static.independent.co.uk/s3fs-public/thumbnails/image/2015/06/06/15/Chris-Pratt.jpg?width=982&height=726&auto=webp&quality=75",
      nickName: "Robert Hill",
      type: "SocialLoginUser",
      createdDate: String(Date.now()),
      modifiedDate: String(Date.now())
    },
    {
      id: 2,
      profileImageUrl:
        "https://static.independent.co.uk/s3fs-public/thumbnails/image/2015/06/06/15/Chris-Pratt.jpg?width=982&height=726&auto=webp&quality=75",
      nickName: "Robert Hill",
      type: "SocialLoginUser",
      createdDate: String(Date.now()),
      modifiedDate: String(Date.now())
    },
    {
      id: 2,
      profileImageUrl:
        "https://static.independent.co.uk/s3fs-public/thumbnails/image/2015/06/06/15/Chris-Pratt.jpg?width=982&height=726&auto=webp&quality=75",
      nickName: "Robert Hill",
      type: "SocialLoginUser",
      createdDate: String(Date.now()),
      modifiedDate: String(Date.now())
    },
    {
      id: 2,
      profileImageUrl:
        "https://static.independent.co.uk/s3fs-public/thumbnails/image/2015/06/06/15/Chris-Pratt.jpg?width=982&height=726&auto=webp&quality=75",
      nickName: "Robert Hill",
      type: "SocialLoginUser",
      createdDate: String(Date.now()),
      modifiedDate: String(Date.now())
    },
    {
      id: 2,
      profileImageUrl:
        "https://static.independent.co.uk/s3fs-public/thumbnails/image/2015/06/06/15/Chris-Pratt.jpg?width=982&height=726&auto=webp&quality=75",
      nickName: "Robert Hill",
      type: "SocialLoginUser",
      createdDate: String(Date.now()),
      modifiedDate: String(Date.now())
    },
    {
      id: 2,
      profileImageUrl:
        "https://static.independent.co.uk/s3fs-public/thumbnails/image/2015/06/06/15/Chris-Pratt.jpg?width=982&height=726&auto=webp&quality=75",
      nickName: "Robert Hill",
      type: "SocialLoginUser",
      createdDate: String(Date.now()),
      modifiedDate: String(Date.now())
    },
    {
      id: 2,
      profileImageUrl:
        "https://static.independent.co.uk/s3fs-public/thumbnails/image/2015/06/06/15/Chris-Pratt.jpg?width=982&height=726&auto=webp&quality=75",
      nickName: "Robert Hill",
      type: "SocialLoginUser",
      createdDate: String(Date.now()),
      modifiedDate: String(Date.now())
    },
    {
      id: 2,
      profileImageUrl:
        "https://static.independent.co.uk/s3fs-public/thumbnails/image/2015/06/06/15/Chris-Pratt.jpg?width=982&height=726&auto=webp&quality=75",
      nickName: "Robert Hill",
      type: "SocialLoginUser",
      createdDate: String(Date.now()),
      modifiedDate: String(Date.now())
    },
    {
      id: 2,
      profileImageUrl:
        "https://static.independent.co.uk/s3fs-public/thumbnails/image/2015/06/06/15/Chris-Pratt.jpg?width=982&height=726&auto=webp&quality=75",
      nickName: "Robert Hill",
      type: "SocialLoginUser",
      createdDate: String(Date.now()),
      modifiedDate: String(Date.now())
    },
    {
      id: 3,
      profileImageUrl: "",
      nickName: "Robert Hill",
      type: "GuestUser",
      createdDate: String(Date.now()),
      modifiedDate: String(Date.now())
    }
  ]
};
