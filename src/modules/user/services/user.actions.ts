"use server";

import User, { IUser } from "@/modules/user/services/user.model";
import { TCreateUserParams } from "@/types";
import { CourseStatus, UserRole } from "@/types/enums";
import Lecture from "@/modules/lecture/services/lecture.model";
import Lesson from "@/modules/lesson/services/lesson.model";
import { connectDB } from "@/shared/lib/mongoose";
import { ICourse } from "@/modules/course/services/course.schema";
import { revalidatePath } from "next/cache";

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

export async function getUsers({
  page = 1,
  limit = 10,
  search,
  role,
}: {
  page?: number;
  limit?: number;
  search?: string;
  role?: UserRole;
}) {
  try {
    connectDB();

    const skip = (page - 1) * limit;
    const query: any = {};

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
      ];
    }

    if (role && role !== ("all" as any)) {
      query.role = role;
    }

    const users = await User.find(query)
      .skip(skip)
      .limit(limit)
      .sort({ created_at: -1 })
      .lean();

    const total = await User.countDocuments(query);

    return {
      users: JSON.parse(JSON.stringify(users)),
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  } catch (error) {
    console.log(error);
    return { users: [], total: 0, page: 1, limit: 10, totalPages: 0 };
  }
}

export async function updateUserRole(userId: string, role: UserRole) {
  try {
    connectDB();

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { role },
      { new: true }
    );

    if (!updatedUser) {
      throw new Error("Không tìm thấy người dùng");
    }

    revalidatePath("/manage/user");
    return JSON.parse(JSON.stringify(updatedUser));
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function deleteUser(userId: string) {
  try {
    connectDB();
    const user = await User.findById(userId);
    if (!user) {
      throw new Error("Không tìm thấy người dùng");
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { status: user.status === "ACTIVE" ? "INACTIVE" : "ACTIVE" },
      { new: true }
    );

    revalidatePath("/manage/user");
    return { success: true };
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function toggleUserStatus(userId: string) {
  try {
    connectDB();

    const user = await User.findById(userId);
    if (!user) {
      throw new Error("Không tìm thấy người dùng");
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { status: user.status === "active" ? "inactive" : "active" },
      { new: true }
    );

    revalidatePath("/manage/user");
    return JSON.parse(JSON.stringify(updatedUser));
  } catch (error) {
    console.log(error);
    throw error;
  }
}
