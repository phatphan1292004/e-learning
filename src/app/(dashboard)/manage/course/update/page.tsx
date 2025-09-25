import { getCourseBySlug } from "@/shared/lib/actions/course.action";
import { CourseUpdate } from "@/modules/course/components";
import { Heading } from "@/shared/components";
import React from "react";

const page = async ({ searchParams }: { searchParams: { slug: string } }) => {
  const findCourse = await getCourseBySlug({ slug: searchParams.slug });
  if (!findCourse) return null;
  return (
    <div>
      <Heading className="mb-8">Cập nhật khóa học</Heading>
      <CourseUpdate data={JSON.parse(JSON.stringify(findCourse))} />
    </div>
  );
};

export default page;
