"use server";

import User from "@/database/user.model";
import { connectDB } from "../mongoose";
import { TCreateUserParams } from "@/types";

export default async function createUser(params: TCreateUserParams) {
  try {
    connectDB();
    const newUser = await User.create(params);
    return newUser;
  } catch (error) {}
}