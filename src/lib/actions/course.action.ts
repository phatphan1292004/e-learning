"use server";
import { TCreateCourseParams } from "@/types";
import { connectDB } from "../mongoose";
import Course from "@/database/course.model";
export async function getCourseBySlug({ slug }: { slug: string }) {
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
    const course = await Course.create(params);
    return {
      success: true,
      data: JSON.parse(JSON.stringify(course)),
    };
  } catch (error) {
    console.log(error);
  }
}
