"use client";
import { Button } from "@/components/ui/button";
import { IUser } from "@/database/user.model";
import { createOrder } from "@/shared/lib/actions/order.action";
import { createOrderCode } from "@/utils";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "react-toastify";

const ButtonBuy = ({
  user,
  courseId,
  amount,
  coupon,
}: {
  user: IUser | null | undefined;
  courseId: string;
  amount: number;
  coupon: string;
}) => {
  const router = useRouter();
  const handleBuyCourse = async () => {
    if (!user?.name) {
      toast.error("Vui lòng đăng nhập để mua khóa học");
      return;
    }
    const orderParams: any = {
      code: createOrderCode(),
      user: user._id,
      course: courseId,
      total: amount,
      amount: amount,
    };
    if (coupon && coupon.trim() !== "") {
      orderParams.coupon = coupon;
    }
    const newOrder = await createOrder(orderParams);
    console.log(newOrder);
    if (newOrder && newOrder.code) {
      router.push(`/order/${newOrder.code}`);
    } else {
      toast.error("Tạo đơn hàng thất bại!");
    }
  };
  return (
    <Button variant="primary" className="w-full" onClick={handleBuyCourse}>
      Mua khóa học
    </Button>
  );
};

export default ButtonBuy;
