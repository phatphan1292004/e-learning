import { getCourseBySlug } from "@/shared/lib/actions/course.action";
import { getAllLessons } from "@/shared/lib/actions/lesson.action";
import React from "react";
import VideoPlayer from "./VideoPlayer";
import { auth } from "@clerk/nextjs/server";
import { getUserInfo } from "@/shared/lib/actions/user.actions";
import LessonSaveUrl from "@/modules/lesson/components/lesson-save-url";

const page = async ({
  params,
  searchParams,
}: {
  params: { course: string };
  searchParams: { slug: string };
}) => {
  const { userId } = auth();
  const user = await getUserInfo({ userId: userId! });
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
    <div className="mb-10">
      <LessonSaveUrl course={course} url={`/${course}/lesson?slug=${slug}`} />
      <div>
        <VideoPlayer
          videoId={videoId}
          nextLesson={
            !nextLesson ? "" : `/${course}/lesson?slug=${nextLesson?.slug}`
          }
          previousLesson={
            !previousLesson
              ? ""
              : `/${course}/lesson?slug=${previousLesson?.slug}`
          }
          data={{
            userId: user?._id?.toString() || "",
            courseId: courseId,
          }}
        />
        <h1 className="text-2xl font-bold">{lessonDetails.title}</h1>
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
