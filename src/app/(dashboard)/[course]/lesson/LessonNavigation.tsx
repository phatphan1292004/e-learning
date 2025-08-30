"use client";

import { Button } from "@/components/ui/button";
import React from "react";
import { HiArrowNarrowLeft, HiArrowNarrowRight } from "react-icons/hi";
import { useRouter } from "next/navigation";

const LessonNavigation = ({nextLesson, previousLesson}: {
  nextLesson: string,
  previousLesson: string,
}) => {
  const router = useRouter();
  return (
    <div className="flex items-center gap-5 justify-end text-white">
      <div>
        <Button type="button" onClick={() => !previousLesson ? null : router.push(previousLesson)}
          disabled={!previousLesson}>
          <HiArrowNarrowLeft />
        </Button>
      </div>
      <div>
        <Button type="button" onClick={() => !nextLesson ? null : router.push(nextLesson)}
          disabled={!nextLesson}>
          <HiArrowNarrowRight />
        </Button>
      </div>
    </div>
  );
};

export default LessonNavigation;
