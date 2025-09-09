"use server";
import Coupon, { ICoupon } from "@/database/coupon.model";
import { connectDB } from "../mongoose";
import { revalidatePath } from "next/cache";
import {
  TCouponParams,
  TCreateCouponParams,
  TUpdateCouponParams,
} from "@/types";

export async function createCoupon(params: TCreateCouponParams) {
  try {
    connectDB();
    const existingCoupon = await Coupon.findOne({ code: params.code });
    if (existingCoupon) {
      return { error: "Mã giảm giá đã tồn tại" };
    }
    const newCoupon = await Coupon.create(params);
    return JSON.parse(JSON.stringify(newCoupon));
  } catch (error) {
    console.log(error);
  }
}

export async function getCoupons(params: any): Promise<ICoupon[] | undefined> {
  try {
    connectDB();
    const coupons = await Coupon.find(params).sort({ created_at: -1 });
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

export async function updateCoupon(params: TUpdateCouponParams) {
  try {
    connectDB();
    const updatedCoupon = await Coupon.findByIdAndUpdate(
      params._id,
      params.updateData
    );
    revalidatePath("/manage/coupon");
    return JSON.parse(JSON.stringify(updatedCoupon));
  } catch (error) {
    console.log(error);
  }
}

export async function getCouponByCode(
  params: any
): Promise<TCouponParams | undefined> {
  try {
    connectDB();
    const findCoupon = await Coupon.findOne({
      code: params.code,
    }).populate({
      path: "courses",
      select: "_id title",
    });
    const coupon = JSON.parse(JSON.stringify(findCoupon));
    return coupon;
  } catch (error) {
    console.log(error);
  }
}


export async function getValidateCoupon(
  params: any
): Promise<TCouponParams | undefined> {
  try {
    connectDB();
    const findCoupon = await Coupon.findOne({
      code: params.code,
    }).populate({
      path: "courses",
      select: "_id title",
    });

    const coupon = JSON.parse(JSON.stringify(findCoupon));
    const couponCourses = coupon?.courses.map((course: any) => course._id);
    let isActive = true;
    if(couponCourses.includes(params.courseId) === false) isActive = false;
    if (!coupon?.active) isActive = false;
    if (coupon?.used >= coupon?.limit) isActive = false;
    if (coupon?.start_date && new Date(coupon?.start_date) > new Date())
      isActive = false;
    if (coupon?.end_date && new Date(coupon?.end_date) < new Date())
      isActive = false;
    return isActive ? coupon : undefined;
  } catch (error) {
    console.log(error);
  }
}
