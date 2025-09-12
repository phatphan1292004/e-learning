"use server";
import Rating from "@/database/rating.model";
import { connectDB } from "../mongoose";

export async function createRating(params: any): Promise<boolean | undefined> {
  try {
    connectDB();
    const newRating = await Rating.create(params);
    if (!newRating) return false;
    return true;
  } catch (error) {
    console.log(error);
  }
}
