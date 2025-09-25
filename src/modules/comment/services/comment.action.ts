"use server";


import User from "@/database/user.model";
import { connectDB } from "@/shared/lib/mongoose";
import { ICommentItem } from "@/types";
import { revalidatePath } from "next/cache";
import CommentSchema from "./comment.schema";

export async function createComment(params: {
  content: string;
  lesson: string;
  user: string;
  level: number;
  parentId?: string;
  path?: string;
}): Promise<boolean | undefined> {
  try {
    connectDB();
    const newComment = await CommentSchema.create(params);
    revalidatePath(params.path || "/");
    if (!newComment) return false;
    return true;
  } catch (error) {
    console.log(error);
  }
}
export async function getCommentsByLesson(
  lessonId: string,
  sort: "recent" | "oldest" = "recent"
): Promise<ICommentItem[] | undefined> {
  try {
    connectDB();
    const comments = await CommentSchema.find<ICommentItem>({
      lesson: lessonId,
    })
      .sort({ created_at: sort === "recent" ? -1 : 1 })
      .populate({
        path: "user",
        model: User,
        select: "name avatar",
      });
    return JSON.parse(JSON.stringify(comments));
  } catch (error) {
    console.log(error);
  }
}
