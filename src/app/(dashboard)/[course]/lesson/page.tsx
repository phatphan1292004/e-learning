import { getCourseBySlug } from "@/lib/actions/course.action";
import { getAllLessons, getLessonBySlug } from "@/lib/actions/lesson.action";
import React from "react";
import LessonNavigation from "./LessonNavigation";
import { TUpdateCourseLecture } from "@/types";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import LessonItem from "@/components/lesson/LessonItem";
import next from "next";

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
  return (
    <div className="grid lg:grid-cols-[2fr,1fr] gap-10 min-h-screen">
      <div>
        <div className="relative mb-5 aspect-video">
          <iframe
            className="w-full h-full object-fill"
            src={`https://www.youtube.com/embed/${videoId}`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          ></iframe>
        </div>
        <LessonNavigation
          nextLesson={!nextLesson ? "" : `/${course}/lesson?slug=${nextLesson?.slug}`}
          previousLesson={!previousLesson ? "" : `/${course}/lesson?slug=${previousLesson?.slug}`}
        />
      </div>
      <div className="flex flex-col">
        {lectures.length > 0 &&
          lectures.map((lecture: TUpdateCourseLecture) => (
            <Accordion type="single" collapsible key={lecture._id.toString()}>
              <AccordionItem value={lecture._id.toString()} className="mt-5">
                <AccordionTrigger>
                  <div className="flex items-center justify-between gap-3 w-full">
                    <>
                      <div>{lecture.title}</div>
                    </>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="!bg-transparent border-0 mt-5">
                  <div className="flex flex-col gap-3">
                    {lecture.lessons.map((lesson) => (
                      <LessonItem key={lesson._id.toString()} lesson={lesson} url={`/${course}/lesson?slug=${lesson.slug}`} />
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          ))}
      </div>
    </div>
  );
};

export default page;
