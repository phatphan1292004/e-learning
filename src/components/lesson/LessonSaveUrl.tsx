"use client";
import { useEffect } from "react";

const LessonSaveUrl = ({ url, course }: { url: string; course: string }) => {
  useEffect(() => {
    let result: any[] = JSON.parse(localStorage.getItem("lastLesson") || "[]") || [];
    const item = { course, lesson: url };
    result = result.filter((el) => el.course !== course);
    result.push(item);
    localStorage.setItem("lastLesson", JSON.stringify(result));
  }, [course, url]);
  return null;
};

export default LessonSaveUrl;
