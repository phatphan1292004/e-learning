import LessonSaveUrl from "@/components/lesson/LessonSaveUrl";
import { getCourseBySlug } from "@/lib/actions/course.action";
import { getAllLessons } from "@/lib/actions/lesson.action";
import React from "react";
import LessonNavigation from "../LessonNavigation";

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
  const listLesson = (await getAllLessons({ course: courseId })) || [];
  const lessonDetails = listLesson?.find((el) => el.slug === slug);
  if (!lessonDetails) return null;
  const videoId = lessonDetails.video_url?.split("v=").at(-1) || "";
  const currentLessonIndex =
    listLesson?.findIndex((el: any) => el.slug === slug) || 0;
  const nextLesson = listLesson[currentLessonIndex + 1] || null;
  const previousLesson = listLesson[currentLessonIndex - 1] || null;
  return (
    <div>
      <LessonSaveUrl course={course} url={`/${course}/lesson?slug=${slug}`} />
      <div>
        <div className="relative mb-5 aspect-video">
          <iframe
            className="w-full h-full object-fill rounded-lg"
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
    </div>
  );
};

export default page;
