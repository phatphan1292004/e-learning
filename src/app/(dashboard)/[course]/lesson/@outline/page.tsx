import { getCourseBySlug } from "@/lib/actions/course.action";
import { getHistory } from "@/lib/actions/history.action";
import { getAllLessons } from "@/lib/actions/lesson.action";
import LessonContent from "@/modules/lesson/components/lesson-content";
import React from "react";

const page = async ({
  params,
  searchParams,
}: {
  params: { course: string };
  searchParams: { slug: string };
}) => {
  const course = params.course;
  const slug = searchParams.slug;
  const findCourse = await getCourseBySlug({ slug: course });
  if (!findCourse) return null;
  const lectures = findCourse.lectures || [];
  const courseId = findCourse._id.toString() || "";
  const histories = await getHistory({ course: courseId });
  const listLesson = await getAllLessons({ course: courseId });
  const completePercent = Math.floor(
    ((histories?.length || 0) / (listLesson?.length || 1)) * 100
  );
  return (
    <div className="sticky top-[100px] right-0">
      <div className="h-3 w-full rounded-full border borderDarkMode bgDarkMode mb-2">
        <div className="h-3 w-full rounded-full border borderDarkMode bgDarkMode mb-2">
          <div
            className="h-full rounded-full progress-bar-animated"
            style={{ width: `${completePercent}%` }}
          ></div>
        </div>
      </div>
      <LessonContent
        lectures={lectures}
        course={course}
        slug={slug}
        histories={histories ? JSON.parse(JSON.stringify(histories)) : []}
      />
    </div>
  );
};

export default page;
