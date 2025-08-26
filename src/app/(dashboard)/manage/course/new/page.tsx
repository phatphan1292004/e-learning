import Heading from "@/components/common/Heading";
import CourseAddNew from "@/components/course/CourseAddNew";
import { getUserInfo } from "@/lib/actions/user.actions";
import { auth } from "@clerk/nextjs/server";
import React from "react";

const page = async () => {
  const { userId } = auth();
  if(!userId) return null;
  const user = await getUserInfo({userId});
  if(!user) return null;
  return (
    <div>
      <Heading>Create New Course</Heading>
      <CourseAddNew user={JSON.parse(JSON.stringify(user))} />
    </div>
  );
};

export default page;
