import OrderManage from "../../../../modules/order/components/order-manage";
import { fetchOrders } from "@/shared/lib/actions/order.action";
import { ITEM_PER_PAGE } from "@/shared/constant";
import { OrderManageParams } from "@/modules/order/types/order.type";

const page = async ({
  searchParams,
}: OrderManageParams) => {
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
