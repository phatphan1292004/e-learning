import { OrderStatus } from "@/types/enums";
import OrderManage from "./OrderManage";
import { fetchOrders } from "@/lib/actions/order.action";
import { ITEM_PER_PAGE } from "@/constants";

const page = async ({
  searchParams,
}: {
  searchParams: {
    page: number;
    search: string;
    status: OrderStatus;
  };
}) => {
  const data = await fetchOrders({
    page: searchParams.page || 1,
    limit: ITEM_PER_PAGE,
    search: searchParams.search,
    status: searchParams.status,
  });
  if(!data) return null;
  const {orders, total } = data;
  const totalPage = Math.ceil(total / ITEM_PER_PAGE);
  return (
    <OrderManage
      orders={orders}
      totalPages={totalPage}
      total={total}
    ></OrderManage>
  );
};

export default page;
