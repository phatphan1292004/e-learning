import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaRegStar, FaEye } from "react-icons/fa";
import { CiTimer } from "react-icons/ci";

const CourseItem = () => {
  const courseInfo = [
    {
      title: "3000",
      icon: <FaEye className="text-gray-500" />,
    },
    {
      title: "5.0",
      icon: <FaRegStar className="text-gray-500" />,
    },
    {
      title: "30h25p",
      icon: <CiTimer className="text-gray-500" />,
    },
  ];
  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-5">
      <Link href="/" className="block h-[180px] relative">
        <Image
          src="https://images.unsplash.com/photo-1755417146741-8aafab9ec528?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
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

      <div className="mt-4">
        <h3 className="font-bold text-lg mb-3">
          Khóa học NextJs Pro 2025 - Xây dựng E-Learning System hoàn chỉnh
        </h3>

        <div className="flex items-center justify-between gap-5 mb-5">
          <div className="flex gap-4 text-xs font-semibold">
            {courseInfo.map((item, index) => (
              <div className="flex items-center gap-2" key={index}>
                {item.icon}
                <span>{item.title}</span>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between">
            <span className="font-bold text-lg text-primary">799.000</span>
          </div>
        </div>
        <Link
          href="#"
          className="w-full flex items-center justify-center rounded-lg text-white font-bold h-12 mt-10 bg-primary"
        >
          Xem chi tiết
        </Link>
      </div>
    </div>
  );
};

export default CourseItem;
