import Link from "next/link";
import React from "react";
import { HiArrowNarrowRight } from "react-icons/hi";

const LessonItem = ({
  lesson,
  url,
}: {
  lesson: { title: string; duration: number };
  url?: string;
}) => {
  return (
    <div className="flex items-center gap-3 bgDarkMode borderDarkMode rounded-lg p-3">
      <HiArrowNarrowRight />
      {url ? (
        <Link href={url}>
          <h4 className="text-sm">{lesson.title}</h4>
        </Link>
      ) : (
        <h4 className="text-sm">{lesson.title}</h4>
      )}

      <span className="ml-auto font-semibold text-xs">
        {lesson.duration} phút
      </span>
    </div>
  );
};

export default LessonItem;
