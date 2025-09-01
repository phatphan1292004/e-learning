"use server";

import User, { IUser } from "@/database/user.model";
import { connectDB } from "../mongoose";
import { TCreateUserParams } from "@/types";
import { ICourse } from "@/database/course.model";
import { ECourseStatus } from "@/types/enums";

export async function createUser(params: TCreateUserParams) {
  try {
    connectDB();
    const newUser = await User.create(params);
    return newUser;
  } catch (error) {}
}

export async function getUserInfo({
  userId,
}: {
  userId: string;
}): Promise<IUser | null | undefined> {
  try {
    connectDB();
    const user = await User.findOne({ clerkId: userId });
    if (!user) return null;
    return user;
  } catch (error) {
    console.log(error);
  }
}

export async function getUserCourse(
  userId: string
): Promise<ICourse[] | null | undefined> {
  try {
    connectDB();
    const findUser = await User.findOne({ clerkId: userId }).populate({
      path: "courses",
      model: "Course",
      match: {
        status: ECourseStatus.APPROVED,
      },
    });
    if (!findUser) return null;
    return findUser.courses;
  } catch (error) {
    console.log(error);
  }
}
