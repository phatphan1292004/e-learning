
import { NewCouponForm } from "@/modules/coupon/components";
import { Heading } from "@/shared/components";


const page = () => {
  return (
    <div>
      <Heading className="mb-10">Tạo mới mã giảm giá</Heading>
      <NewCouponForm></NewCouponForm>
    </div>
  );
};

export default page;