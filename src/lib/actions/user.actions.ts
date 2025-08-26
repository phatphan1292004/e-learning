"use server";

import User, { IUser } from "@/database/user.model";
import { connectDB } from "../mongoose";
import { TCreateUserParams } from "@/types";

export async function createUser(params: TCreateUserParams) {
  try {
    connectDB();
    const newUser = await User.create(params);
    return newUser;
  } catch (error) {}
}

export async function getUserInfo({
  userId,
}: {
  userId: string;
}): Promise<IUser | null | undefined> {
  try {
    connectDB();
    const user = await User.findOne({ clerkId: userId });
    if (!user) return null;
    return user;
  } catch (error) {
    console.log(error);
  }
}
