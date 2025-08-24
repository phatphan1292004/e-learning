import { IconComment, IconExplore, IconPlay, IconStudy, IconUsers } from "@/components/icons";
import { TMenuItem } from "@/types";
export const menuItems: TMenuItem[] = [
  {
    url: "/",
    title: "Khám phá",
    icon: <IconPlay className="size-5" />,
  },
  {
    url: "/study",
    title: "Khu vực học tập",
    icon: <IconExplore className="size-5" />,
  },
  {
    url: "/manage/course",
    title: "Quản lý khóa học",
    icon: <IconStudy className="size-5" />,
  },

  {
    url: "/manage/user",
    title: "Quản lý thành viên",
    icon: <IconUsers className="size-5" />,
  },

  {
    url: "/manage/comment",
    title: "Quản lý bình luận",
    icon: <IconComment className="size-5" />,
  },
];
