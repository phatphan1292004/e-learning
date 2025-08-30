import { getCourseBySlug } from "@/lib/actions/course.action";
import { getAllLessons, getLessonBySlug } from "@/lib/actions/lesson.action";
import React from "react";
import LessonNavigation from "./LessonNavigation";
import { TUpdateCourseLecture } from "@/types";
import LessonContent from "@/components/lesson/LessonContent";
import { getHistory } from "@/lib/actions/history.action";

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
  const courseId = findCourse._id.toString() || "";
  const lessonDetails = await getLessonBySlug({
    slug,
    course: courseId,
  });
  console.log(lessonDetails);
  if (!lessonDetails) return null;
  const listLesson = (await getAllLessons({ course: courseId })) || [];
  const videoId = lessonDetails.video_url?.split("v=")[1] || "";
  const currentLessonIndex =
    listLesson?.findIndex((el: any) => el.slug === lessonDetails.slug) || 0;
  const nextLesson = listLesson[currentLessonIndex + 1] || null;
  const previousLesson = listLesson[currentLessonIndex - 1] || null;
  const lectures = findCourse.lectures || [];
  const histories = await getHistory({ course: courseId });
  const completePercent = Math.floor(
    ((histories?.length || 0) / (listLesson?.length || 1)) * 100
  );
  return (
    <div className="grid xl:grid-cols-[minmax(0,2fr)_minmax(0,1fr)] gap-10 min-h-screen items-start">
      <div>
        <div className="relative mb-5 aspect-video">
          <iframe
            className="w-full h-full object-fill"
            src={`https://www.youtube.com/embed/${videoId}`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          ></iframe>
        </div>
        <LessonNavigation
          nextLesson={
            !nextLesson ? "" : `/${course}/lesson?slug=${nextLesson?.slug}`
          }
          previousLesson={
            !previousLesson
              ? ""
              : `/${course}/lesson?slug=${previousLesson?.slug}`
          }
        />

        <h1 className="text-2xl">{lessonDetails.title}</h1>
        {lessonDetails.content && (
          <div className="p-5 rounded-lg border borderDarkMode bgDarkMode entry-content mt-12">
            <div
              dangerouslySetInnerHTML={{
                __html:
                  typeof lessonDetails.content === "string"
                    ? lessonDetails.content
                    : "",
              }}
            ></div>
          </div>
        )}
      </div>
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
    </div>
  );
};

export default page;
