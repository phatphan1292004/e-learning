import { Heading } from "@/shared/components";
import { auth } from "@clerk/nextjs/server";
import React from "react";
import { CourseAddNew } from "@/modules/course/components";
import { getUserInfo } from "@/modules/user/services/user.actions";

const page = async () => {
  const { userId } = auth();
  if (!userId) return null;
  const user = await getUserInfo({ userId });
  if (!user) return null;
  return (
    <div>
      <Heading>Create New Course</Heading>
      <CourseAddNew user={JSON.parse(JSON.stringify(user))} />
    </div>
  );
};

export default page;
