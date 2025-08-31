"use server";
import { TCreateLessonParams, TUpdateLessonParams } from "@/types";
import { connectDB } from "../mongoose";
import Course from "@/database/course.model";
import Lecture from "@/database/lecture.model";
import Lesson, { ILesson } from "@/database/lesson.model";
import { revalidatePath } from "next/cache";

export async function createLesson(params: TCreateLessonParams) {
  try {
    connectDB();
    const findCourse = await Course.findById(params.course);
    if (!findCourse) return;
    const findLecture = await Lecture.findById(params.lecture);
    if (!findLecture) return;

    const newLesson = await Lesson.create(params);
    findLecture.lessons.push(newLesson._id);
    await findLecture.save();
    revalidatePath(params.path || "/");
    return { success: true };
  } catch (error) {}
}

export async function updateLesson(params: TUpdateLessonParams) {
  try {
    connectDB();
    await Lesson.findByIdAndUpdate(params.lessonId, params.updateData, {
      new: true,
    });
    revalidatePath(params.path || "/");
    return { success: true };
  } catch (error) {}
}

export async function getLessonBySlug({
  slug,
  course,
}: {
  slug: string;
  course: string;
}): Promise<ILesson | null | undefined> {
  try {
    connectDB();
    const findLesson = await Lesson.findOne({
      slug,
      course,
    }).select("title video_url contnent");
    return findLesson;
  } catch (error) {}
}

export async function getAllLessons({
  course,
}: {
  course: string;
}): Promise<ILesson[] | null | undefined> {
  try {
    connectDB();
    const findLessons = await Lesson.find({
      course,
    }).select("title slug content video_url");
    return findLessons;
  } catch (error) {
    console.log(error);
  }
}

export async function countLessonByCourseId({
  courseId,
}: {
  courseId: string;
}): Promise<number | undefined> {
  try {
    connectDB();
    const count = await Lesson.countDocuments({
      course: courseId,
    });
    return count;
  } catch (error) {
    console.log(error);
  }
}
