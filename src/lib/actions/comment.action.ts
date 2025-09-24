"use server";



import Comment from "@/database/comment.model";
import User from "@/database/user.model";
import { ICommentItem } from "@/types";
import { ECommentStatus } from "@/types/enums";
import { connectDB } from "../mongoose";

export async function createComment(params: {
  content: string;
  lesson: string;
  user: string;
}): Promise<boolean | undefined> {
  try {
    connectDB();
    const newComment = await Comment.create(params);
    if (!newComment) return false;
    return true;
  } catch (error) {
    console.log(error);
  }
}
export async function getCommentsByLesson(
  lessonId: string
): Promise<ICommentItem[] | undefined> {
  try {
    connectDB();
    const comments = await Comment.find<ICommentItem>({
      lesson: lessonId,
      status: ECommentStatus.PENDING,
    }).populate({
      path: "user",
      model: User,
      select: "name avatar",
    });
    return JSON.parse(JSON.stringify(comments));
  } catch (error) {
    console.log(error);
  }
}