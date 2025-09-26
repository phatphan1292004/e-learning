import React from "react";
import { auth } from "@clerk/nextjs/server";
import { Heading } from "@/shared/components";
import StudyCourse from "@/modules/course/components/study-course";
import { getUserCourse } from "@/modules/user/services/user.actions";

const page = async () => {
  const { userId } = auth();
  if (!userId) return null;
  const courses = (await getUserCourse(userId)) || [];
  return (
    <div>
      <Heading>Khu vực học tập</Heading>
      <StudyCourse courses={JSON.parse(JSON.stringify(courses))} />
    </div>
  );
};

export default page;
