"use client"

import CourseItem from "@/modules/course/components/course-manage/course-item";
import { CourseGrid } from "@/shared/common";
import { StudyCourseProps } from "@/types";
import React, { useEffect, useState } from "react";

const StudyCourse = ({ courses }: {
  courses: StudyCourseProps[] | null | undefined;
}) => {
  const [lastLesson, setLastLesson] = useState<any[]>([]);
  useEffect(() => {
    const stored = localStorage.getItem("lastLesson");
    if (stored) {
      setLastLesson(JSON.parse(stored));
    }
  }, []);
  if(!courses || courses.length === 0) return null;
  return (
    <div>
      <CourseGrid>
        {courses?.length > 0 &&
          courses.map((item) => {
            const firstLessonUrl = item.lectures[0].lessons[0]?.slug || "";
            const url = lastLesson.find((el: any) => el.course === item.slug)?.lesson || "";
            return (
            <CourseItem
              key={item.slug}
              data={item}
              cta="Tiếp tục học"
              url={url || `/${item.slug}/lesson?slug=${firstLessonUrl}`}
            />
          )}
        )}
      </CourseGrid>
    </div>
  );
};

export default StudyCourse;
