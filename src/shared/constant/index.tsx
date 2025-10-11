import {
  IconAI,
  IconComment,
  IconExplore,
  IconOrder,
  IconPlay,
  IconStudy,
  IconTicket,
  IconUsers,
} from "@/shared/icons";
import { TMenuItem, TRatingIcon } from "@/types";
import {
  CouponType,
  CourseLevel,
  CourseStatus,
  OrderStatus,
  RatingStatus,
  UserRole,
} from "@/types/enums";
import z from "zod";

// Thêm userRoles constant
export const userRoles = [
  {
    title: "Admin",
    value: UserRole.ADMIN,
  },
  {
    title: "User",
    value: UserRole.USER,
  },
];

export const menuItems: TMenuItem[] = [
  {
    url: "/",
    title: "Dashboard",
    icon: <IconPlay className="size-5" />,
    role: "ALL",
  },
  {
    url: "/study",
    title: "Study",
    icon: <IconExplore className="size-5" />,
    role: "ALL",
  },
  {
    url: "/ai-chat",
    title: "AI Assistant",
    icon: <IconAI className="size-5" />,
    role: "ALL",
  },
  {
    url: "/manage/course",
    title: "Course Management",
    icon: <IconStudy className="size-5" />,
    role: "ADMIN",
  },

  {
    url: "/manage/user",
    title: "User Management",
    icon: <IconUsers className="size-5" />,
    role: "ADMIN",
  },

  {
    url: "/manage/comment",
    title: "Comment Management",
    icon: <IconComment className="size-5" />,
    role: "ADMIN",
  },
  {
    url: "/manage/order",
    title: "Order Management",
    icon: <IconOrder className="size-5" />,
    role: "ADMIN",
  },
  {
    url: "/manage/coupon",
    title: "Coupon Management",
    icon: <IconTicket className="size-5" />,
    role: "ADMIN",
  },

  {
    url: "/manage/rating",
    title: "Rating Management",
    icon: <IconTicket className="size-5" />,
    role: "ADMIN",
  },
];

export const courseStatus: {
  title: string;
  value: CourseStatus;
  className?: string;
}[] = [
  {
    title: "Đã duyệt",
    value: CourseStatus.APPROVED,
    className: "text-green-500 bg-green-500",
  },
  {
    title: "Chờ duyệt",
    value: CourseStatus.PENDING,
    className: "text-orange-500 bg-orange-500",
  },
  {
    title: "Từ chối",
    value: CourseStatus.REJECTED,
    className: "text-red-500 bg-red-500",
  },
];

export const courseLevels: {
  title: string;
  value: CourseLevel;
}[] = [
  {
    title: "Dễ",
    value: CourseLevel.BEGINNER,
  },
  {
    title: "Trung bình",
    value: CourseLevel.INTERMEDIATE,
  },
  {
    title: "Khó",
    value: CourseLevel.ADVANCED,
  },
];

export const courseLevelTitle: Record<CourseLevel, string> = {
  [CourseLevel.BEGINNER]: "Dễ",
  [CourseLevel.INTERMEDIATE]: "Trung bình",
  [CourseLevel.ADVANCED]: "Khó",
};

export const commonClassName = {
  status:
    "bg-opacity-10 border border-current text-xs rounded-md font-medium px-3 py-1 whitespace-nowrap",
  acction:
    "size-8 rounded-md border borderDarkMode flex items-center justify-center p-2 bg-gray-100 text-gray-500 hover:bg-white dark:bg-transparent dark:hover:border-opacity-15",
  paginationButton:
    "size-10 rounded-md borderDarkMode bgDarkMode border flex items-center justify-center hover:border-primary transition-all hover:text-primary p-2.5",
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
  value: OrderStatus;
  className?: string;
}[] = [
  {
    title: "Đã duyệt",
    value: OrderStatus.COMPLETED,
    className: "text-green-600 bg-green-200",
  },
  {
    title: "Chờ duyệt",
    value: OrderStatus.PENDING,
    className: "text-orange-600 bg-orange-200",
  },
  {
    title: "Đã hủy",
    value: OrderStatus.CANCELLED,
    className: "text-red-600 bg-red-200",
  },
];

export const couponTypes: {
  title: string;
  value: CouponType;
}[] = [
  {
    title: "Phần trăm",
    value: CouponType.PERCENT,
  },
  {
    title: "Giá trị",
    value: CouponType.AMOUNT,
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
  type: z.enum([CouponType.PERCENT, CouponType.AMOUNT]),
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
  value: RatingStatus;
  className?: string;
}[] = [
  {
    title: "Đã duyệt",
    value: RatingStatus.ACTIVE,
    className: "text-green-600 bg-green-500/30",
  },
  {
    title: "Chờ duyệt",
    value: RatingStatus.UNACTIVE,
    className: "text-orange-600 bg-orange-500/30",
  },
];

export const allValue = "ALL";
export const ITEM_PER_PAGE = 5;

export const couponStatuses = [
  {
    title: "Đang kích hoạt",
    value: 1,
  },
  {
    title: "Chưa kích hoạt",
    value: 0,
  },
];

export const MAX_COMMENT_LEVEL = 3;
