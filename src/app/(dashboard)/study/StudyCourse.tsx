"use client"
import { CourseGrid } from "@/components/common";
import CourseItem from "@/components/course/CourseItem";
import { ICourse } from "@/database/course.model";
import React, { useEffect, useState } from "react";

const StudyCourse = ({ courses }: {
  courses: ICourse[] | null | undefined;
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
            const url = lastLesson.find((el: any) => el.course === item.slug)?.lesson || [];
            return (
            <CourseItem
              key={item.slug}
              data={item}
              cta="Tiếp tục học"
              url={url}
            />
          )}
        )}
      </CourseGrid>
    </div>
  );
};

export default StudyCourse;
