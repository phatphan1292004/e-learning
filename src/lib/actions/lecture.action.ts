"use server";

import { TCreateLectureParams, TUpdateLectureParams } from "@/types";
import { connectDB } from "../mongoose";
import Course from "@/database/course.model";
import Lecture from "@/database/lecture.model";
import { revalidatePath } from "next/cache";

export async function createLecture(params: TCreateLectureParams) {
  try {
    connectDB();
    const findCourse = await Course.findById(params.course);
    if (!findCourse) return;

    const newLecture = await Lecture.create(params);
    findCourse.lectures.push(newLecture._id);
    findCourse.save();
    revalidatePath(params.path || "/");
    return {
      success: true,
    };
  } catch (error) {}
}

export async function updateLecture(params: TUpdateLectureParams) {
  try {
    connectDB();
    await Lecture.findByIdAndUpdate(params.lectureId, params.updateData, {
      new: true,
    });
    revalidatePath(params.updateData.path || "/");
    return {
      success: true,
    };
  } catch (error) {}
}
