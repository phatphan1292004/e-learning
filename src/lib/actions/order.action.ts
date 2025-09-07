"use server";
import Order from "@/database/order.model";
import { connectDB } from "../mongoose";
import { TCreateOrderParams } from "@/types";
import { FilterQuery } from "mongoose";
import Course from "@/database/course.model";
import User from "@/database/user.model";

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
      })
      .skip(skip)
      .limit(limit);
    return orders;
  } catch (error) {}
}

export async function createOrder(params: TCreateOrderParams) {
  try {
    connectDB();
    const newOrder = await Order.create(params);
    return JSON.parse(JSON.stringify(newOrder));
  } catch (error) {
    
  }
}