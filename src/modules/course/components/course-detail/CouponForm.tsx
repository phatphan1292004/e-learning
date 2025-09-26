"use client";
import { Input } from "@/components/ui/input";
import { getValidateCoupon } from "@/modules/coupon/services/coupon.action";

import { CouponType } from "@/types/enums";
import { debounce } from "lodash";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";

const CouponForm = ({
  setPrice,
  courseId,
  originalPrice,
  setCouponId,
}: {
  setPrice: Dispatch<SetStateAction<number>>;
  courseId: string;
  originalPrice: number;
  setCouponId: Dispatch<SetStateAction<string>>;
}) => {
  const [isApplying, setIsApplying] = useState(false);
  const [couponCode, setCouponCode] = useState("");

  useEffect(() => {
    setIsApplying(false);
  }, [couponCode]);
  const handleApplyCoupon = async () => {
    try {
      if (isApplying) return;
      const response = await getValidateCoupon({
        code: couponCode.toUpperCase(),
        courseId,
      });

      const couponType = response?.type;
      let finalPrice = originalPrice;
      if (!response) {
        toast.error("Mã giảm giá không hợp lệ");
        setCouponCode("");
        setCouponId("");
        return;
      }

      if (couponType === CouponType.PERCENT) {
        finalPrice = originalPrice - (originalPrice * response?.value) / 100;
      } else if (couponType === CouponType.AMOUNT) {
        finalPrice = originalPrice - response?.value;
      }
      setPrice(finalPrice);
      toast.success("Áp dụng mã giảm giá thành công");
      setIsApplying(true);
      setCouponId(response._id);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChangeCoupon = debounce(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setCouponCode(e.target.value);
    },
    500
  );

  return (
    <div className="mt-5 relative">
      <Input
        placeholder="Nhập mã giảm giá"
        className="pr-20 uppercase font-semibold"
        onChange={handleChangeCoupon}
        defaultValue={couponCode}
      />
      <button
        className="absolute right-5 top-1/2 -translate-y-1/2 font-medium text-sm"
        onClick={handleApplyCoupon}
      >
        Áp dụng
      </button>
    </div>
  );
};

export default CouponForm;
