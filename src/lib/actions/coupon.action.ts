"use server";
import Coupon, { ICoupon } from "@/database/coupon.model";
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

export async function getCoupons(params: any): Promise<ICoupon[] | undefined> {
  try {
    connectDB();
    const coupons = await Coupon.find(params);
    return JSON.parse(JSON.stringify(coupons));
  } catch (error) {
    console.log(error);
  }
}