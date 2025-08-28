"use server";
import { TCreateCourseParams, TUpdateCourseParams } from "@/types";
import { connectDB } from "../mongoose";
import Course, { ICourse } from "@/database/course.model";
import { revalidatePath } from "next/cache";

export async function getAllCourses(): Promise<ICourse[] | undefined> {
    try {
        connectDB();
        const courses = await Course.find();
        return courses;
    } catch (error) {
        console.log(error);
    }
}

export async function getCourseBySlug({ slug }: { slug: string }): Promise<ICourse | null | undefined> {
    try {
    connectDB();
    const course = await Course.findOne({slug});
    return course;
  } catch (error) {
    console.log(error);
  }
}

export async function createCourse(params: TCreateCourseParams) {
  try {
    connectDB();
    const existCourse = await Course.findOne({ slug: params.slug });
    if(existCourse) {
      return {
        success: false,
        message: "Đường dẫn khóa học đã tồn tại"
      }
    }
    const course = await Course.create(params);
    return {
      success: true,
      data: JSON.parse(JSON.stringify(course)),
    };
  } catch (error) {
    console.log(error);
  }
}

export async function updateCourse(params: TUpdateCourseParams) {
  try {
    connectDB();
    const findCourse = await Course.findOne({ slug: params.slug });
    if (!findCourse) return;
    await Course.findOneAndUpdate({ slug: params.slug }, params.updateData, {
      new: true,
    });
    revalidatePath(params.path || "/");
    return {
      success: true,
      message: "Cập nhật khóa học thành công!",
    };
  } catch (error) {
    console.log(error);
  }
}
