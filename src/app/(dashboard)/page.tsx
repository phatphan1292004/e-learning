import CourseItem from "@/modules/course/components/course-manage/course-item";
import { CourseStatus } from "@/types/enums";
import React from "react";
import { CourseGrid } from "@/shared/common";
import { Heading } from "@/shared/components";
import { getAllCoursesPublic } from "@/modules/course/services/course.action";

const page = async ({
  searchParams,
}: {
  searchParams: {
    page: number;
    search: string;
    status: CourseStatus;
  };
}) => {
  const courses = (await getAllCoursesPublic({})) || [];
  return (
    <div>
      <Heading>Khám phá</Heading>
      <CourseGrid>
        {courses?.length > 0 &&
          courses.map((item) => <CourseItem key={item.slug} data={item} />)}
      </CourseGrid>
    </div>
  );
};

export default page;
