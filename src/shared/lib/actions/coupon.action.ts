"use server";
import Coupon, { ICoupon } from "@/database/coupon.model";
import { connectDB } from "../mongoose";
import { revalidatePath } from "next/cache";
import {
  TCouponItem,
  TCouponParams,
  TCreateCouponParams,
  TFilterData,
  TUpdateCouponParams,
} from "@/types";
import { FilterQuery } from "mongoose";

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

export async function getCoupons(params: TFilterData): Promise<
  | {
      coupons: TCouponItem[] | undefined;
      total: number;
    }
  | undefined
> {
  try {
    connectDB();
    const { page = 1, limit = 10, search, active } = params;
    const skip = (page - 1) * limit;
    const query: FilterQuery<typeof Coupon> = {};
    if (search) {
      query.$or = [{ code: { $regex: search, $options: "i" } }];
    }
    if (active) {
      query.active = Boolean(Number(active));
    }

    const coupons = await Coupon.find(query)
      .sort({ created_at: -1 })
      .skip(skip)
      .limit(limit)
      .sort({ created_at: -1 });
    revalidatePath("/manage/coupon");
    const total = await Coupon.countDocuments(query);
    return {
      coupons: JSON.parse(JSON.stringify(coupons)),
      total,
    };
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
    if (couponCourses.includes(params.courseId) === false) isActive = false;
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
