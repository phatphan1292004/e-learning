"use server";
import User from "@/modules/user/services/user.model";
import { auth } from "@clerk/nextjs/server";
import History, { IHistory } from "@/modules/history/history.model";
import { TCreateHistoryParams } from "@/types";
import { revalidatePath } from "next/cache";
import { connectDB } from "@/shared/lib/mongoose";

export async function createHistory(params: TCreateHistoryParams) {
  try {
    connectDB();
    const { userId } = auth();
    const findUser = await User.findOne({ clerkId: userId });
    if (!findUser) return null;
    if (params.checked) {
      await History.create({
        course: params.course,
        lesson: params.lesson,
        user: findUser._id,
      });
    } else {
      await History.findOneAndDelete({
        course: params.course,
        lesson: params.lesson,
        user: findUser._id,
      });
    }
    revalidatePath(params.path || "/");
  } catch (error) {}
}

export async function getHistory(params: {
  course: string;
}): Promise<IHistory[] | undefined> {
  try {
    connectDB();
    const { userId } = auth();
    const findUser = await User.findOne({ clerkId: userId });
    const histories = await History.find({
      course: params.course,
      user: findUser?._id,
    });

    return histories;
  } catch (error) {}
}
