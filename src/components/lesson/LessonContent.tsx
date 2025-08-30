import { TUpdateCourseLecture } from "@/types";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import React from "react";
import LessonItem from "./LessonItem";
import { IHistory } from "@/database/history.model";

const LessonContent = ({
  lectures,
  course,
  slug,
  histories,
}: {
  lectures: TUpdateCourseLecture[];
  course: string;
  slug: string;
  histories: IHistory[];
}) => {
  return (
    <div className="flex flex-col gap-5">
      {lectures.length > 0 &&
        lectures.map((lecture: TUpdateCourseLecture) => (
          <Accordion type="single" collapsible key={lecture._id.toString()}>
            <AccordionItem value={lecture._id.toString()}>
              <AccordionTrigger>
                <div className="flex items-center justify-between gap-3 w-full">
                  <div className="line-clamp-1">{lecture.title}</div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="!bg-transparent border-0 mt-5">
                <div className="flex flex-col gap-3">
                  {lecture.lessons.map((lesson) => (
                    <LessonItem
                      key={lesson._id.toString()}
                      lesson={lesson ? JSON.parse(JSON.stringify(lesson)) : {}}
                      url={
                        !course ? "" : `/${course}/lesson?slug=${lesson.slug}`
                      }
                      isActive={!slug ? false : lesson.slug === slug}
                      isChecked={histories.some(
                        (el) =>
                          el.lesson.toString() ===
                          (lesson._id.toString())
                      )}
                    />
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        ))}
    </div>
  );
};

export default LessonContent;
