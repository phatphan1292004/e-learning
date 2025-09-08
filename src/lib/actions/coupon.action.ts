"use server";
import Coupon from "@/database/coupon.model";
import { connectDB } from "../mongoose";

export async function createCoupon(params: any) {
  try {
    connectDB();
    const newCoupon = await Coupon.create(params);
    return JSON.parse(JSON.stringify(newCoupon));
  } catch (error) {
    console.log(error);
  }
}