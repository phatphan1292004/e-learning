"use client";

import Heading from "@/components/common/Heading";
import { StatusBadge } from "@/components/common";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { commonClassName, orderStatus } from "@/constants";
import useQueryString from "@/hooks/useQueryString";

import { cn } from "@/lib/utils";
import { EOrderStatus } from "@/types/enums";
import { debounce } from "lodash";
import { HiOutlineCheck, HiOutlineX } from "react-icons/hi";
import Swal from "sweetalert2";
import { updateOrder } from "@/lib/actions/order.action";
import { toast } from "react-toastify";
interface IOrderManageProps {
  _id: string;
  code: string;
  total: number;
  amount: number;
  discount: number;
  coupon: {
    code: string;
  };
  status: EOrderStatus;
  course: {
    title: string;
  };
  user: {
    name: string;
  };
}
const OrderManage = ({ orders = [] }: { orders: IOrderManageProps[] }) => {
  const handleUpdateOrder = async ({
    orderId,
    status,
  }: {
    orderId: string;
    status: EOrderStatus;
  }) => {
    if (status === EOrderStatus.CANCELLED) {
      Swal.fire({
        title: "Bạn có chắc muốn hủy đơn hàng không?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Đồng ý",
        cancelButtonText: "Thoát",
      }).then(async (result) => {
        if (result.isConfirmed) {
          await updateOrder({ orderId, status });
        }
      });
    }
    if (status === EOrderStatus.COMPLETED) {
      const res = await updateOrder({ orderId, status });
      if (res?.success) {
        toast.success("Cập nhật đơn hàng thành công");
      }
    }
  };
  const { createQueryString, router, pathname } = useQueryString();
  const handleSelectStatus = (status: EOrderStatus) => {
    router.push(`${pathname}?${createQueryString("status", status)}`);
  };
  const handleSearchOrder = debounce(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      router.push(`${pathname}?${createQueryString("search", e.target.value)}`);
    },
    500
  );
  
  return (
    <div>
      <div className="flex flex-col lg:flex-row lg:items-center gap-5 justify-between mb-10">
        <Heading className="">Quản lý đơn hàng</Heading>
        <div className="flex gap-3 h-10">
          <div className="w-full lg:w-[300px]">
            <Input
              className="h-10"
              placeholder="Tìm kiếm đơn hàng..."
              onChange={(e) => handleSearchOrder(e)}
            />
          </div>
          <div className="h-full">
            <Select
              onValueChange={(value) =>
                handleSelectStatus(value as EOrderStatus)
              }
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Chọn trạng thái" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {orderStatus.map((status) => (
                    <SelectItem value={status.value} key={status.value}>
                      {status.title}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
      <Table className="table-responsive">
        <TableHeader>
          <TableRow>
            <TableHead>Mã đơn hàng</TableHead>
            <TableHead>Khóa học</TableHead>
            <TableHead>Thành viên</TableHead>
            <TableHead>Số tiền</TableHead>
            <TableHead>Mã giảm giá</TableHead>
            <TableHead>Trạng thái</TableHead>
            <TableHead>Hành động</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.length > 0 &&
            orders.map((order) => {
              const orderStatusItem = orderStatus.find(
                (item) => item.value === order.status
              );
              return (
                <TableRow key={order.code}>
                  <TableCell>
                    <strong>{order.code}</strong>
                  </TableCell>
                  <TableCell>{order.course.title}</TableCell>
                  <TableCell>{order.user.name}</TableCell>
                  <TableCell>
                    <div className="flex flex-col gap-2">
                      <span>{order.amount.toLocaleString("us-US")}</span>
                      {order.discount > 0 && (
                        <span>{order.discount.toLocaleString("us-US")}</span>
                      )}
                      <strong
                        className={cn(
                          orderStatusItem?.className,
                          "bg-transparent"
                        )}
                      >
                        {order.total.toLocaleString("us-US")}
                      </strong>
                    </div>
                  </TableCell>
                  <TableCell>
                    <strong>{order.coupon?.code || ""}</strong>
                  </TableCell>
                  <TableCell>
                    <StatusBadge item={orderStatusItem}></StatusBadge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-3">
                      {order.status !== EOrderStatus.CANCELLED && (
                        <>
                          {order.status === EOrderStatus.PENDING && (
                            <button
                              type="button"
                              className={commonClassName.acction}
                              onClick={() =>
                                handleUpdateOrder({
                                  orderId: order._id,
                                  status: EOrderStatus.COMPLETED,
                                })
                              }
                            >
                              <HiOutlineCheck />
                            </button>
                          )}
                          <button
                            type="button"
                            className={commonClassName.acction}
                            onClick={() =>
                              handleUpdateOrder({
                                orderId: order._id,
                                status: EOrderStatus.CANCELLED,
                              })
                            }
                          >
                            <HiOutlineX />
                          </button>
                        </>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
        </TableBody>
      </Table>
    </div>
  );
};

export default OrderManage;
