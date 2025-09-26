import { LessonModelProps } from "@/modules/lesson/services/lesson.model";
export interface LessonItemData
  extends Omit<LessonModelProps, 'course' | 'lecture'> {
  course: string;
}