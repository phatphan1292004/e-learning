"use client";
import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";
import { HiArrowNarrowRight } from "react-icons/hi";
import { createHistory } from "@/lib/actions/history.action";
import { Checkbox } from "@/components/ui/checkbox";

const LessonItem = ({
  lesson,
  url,
  isActive = false,
  isChecked = false,
}: {
  lesson: { title: string; duration: number; course: string; _id: string };
  url?: string;
  isActive?: boolean;
  isChecked?: boolean;
}) => {
  const handleCompleteLesson = async (checked: boolean | string) => {
    try {
      
      await createHistory({
        course: lesson.course,
        lesson: lesson._id,
        checked: checked,
        path: url || "/",
      });
    } catch (error) {}
  };
  return (
    <div
      className={cn(
        "flex items-center gap-3 bgDarkMode borderDarkMode rounded-lg p-4",
        isActive ? "text-primary font-bold" : ""
      )}
    >
      {url && (
        <Checkbox
          className="flex-shrink-0 size-4"
          defaultChecked={isChecked}
          onCheckedChange={(checked) => handleCompleteLesson(checked)}
        ></Checkbox>
      )}

      <HiArrowNarrowRight className="flex-shrink-0" />
      {url ? (
        <Link href={url} className={cn("line-clamp-1", isActive ? "pointer-events-none" : "")}>
          <h4 className="text-sm">{lesson.title}</h4>
        </Link>
      ) : (
        <h4 className="text-sm line-clamp-1">{lesson.title}</h4>
      )}

      <span className="ml-auto font-semibold text-xs flex-shrink-0">
        {lesson.duration} phút
      </span>
    </div>
  );
};

export default LessonItem;
