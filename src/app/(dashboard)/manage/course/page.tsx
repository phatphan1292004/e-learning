import { getAllCourses } from "@/lib/actions/course.action";
import { CourseManage } from "@/modules/course/components";
import { CourseStatus } from "@/types/enums";
import React from "react";

const page = async ({
  searchParams,
}: {
  searchParams: {
    page: number;
    search: string;
    status: CourseStatus;
  };
}) => {
  const courses = await getAllCourses({
    page: searchParams.page || 1,
    limit: 10,
    search: searchParams.search,
    status: searchParams.status,
  });
  return (
    <>
      <CourseManage
        course={courses ? JSON.parse(JSON.stringify(courses)) : []}
      />
    </>
  );
};

export default page;
