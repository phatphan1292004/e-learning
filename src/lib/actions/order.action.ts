"use server";
import Order from "@/database/order.model";
import { connectDB } from "../mongoose";
import { TCreateOrderParams } from "@/types";
import { FilterQuery } from "mongoose";
import Course from "@/database/course.model";
import User from "@/database/user.model";
import { EOrderStatus } from "@/types/enums";
import { revalidatePath } from "next/cache";
import { find } from "lodash";
import Coupon from "@/database/coupon.model";

export async function fetchOrders(params: any) {
  try {
    connectDB();
    const { page = 1, limit = 10, search, status } = params;
    const skip = (page - 1) * limit;
    const query: FilterQuery<typeof Course> = {};
    if (search) {
      query.$or = [{ code: { $regex: search, $options: "i" } }];
    }
    if (status) {
      query.status = status;
    }
    const orders = await Order.find(query)
      .populate({
        model: Course,
        select: "title",
        path: "course",
      })
      .populate({
        path: "user",
        model: User,
        select: "name",
      }).populate({
        path: "coupon",
        select: "code",
      }).sort({ created_at: -1 })
      .skip(skip)
      .limit(limit);
    return JSON.parse(JSON.stringify(orders));
  } catch (error) {}
}

export async function createOrder(params: TCreateOrderParams) {
  try {
    connectDB();
    const newOrder = await Order.create(params);
    if (params.coupon) {
      await Coupon.findByIdAndUpdate(params.coupon, {
        $inc: { used: 1 }
      });
    }
    return JSON.parse(JSON.stringify(newOrder));
  } catch (error) {
    console.error("Create order error:", error);
    return null; 
  }
}

export async function updateOrder({
  orderId,
  status,
}: {
  orderId: string;
  status: EOrderStatus;
}) {
  try {
    connectDB();
    const findOrder = await Order.findById(orderId).populate({
      path: "course",
      model: Course,
      select:"_id",
    }).populate({
      path: "user",
      model: User,
      select:"_id",
    })
    if (!findOrder) return;
    if (findOrder.status === EOrderStatus.CANCELLED) return;
    const findUser = await User.findById(findOrder.user._id);

    await Order.findByIdAndUpdate(orderId, { status });
    if (
      status === EOrderStatus.COMPLETED &&
      findOrder.status === EOrderStatus.PENDING
    ) {
      findUser?.courses.push(findOrder.course._id);
      await findUser.save();
    }

    if (
      status === EOrderStatus.CANCELLED &&
      findOrder.status === EOrderStatus.COMPLETED
    ) {
      findUser.courses = findUser?.courses.filter((el: any) => el.toString() !== findOrder.course._id.toString());
      await findUser.save();
    }

    revalidatePath("/manage/order");
    return {
      success: true,
    };
  } catch (error) {}
}

export async function getOrderDetails({ code }: { code: string }) {
  try {
    connectDB();
    const orderDetails = await Order.findOne({ code }).populate({
      path: "course",
      select: "title",
    });
    return JSON.parse(JSON.stringify(orderDetails));
  } catch (error) {
    return null;
  }
}
