import {
  IconComment,
  IconExplore,
  IconOrder,
  IconPlay,
  IconStudy,
  IconTicket,
  IconUsers,
} from "@/components/icons";
import { TMenuItem, TRatingIcon } from "@/types";
import {
  ECouponType,
  ECourseLevel,
  ECourseStatus,
  EOrderStatus,
  ERatingStatus,
} from "@/types/enums";
import z from "zod";
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
  {
    url: "/manage/order",
    title: "Quản lý đơn hàng",
    icon: <IconOrder className="size-5" />,
  },
  {
    url: "/manage/coupon",
    title: "Quản lý mã giảm giá",
    icon: <IconTicket className="size-5" />,
  },

    {
    url: "/manage/rating",
    title: "Quản lý đánh giá",
    icon: <IconTicket className="size-5" />,
  },
];

export const courseStatus: {
  title: string;
  value: ECourseStatus;
  className?: string;
}[] = [
  {
    title: "Đã duyệt",
    value: ECourseStatus.APPROVED,
    className: "text-green-500 bg-green-500",
  },
  {
    title: "Chờ duyệt",
    value: ECourseStatus.PENDING,
    className: "text-orange-500 bg-orange-500",
  },
  {
    title: "Từ chối",
    value: ECourseStatus.REJECTED,
    className: "text-red-500 bg-red-500",
  },
];

export const courseLevels: {
  title: string;
  value: ECourseLevel;
}[] = [
  {
    title: "Dễ",
    value: ECourseLevel.BEGINNER,
  },
  {
    title: "Trung bình",
    value: ECourseLevel.INTERMEDIATE,
  },
  {
    title: "Khó",
    value: ECourseLevel.ADVANCED,
  },
];

export const courseLevelTitle: Record<ECourseLevel, string> = {
  [ECourseLevel.BEGINNER]: "Dễ",
  [ECourseLevel.INTERMEDIATE]: "Trung bình",
  [ECourseLevel.ADVANCED]: "Khó",
};

export const commonClassName = {
  status:
    "bg-opacity-10 border border-current text-xs rounded-md font-medium px-3 py-1 whitespace-nowrap",
  acction:
    "size-8 rounded-md border borderDarkMode flex items-center justify-center p-2 bg-gray-100 text-gray-500 hover:bg-white dark:bg-transparent dark:hover:border-opacity-15",
};

export const editorOptions = (field: any, theme: any) => ({
  initialValue: "",
  onBlur: field.onBlur,
  onEditorChange: (content: any) => field.onChange(content),
  init: {
    codesample_global_prismjs: true,
    skin: theme === "dark" ? "oxide-dark" : "oxide",
    height: 300,
    menubar: false,
    plugins: [
      "advlist",
      "autolink",
      "lists",
      "link",
      "image",
      "charmap",
      "preview",
      "anchor",
      "searchreplace",
      "visualblocks",
      "codesample",
      "fullscreen",
      "insertdatetime",
      "media",
      "table",
      "heading",
    ],
    toolbar:
      "undo redo | " +
      "codesample | bold italic forecolor | alignleft aligncenter |" +
      "alignright alignjustify | bullist numlist |" +
      "image |" +
      "h1 h2 h3 h4 h5 h6 | preview | fullscreen |" +
      "link",
    content_style: `@import url('https://fonts.googleapis.com/css2?family=Manrope:wght@200..800&display=swap');body { font-family: Manrope,Helvetica,Arial,sans-serif; font-size:14px; line-height: 2; padding-bottom: 32px; } img { max-width: 100%; height: auto; display: block; margin: 0 auto; };`,
  },
});

export const orderStatus: {
  title: string;
  value: EOrderStatus;
  className?: string;
}[] = [
  {
    title: "Đã duyệt",
    value: EOrderStatus.COMPLETED,
    className: "text-green-600 bg-green-200",
  },
  {
    title: "Chờ duyệt",
    value: EOrderStatus.PENDING,
    className: "text-orange-600 bg-orange-200",
  },
  {
    title: "Đã hủy",
    value: EOrderStatus.CANCELLED,
    className: "text-red-600 bg-red-200",
  },
];

export const couponTypes: {
  title: string;
  value: ECouponType;
}[] = [
  {
    title: "Phần trăm",
    value: ECouponType.PERCENT,
  },
  {
    title: "Giá trị",
    value: ECouponType.AMOUNT,
  },
];

export const couponFormSchema = z.object({
  title: z.string({
    message: "Tiêu đề không được để trống",
  }),
  code: z
    .string({
      message: "Mã giảm giá không được để trống",
    })
    .min(3, "Mã giảm giá phải có ít nhất 3 ký tự")
    .max(10, "Mã giảm giá không được quá 10 ký tự"),
  start_date: z.string().optional(),
  end_date: z.string().optional(),
  active: z.boolean().optional(),
  value: z.string().optional(),
  type: z.enum([ECouponType.PERCENT, ECouponType.AMOUNT]),
  courses: z.array(z.string()).optional(),
  limit: z.number().optional(),
});

export const ratingList: {
  title: TRatingIcon;
  value: number;
}[] = [
  {
    title: "awesome",
    value: 5,
  },
  {
    title: "good",
    value: 4,
  },
  {
    title: "meh",
    value: 3,
  },
  {
    title: "bad",
    value: 2,
  },
  {
    title: "terrible",
    value: 1,
  },
];


export const ratingStatus: {
  title: string;
  value: ERatingStatus;
  className?: string;
}[] = [
  {
    title: "Đã duyệt",
    value: ERatingStatus.ACTIVE,
    className: "text-green-600 bg-green-500/30",
  },
  {
    title: "Chờ duyệt",
    value: ERatingStatus.UNACTIVE,
    className: "text-orange-600 bg-orange-500/30",
  },
];

export const allValue = "ALL";