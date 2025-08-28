"use client";
import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Heading from "../common/Heading";
import Image from "next/image";
import { commonClassName, courseStatus } from "@/constants";
import { cn } from "@/lib/utils";
import { FiEdit } from "react-icons/fi";
import { FaEye } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import {
  HiOutlineBookOpen,
  HiOutlineArrowNarrowLeft,
  HiOutlineArrowNarrowRight,
} from "react-icons/hi";
import Link from "next/link";
import { ICourse } from "@/database/course.model";
import Swal from "sweetalert2";
import { updateCourse } from "@/lib/actions/course.action";
import { ECourseStatus } from "@/types/enums";
import { toast } from "react-toastify";
import { Input } from "../ui/input";

const CourseManage = ({ course }: { course: ICourse[] }) => {
  const handleChangeStatus = async (
    slug: string,
    currentStatus: ECourseStatus
  ) => {
    try {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, update it!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          await updateCourse({
            slug,
            updateData: {
              status:
                currentStatus === ECourseStatus.PENDING
                  ? ECourseStatus.APPROVED
                  : ECourseStatus.PENDING,
              _destroy: false,
            },
            path: "/manage/course",
          });
          toast.success("Cập nhật trạng thái thành công!");
        }
      });
    } catch (error) {
      console.log(error);
    }
  };
  const handleDeleteCourse = (slug: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await updateCourse({
          slug,
          updateData: {
            status: ECourseStatus.PENDING,
            _destroy: true,
          },
          path: "/manage/course",
        });
        toast.success("Khóa học đã được xóa thành công!");
      }
    });
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-10">
        <Heading>Quản lý khóa học</Heading>
        <div className="w-[300px]">
          <Input placeholder="Tìm kiếm khóa học" />
        </div>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Thông tin</TableHead>
            <TableHead>Giá</TableHead>
            <TableHead>Trạng thái</TableHead>
            <TableHead>Hành động</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {course.length > 0 &&
            course.map((item) => (
              <TableRow key={item.slug}>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Image
                      alt=""
                      src={item.image}
                      width={80}
                      height={80}
                      className="flex-shrink-0 size-20 rounded-lg object-cover"
                    />
                    <div className="flex flex-col gap-1">
                      <h3 className="font-bold text-base">{item.title}</h3>
                      <h4 className="text-sm text-slate-500 font-semibold">
                        {new Date(item.created_at).toLocaleDateString("vi-VN")}
                      </h4>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <span className="font-bold text-base">
                    {item.price.toLocaleString("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    })}
                  </span>
                </TableCell>
                <TableCell>
                  <button
                    type="button"
                    className={cn(
                      courseStatus.find(
                        (status) => status.value === item.status
                      )?.className,
                      commonClassName.status
                    )}
                    onClick={() => handleChangeStatus(item.slug, item.status)}
                  >
                    {
                      courseStatus.find(
                        (status) => status.value === item.status
                      )?.title
                    }
                  </button>
                </TableCell>
                <TableCell>
                  <div className="flex gap-3">
                    <Link
                      href={`/manage/course/update?slug=${item.slug}`}
                      target="_blank"
                      className={commonClassName.acction}
                    >
                      <FiEdit size={18} />
                    </Link>

                    <Link
                      href={`/course/${item.slug}`}
                      target="_blank"
                      className={commonClassName.acction}
                    >
                      <FaEye size={18} />
                    </Link>

                    <button
                      onClick={() => handleDeleteCourse(item.slug)}
                      className={commonClassName.acction}
                    >
                      <MdDelete size={18} />
                    </button>

                    <Link
                      href={`/manage/course/update-content?slug=${item.slug}`}
                      className={commonClassName.acction}
                    >
                      <HiOutlineBookOpen size={18} />
                    </Link>
                  </div>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>

      <div className="flex justify-end gap-3 mt-10">
        <button className="size-10 rounded-md borderDarkMode bgDarkMode border flex items-center justify-center">
          <HiOutlineArrowNarrowLeft size={18} />
        </button>
        <button className="size-10 rounded-md borderDarkMode bgDarkMode border flex items-center justify-center">
          <HiOutlineArrowNarrowRight size={18} />
        </button>
      </div>
    </div>
  );
};

export default CourseManage;
