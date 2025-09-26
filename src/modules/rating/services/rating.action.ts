"use server";
import Rating from "@/modules/rating/services/rating.model";
import { TCreateRatingParams, TFilterData, TRatingItem } from "@/types";
import { revalidatePath } from "next/cache";
import { RatingStatus } from "@/types/enums";
import { FilterQuery } from "mongoose";
import { connectDB } from "@/shared/lib/mongoose";
import Course from "@/modules/course/services/course.schema";

export async function createRating(
  params: TCreateRatingParams
): Promise<boolean | undefined> {
  try {
    connectDB();
    const newRating = await Rating.create(params);
    const findCourse = await Course.findOne({ _id: params.course }).populate({
      path: "rating",
      model: Rating,
    });
    if (findCourse.rating) {
      await findCourse.rating.push(newRating._id);
      await findCourse.save();
    }
    if (!newRating) return false;
    return true;
  } catch (error) {
    console.log(error);
  }
}

export async function getRatingByUserId(
  userId: string
): Promise<boolean | undefined> {
  try {
    connectDB();
    const findRating = await Rating.findOne({ user: userId });
    return findRating?._id ? true : false;
  } catch (error) {
    console.log(error);
  }
}

export async function updateRating(id: string): Promise<boolean | undefined> {
  try {
    connectDB();
    await Rating.findByIdAndUpdate(id, { status: RatingStatus.ACTIVE });
    revalidatePath("/admin/manage/rating");
    return true;
  } catch (error) {
    console.log(error);
  }
}
export async function deleteRating(id: string): Promise<boolean | undefined> {
  try {
    connectDB();
    await Rating.findByIdAndDelete(id);
    revalidatePath("/admin/manage/rating");
    return true;
  } catch (error) {
    console.log(error);
  }
}
export async function getRatings(
  params: TFilterData
): Promise<TRatingItem[] | undefined> {
  try {
    connectDB();
    const { page = 1, limit = 10, search, status } = params;
    const skip = (page - 1) * limit;
    const query: FilterQuery<typeof Course> = {};
    if (search) {
      query.$or = [{ content: { $regex: search, $options: "i" } }];
    }
    if (status) {
      query.status = status;
    }
    const ratings = await Rating.find(query)
      .populate({
        path: "course",
        select: "title slug",
      })
      .populate({
        path: "user",
        select: "name",
      })
      .skip(skip)
      .limit(limit)
      .sort({ created_at: -1 });
    return JSON.parse(JSON.stringify(ratings));
  } catch (error) {
    console.log(error);
  }
}
