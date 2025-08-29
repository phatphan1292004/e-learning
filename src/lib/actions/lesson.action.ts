"use server"
import { TCreateLessonParams, TUpdateLessonParams } from "@/types";
import { connectDB } from "../mongoose";
import Course from "@/database/course.model";
import Lecture from "@/database/lecture.model";
import Lesson from "@/database/lesson.model";
import { revalidatePath } from "next/cache";


export async function createLesson(params: TCreateLessonParams) {
  try {
    connectDB();
    const findCourse = await Course.findById(params.course);
    if(!findCourse) return;
    const findLecture = await Lecture.findById(params.lecture);
    if(!findLecture) return;

    const newLesson = await Lesson.create(params);
    findLecture.lessons.push(newLesson._id);
    await findLecture.save(); 
    revalidatePath(params.path || "/");
    return {success: true};
  } catch (error) {
    
  }
}

export async function updateLesson(params: TUpdateLessonParams) {
  try {
    connectDB();
    await Lesson.findByIdAndUpdate(params.lessonId, params.updateData, {new: true});
    revalidatePath(params.path || "/");
    return {success: true};
  } catch (error) {
    
  }
}