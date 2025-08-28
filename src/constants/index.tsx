import { IconComment, IconExplore, IconPlay, IconStudy, IconUsers } from "@/components/icons";
import { TMenuItem } from "@/types";
import { ECourseLevel, ECourseStatus } from "@/types/enums";
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

export const courseStatus:{
  title: string;
  value: ECourseStatus;
  className?: string;
}[] = [
  {
    title: "Đã duyệt",
    value: ECourseStatus.APPROVED,
    className: "text-green-500 bg-green-500"
  },
  {
    title: "Chờ duyệt",
    value: ECourseStatus.PENDING,
    className: "text-orange-500 bg-orange-500"
  },
  {
    title: "Từ chối",
    value: ECourseStatus.REJECTED,
    className: "text-red-500 bg-red-500"
  }
]

export const courseLevels: {
  title: string;
  value: ECourseLevel;
}[] = [
  {
    title: "Dễ",
    value: ECourseLevel.BEGINNER
  },
  {
    title: "Trung bình",
    value: ECourseLevel.INTERMEDIATE
  },
  {
    title: "Khó",
    value: ECourseLevel.ADVANCED
  }
]

export const courseLevelTitle: Record<ECourseLevel, string> = {
  [ECourseLevel.BEGINNER]: "Dễ",
  [ECourseLevel.INTERMEDIATE]: "Trung bình",
  [ECourseLevel.ADVANCED]: "Khó"  
}

export const commonClassName = {
  status: "bg-opacity-10 border border-current rounded-md font-medium px-3 py-1 text-xs",
  acction: "size-8 rounded-md border borderDarkMode flex items-center justify-center p-2 bg-gray-100 text-gray-500 hover:bg-white dark:bg-transparent dark:hover:border-opacity-15",
}
