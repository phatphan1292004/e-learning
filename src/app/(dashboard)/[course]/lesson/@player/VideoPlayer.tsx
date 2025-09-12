"use client";
import useGlobalStore from "@/app/store";
import React from "react";
import LessonNavigation from "../LessonNavigation";
import { Button } from "@/components/ui/button";
import RatingButton from "./RatingButton";

const VideoPlayer = ({
  videoId,
  nextLesson,
  previousLesson,
  data,
}: {
  videoId: string;
  nextLesson: string;
  previousLesson: string;
  data: {
    userId: string; 
    courseId: string;
  }
}) => {
  const { expandedPlayer, setExpandedPlayer } = useGlobalStore();
  return (
    <>
      <div className="relative mb-5 aspect-video">
        <iframe
          className="w-full h-full object-fill rounded-lg"
          src={`https://www.youtube.com/embed/${videoId}`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        ></iframe>
      </div>

      <div className="flex items-center gap-5 justify-between text-white mb-10">
        <div>
          <RatingButton userId={data.userId} courseId={data.courseId} />
        </div>

        <div className="flex items-center gap-3">
          <Button
            type="button"
            className="px-4 py-2 rounded-lg border transition-colors
    bg-white text-black border-gray-300
    dark:bg-gray-900 dark:text-white dark:border-gray-700
    hover:bg-gray-100 hover:dark:bg-gray-800
    shadow-sm"
            onClick={() => setExpandedPlayer(!expandedPlayer)}
          >
            {expandedPlayer ? "Mặc định" : "Mở rộng"}
          </Button>
          <LessonNavigation
            nextLesson={nextLesson}
            previousLesson={previousLesson}
          />
        </div>
      </div>
    </>
  );
};

export default VideoPlayer;
