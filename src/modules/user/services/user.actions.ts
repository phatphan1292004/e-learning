"use server";

import User, { IUser } from "@/modules/user/services/user.model";
import { TCreateUserParams } from "@/types";
import { CourseStatus } from "@/types/enums";
import Lecture from "@/modules/lecture/services/lecture.model";
import Lesson from "@/modules/lesson/services/lesson.model";
import { connectDB } from "@/shared/lib/mongoose";
import { ICourse } from "@/modules/course/services/course.schema";

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
        status: CourseStatus.APPROVED,
      },
      populate: {
        path: "lectures",
        model: Lecture,
        select: "lessons",
        populate: {
          path: "lessons",
          model: Lesson,
          select: "slug",
        },
      },
    });
    if (!findUser) return null;
    const course = JSON.parse(JSON.stringify(findUser.courses));
    return course;
  } catch (error) {
    console.log(error);
  }
}
