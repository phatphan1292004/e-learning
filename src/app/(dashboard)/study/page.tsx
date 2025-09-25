
import { getUserCourse } from "@/lib/actions/user.actions";
import React from "react";
import StudyCourse from "./StudyCourse";
import { auth } from "@clerk/nextjs/server";
import { Heading } from "@/shared/components";

const page = async () => {
  const { userId } = auth();
  if(!userId) return null;
  const courses = await getUserCourse(userId) || [];
  return (
    <div>
      <Heading>Khu vực học tập</Heading>
      <StudyCourse courses={JSON.parse(JSON.stringify(courses))} />
    </div>
  );
};

export default page;