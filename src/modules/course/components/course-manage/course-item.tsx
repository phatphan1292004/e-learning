"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaRegStar, FaEye } from "react-icons/fa";
import { CiTimer } from "react-icons/ci";
import { StudyCourseProps } from "@/types";
import { formatMinutesToHours, formatViewstoK } from "@/utils";
import { getCourseLessonsInfo } from "../../services/course.action";

const CourseItem = ({
  data,
  cta,
  url,
}: {
  data: StudyCourseProps;
  cta?: string;
  url?: string;
}) => {
  const [duration, setDuration] = useState(0);
  useEffect(() => {
    async function getDuration() {
      const res = await getCourseLessonsInfo({ slug: data.slug });
      setDuration(res?.duration || 0);
    }
    getDuration();
  }, [data.slug]);
  const courseInfo = [
    {
      title: formatViewstoK(data.views),
      icon: <FaEye className="text-gray-500" />,
    },
    {
      title: 5,
      icon: <FaRegStar className="text-gray-500" />,
    },
    {
      title: formatMinutesToHours(duration),
      icon: <CiTimer className="text-gray-500" />,
    },
  ];
  const courseUrl = url || `/course/${data.slug}`;
  return (
    <div className="bg-white dark:bg-grayDarker dark:border-opacity-10 border border-gray-200 rounded-2xl p-5 flex flex-col">
      <Link href={courseUrl} className="block h-[180px] relative">
        <Image
          src={data.image}
          alt="Course Image"
          width={300}
          height={200}
          className="w-full h-full object-cover rounded-lg"
          sizes="@media (min-width: 640px) 300px, 100vw"
        />
        <span className="inline-block px-3 py-1 absolute top-3 right-3 z-10 text-white font-medium bg-green-500 rounded-full text-xs">
          New
        </span>
      </Link>

      <div className="mt-4 flex flex-col flex-1">
        <h3 className="font-bold text-lg mb-3">{data.title}</h3>

        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-y-2 gap-x-5 mb-5">
          <div className="flex gap-3 text-xs font-semibold">
            {courseInfo.map((item, index) => (
              <div
                className="flex items-center gap-1 dark:text-grayDark"
                key={index}
              >
                {item.icon}
                <span>{item.title}</span>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between mt-2 md:mt-0">
            <span className="font-bold text-lg text-primary">
              {data.price.toLocaleString("vi-VN", {
                style: "currency",
                currency: "VND",
              })}
            </span>
          </div>
        </div>
        <Link
          href={courseUrl}
          className="w-full flex items-center justify-center rounded-lg text-white font-bold h-12 mt-10 bg-primary"
        >
          {cta || "Xem chi tiết"}
        </Link>
      </div>
    </div>
  );
};

export default CourseItem;
