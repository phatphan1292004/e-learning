import Heading from "@/components/typography/Heading";
import { getUserCourse } from "@/lib/actions/user.actions";
import React from "react";
import StudyCourse from "./StudyCourse";

const page = async () => {
  const courses = await getUserCourse() || [];
  console.log(courses);
  return (
    <div>
      <Heading>Khu vực học tập</Heading>
      <StudyCourse courses={courses ? JSON.parse(JSON.stringify(courses)) : []} />
    </div>
  );
};

export default page;
