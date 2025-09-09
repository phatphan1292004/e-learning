"use server";
import Coupon, { ICoupon } from "@/database/coupon.model";
import { connectDB } from "../mongoose";
import { revalidatePath } from "next/cache";

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
    revalidatePath("/manage/coupon");
    return JSON.parse(JSON.stringify(coupons));
  } catch (error) {
    console.log(error);
  }
}

export async function deleteCoupon(code: string) {
  try {
    connectDB();
    await Coupon.findOneAndDelete({ code });
    revalidatePath("/manage/coupon");
  } catch (error) {
    console.log(error);
  }
}
