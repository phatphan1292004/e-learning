import { Heading } from "lucide-react";

import { getCouponByCode } from "@/modules/coupon/services/coupon.action";
import { UpdateCouponForm } from "@/modules/coupon/components";

const page = async ({
  searchParams,
}: {
  searchParams: {
    code: string;
  };
}) => {
  const couponDetails = await getCouponByCode({ code: searchParams.code });
  if (!couponDetails) return null;
  return (
    <div>
      <Heading className="mb-10">Cập nhật mã giảm giá</Heading>
      <UpdateCouponForm data={couponDetails}></UpdateCouponForm>
    </div>
  );
};

export default page;
