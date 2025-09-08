import Heading from "@/components/common/Heading";
import {
  HiOutlineArrowNarrowLeft,
  HiOutlineArrowNarrowRight,
  HiOutlinePlusSm,
} from "react-icons/hi";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { BouncedLink, StatusBadge, TableAction, TableActionItem } from "@/components/common";
import { getCoupons } from "@/lib/actions/coupon.action";
import { ECouponType } from "@/types/enums";

const page = async () => {
  const coupons = await getCoupons({});
  console.log(coupons);
  return (
    <div>
      <BouncedLink url="/manage/coupon/new"></BouncedLink>
      <div className="flex flex-col lg:flex-row lg:items-center gap-5 justify-between mb-10">
        <Heading className="">Quản lý mã giảm giá</Heading>
        <div className="flex gap-3">
          <div className="w-full lg:w-[300px]">
            <Input placeholder="Tìm kiếm coupon..." />
          </div>
        </div>
      </div>
      <Table className="table-responsive">
        <TableHeader>
          <TableRow>
            <TableHead>Mã</TableHead>
            <TableHead>Tiêu đề</TableHead>
            <TableHead>Giảm giá</TableHead>
            <TableHead>Sử dụng</TableHead>
            <TableHead>Trạng thái</TableHead>
            <TableHead>Hành động</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {coupons &&
            coupons.length > 0 &&
            coupons.map((coupon) => (
              <TableRow key={coupon.code}>
                <TableCell>
                  <strong>{coupon.code}</strong>
                </TableCell>
                <TableCell>
                  <strong>{coupon.title}</strong>
                </TableCell>
                <TableCell>
                  {coupon.type === ECouponType.AMOUNT ? (
                    <>{coupon.value.toLocaleString("us-US")}</>
                  ) : (
                    <>{coupon.value}%</>
                  )}
                </TableCell>
                <TableCell>{coupon.used} / {coupon.limit}</TableCell>
                <TableCell>
                  {coupon.active ? (
                    <StatusBadge
                      item={{
                        title: "Đang hoạt động",
                        className: "text-green-500",
                      }}
                    ></StatusBadge>
                  ) : (
                    <StatusBadge
                      item={{
                        title: "Chưa kích hoạt",
                        className: "text-orange-500",
                      }}
                    ></StatusBadge>
                  )}
                </TableCell>
                <TableCell>
                  <TableAction>
                    <TableActionItem
                      type="edit"
                      url={`/manage/coupon/update?code=${coupon.code}`}
                    ></TableActionItem>
                    <TableActionItem type="delete"></TableActionItem>
                  </TableAction>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
      <div className="flex justify-end gap-3 mt-10">
        <button className="size-10 rounded-md borderDarkMode bgDarkMode border flex items-center justify-center">
          <HiOutlineArrowNarrowLeft size={18} />
        </button>
        <button className="size-10 rounded-md borderDarkMode bgDarkMode border flex items-center justify-center">
          <HiOutlineArrowNarrowRight size={18} />
        </button>
      </div>
    </div>
  );
};

export default page;
