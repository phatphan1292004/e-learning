"use client";
import React, { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { commonClassName } from "@/constants";
import { MdDelete } from "react-icons/md";
import { FiEdit } from "react-icons/fi";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { createLecture, updateLecture } from "@/lib/actions/lecture.action";
import { toast } from "react-toastify";
import { StringValidation } from "zod/v3";
import Swal from "sweetalert2";
import { TCourseUpdateParams } from "@/types";
import { ILecture } from "@/database/lecture.model";
import { HiCheck, HiOutlineX } from "react-icons/hi";
import { cn } from "@/lib/utils";

const CourseUpdateContent = ({ course }: { course: TCourseUpdateParams }) => {
  const lectures = course.lectures || [];

  const handleDeleteLecture = async (e: any, lectureId: string) => {
    e.stopPropagation();
    try {
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
          const res = await updateLecture({
            lectureId: lectureId,
            updateData: {
              path: `manage/course/update-content?slug=${course.slug}`,
              _destroy: true,
            },
          });
          if (res?.success) {
            toast.success("Xóa chương thành công");
          }
        }
      });
    } catch (error) {
      toast.error("Xóa chương thất bại");
    }
  };

  const handleUpdateLecture = async (e: any, lectureId: string) => {
    e.stopPropagation();
    try {
      const res = await updateLecture({
        lectureId: lectureId,
        updateData: {
          title: lectureEdit,
          path: `manage/course/update-content?slug=${course.slug}`,
        },
      });
      if (res?.success) {
        toast.success("Cập nhật chương thành công");
        setLectureEdit("");
        setLectureIdEdit("");
      }
    } catch (error) {}
  };
  const handleAddNewLecture = async () => {
    try {
      const res = await createLecture({
        title: "Chương mới",
        course: course._id,
        order: lectures.length + 1,
        path: `manage/course/update-content?slug=${course.slug}`,
      });

      if (res?.success) {
        toast.success("Thêm chương mới thành công");
      }
    } catch (error) {}
  };
  const [lectureEdit, setLectureEdit] = useState("");
  const [lectureIdEdit, setLectureIdEdit] = useState("");
  return (
    <div>
      {lectures.length > 0 &&
        lectures.map((lecture: ILecture, idx: number) => (
          <Accordion type="single" collapsible key={lecture._id}>
            <AccordionItem value={lecture._id} className="mt-5">
              <AccordionTrigger>
                <div className="flex items-center justify-between gap-3 w-full">
                  {lecture._id === lectureIdEdit ? (
                    <>
                      <div className="w-full">
                        <Input
                          placeholder="Tên chương"
                          defaultValue={lecture.title}
                          onChange={(e) => {
                            setLectureEdit(e.target.value);
                          }}
                        />
                      </div>
                      <div className="flex gap-2 pr-5">
                        <span
                          className={cn(commonClassName.acction, "text-green-500")}
                          onClick={(e) => handleUpdateLecture(e, lecture._id)}
                        >
                          <HiCheck size={18} />
                        </span>
                        <span
                          className={cn(commonClassName.acction, "text-red-500")}
                          onClick={(e) => {
                            e.stopPropagation();
                            setLectureIdEdit("");
                          }}
                        >
                          <HiOutlineX size={18} />
                        </span>
                      </div>
                    </>
                  ) : (
                    <>
                      <div>{`Chương ${idx + 1}: ${lecture.title}`}</div>
                      <div className="flex gap-2 pr-5">
                        <span
                          className={commonClassName.acction}
                          onClick={(e) => {
                            e.stopPropagation();
                            setLectureIdEdit(lecture._id);
                          }}
                        >
                          <FiEdit size={18} />
                        </span>
                        <span
                          className={commonClassName.acction}
                          onClick={(e) => handleDeleteLecture(e, lecture._id)}
                        >
                          <MdDelete size={18} />
                        </span>
                      </div>
                    </>
                  )}
                </div>
              </AccordionTrigger>
              <AccordionContent>{/* Nội dung chương */}</AccordionContent>
            </AccordionItem>
          </Accordion>
        ))}
      <Button
        type="button"
        onClick={handleAddNewLecture}
        className="text-white mt-10"
      >
        Thêm chương mới
      </Button>
    </div>
  );
};

export default CourseUpdateContent;
