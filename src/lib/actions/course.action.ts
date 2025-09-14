"use server";
import {
  StudyCourseProps,
  TCourseUpdateParams,
  TCreateCourseParams,
  TFilterData,
  TGetAllCourseParams,
  TUpdateCourseParams,
} from "@/types";
import { connectDB } from "../mongoose";
import Lecture from "@/database/lecture.model";
import Course, { ICourse } from "@/database/course.model";
import { revalidatePath } from "next/cache";
import Lesson from "@/database/lesson.model";
import { FilterQuery } from "mongoose";
import { ECourseStatus, ERatingStatus } from "@/types/enums";
import Rating from "@/database/rating.model";

export async function getAllCourses(
  params: TFilterData
): Promise<ICourse[] | undefined> {
  try {
    connectDB();
    const { page = 1, limit = 10, search, status } = params;
    const skip = (page - 1) * limit;
    const query: FilterQuery<typeof Course> = {};
    if (search) {
      query.$or = [{ title: { $regex: search, $options: "i" } }];
    }
    if (status) {
      query.status = status;
    }
    const courses = await Course.find(query)
      .skip(skip)
      .limit(limit)
      .sort({ created_at: -1 });
    return JSON.parse(JSON.stringify(courses));
  } catch (error) {
    console.log(error);
  }
}

export async function getAllCoursesPublic(
  params: TGetAllCourseParams
): Promise<StudyCourseProps[] | undefined> {
  try {
    connectDB();
    const { page = 1, limit = 10, search } = params;
    const skip = (page - 1) * limit;
    const query: FilterQuery<typeof Course> = {
      status: ECourseStatus.APPROVED,
    };
    if (search) {
      query.$or = [{ title: { $regex: search, $options: "i" } }];
    }
    const courses = await Course.find(query)
      .skip(skip)
      .limit(limit)
      .sort({ created_at: -1 });
    return JSON.parse(JSON.stringify(courses));
  } catch (error) {
    console.log(error);
  }
}

export async function getCourseBySlug({
  slug,
}: {
  slug: string;
}): Promise<TCourseUpdateParams | null | undefined> {
  try {
    connectDB();
    const course = await Course.findOne({ slug })
      .populate({
        path: "lectures",
        select: "_id title",
        match: { _destroy: false },
        model: Lecture,
        populate: {
          path: "lessons",
          model: Lesson,
          match: { _destroy: false },
        },
      })
      .populate({
        path: "rating",
        model: Rating,
        select: "content",
        match: {
          status: ERatingStatus.ACTIVE,
        },
      });
    return course;
  } catch (error) {
    console.log(error);
  }
}

export async function createCourse(params: TCreateCourseParams) {
  try {
    connectDB();
    const existCourse = await Course.findOne({ slug: params.slug });
    if (existCourse) {
      return {
        success: false,
        message: "Đường dẫn khóa học đã tồn tại",
      };
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

export async function updateCourseView({ slug }: { slug: string }) {
  try {
    connectDB();
    await Course.findOneAndUpdate(
      { slug },
      {
        $inc: { views: 1 },
      }
    );
  } catch (error) {}
}

export async function getCourseLessonsInfo({ slug }: { slug: string }): Promise<
  | {
      duration: number;
      lessons: number;
    }
  | undefined
> {
  try {
    connectDB();
    const course = await Course.findOne({ slug })
      .select("lectures")
      .populate({
        path: "lectures",
        select: "lessons",
        populate: {
          path: "lessons",
          select: "duration",
        },
      });
    const lessons = course?.lectures.map((l: any) => l.lessons).flat();
    const duration = lessons.reduce(
      (acc: number, cur: any) => acc + cur.duration,
      0
    );
    return {
      duration,
      lessons: lessons.length,
    };
  } catch (error) {}
}
