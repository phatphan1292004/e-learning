import { OrderStatus } from "@/types/enums";

export interface IOrderManageProps {
  _id: string;
  code: string;
  total: number;
  amount: number;
  discount: number;
  coupon: {
    code: string;
  };
  status: OrderStatus;
  course: {
    title: string;
  };
  user: {
    name: string;
  };
}

export interface OrderManageParams {
  searchParams: {
    page: number;
    search: string;
    status: OrderStatus;
  };
}
